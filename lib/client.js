window.__ModuleLoader__.load({
  id: "dsh-webask",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    var WEBASK_CSS = "/*\n * dsh-webask — WebAsk styles.\n *\n * Built on the host's own design tokens (--dsw-alias-*) so the surfaces inherit\n * the active theme, including dark/light switching, instead of hard-coding a\n * palette. Every token carries a neutral fallback so a token rename degrades to\n * something legible rather than an unstyled element.\n */\n\n/* ---- shared bits -------------------------------------------------------- */\n\n.dsh-webask-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  padding: 0;\n  border: 0;\n  border-radius: 8px;\n  background: transparent;\n  color: var(--dsw-alias-label-tertiary, #8b8b8b);\n  cursor: pointer;\n  transition: background-color 0.15s var(--ds-ease-in-out, ease), color 0.15s var(--ds-ease-in-out, ease);\n}\n\n.dsh-webask-btn:hover:not(:disabled) {\n  background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, 0.14));\n  color: var(--dsw-alias-label-primary, #ededed);\n}\n\n.dsh-webask-btn:disabled {\n  opacity: 0.35;\n  cursor: default;\n}\n\n.dsh-webask-dim {\n  color: var(--dsw-alias-label-tertiary, #8b8b8b);\n}\n\n.dsh-webask-primary {\n  padding: 7px 16px;\n  border: 0;\n  border-radius: 9px;\n  background: var(--dsw-alias-brand-primary, #4d6bfe);\n  color: #fff;\n  font-size: var(--dsw-font-xs-13, 13px);\n  font-weight: 500;\n  cursor: pointer;\n  transition: filter 0.15s var(--ds-ease-in-out, ease);\n}\n\n.dsh-webask-primary:hover:not(:disabled) {\n  filter: brightness(1.1);\n}\n\n.dsh-webask-primary:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n\n.dsh-webask-mini {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  min-width: 26px;\n  height: 26px;\n  padding: 0 8px;\n  border: 1px solid transparent;\n  border-radius: 7px;\n  background: transparent;\n  color: var(--dsw-alias-label-secondary, #b4b4b4);\n  font-size: var(--dsw-font-xxs-12, 12px);\n  cursor: pointer;\n  transition: background-color 0.15s var(--ds-ease-in-out, ease), color 0.15s var(--ds-ease-in-out, ease);\n}\n\n.dsh-webask-mini:hover:not(:disabled) {\n  background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, 0.14));\n  color: var(--dsw-alias-label-primary, #ededed);\n}\n\n.dsh-webask-mini:disabled {\n  opacity: 0.35;\n  cursor: default;\n}\n\n.dsh-webask-select,\n.dsh-webask-text {\n  height: 30px;\n  padding: 0 9px;\n  border: 1px solid var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.22));\n  border-radius: 8px;\n  background: var(--dsw-alias-bg-layer-2, #262626);\n  color: var(--dsw-alias-label-primary, #ededed);\n  font-family: inherit;\n  font-size: var(--dsw-font-xs-13, 13px);\n  outline: none;\n}\n\n.dsh-webask-select:focus,\n.dsh-webask-text:focus {\n  border-color: var(--dsw-alias-brand-primary, #4d6bfe);\n}\n\n/* ---- the global palette ------------------------------------------------- */\n\n/* The overlay layer is click-through by design, so each surface opts back in. */\n.dsh-webask-scrim {\n  position: fixed;\n  inset: 0;\n  z-index: 4000;\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n  padding: 13vh 16px 16px;\n  background: rgba(0, 0, 0, 0.34);\n  pointer-events: auto;\n}\n\n.dsh-webask-panel {\n  display: flex;\n  flex-direction: column;\n  width: min(620px, 100%);\n  max-height: 72vh;\n  overflow: hidden;\n  border: 1px solid var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.22));\n  border-radius: 14px;\n  background: var(--dsw-alias-bg-layer-1, #1f1f1f);\n  box-shadow: var(--dsw-elevation-prominent, 0 18px 48px rgba(0, 0, 0, 0.42));\n  color: var(--dsw-alias-label-primary, #ededed);\n  font-family: var(--dsw-font-family, inherit);\n}\n\n.dsh-webask-head {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 12px;\n  border-bottom: 1px solid var(--dsw-alias-border-l1, rgba(127, 127, 127, 0.14));\n}\n\n.dsh-webask-title {\n  flex: 1;\n  font-size: var(--dsw-font-xs-13, 13px);\n  font-weight: 600;\n  letter-spacing: 0.01em;\n}\n\n.dsh-webask-input {\n  margin: 12px 12px 0;\n  padding: 10px 12px;\n  border: 1px solid var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.22));\n  border-radius: 10px;\n  background: var(--dsw-alias-bg-base, #191919);\n  color: var(--dsw-alias-label-primary, #ededed);\n  font-family: inherit;\n  font-size: var(--dsh-content-font-size, 14px);\n  line-height: 1.5;\n  resize: none;\n  outline: none;\n}\n\n.dsh-webask-input:focus {\n  border-color: var(--dsw-alias-brand-primary, #4d6bfe);\n}\n\n.dsh-webask-input::placeholder {\n  color: var(--dsw-alias-label-dimmed, #6b6b6b);\n}\n\n.dsh-webask-actions {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 12px 12px;\n}\n\n.dsh-webask-note {\n  flex: 1;\n  color: var(--dsw-alias-label-tertiary, #8b8b8b);\n  font-size: var(--dsw-font-xxs-12, 12px);\n  line-height: 1.4;\n}\n\n.dsh-webask-history {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  border-top: 1px solid var(--dsw-alias-border-l1, rgba(127, 127, 127, 0.14));\n}\n\n.dsh-webask-history-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 8px 12px;\n  color: var(--dsw-alias-label-caption, #9a9a9a);\n  font-size: var(--dsw-font-xxs-12, 12px);\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n\n.dsh-webask-list {\n  margin: 0;\n  padding: 0 6px 8px;\n  overflow-y: auto;\n  list-style: none;\n}\n\n.dsh-webask-row {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 5px 6px;\n  border-radius: 8px;\n}\n\n.dsh-webask-row:hover {\n  background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, 0.12));\n}\n\n.dsh-webask-row-text {\n  flex: 1;\n  min-width: 0;\n  overflow: hidden;\n  color: var(--dsw-alias-label-secondary, #c4c4c4);\n  font-size: var(--dsw-font-xs-13, 13px);\n  line-height: 1.45;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n\n.dsh-webask-row-actions {\n  display: flex;\n  flex-shrink: 0;\n  gap: 2px;\n  opacity: 0;\n  transition: opacity 0.12s var(--ds-ease-in-out, ease);\n}\n\n.dsh-webask-row:hover .dsh-webask-row-actions,\n.dsh-webask-row:focus-within .dsh-webask-row-actions {\n  opacity: 1;\n}\n\n.dsh-webask-empty {\n  padding: 4px 12px 16px;\n  color: var(--dsw-alias-label-dimmed, #6b6b6b);\n  font-size: var(--dsw-font-xxs-12, 12px);\n}\n\n/* ---- toasts ------------------------------------------------------------- */\n\n.dsh-webask-toasts {\n  position: fixed;\n  bottom: 28px;\n  left: 50%;\n  z-index: 4001;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  transform: translateX(-50%);\n  pointer-events: none;\n}\n\n.dsh-webask-toast {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  max-width: 520px;\n  padding: 9px 14px;\n  border: 1px solid var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.22));\n  border-radius: 10px;\n  background: var(--dsw-alias-bg-layer-2, #262626);\n  box-shadow: var(--dsw-elevation-prominent, 0 10px 28px rgba(0, 0, 0, 0.36));\n  color: var(--dsw-alias-label-primary, #ededed);\n  font-family: var(--dsw-font-family, inherit);\n  font-size: var(--dsw-font-xs-13, 13px);\n  pointer-events: auto;\n}\n\n.dsh-webask-toast-success {\n  border-color: var(--dsw-alias-state-success-primary, #2ea043);\n}\n\n.dsh-webask-toast-error {\n  border-color: var(--dsw-alias-state-error-primary, #e5534b);\n}\n\n.dsh-webask-link {\n  color: var(--dsw-alias-brand-primary, #4d6bfe);\n  text-decoration: none;\n}\n\n.dsh-webask-link:hover {\n  text-decoration: underline;\n}\n\n/* ---- the settings tab --------------------------------------------------- */\n\n.dsh-webask-settings {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  max-width: 620px;\n  padding: 4px 2px 20px;\n  color: var(--dsw-alias-label-primary, #ededed);\n  font-family: var(--dsw-font-family, inherit);\n}\n\n.dsh-webask-settings-title {\n  margin: 0;\n  font-size: var(--dsh-content-font-size, 14px);\n  font-weight: 600;\n}\n\n.dsh-webask-settings p {\n  margin: 0;\n  font-size: var(--dsw-font-xs-13, 13px);\n  line-height: 1.5;\n}\n\n.dsh-webask-field {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: var(--dsw-font-xs-13, 13px);\n}\n\n.dsh-webask-field > span:first-child {\n  flex-shrink: 0;\n  width: 108px;\n  color: var(--dsw-alias-label-secondary, #b4b4b4);\n}\n\n.dsh-webask-grow {\n  flex: 1;\n  min-width: 0;\n}\n\n.dsh-webask-narrow {\n  width: 84px;\n}\n\n.dsh-webask-hint {\n  padding-left: 118px;\n  font-size: var(--dsw-font-xxs-12, 12px);\n}\n\n.dsh-webask-check {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: var(--dsw-font-xs-13, 13px);\n  color: var(--dsw-alias-label-secondary, #b4b4b4);\n  cursor: pointer;\n}\n\n.dsh-webask-settings .dsh-webask-actions {\n  padding: 10px 0 0;\n}\n";
/**
 * dsh-webask — WebAsk, browser half.
 *
 * The premise: DeepSeek Harness resends the whole conversation on every turn,
 * so a twenty-token question you already know will be short still costs you the
 * entire context window it rides on. WebAsk hands exactly those questions to
 * the free web chat instead, and never lets them enter the conversation at all.
 *
 * Three surfaces, one pathway:
 *
 *   conversation.input.right  a button beside the composer. Whatever you have
 *                             already typed is LIFTED OUT of the draft (cleared
 *                             via the official input actions), copied, and sent
 *                             to the browser. It never reaches the model.
 *   shell.overlay             a global palette on a hotkey, plus the toast
 *                             layer. History lets you re-open, copy, or push a
 *                             question back into the composer.
 *   settings.plugins.tab      target site, URL template, hotkey, history.
 *
 * This file is wrapped into a CJS closure-factory by build.mjs; `require` is
 * provided by the host's module loader, and WEBASK_CSS is injected there too.
 */

const React = require("react");

const NS = "webask";
const CONFIG_KEY = "dsh-webask.config.v1";
const HISTORY_KEY = "dsh-webask.history.v1";
const STYLE_FLAG = "data-dsh-webask-styles";

/* =========================================================== target sites */

/**
 * Every one of these speaks the same de-facto convention: a `q` query
 * parameter the page reads and autofills. None of them support it natively —
 * it is a userscript convention — which is exactly why the clipboard write is
 * not optional and the template stays editable.
 */
const SITES = [
  { id: "deepseek", label: "DeepSeek", url: "https://chat.deepseek.com/?q={q}" },
  { id: "kimi", label: "Kimi", url: "https://www.kimi.com/?q={q}" },
  { id: "qwen", label: "Qwen", url: "https://chat.qwen.ai/?q={q}" },
  { id: "doubao", label: "豆包", url: "https://www.doubao.com/?q={q}" },
  { id: "yuanbao", label: "腾讯元宝", url: "https://yuanbao.tencent.com/?q={q}" },
  { id: "glm", label: "智谱 GLM", url: "https://chatglm.cn/?q={q}" },
  { id: "gemini", label: "Gemini", url: "https://gemini.google.com/?q={q}" },
];

const DEFAULT_CONFIG = {
  urlTemplate: "https://chat.deepseek.com/?q={q}",
  hotkey: "mod+shift+k",
  copyToClipboard: true,
  rememberHistory: true,
  historyLimit: 50,
};

/* ================================================================ locales */

const DICT_EN = {
  "app.name": "WebAsk",
  "composer.title": "Ask this on the web instead — spends no tokens",
  "palette.placeholder": "Something you could ask in one line…",
  "palette.send": "Ask on the web",
  "palette.target": "Target",
  "palette.hint": "The question is copied to your clipboard — press {paste} on the page if it does not autofill.",
  "palette.history": "History",
  "palette.empty": "Nothing asked yet.",
  "palette.close": "Close",
  "palette.openHint": "Press {hotkey} anywhere to open this.",
  "action.reopen": "Open again",
  "action.copy": "Copy",
  "action.backfill": "Insert into composer",
  "settings.title": "WebAsk",
  "settings.intro":
    "Sends short questions to a web chat instead of the current conversation, so they cost no context and no tokens.",
  "settings.site": "Target site",
  "settings.template": "URL template",
  "settings.templateHint": "Use {q} where the question goes. Anything else is passed through untouched.",
  "settings.hotkey": "Global hotkey",
  "settings.hotkeyHint": "Combination of mod / shift / alt and a key — for example mod+shift+k.",
  "settings.copy": "Copy the question to the clipboard",
  "settings.remember": "Keep a local history",
  "settings.limit": "History limit",
  "settings.save": "Save",
  "settings.reset": "Restore defaults",
  "settings.clearHistory": "Clear history",
  "settings.custom": "Custom",
  "settings.about": "History and settings stay in this browser. Nothing is sent to the model.",
  "toast.copied": "Copied. Press {paste} on the page if it does not autofill.",
  "toast.copiedOnly": "Copied to the clipboard.",
  "toast.backfilled": "Inserted into the composer.",
  "toast.noSession": "No conversation is open to insert into.",
  "toast.cleared": "History cleared.",
  "toast.saved": "Saved.",
  "toast.blocked": "The browser blocked the tab — open it from here:",
};

const DICT_ZH = {
  "app.name": "WebAsk",
  "composer.title": "去网页版问 —— 不消耗 token",
  "palette.placeholder": "一句话就能问完的问题…",
  "palette.send": "去网页提问",
  "palette.target": "目标站点",
  "palette.hint": "问题已复制到剪贴板 —— 页面没有自动填入的话，按 {paste} 粘贴。",
  "palette.history": "历史",
  "palette.empty": "还没有提问记录。",
  "palette.close": "关闭",
  "palette.openHint": "在任意位置按 {hotkey} 呼出。",
  "action.reopen": "重新打开",
  "action.copy": "复制",
  "action.backfill": "回填到输入框",
  "settings.title": "WebAsk",
  "settings.intro": "把简短问题送去网页版，而不是当前会话 —— 不占上下文，不花 token。",
  "settings.site": "目标站点",
  "settings.template": "URL 模板",
  "settings.templateHint": "用 {q} 表示问题的位置，其余原样保留。",
  "settings.hotkey": "全局快捷键",
  "settings.hotkeyHint": "由 mod / shift / alt 与一个按键组成，例如 mod+shift+k。",
  "settings.copy": "把问题复制到剪贴板",
  "settings.remember": "保留本地历史",
  "settings.limit": "历史上限",
  "settings.save": "保存",
  "settings.reset": "恢复默认",
  "settings.clearHistory": "清空历史",
  "settings.custom": "自定义",
  "settings.about": "历史与设置只保存在本浏览器中，不会发送给模型。",
  "toast.copied": "已复制。页面没自动填入的话，按 {paste} 粘贴。",
  "toast.copiedOnly": "已复制到剪贴板。",
  "toast.backfilled": "已回填到输入框。",
  "toast.noSession": "当前没有可回填的会话。",
  "toast.cleared": "历史已清空。",
  "toast.saved": "已保存。",
  "toast.blocked": "浏览器拦截了新标签页 —— 从这里打开：",
};

/* ================================================================ helpers */

function h(type, props) {
  const children = Array.prototype.slice.call(arguments, 2);
  return React.createElement.apply(React, [type, props].concat(children));
}

function interp(template, vars) {
  if (!vars) return template;
  return String(template).replace(/\{(\w+)\}/g, (match, key) =>
    vars[key] === undefined ? match : String(vars[key]),
  );
}

function dictForLocale(ctx) {
  let id = "";
  try {
    if (ctx && ctx.locale && typeof ctx.locale.getLocale === "function") {
      id = ctx.locale.getLocale().active || "";
    }
  } catch (error) {
    /* fall through to the browser hint */
  }
  if (!id) {
    try {
      id = document.documentElement.lang || navigator.language || "";
    } catch (error) {
      id = "";
    }
  }
  return String(id).toLowerCase().indexOf("zh") === 0 ? DICT_ZH : DICT_EN;
}

/** Bind a translate thunk against the locale service, with a local fallback. */
function makeTranslator(ctx) {
  const locale = ctx && ctx.locale;
  if (locale && typeof locale.register === "function") {
    // Single-locale form: this namespace is not part of the shipped merge table.
    try {
      locale.register(NS, "zh", DICT_ZH);
    } catch (error) {
      /* already registered (hot reload) */
    }
    try {
      locale.register(NS, "en", DICT_EN);
    } catch (error) {
      /* already registered (hot reload) */
    }
  }

  let bound = null;
  if (locale && typeof locale.bind === "function") {
    try {
      bound = locale.bind(NS);
    } catch (error) {
      bound = null;
    }
  }

  return function t(key, vars) {
    if (bound) {
      try {
        const value = bound(key);
        if (value !== undefined && value !== null && value !== key) return interp(value, vars);
      } catch (error) {
        /* fall through to the local table */
      }
    }
    const dict = dictForLocale(ctx);
    return interp(dict[key] || DICT_EN[key] || key, vars);
  };
}

function isMac() {
  try {
    return /mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent || "");
  } catch (error) {
    return false;
  }
}

function pasteGlyph() {
  return isMac() ? "⌘V" : "Ctrl+V";
}

function displayHotkey(spec) {
  return String(spec || "")
    .split("+")
    .map((part) => {
      const token = part.trim().toLowerCase();
      if (token === "mod") return isMac() ? "⌘" : "Ctrl";
      if (token === "shift") return isMac() ? "⇧" : "Shift";
      if (token === "alt") return isMac() ? "⌥" : "Alt";
      if (token === "cmd" || token === "meta") return isMac() ? "⌘" : "Win";
      return token.length === 1 ? token.toUpperCase() : token;
    })
    .join(isMac() ? "" : "+");
}

function matchesHotkey(event, spec) {
  const parts = String(spec || "")
    .toLowerCase()
    .split("+")
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length < 2) return false;

  const key = parts[parts.length - 1];
  const wantMod = parts.indexOf("mod") >= 0;
  const wantShift = parts.indexOf("shift") >= 0;
  const wantAlt = parts.indexOf("alt") >= 0 || parts.indexOf("option") >= 0;
  const wantMeta = parts.indexOf("cmd") >= 0 || parts.indexOf("meta") >= 0;

  // `mod` is the platform's primary modifier, so a chord written on macOS does
  // not silently become Ctrl+… on Windows.
  const modHeld = isMac() ? event.metaKey : event.ctrlKey;
  if (wantMod !== modHeld) return false;
  if (wantShift !== event.shiftKey) return false;
  if (wantAlt !== event.altKey) return false;
  if (wantMeta && !event.metaKey) return false;

  const pressed = String(event.key || "").toLowerCase();
  if (pressed === key) return true;
  // Alt/Option chords report the composed glyph on macOS.
  const code = String(event.code || "").toLowerCase();
  return code === "key" + key;
}

