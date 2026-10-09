# dsh-preset-lite

自定义 DSH 预设：**极小提示词 + 全套工具入口 + 上下文压缩** —— 只砍提示词，不砍工具。

一个默认版本 + 任意多个自建版本，工具入口完全相同，只有 persona 不同：

| 预设 id | 名字 | 提示词 | 用途 |
|---|---|---|---|
| `lite` | 大肥鱼（默认版本）| 大肥鱼 v3：自我介绍行 + 身份/基调/怎么说话/态度/技术模式/绝对不要 | 闲聊（默认）|
| `lite-plain` | 普通节约 | 一段短中文工作提示 | 干活（节约 token）|
| `lite-v2`、`lite-v3`… | 用户自建 | 在设置页「提示词版本」里新建 | 按需（可绑到工作区）|

| | 官方极简 minimal | **lite 系列** |
|---|---|---|
| 工具入口 | 只有终端 | **与 standard 同一套**：read/write/glob/grep、bash/pwsh、后台任务、goal、subagent/workflow、todo、web、present |
| 不注入的东西 | — | 无 agent-instructions（AGENTS.md 任务注入）、无技能目录、无运行时上下文快照、无 plan-mode 段 |
| 上下文压缩 | ❌ 明确不加载 | ✅ compaction（`auto: false`，阈值三件套）+ tool-result-pruner |
| 知识库/会话检索 | 全局可用 | 全局可用（profile 级，任何预设都在） |

工具「入口全留、提示词不提」：persona 里不宣传这些工具，需要时用户直接开口即可。

## 文件结构（两块标记，不要删）

`cordis.patch.yml` 分两层：

1. **默认版本** `preset-lite` —— 手改友好，persona 被一对注释夹住：
   ```
   # >>> workshop:dafeyu >>>   …persona 正文…   # <<< workshop:dafeyu <<<
   ```
2. **自建版本生成区** —— dsh-session-kit 写的，一个版本一条预设声明：
   ```
       # >>> workshop:extra >>>
       （由插件按「版本列表」生成，别手改，改了下一次保存会被覆盖）
       # <<< workshop:extra <<<
   ```

* 生成区的工具行是从默认版本（`preset-lite`）的插件列表里**现取**的，所以改默认版本的工具，自建版本自动跟随一致。
* 删掉任何标记 = 插件会报 `preset-marker-missing` / `preset-extra-marker-missing` 并拒绝写入（不会破坏文件）。
* 自建版本的正文真相存在 dsh-session-kit 的 `dsh_session_kit_prompt_workshop` 域里，文件只是投影；插件启动时会按库里的版本列表重建生成区。

## 为什么以插件形式声明预设

官方预设（standard/ptc/minimal/cordis）都是通过**插件包自带的 `cordis.patch.yml` 用 `- insert:`** 声明的，
profile 的 `cordis.patch.yml` 是平铺条目列表，**不适合新增预设声明**（会造成 Duplicate 或不被识别）。

## 安装

```
dsh plugin add <本仓库地址>
```

装完把 `dsh-preset-lite` 写进 profile `package.json` 的 `dsh.profile.bundles`，**重启 DSH**，Agent 设置里会出现第五个模式「lite」。

> 注意：同步（dsh-sync）会整体覆盖 profile 的 `package.json`，bundles 里的 `dsh-preset-lite` 可能被冲掉 —— 冲掉后 lite 预设会从列表消失，重新加回即可。

## 注意

- 需要「设置 → 通用 → 代码工作工具」打开，否则预设选择器不显示
- 手机端同样装这个插件 + 打开同一个开关
