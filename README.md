# dsh-preset-lite

自定义 DSH 预设：**极小提示词 + 文件工具 + 上下文压缩**。

| | 官方极简 | **lite** |
|---|---|---|
| 提示词 | 英文（软件工程师）| 中文，含大肥鱼语气规则，**184 字 ≈ 61 token** |
| 文件工具 | ❌ 只有终端 | ✅ read/write/glob/grep |
| 上下文压缩 | ❌ 明确不加载 | ✅ compaction + tool-result-pruner |
| 知识库/会话检索 | 全局可用 | 全局可用 |

## 为什么以插件形式声明预设

官方预设（standard/ptc/minimal）都是通过**插件包自带的 `cordis.patch.yml` 用 `- insert:`** 声明的，
profile 的 `cordis.patch.yml` 是平铺条目列表，**不适合新增预设声明**（会造成 Duplicate 或不被识别）。

## 安装

```
dsh plugin add <本仓库地址>
```

装完**重启 DSH**，Agent 设置里会出现第五个模式「lite」。

## 注意

- 需要「设置 → 通用 → 代码工作工具」打开，否则预设选择器不显示
- 手机端同样装这个插件 + 打开同一个开关