/* ================================================================== state */

function readJSON(key) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

function writeJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
}

function loadConfig() {
  const stored = readJSON(CONFIG_KEY);
  const config = Object.assign({}, DEFAULT_CONFIG, stored || {});
  if (!config.urlTemplate || typeof config.urlTemplate !== "string") {
    config.urlTemplate = DEFAULT_CONFIG.urlTemplate;
  }
  const limit = Number(config.historyLimit);
  config.historyLimit = Number.isFinite(limit) && limit >= 0 ? Math.min(limit, 500) : 50;
  return config;
}

function loadHistory() {
  const stored = readJSON(HISTORY_KEY);
  if (!Array.isArray(stored)) return [];
  return stored
    .filter((row) => row && typeof row.q === "string" && row.q.trim())
    .slice(0, 500)
    .map((row) => ({ q: row.q, at: Number(row.at) || 0 }));
}

/**
 * One tiny observable store. The composer button, the overlay and the settings
 * tab live in different React trees, so they need a channel that is not the
 * React tree — and `useSyncExternalStore` gives tearing-free reads for free.
 */
function createStore(initial) {
  let state = initial;
  const listeners = new Set();
  return {
    get() {
      return state;
    },
    set(patch) {
      state = Object.assign({}, state, patch);
      listeners.forEach((listener) => {
        try {
          listener();
        } catch (error) {
          /* a broken listener must not stop the others */
        }
      });
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

const app = createStore({
  config: loadConfig(),
  history: loadHistory(),
  open: false,
  toast: null,
});

function useAppState() {
  return React.useSyncExternalStore(app.subscribe, app.get, app.get);
}

function useLocaleTick(ctx) {
  const locale = ctx && ctx.locale;
  const subscribe = React.useCallback(
    (onChange) => {
      if (!locale || typeof locale.subscribe !== "function") return () => {};
      return locale.subscribe(onChange);
    },
    [locale],
  );
  const getSnapshot = React.useCallback(() => {
    try {
      return locale && typeof locale.getSnapshot === "function" ? locale.getSnapshot().revision : 0;
    } catch (error) {
      return 0;
    }
  }, [locale]);
  React.useSyncExternalStore(subscribe, getSnapshot, () => 0);
}

function updateConfig(patch) {
  const config = Object.assign({}, app.get().config, patch);
  app.set({ config });
  writeJSON(CONFIG_KEY, config);
  return config;
}

let toastSeq = 0;
function showToast(text, tone, url) {
  const id = ++toastSeq;
  app.set({ toast: { id, text, tone: tone || "info", url: url || null } });
  window.setTimeout(
    () => {
      const current = app.get().toast;
      if (current && current.id === id) app.set({ toast: null });
    },
    tone === "error" ? 7000 : 4500,
  );
}

function pushHistory(question) {
  const config = app.get().config;
  if (!config.rememberHistory || config.historyLimit <= 0) return;
  const next = app
    .get()
    .history.filter((row) => row.q !== question)
    .slice(0, Math.max(0, config.historyLimit - 1));
  next.unshift({ q: question, at: Date.now() });
  app.set({ history: next });
  writeJSON(HISTORY_KEY, next);
}

function removeHistoryAt(index) {
  const next = app.get().history.slice();
  next.splice(index, 1);
  app.set({ history: next });
  writeJSON(HISTORY_KEY, next);
}

/* =========================================================== the outbound */

function buildUrl(template, question) {
  const tpl = String(template || DEFAULT_CONFIG.urlTemplate);
  const encoded = encodeURIComponent(question);
  if (tpl.indexOf("{q}") >= 0) return tpl.replace(/\{q\}/g, encoded);
  // No placeholder at all: still land a working, additive query parameter.
  return tpl + (tpl.indexOf("?") >= 0 ? "&" : "?") + "q=" + encoded;
}

function copyText(text) {
  try {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      // Fire-and-forget: the tab opens either way, and the toast still tells the
      // user to paste manually. A rejected promise here must not surface.
      navigator.clipboard.writeText(text).catch(() => {});
      return true;
    }
  } catch (error) {
    /* fall through to the selection trick */
  }
  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "-1000px";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  } catch (error) {
    return false;
  }
}

/**
 * The single pathway: copy, open, record. Nothing here touches the session.
 * @returns whether the question was dispatched at all.
 */
function offload(question, t) {
  const text = String(question == null ? "" : question);
  if (!text.trim()) return false;

  const config = app.get().config;
  const url = buildUrl(config.urlTemplate, text);
  const copied = config.copyToClipboard ? copyText(text) : false;
  let opened = true;
  try {
    const tab = window.open(url, "_blank", "noopener,noreferrer");
    if (!tab) opened = false;
  } catch (error) {
    opened = false;
  }
  pushHistory(text);

  if (!opened) {
    showToast(t("toast.blocked"), "error", url);
  } else if (copied) {
    showToast(t("toast.copied", { paste: pasteGlyph() }), "success");
  } else {
    showToast(t("toast.copiedOnly"), "info");
  }
  return true;
}

/* =========================================== composer draft access bridge */

/**
 * The palette is root-scoped, but the draft lives per session. Rather than
 * reaching into the input hub by id, the composer button — mounted exactly
 * while a composer exists — publishes its own official action face here. That
 * keeps the palette on a documented surface and makes "is there somewhere to
 * insert into?" a question with a truthful answer.
 */
const composerBridge = {
  writers: new Map(),
  register(sessionId, setDraft) {
    this.writers.set(sessionId, setDraft);
    return () => {
      if (this.writers.get(sessionId) === setDraft) this.writers.delete(sessionId);
    };
  },
  insert(sessionId, text) {
    const write = sessionId === undefined ? undefined : this.writers.get(sessionId);
    if (typeof write !== "function") return false;
    write(text);
    return true;
  },
  has(sessionId) {
    return sessionId !== undefined && this.writers.has(sessionId);
  },
};

function insertIntoComposer(ctx, sessionId, text) {
  if (composerBridge.insert(sessionId, text)) return true;
  // Fallback: the service-face path, valid once the composer has mounted.
  try {
    const input = ctx && ctx.conversation && ctx.conversation.input;
    if (!input || sessionId === undefined) return false;
    const shell = typeof input.shell === "function" ? input.shell(sessionId) : undefined;
    if (!shell || typeof shell.setDraft !== "function") return false;
    const current = (shell.snapshot && shell.snapshot.draft) || "";
    const joined = current.trim() ? current.replace(/\s+$/, "") + "\n\n" + text : text;
    shell.setDraft(joined);
    return true;
  } catch (error) {
    return false;
  }
}

/* ============================================================== components */

function IconExternal(props) {
  const size = props && props.size ? props.size : 16;
  return h(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      focusable: "false",
    },
    h("path", { key: "a", d: "M14 4h6v6" }),
    h("path", { key: "b", d: "M20 4l-8.5 8.5" }),
    h("path", { key: "c", d: "M18 14.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.5" }),
  );
}

