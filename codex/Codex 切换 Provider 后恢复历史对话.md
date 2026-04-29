# Codex 切换 Provider 后恢复历史对话

一句话摘要：同一电脑Codex切换账号后 ，如果历史对话看不到了，可以用 codex-provider-sync 恢复。


解决方案
先退出 Codex，然后执行：

```js
npm install -g github:Dailin521/codex-provider-sync
codex-provider status
codex-provider sync
```

执行顺序就是：
```js
切到公司 Provider
退出 Codex
安装 codex-provider-sync
执行 codex-provider status
执行 codex-provider sync
重新打开 Codex
```
我这边按这个流程处理后，历史对话恢复了。
这个工具处理什么
根据项目 README，它会处理这些 Codex 本地数据：

```js
~/.codex/sessions
~/.codex/archived_sessions
state_5.sqlite
```
适用边界
这个方案适合“切换 Provider 后历史对话不可见”这种场景。
如果本地会话文件本来就没了，或者是别的配置损坏，它不一定能恢复。

