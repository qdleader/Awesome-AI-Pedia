# supabase-postgres-best-practices

`supabase-postgres-best-practices` 是由 Supabase 官方推出的 AI Agent Skill，专门用于优化 PostgreSQL 数据库代码的生成。它能够指导 AI 遵循数据库设计的最佳实践，避免常见的性能陷阱和安全隐患。

---

## 🚀 快速开始

### 安装方式
在你的项目终端中运行：
```bash
npx skills add supabase/agent-skills --skill supabase-postgres-best-practices
```
*注：该 Skill 兼容 Claude Code、Cursor、GitHub Copilot 等主流 AI 编程工具。*

---

## 核心优化点

该 Skill 涵盖了八大优先级的优化建议：

1.  **查询性能 (Query Performance)** [关键]：优化 SQL 查询语句，避免全表扫描。
2.  **连接管理 (Connection Management)** [关键]：合理处理数据库连接，避免连接池溢出。
3.  **模式设计 (Schema Design)** [高]：规范表结构和数据类型设计。
4.  **并发与锁 (Concurrency & Locking)** [中高]：处理事务隔离和锁机制，防止死锁。
5.  **安全与 RLS (Security & RLS)** [中高]：正确配置行级安全性 (Row Level Security)。
6.  **数据访问模式 (Data Access Patterns)** [中]：优化数据读取和写入路径。
7.  **监控与诊断 (Monitoring & Diagnostics)** [低中]：提供性能分析和故障排查建议。
8.  **高级功能 (Advanced Features)** [低]：利用 Postgres 的高级特性（如向量搜索等）。

---

## 使用场景

- **SQL 编写与优化**：让 AI 写出更高效的查询语句和复杂的 Join 操作。
- **数据库架构设计**：规划表关系、外键约束、索引策略等。
- **性能调优**：分析现有慢查询并给出优化方案。
- **安全审计**：检查 SQL 注入风险和 RLS 策略是否完善。

---

**官方仓库**：[supabase/agent-skills](https://github.com/supabase/agent-skills)