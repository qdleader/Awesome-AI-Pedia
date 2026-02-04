import{_ as s,o as a,c as i,ag as e}from"./chunks/framework.D7ooTGWA.js";const S=JSON.parse('{"title":"skills 介绍","description":"","frontmatter":{},"headers":[],"relativePath":"skills/什么是skills.md","filePath":"skills/什么是skills.md","lastUpdated":1770184231000}'),k={name:"skills/什么是skills.md"};function t(r,l,n,o,d,h){return a(),i("div",null,[...l[0]||(l[0]=[e(`<h1 id="skills-介绍" tabindex="-1">skills 介绍 <a class="header-anchor" href="#skills-介绍" aria-label="Permalink to &quot;skills 介绍&quot;">​</a></h1><h2 id="什么是-agent-skills" tabindex="-1">什么是 Agent Skills？ <a class="header-anchor" href="#什么是-agent-skills" aria-label="Permalink to &quot;什么是 Agent Skills？&quot;">​</a></h2><pre><code>Agent Skills 将专业知识打包成可发现的功能。每个 Skill 包含一个 SKILL.md 文件，其中包含 Claude 在相关时读取的说明，以及可选的支持文件，如脚本和模板。
Skills 是一个用于构建和运行机器学习模型的工具。它可以帮助你轻松地创建、训练和部署机器学习模型，而无需深入了解复杂的机器学习算法和编程语言。

使用 Skills 可以提升执行特定任务的能力。
有了 Skills，Claude 在处理特定任务时会更给力，比如，可以在本地就能调用 Skills 玩转图片、Excel、Word、PDF 等处理操作。
Skills 其实就是一个文件夹，里面包含了 Claude 在需要时可以加载的指令、脚本和资源等，只有当 Claude 认为某个 Skill 和当前任务相关时，它才会启用，即按需加载。
</code></pre><p>简而言之： Skills 是预封装的工作流,就像游戏中的&quot;技能包&quot;,用完即走,不占用上下文。它是别人已经编写好的、可直接使用的功能模块。</p><h2 id="skills-如何被调用" tabindex="-1">Skills 如何被调用： <a class="header-anchor" href="#skills-如何被调用" aria-label="Permalink to &quot;Skills 如何被调用：&quot;">​</a></h2><pre><code>Skills 是模型调用的——Claude 根据您的请求和 Skill 的描述自主决定何时使用它们。
</code></pre><h2 id="优势" tabindex="-1">优势： <a class="header-anchor" href="#优势" aria-label="Permalink to &quot;优势：&quot;">​</a></h2><pre><code>为您的特定工作流扩展 Claude 的功能
通过 git 在您的团队中共享专业知识
减少重复提示
为复杂任务组合多个 Skills
</code></pre><h2 id="skills-的特点" tabindex="-1">Skills 的特点： <a class="header-anchor" href="#skills-的特点" aria-label="Permalink to &quot;Skills 的特点：&quot;">​</a></h2><p>可组合性强：各种 Skills 可以像堆积木一样组合起来，Claude 会自动判断需要哪些 Skills，并协调它们的使用。提供了为特定工作流程拓展 Claude 的能力；</p><p>可移植性强：Skills 在任何地方都使用相同的格式。一次构建，即可在所有 Claude 应用、Claude Code 和 API 中使用。并且，通过 Git 版本控制就能在团队里进行共享；</p><p>效率高：需要啥就加载啥，绝不浪费，也能减少大量重复的提示词；</p><p>功能强大：对于那些传统编程比 token 生成更靠谱的任务，Skills 甚至可以包含可执行代码。</p><p>说白了，就是个 &quot;技能包&quot;，你可以把 Skills 想象成可定制化的 AI 工具包，它能帮你把专业知识打包起来，让 Claude 能够灵活运用。</p><h2 id="skills-的分类" tabindex="-1">Skills 的分类： <a class="header-anchor" href="#skills-的分类" aria-label="Permalink to &quot;Skills 的分类：&quot;">​</a></h2><p>Personal Skills：个人技能，你的所有项目都可以用上的 Skills 哦，位于 ~/.claude/skills/ 目录下；</p><p>Project Skills：项目技能，项目技能仅对项目生效，方便团队共享，位于每个项目中的 .claude/skills/ 目录下；</p><p>Plugin Skills：插件技能，插件也能捆绑一些 Skills，安装后就能直接用，用法和个人以及项目 Skills 是一样的</p><h1 id="创建-skill" tabindex="-1">创建 Skill <a class="header-anchor" href="#创建-skill" aria-label="Permalink to &quot;创建 Skill&quot;">​</a></h1><p>Skills 存储为包含 SKILL.md 文件的目录。 ​</p><h2 id="个人-skills" tabindex="-1">个人 Skills <a class="header-anchor" href="#个人-skills" aria-label="Permalink to &quot;个人 Skills&quot;">​</a></h2><pre><code>个人 Skills 在您的所有项目中都可用。将它们存储在 ~/.claude/skills/ 中：
mkdir -p ~/.claude/skills/my-skill-name
使用个人 Skills 的场景：
您的个人工作流和偏好
您正在开发的实验性 Skills
个人生产力工具
​
</code></pre><h2 id="项目-skills" tabindex="-1">项目 Skills <a class="header-anchor" href="#项目-skills" aria-label="Permalink to &quot;项目 Skills&quot;">​</a></h2><pre><code>项目 Skills 与您的团队共享。将它们存储在项目中的 .claude/skills/ 中：
mkdir -p .claude/skills/my-skill-name
使用项目 Skills 的场景：
团队工作流和约定
项目特定的专业知识
共享的实用程序和脚本
项目 Skills 被检入 git 并自动对团队成员可用。
</code></pre><p><strong>官方 Skills 库:</strong> <a href="https://github.com/anthropics/skills" target="_blank" rel="noreferrer">https://github.com/anthropics/skills</a> ​</p>`,25)])])}const p=s(k,[["render",t]]);export{S as __pageData,p as default};