function IconCopy(props) {
  const size = props && props.size ? props.size : 14;
  return h(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      focusable: "false",
    },
    h("rect", { key: "a", x: "9", y: "9", width: "11", height: "11", rx: "2" }),
    h("path", { key: "b", d: "M5 15V5a2 2 0 0 1 2-2h10" }),
  );
}

function IconInsert(props) {
  const size = props && props.size ? props.size : 14;
  return h(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      focusable: "false",
    },
    h("path", { key: "a", d: "M12 3v12" }),
    h("path", { key: "b", d: "M8 11l4 4 4-4" }),
    h("path", { key: "c", d: "M4 19h16" }),
  );
}

/* ---- surface 1: the composer button ------------------------------------- */

const selectDraft = (state) => state.draft;
const selectPhase = (state) => state.phase;

function ComposerButton(props) {
  const t = props.t;
  const ctx = props.ctx;
  useLocaleTick(ctx);

  const useInput = props.useInput;
  const inputActions = props.inputActions;
  const sessionId = props.sessionId;
  const draft = useInput(selectDraft);
  const phase = useInput(selectPhase);

  const setDraft = inputActions && inputActions.setDraft;

  React.useEffect(() => {
    if (sessionId === undefined || typeof setDraft !== "function") return undefined;
    return composerBridge.register(sessionId, setDraft);
  }, [sessionId, setDraft]);

  const ready = phase === "plain" && typeof draft === "string" && draft.trim().length > 0;

  return h(
    "button",
    {
      type: "button",
      className: "dsh-webask-btn",
      disabled: !ready,
      title: t("composer.title"),
      "aria-label": t("composer.title"),
      // Keep the caret in the composer: the click must not blur the editor
      // before we read and clear the draft.
      onMouseDown: (event) => event.preventDefault(),
      onClick: () => {
        if (!ready) return;
        // Lift the draft out first, then send, so a failed popup can never
        // leave the user with an emptied composer and nowhere to look.
        if (offload(draft, t) && typeof setDraft === "function") setDraft("");
      },
    },
    h(IconExternal, { size: 16 }),
  );
}

