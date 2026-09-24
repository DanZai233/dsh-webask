# WebAsk

> **Send one-liner questions to DeepSeek's web chat instead of burning your DSH context.**
> Composer button · global hotkey palette · history.

DeepSeek Harness resends the whole conversation on every turn. So a twenty-token
question — the kind you *already know* will be short — does not cost twenty
tokens. It costs the entire context window it rides on.

WebAsk hands exactly those questions to the free web chat and never lets them
enter the conversation at all.

---

## What you get

### A button beside the composer

You have already typed the question into DSH. Instead of sending it, click the
WebAsk button. The text is **lifted out of the draft** — cleared through the
official input actions, so it never reaches the model — copied to your
clipboard, and opened in a new tab.

The button is disabled unless there is a real draft to lift and the composer is
in a plain, sendable phase, so it can never fire mid-submission.

### A palette on a global hotkey

`mod+shift+k` anywhere opens a centred input. Type, press `Enter`, done.
`Shift+Enter` for a newline, `Esc` to close.

Underneath sits a local history. Every question can be:

- **re-opened** in the web chat,
- **copied** again,
- or **inserted back into the composer** — the closing loop, for when the
  answer turns out to deserve follow-up in a real session.

### A settings tab

Settings → Plugins → WebAsk: target site, URL template, global hotkey, whether
to copy to the clipboard, history on/off, and the history limit.

---

## An honest note about `?q=`

`https://chat.deepseek.com/?q=…` is a **community convention, not a feature of
the site.** chat.deepseek.com does not read that parameter by itself — userscripts
exist specifically to add the behaviour. Pretending otherwise would make this
plugin quietly broken for everyone who does not have one installed.

So WebAsk does both things at once, every time:

1. it **always copies the question to your clipboard**, and
2. it opens the templated URL.

If you do run such a userscript, the flow is fully automatic. If you do not, you
press <kbd>⌘V</kbd> once in the tab that just opened. Either way the question
costs **zero tokens** — which is the entire point.

---

## Install

```bash
dsh plugin --profile web add dsh-webask
```

Then restart that profile. Plugin installs change the package graph, and the
package manifest and client-module metadata are cached for the life of the
process — a restart is what picks them up.

Verify before you restart, if you like:

```bash
dsh --profile web --dump-config | grep -A2 webask
```

---

## Supported sites

Every preset below speaks the same `?q=` convention:

| Site | Template |
| --- | --- |
| DeepSeek | `https://chat.deepseek.com/?q={q}` |
| Kimi | `https://www.kimi.com/?q={q}` |
| Qwen | `https://chat.qwen.ai/?q={q}` |
| 豆包 | `https://www.doubao.com/?q={q}` |
| 腾讯元宝 | `https://yuanbao.tencent.com/?q={q}` |
| 智谱 GLM | `https://chatglm.cn/?q={q}` |
| Gemini | `https://gemini.google.com/?q={q}` |

Because the template is editable, a site WebAsk has never heard of works too.
Use `{q}` where the question goes. With no `{q}` at all, the question is appended
as a `q=` query parameter, preserving whatever else the URL already carries.

---

## Privacy

Nothing leaves your machine except the question you chose to ask a web chat, in
the tab you opened. History and settings live in this browser's `localStorage`
and are never uploaded. WebAsk sends nothing to the model, and its host half is
an empty mount row — no service, no tool, no route.

---

## How it works

WebAsk is a presentation-only client plugin. It occupies three documented slots
and reaches the composer only through published action faces — it never touches
the DOM to read or clear your draft.

| Slot | Surface | Access used |
| --- | --- | --- |
| `conversation.input.right` | the composer button | `useInput` (read draft, phase) + `inputActions.setDraft` (lift the draft out) |
| `shell.overlay` | palette + toasts | `useSessions(s => s.current)` for the active session, plus a bridge published by the composer button for insert-back |
| `settings.plugins.tab` | config page | `useResource` / `useWorkspaces` standard kit |

Notes for anyone reading the source:

- **No build chain.** `build.mjs` is ~40 lines with zero dependencies: it inlines
  the stylesheet as a string and wraps `src/client.js` in the CJS closure-factory
  the browser module loader expects. No bundler, no TypeScript, no CSS pipeline.
- `require("react")` is resolvable inside the client factory, so the UI is
  written with `React.createElement` and needs no JSX transform.
- Strings are registered with `ctx.locale` with a built-in bilingual fallback, so
  the UI still reads correctly if the locale service is unavailable.
- The overlay is root-scoped while the draft is per-session. Rather than reaching
  into the input hub by id, the composer button publishes its own official action
  face into a tiny shared store; "is there somewhere to insert into?" then has a
  truthful answer, and the insert-back action is disabled when there is not.

---

## Development

```bash
npm run build     # src/ -> lib/client.js
npm run verify    # 37 offline checks: slot wiring, click paths, persistence
```

`verify` runs the built bundle in a VM against a fake browser and a minimal React
stub, then drives the real click paths. It catches a mistyped slot name or a
mis-read prop here, rather than as a button that silently does nothing.

---

## License

MIT © DanZai233
