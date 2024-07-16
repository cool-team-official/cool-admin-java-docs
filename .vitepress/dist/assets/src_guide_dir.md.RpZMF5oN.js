import{_ as s,c as a,o as n,a5 as p}from"./chunks/framework.C_oE5szm.js";const h=JSON.parse('{"title":"目录结构","description":"","frontmatter":{},"headers":[],"relativePath":"src/guide/dir.md","filePath":"src/guide/dir.md","lastUpdated":1721036629000}'),e={name:"src/guide/dir.md"},l=p(`<h1 id="目录结构" tabindex="-1">目录结构 <a class="header-anchor" href="#目录结构" aria-label="Permalink to &quot;目录结构&quot;">​</a></h1><p>项目按照模块化的方式组织，每个模块都有其特有的功能，清晰明了便于管理。</p><h2 id="结构" tabindex="-1">结构 <a class="header-anchor" href="#结构" aria-label="Permalink to &quot;结构&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.</span></span>
<span class="line"><span>main</span></span>
<span class="line"><span>├─ java</span></span>
<span class="line"><span>│  ├─ com.cool</span></span>
<span class="line"><span>│  ├─ core             核心包</span></span>
<span class="line"><span>│  │  ├─ annotation</span></span>
<span class="line"><span>│  │  └─ ...</span></span>
<span class="line"><span>│  ├─ modules          模块包</span></span>
<span class="line"><span>│  │  ├─ base              基础模块（系统用户、菜单、资源、角色）</span></span>
<span class="line"><span>│  │  │  ├─ controller</span></span>
<span class="line"><span>│  │  │  ├─ entity</span></span>
<span class="line"><span>│  │  │  ├─ mapper</span></span>
<span class="line"><span>│  │  │  └─ service</span></span>
<span class="line"><span>│  │  ├─ dict              字段模块</span></span>
<span class="line"><span>│  │  ├─ plugin            插件模块</span></span>
<span class="line"><span>│  │  ├─ recycle           数据回收站模块</span></span>
<span class="line"><span>│  │  ├─ space             文件管理模块</span></span>
<span class="line"><span>│  │  ├─ task              定时任务模块</span></span>
<span class="line"><span>│  │  └─ user              用户管理模块(c端用户)</span></span>
<span class="line"><span>│  └─ CoolApplication</span></span>
<span class="line"><span>└─ resources           资源文件</span></span>
<span class="line"><span>   ├─ cool</span></span>
<span class="line"><span>   │  └─ data</span></span>
<span class="line"><span>   │     └─ db         初始化数据json文件</span></span>
<span class="line"><span>   └─ mapper           mapper xml 文件</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">提示</p><ul><li>core 为核心模块，包括一些核心的组件工具</li><li>modules 为业务模块，业务代码放在这边，在新增功能模块时，按上面的包结构新增即可 <blockquote><p>比如你有一个订单管理的模块，在 modules 新增一个 order 包，在 order 包下创建 controller、entity、mapper、service 等包</p></blockquote></li></ul></div>`,5),c=[l];function i(t,o,r,d,u,_){return n(),a("div",null,c)}const b=s(e,[["render",i]]);export{h as __pageData,b as default};
