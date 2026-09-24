#!/usr/bin/env node
/**
 * Bundle the browser half.
 *
 * The client contract is a CJS closure-factory: the host serves
 * `lib/client.js` at `/plugins/<id>/client.js` and the browser hands the
 * factory a `require`. TypeScript, JSX and a CSS pipeline are all avoidable —
 * `react` is resolvable inside the factory, styles are inlined as a string,
 * and the wrapper is a five-line template. So this is the whole toolchain: no
 * bundler, no config file, no dependencies.
 *
 *   src/client.js + src/style.css  ->  lib/client.js
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));

const manifest = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
const code = await readFile(join(root, 'src/client.js'), 'utf8');
const css = await readFile(join(root, 'src/style.css'), 'utf8');

// The factory body keeps `var module` / `var exports` because the loader's
// `require` shim and the host's module metadata both expect that shape.
const bundle = `window.__ModuleLoader__.load({
  id: ${JSON.stringify(manifest.name)},
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    var WEBASK_CSS = ${JSON.stringify(css)};
${code}
    return module.exports;
  }
});
`;

await mkdir(join(root, 'lib'), { recursive: true });
await writeFile(join(root, 'lib/client.js'), bundle);

console.log(`dsh-webask: lib/client.js written (${Buffer.byteLength(bundle)} bytes)`);