/* ---- surface 2: the global palette + toasts ----------------------------- */

const selectCurrent = (state) => state.current;

function HistoryRow(props) {
  const t = props.t;
  const row = props.row;
  const canInsert = props.canInsert;
  return h(
    "li",
    { className: "dsh-webask-row" },
    h("span", { className: "dsh-webask-row-text", title: row.q }, row.q),
    h(
      "span",
      { className: "dsh-webask-row-actions" },
      h(
        "button",
        {
          type: "button",
          className: "dsh-webask-mini",
          title: t("action.reopen"),
          onClick: () => props.onReopen(row.q),
        },
        t("action.reopen"),
      ),
      h(
        "button",
        {
          type: "button",
          className: "dsh-webask-mini",
          title: t("action.copy"),
          onClick: () => {
            copyText(row.q);
            showToast(t("toast.copiedOnly"), "info");
          },
        },
        h(IconCopy, { size: 14 }),
      ),
      h(
        "button",
        {
          type: "button",
          className: "dsh-webask-mini",
          title: t("action.backfill"),
          disabled: !canInsert,
          onClick: () => props.onInsert(row.q),
        },
        h(IconInsert, { size: 14 }),
      ),
    ),
  );
}

function Palette(props) {
  const t = props.t;
  const ctx = props.ctx;
  useLocaleTick(ctx);

  const state = useAppState();
  const current = props.useSessions(selectCurrent);
  const inputRef = React.useRef(null);
  const [text, setText] = React.useState("");

  const config = state.config;
  const open = state.open;
  const canInsert = composerBridge.has(current);

  // One window-level listener, owned by an effect so a hot reload cannot leak it.
  React.useEffect(() => {
    const onKeyDown = (event) => {
      if (event.repeat || event.isComposing) return;
      if (matchesHotkey(event, config.hotkey)) {
        event.preventDefault();
        event.stopPropagation();
        app.set({ open: !app.get().open });
        return;
      }
      if (event.key === "Escape" && app.get().open) {
        event.preventDefault();
        app.set({ open: false });
      }
    };
    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [config.hotkey]);

  React.useEffect(() => {
    if (!open) return;
    const node = inputRef.current;
    if (node) {
      node.focus();
      node.select();
    }
  }, [open]);

  if (!open) return null;

  const send = () => {
    if (!text.trim()) return;
    if (offload(text, t)) {
      setText("");
      app.set({ open: false });
    }
  };

  const onChangeSite = (event) => {
    updateConfig({ urlTemplate: event.target.value });
  };

  const activeSite = SITES.filter((site) => site.url === config.urlTemplate)[0];

  return h(
    "div",
    {
      className: "dsh-webask-scrim",
      onMouseDown: (event) => {
        if (event.target === event.currentTarget) app.set({ open: false });
      },
    },
    h(
      "div",
      { className: "dsh-webask-panel", role: "dialog", "aria-label": t("app.name") },
      h(
        "div",
        { className: "dsh-webask-head" },
        h("span", { className: "dsh-webask-title" }, t("app.name")),
        h(
          "select",
          {
            className: "dsh-webask-select",
            value: activeSite ? activeSite.id : "__custom__",
            onChange: onChangeSite,
            title: t("palette.target"),
          },
          SITES.map((site) => h("option", { key: site.id, value: site.url }, site.label)),
        ),
        h(
          "button",
          {
            type: "button",
            className: "dsh-webask-mini",
            onClick: () => app.set({ open: false }),
            title: t("palette.close"),
          },
          "Esc",
        ),
      ),
      h("textarea", {
        ref: inputRef,
        className: "dsh-webask-input",
        rows: 3,
        placeholder: t("palette.placeholder"),
        value: text,
        onChange: (event) => setText(event.target.value),
        onKeyDown: (event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            send();
          }
        },
      }),
      h(
        "div",
        { className: "dsh-webask-actions" },
        h(
          "span",
          { className: "dsh-webask-note" },
          t("palette.hint", { paste: pasteGlyph() }),
        ),
        h(
          "button",
          { type: "button", className: "dsh-webask-primary", disabled: !text.trim(), onClick: send },
          t("palette.send"),
        ),
      ),
      h(
        "div",
        { className: "dsh-webask-history" },
        h(
          "div",
          { className: "dsh-webask-history-head" },
          h("span", null, t("palette.history")),
          h("span", { className: "dsh-webask-dim" }, displayHotkey(config.hotkey)),
        ),
        state.history.length === 0
          ? h("div", { className: "dsh-webask-empty" }, t("palette.empty"))
          : h(
              "ul",
              { className: "dsh-webask-list" },
              state.history.map((row, index) =>
                h(HistoryRow, {
                  key: String(index) + ":" + row.at + ":" + row.q.slice(0, 24),
                  row,
                  t,
                  canInsert,
                  onReopen: (question) => {
                    offload(question, t);
                  },
                  onInsert: (question) => {
                    if (insertIntoComposer(ctx, current, question)) {
                      showToast(t("toast.backfilled"), "success");
                      app.set({ open: false });
                    } else {
                      showToast(t("toast.noSession"), "error");
                    }
                  },
                }),
              ),
            ),
      ),
    ),
  );
}

