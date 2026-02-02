# 拦截危险操作的hook

```ts

# 读取工具调用信息
TOOL_NAME=$(jq -r '.toolName' <<< "$CLAUDE_HOOK_INPUT")

# 危险操作列表
DANGEROUS_TOOLS=("rm" "delete" "shutdown")

if [[ " ${DANGEROUS_TOOLS[@]} " =~ " ${TOOL_NAME} " ]]; then
    echo "⚠️ 警告:即将执行危险操作 - $TOOL_NAME"
    echo "请确认是否继续? (yes/no)"
    read -r confirmation
    if [[ "$confirmation" != "yes" ]]; then
        exit 1  # 阻止操作
    fi
fi
```