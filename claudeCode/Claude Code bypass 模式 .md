# Claude Code bypass 模式   

claude code 默认模式下操作 所有操作的 shell 命令，都需要你确认，并将你同意后的命令列表存在放当前项目下的 .claude 目录下的 json 文件中，打开该文件可以看到命令列表，也可以手工编辑。也可以通过 --allowedTools 和 --disallowedTools 来指定允许或拒绝执行特定工具，命令详细使用请通过 claude --help 参数获取。

默认模式这种交互过程太繁琐了，如果对当前项目非常熟悉，可以使用 bypass 模式，一次性执行整个过程，减少确认，提高开发效率。

当然前提是你的项目已经使用了 git 管理项目，并且本次修改之前已经确认了代码提交状态，否则容易翻车。

进入 bypass 模式，只需要输入：
```ts
$ claude --dangerously-skip-permissions
// # 或者
$ claude --permission-mode bypassPermissions
```
这个模式 claude 操作所有命令，都不用确认，包括删除文件（比如他自己生成的测试文件）。

```ts
--permission-mode <mode>           Permission mode to use for the session (choices: "acceptEdits", "bypassPermissions", "default", "dontAsk", "plan")
                                 Continue the most recent conversation
```


进入 bypass 模式后，claude code 会让你二次确认，此时，需要你输入任意字符，claude code 才会进入 bypass 模式。