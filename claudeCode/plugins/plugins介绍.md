
### 3.3 Plugins(插件)

#### 什么是 Plugins?

Plugins 是打包在一起的扩展集合,可以包含:
- 5 个 Skills
- 10 个斜杠命令
- 3 个 MCP 服务器配置
- 2 个 SubAgent 定义
- 若干 Hooks

**Plugins vs Skills:**

| 特性 | Skills | Plugins |
|-----|--------|---------|
| 范围 | 单一功能 | 功能集合 |
| 复杂度 | 简单 | 复杂 |
| 依赖 | 无 | 可能有 |

#### Plugin 安装与使用

**从市场安装:**

```bash
claude plugin install <plugin-name>
```

**从本地安装:**

```bash
# 安装本地插件
claude plugin install ./my-plugin

# 或使用完整路径
claude plugin install /path/to/my-plugin
```

**从GitHub安装:**

```bash
# 直接从GitHub仓库安装
claude plugin install github:user/repo
```

**查看已安装 Plugins:**

```bash
claude /plugin
```

**卸载 Plugin:**

```bash
claude plugin uninstall <plugin-name>
```