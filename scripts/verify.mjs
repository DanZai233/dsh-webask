#!/usr/bin/env node
/**
 * Offline smoke test for the built client bundle.
 *
 * `node --check` proves the file parses; it proves nothing about whether the
 * slot ids, prop names and input actions are wired the way the host expects.
 * This runs the real bundle in a VM against a fake browser and a minimal React
 * stub, then drives the actual click paths, so a typo in a slot name or a
 * mis-read prop fails here instead of silently doing nothing in the GUI.
 *
 * Run: npm run verify   (build first: npm run build)
 */

import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const results = [];
function check(name, condition, detail) {
  results.push({ name, ok: !!condition, detail: detail === undefined ? '' : String(detail) });
}

/* ------------------------------------------------------------ fake browser */

const storage = new Map();
const clipboard = [];
const openedTabs = [];
const keydownListeners = [];
const styleNodes = [];

const fakeDocument = {
  documentElement: { lang: 'zh-CN' },
  head: {
    appendChild(node) {
      styleNodes.push(node);
    },
  },
  body: { appendChild() {}, removeChild() {} },
  querySelector: () => null,
  createElement: () => ({
    style: {},
    value: '',
    setAttribute() {},
    set textContent(value) {
      this._text = value;
    },
    get textContent() {
      return this._text;
    },
    appendChild() {},
    select() {},
  }),
  execCommand: () => true,
};

const fakeWindow = {
  localStorage: {
    getItem: (key) => (storage.has(key) ? storage.get(key) : null),
    setItem: (key, value) => storage.set(key, String(value)),
  },
  addEventListener: (type, fn) => {
    if (type === 'keydown') keydownListeners.push(fn);
  },
  removeEventListener: () => {},
  open: (url) => {
    openedTabs.push(url);
    return {};
  },
  setTimeout: () => 0,
};

const sandbox = {
  window: fakeWindow,
  document: fakeDocument,
  navigator: {
    platform: 'MacIntel',
    language: 'zh-CN',
    clipboard: {
      writeText: async (text) => {
        clipboard.push(text);
      },
    },
  },
  console,
  setTimeout: () => 0,
  clearTimeout: () => {},
};

/* ---------------------------------------------------------- minimal React */

let hookCell = 0;
const reactStub = {
  Fragment: Symbol('Fragment'),
  createElement(type, props) {
    const children = Array.prototype.slice.call(arguments, 2);
    return { type, props: props || {}, children };
  },
  useState(initial) {
    return [typeof initial === 'function' ? initial() : initial, () => {}];
  },
  // Effects run inline so listener registration and bridge wiring are testable;
  // cleanup is ignored because each render gets a fresh fake window anyway.
  useEffect(fn) {
    fn();
  },
  useRef: () => ({ current: null }),
  useCallback: (fn) => fn,
  useSyncExternalStore: (_subscribe, getSnapshot) => getSnapshot(),
};
const fakeRequire = (id) => {
  if (id === 'react') return reactStub;
  throw new Error('unexpected require: ' + id);
};

/* ------------------------------------------------------------- run bundle */

const code = await readFile(join(root, 'lib/client.js'), 'utf8');

let captured = null;
fakeWindow.__ModuleLoader__ = {
  load(spec) {
    captured = spec;
  },
};

vm.createContext(sandbox);
vm.runInContext(code, sandbox, { filename: 'lib/client.js' });

check('bundle calls window.__ModuleLoader__.load', captured !== null);
check('bundle id is the package name', captured && captured.id === 'dsh-webask', captured && captured.id);
check('bundle exposes a factory', captured && typeof captured.factory === 'function');

const mod = captured.factory(fakeRequire);

check('exports.name', mod.name === 'dsh-webask', mod.name);
check('exports.inject requests slots', Array.isArray(mod.inject) && mod.inject.indexOf('slots') >= 0, JSON.stringify(mod.inject));
check('exports.apply is callable', typeof mod.apply === 'function');

/* ------------------------------------------------- mount into a fake host */