function ToastLayer(props) {
  const t = props.t;
  useLocaleTick(props.ctx);
  const state = useAppState();
  const toast = state.toast;
  if (!toast) return null;

  return h(
    "div",
    { className: "dsh-webask-toasts" },
    h(
      "div",
      { className: "dsh-webask-toast dsh-webask-toast-" + (toast.tone || "info") },
      h("span", null, toast.text),
      toast.url
        ? h(
            "a",
            { className: "dsh-webask-link", href: toast.url, target: "_blank", rel: "noopener noreferrer" },
            t("palette.send"),
          )
        : null,
    ),
  );
}

/** One overlay entry renders both layers, so the slot is injected exactly once. */
function OverlayRoot(props) {
  return h(React.Fragment, null, h(ToastLayer, props), h(Palette, props));
}

/* ---- surface 3: the settings tab ---------------------------------------- */

function SettingsTab(props) {
  const t = props.t;
  const ctx = props.ctx;
  useLocaleTick(ctx);
  const state = useAppState();
  const config = state.config;

  const [template, setTemplate] = React.useState(config.urlTemplate);
  const [hotkey, setHotkey] = React.useState(config.hotkey);
  const [limit, setLimit] = React.useState(String(config.historyLimit));

  React.useEffect(() => {
    setTemplate(config.urlTemplate);
    setHotkey(config.hotkey);
    setLimit(String(config.historyLimit));
  }, [config.urlTemplate, config.hotkey, config.historyLimit]);

  const activeSite = SITES.filter((site) => site.url === config.urlTemplate)[0];

  const save = () => {
    const parsed = parseInt(limit, 10);
    updateConfig({
      urlTemplate: template.trim() || DEFAULT_CONFIG.urlTemplate,
      hotkey: hotkey.trim() || DEFAULT_CONFIG.hotkey,
      historyLimit: Number.isFinite(parsed) && parsed >= 0 ? Math.min(parsed, 500) : 50,
    });
    showToast(t("toast.saved"), "success");
  };

  const reset = () => {
    updateConfig(Object.assign({}, DEFAULT_CONFIG));
    setTemplate(DEFAULT_CONFIG.urlTemplate);
    setHotkey(DEFAULT_CONFIG.hotkey);
    setLimit(String(DEFAULT_CONFIG.historyLimit));
  };

  return h(
    "div",
    { className: "dsh-webask-settings" },
    h("h3", { className: "dsh-webask-settings-title" }, t("settings.title")),
    h("p", { className: "dsh-webask-dim" }, t("settings.intro")),

    h(
      "label",
      { className: "dsh-webask-field" },
      h("span", null, t("settings.site")),
      h(
        "select",
        {
          className: "dsh-webask-select dsh-webask-grow",
          value: activeSite ? activeSite.id : "__custom__",
          onChange: (event) => {
            const value = event.target.value;
            if (value !== "__custom__") setTemplate(value);
          },
        },
        activeSite ? null : h("option", { value: "__custom__" }, t("settings.custom")),
        SITES.map((site) => h("option", { key: site.id, value: site.url }, site.label)),
      ),
    ),

    h(
      "label",
      { className: "dsh-webask-field" },
      h("span", null, t("settings.template")),
      h("input", {
        className: "dsh-webask-text dsh-webask-grow",
        type: "text",
        value: template,
        spellCheck: false,
        onChange: (event) => setTemplate(event.target.value),
      }),
    ),
    h("p", { className: "dsh-webask-dim dsh-webask-hint" }, t("settings.templateHint")),

    h(
      "label",
      { className: "dsh-webask-field" },
      h("span", null, t("settings.hotkey")),
      h("input", {
        className: "dsh-webask-text dsh-webask-grow",
        type: "text",
        value: hotkey,
        spellCheck: false,
        placeholder: DEFAULT_CONFIG.hotkey,
        onChange: (event) => setHotkey(event.target.value),
      }),
    ),
    h("p", { className: "dsh-webask-dim dsh-webask-hint" }, t("settings.hotkeyHint")),

    h(
      "label",
      { className: "dsh-webask-field" },
      h("span", null, t("settings.limit")),
      h("input", {
        className: "dsh-webask-text dsh-webask-narrow",
        type: "number",
        min: "0",
        max: "500",
        value: limit,
        onChange: (event) => setLimit(event.target.value),
      }),
    ),

    h(
      "label",
      { className: "dsh-webask-check" },
      h("input", {
        type: "checkbox",
        checked: !!config.copyToClipboard,
        onChange: (event) => updateConfig({ copyToClipboard: event.target.checked }),
      }),
      h("span", null, t("settings.copy")),
    ),
    h(
      "label",
      { className: "dsh-webask-check" },
      h("input", {
        type: "checkbox",
        checked: !!config.rememberHistory,
        onChange: (event) => updateConfig({ rememberHistory: event.target.checked }),
      }),
      h("span", null, t("settings.remember")),
    ),

    h(
      "div",
      { className: "dsh-webask-actions" },
      h("button", { type: "button", className: "dsh-webask-primary", onClick: save }, t("settings.save")),
      h("button", { type: "button", className: "dsh-webask-mini", onClick: reset }, t("settings.reset")),
      h(
        "button",
        {
          type: "button",
          className: "dsh-webask-mini",
          onClick: () => {
            app.set({ history: [] });
            writeJSON(HISTORY_KEY, []);
            showToast(t("toast.cleared"), "info");
          },
        },
        t("settings.clearHistory"),
      ),
    ),
    h("p", { className: "dsh-webask-dim dsh-webask-hint" }, t("settings.about")),
  );
}

