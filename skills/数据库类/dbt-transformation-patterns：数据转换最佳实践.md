# dbt-transformation-patterns：数据转换最佳实践

来源：wshobson/agents
核心定位：dbt 工程化实践指南与工具
解决痛点：传统数据转换脚本难维护、质量无保障、协作冲突频繁
核心能力：

推荐 models 分层架构（staging→intermediate→marts）
生成增量更新配置（支持 unique_key、schema 变更自适应）
自动生成字段级测试（非空、唯一、数值校验）与结构化文档

适用人群：数据分析师、数据工程师、BI 团队