const registrations = [];
const injected = [];
const fakeCtx = {
  // No ctx.locale: exercises the built-in bilingual fallback path.
  slots: {
    inject(slot, factory) {
      injected.push(slot);
      return factory();
    },
    register(options, component) {
      registrations.push({ options, component });
      return () => {};
    },
  },
};

mod.apply(fakeCtx);

check(
  'registers exactly 3 slot occupants',
  registrations.length === 3,
  registrations.map((r) => r.options.name + '#' + r.options.id).join(', '),
);

const byName = (name) => registrations.filter((r) => r.options.name === name);

check('occupies conversation.input.right', byName('conversation.input.right').length === 1);
check('occupies shell.overlay exactly once', byName('shell.overlay').length === 1);
check('occupies settings.plugins.tab', byName('settings.plugins.tab').length === 1);
check(
  'every occupant carries a non-empty id',
  registrations.every((r) => typeof r.options.id === 'string' && r.options.id.length > 0),
);
check('injected each slot it registers', injected.length === 3, injected.join(', '));

/* ----------------------------------------------------------- tree helpers */

function findAll(node, predicate, out = []) {
  if (!node || typeof node !== 'object') return out;
  if (predicate(node)) out.push(node);
  for (const child of node.children || []) {
    if (Array.isArray(child)) child.forEach((c) => findAll(c, predicate, out));
    else findAll(child, predicate, out);
  }
  return out;
}

const buttonWithClass = (tree, className) =>
  findAll(tree, (n) => n.type === 'button' && n.props && n.props.className === className)[0];

/**
 * A registered occupant is a wrapper returning an element for the real
 * component — that is how the plugin hands in its translator and context — so
 * rendering here means invoking the wrapper, then expanding every function
 * component beneath it (React would do this; the stub must too).
 */
function hydrate(node) {
  if (!node || typeof node !== 'object') return node;
  if (typeof node.type === 'function') return hydrate(node.type(node.props || {}));
  const raw = node.children || [];
  return {
    type: node.type,
    props: node.props || {},
    children: raw.map((child) => (Array.isArray(child) ? child.map(hydrate) : hydrate(child))),
  };
}

function render(registration, props) {
  return hydrate(registration.component(props));
}

/* --------------------------------------------- surface 1: composer button */

let clearedWith = null;
const inputActions = {
  setDraft(value) {
    clearedWith = value;
  },
};

function renderComposer(draft, phase) {
  return render(byName('conversation.input.right')[0], {
    useInput: (selector) => selector({ draft, phase }),
    inputActions,
    sessionId: 'session-1',
  });
}

const idleButton = buttonWithClass(renderComposer('', 'plain'), 'dsh-webask-btn');
check('empty draft disables the composer button', idleButton && idleButton.props.disabled === true);

const busyButton = buttonWithClass(renderComposer('hi', 'submitting'), 'dsh-webask-btn');
check('non-plain phase disables the composer button', busyButton && busyButton.props.disabled === true);

const readyTree = renderComposer('What is a monad?', 'plain');
const readyButton = buttonWithClass(readyTree, 'dsh-webask-btn');
check('a plain draft enables the composer button', readyButton && readyButton.props.disabled === false);
check('button carries an accessible label', !!(readyButton && readyButton.props['aria-label']));

readyButton.props.onClick();

check(
  'the question was copied to the clipboard',
  clipboard.length === 1 && clipboard[0] === 'What is a monad?',
  JSON.stringify(clipboard),
);
check(
  'a DeepSeek web tab was opened with the encoded question',
  openedTabs.length === 1 && openedTabs[0] === 'https://chat.deepseek.com/?q=What%20is%20a%20monad%3F',
  openedTabs[0],
);
check('the composer draft was cleared through inputActions', clearedWith === '', JSON.stringify(clearedWith));

/* ----------------------------------------------------- surface 2: overlay */

function renderOverlay(current) {
  return render(byName('shell.overlay')[0], {
    useSessions: (selector) => selector({ current }),
    current,
  });
}