/* ==================================================================== init */

function ensureStyles() {
  try {
    if (document.querySelector("style[" + STYLE_FLAG + "]")) return;
    const style = document.createElement("style");
    style.setAttribute(STYLE_FLAG, "");
    style.textContent = WEBASK_CSS;
    document.head.appendChild(style);
  } catch (error) {
    /* styling is cosmetic — never let it stop the plugin from applying */
  }
}

const registrations = [
  {
    slot: "conversation.input.right",
    id: "dsh-webask",
    order: 60,
    component: ComposerButton,
  },
  {
    slot: "shell.overlay",
    id: "dsh-webask-overlay",
    order: 200,
    component: OverlayRoot,
  },
  {
    slot: "settings.plugins.tab",
    id: "dsh-webask",
    order: 60,
    component: SettingsTab,
  },
];

exports.name = "dsh-webask";

exports.inject = ["slots", "locale"];

exports.apply = function apply(ctx) {
  ensureStyles();
  const t = makeTranslator(ctx);

  registrations.forEach((entry) => {
    const Component = entry.component;
    ctx.slots.inject(entry.slot, () =>
      ctx.slots.register({ name: entry.slot, id: entry.id, order: entry.order, label: "WebAsk" }, (props) =>
        h(Component, Object.assign({}, props, { t, ctx })),
      ),
    );
  });
};

    return module.exports;
  }
});
