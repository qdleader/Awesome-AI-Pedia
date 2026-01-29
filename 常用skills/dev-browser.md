# dev-browser

https://github.com/SawyerHood/dev-browser

## 安装

```ts
/plugin marketplace add sawyerhood/dev-browser
/plugin install dev-browser@sawyerhood/dev-browser
```


## 权限

To skip permission prompts, add to ~/.claude/settings.json:

```ts
{
  "permissions": {
    "allow": ["Skill(dev-browser:dev-browser)", "Bash(npx tsx:*)"]
  }
}
```
Or run with claude --dangerously-skip-permissions (skips all prompts).  