const closedTree = renderOverlay('session-1');
const scrimWhenClosed = findAll(closedTree, (n) => n.props && n.props.className === 'dsh-webask-scrim');
check('the overlay renders nothing while closed', scrimWhenClosed.length === 0);

check('a global keydown listener is registered', keydownListeners.length >= 1, keydownListeners.length);

const hotkeyEvent = {
  key: 'k',
  code: 'KeyK',
  metaKey: true,
  ctrlKey: false,
  shiftKey: true,
  altKey: false,
  repeat: false,
  isComposing: false,
  preventDefault() {},
  stopPropagation() {},
};
keydownListeners.forEach((fn) => fn(hotkeyEvent));

const openTree = renderOverlay('session-1');
const scrimWhenOpen = findAll(openTree, (n) => n.props && n.props.className === 'dsh-webask-scrim');
check('mod+shift+k opens the palette', scrimWhenOpen.length === 1);

const textarea = findAll(openTree, (n) => n.type === 'textarea')[0];
check('the palette renders an input', !!textarea);
check('the palette input is bilingual-localized', !!textarea && typeof textarea.props.placeholder === 'string' && textarea.props.placeholder.length > 0, textarea && textarea.props.placeholder);

const historyRows = findAll(openTree, (n) => n.type === 'li');
check('the palette lists the question asked a moment ago', historyRows.length === 1, historyRows.length);

// The history row's "insert into composer" action rides the composer bridge,
// which the composer button published during its render above.
const insertButton = findAll(historyRows[0], (n) => n.type === 'button' && n.props && n.props.disabled === false && n.props.className === 'dsh-webask-mini').pop();
check('the history row offers an insert action', !!insertButton);
if (insertButton) {
  clearedWith = null;
  insertButton.props.onClick();
  check(
    'inserting from history writes through the composer bridge',
    clearedWith === 'What is a monad?',
    JSON.stringify(clearedWith),
  );
}

/* ------------------------------------------- history + config persistence */

check('history was persisted to localStorage', storage.has('dsh-webask.history.v1'), [...storage.keys()].join(', '));
const persistedHistory = JSON.parse(storage.get('dsh-webask.history.v1') || '[]');
check('persisted history holds the question', persistedHistory[0] && persistedHistory[0].q === 'What is a monad?');

/* ------------------------------------------------------ surface 3: settings */

const settingsTree = render(byName('settings.plugins.tab')[0], {});
check('the settings tab renders a title', findAll(settingsTree, (n) => n.props && n.props.className === 'dsh-webask-settings-title').length === 1);

const templateInput = findAll(settingsTree, (n) => n.type === 'input' && n.props.type === 'text')[0];
check('the settings tab exposes a URL template field', !!templateInput);
check(
  'the template field defaults to the DeepSeek template',
  templateInput && templateInput.props.value === 'https://chat.deepseek.com/?q={q}',
  templateInput && templateInput.props.value,
);

const siteSelect = findAll(settingsTree, (n) => n.type === 'select')[0];
check('the settings tab exposes a site selector', !!siteSelect);
check(
  'the site selector offers every preset plus the current selection',
  siteSelect && siteSelect.children.flat().length >= 7,
  siteSelect && siteSelect.children.flat().length,
);

const saveButton = buttonWithClass(settingsTree, 'dsh-webask-primary');
check('the settings tab has a save action', !!saveButton);
if (saveButton) {
  saveButton.props.onClick();
  const persistedConfig = JSON.parse(storage.get('dsh-webask.config.v1') || 'null');
  check('saving persists the config', !!persistedConfig && typeof persistedConfig.urlTemplate === 'string');
}

/* -------------------------------------------------------------- reporting */

let failed = 0;
for (const row of results) {
  if (!row.ok) failed++;
  const mark = row.ok ? 'ok  ' : 'FAIL';
  const detail = row.detail ? '  (' + row.detail + ')' : '';
  console.log(`${mark}  ${row.name}${detail}`);
}

console.log('');
console.log(`${results.length - failed}/${results.length} checks passed`);
if (failed > 0) {
  console.error(`${failed} check(s) failed`);
  process.exit(1);
}
