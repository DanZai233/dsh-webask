# WebAsk

> **把「一句话就能问完」的问题甩给 DeepSeek 网页版 —— 不占上下文，不花 token。**
> 输入框按钮 · 全局快捷键浮层 · 本地历史

DeepSeek Harness 每一轮都会重发整段对话。所以一个 20 token 的小问题 —— 那种你**早就知道很短**的问题 —— 真实成本并不是 20 token，而是它所搭乘的整个上下文窗口。

WebAsk 把这类问题送去免费的网页版，并且**从一开始就不让它进入对话**。

---

## 你得到什么

### 输入框旁的按钮

你已经在 DSH 输入框里打好了问题。与其发送它，不如点一下 WebAsk 按钮：这段文字会被**从草稿里抽走**（通过官方 input actions 清空，因此它绝不会到达模型），同时复制到剪贴板，并在新标签页中打开。

按钮只在「确实有草稿可抽」且输入框处于普通可发送状态时才可用，所以它不可能在提交流程中途误触发。

### 全局快捷键浮层

任意位置按 `mod+shift+k` 呼出居中输入框。打字，回车，完事。`Shift+Enter` 换行，`Esc` 关闭。

浮层下方是你的本地历史。每一条都可以：

- **重新打开**（回到网页版继续问）
- **再次复制**
- **回填到输入框** —— 闭环所在：当某个问题的答案值得在真正的会话里追问时

### 设置页

设置 → 插件 → WebAsk：目标站点、URL 模板、全局快捷键、是否复制到剪贴板、是否记录历史、历史上限。

---

## 关于 `?q=` 的一句实话

`https://chat.deepseek.com/?q=…` 是**社区约定，不是官网功能**。chat.deepseek.com 自己并不读这个参数 —— 社区专门写了油猴脚本去「补」这个能力。假装它原生支持，只会让这个插件对没有装脚本的人静默失效。

所以 WebAsk 每次都同时做两件事：

1. **总是**把问题复制到剪贴板；
2. 打开模板 URL。

如果你装了那类脚本，全流程自动完成；没装的话，在刚打开的标签页里按一次 <kbd>⌘V</kbd> 即可。无论哪种情况，这个问题都花 **0 token** —— 而这正是它的全部意义。

---

## 安装

```bash
dsh plugin --profile web add dsh-webask
```

然后重启该 profile。安装插件会改变包图，而包清单与客户端模块元数据在进程生命周期内是有缓存的 —— 重启才会重新读取。

想先确认一下再重启也行：

```bash
dsh --profile web --dump-config | grep -A2 webask
```

---

## 支持的站点

以下预设都遵循同一套 `?q=` 约定：

| 站点 | 模板 |
| --- | --- |
| DeepSeek | `https://chat.deepseek.com/?q={q}` |
| Kimi | `https://www.kimi.com/?q={q}` |
| Qwen | `https://chat.qwen.ai/?q={q}` |
| 豆包 | `https://www.doubao.com/?q={q}` |
| 腾讯元宝 | `https://yuanbao.tencent.com/?q={q}` |
| 智谱 GLM | `https://chatglm.cn/?q={q}` |
| Gemini | `https://gemini.google.com/?q={q}` |

模板可编辑，所以 WebAsk 从没听说过的站点也能用。用 `{q}` 表示问题的位置；如果一个 `{q}` 都没有，问题会作为 `q=` 查询参数追加到末尾，并保留 URL 上原有的其他参数。

---

## 隐私

除了你主动向网页版提的那个问题之外，没有任何东西离开你的机器；标签页也是你自己打开的。历史与设置只存在于本浏览器的 `localStorage`，不会上传。WebAsk 不向模型发送任何内容，它的 host 半只是一个空的挂载行 —— 没有 service、没有 tool、没有路由。

---

## 实现说明

WebAsk 是一个纯展示层的客户端插件。它占用三个有文档的槽位，并且只通过公开的 action face 访问输入框 —— **从不靠改 DOM 去读写你的草稿**。

| 槽位 | 界面 | 用到的接口 |
| --- | --- | --- |
| `conversation.input.right` | 输入框按钮 | `useInput` 读草稿与 phase，`inputActions.setDraft` 抽走草稿 |
| `shell.overlay` | 浮层 + Toast | `useSessions(s => s.current)` 取当前会话，配合按钮发布的桥接做回填 |
| `settings.plugins.tab` | 配置页 | `useResource` / `useWorkspaces` 标准套件 |

给读源码的人的几点：

- **没有构建链。** `build.mjs` 约 40 行、零依赖：把样式内联成字符串，再把 `src/client.js` 包进浏览器模块加载器要求的 CJS closure-factory。没有打包器、没有 TypeScript、没有 CSS 管线。
- 客户端工厂里 `require("react")` 是可解析的，所以 UI 直接用 `React.createElement` 写，不需要 JSX 转换。
- 文案通过 `ctx.locale` 注册，并内置中英回退表；即使 locale 服务不可用，界面也不会退化成 key。
- 浮层是 root scope，而草稿是按会话存的。与其按 id 去戳 input hub，不如让输入框按钮把它自己的官方 action face 发布到一个极小的共享 store —— 这样「有没有地方可以回填」就有了诚实的答案，没有时回填按钮直接禁用。

---

## 开发

```bash
npm run build     # src/ -> lib/client.js
npm run verify    # 37 项离线检查：槽位接线、点击路径、持久化
```

`verify` 会把构建产物放进 VM、配上假浏览器与极简 React stub 跑起来，并驱动真实的点击路径。槽位名写错或属性读错，会在这里就失败，而不是在界面上变成一个「点了没反应」的按钮。

---

## 许可

MIT © DanZai233
