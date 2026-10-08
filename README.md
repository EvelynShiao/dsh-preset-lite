# dsh-preset-lite

自定义 DSH 预设：**极小提示词 + 全套工具入口 + 上下文压缩** —— 只砍提示词，不砍工具。

| | 官方极简 minimal | **lite** |
|---|---|---|
| 提示词 | 英文（软件工程师）| 中文大肥鱼 persona（五段式），**除它之外不注入任何提示词段落** |
| 工具入口 | 只有终端 | **与 standard 同一套**：read/write/glob/grep、bash/pwsh、后台任务、goal、subagent/workflow、todo、web、present |
| 不注入的东西 | — | 无 agent-instructions（AGENTS.md 任务注入）、无技能目录、无运行时上下文快照、无 plan-mode 段 |
| 上下文压缩 | ❌ 明确不加载 | ✅ compaction（`auto: false`，阈值三件套）+ tool-result-pruner |
| 知识库/会话检索 | 全局可用 | 全局可用（profile 级，任何预设都在） |

工具「入口全留、提示词不提」：persona 里不宣传这些工具，需要时用户直接开口即可。

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
