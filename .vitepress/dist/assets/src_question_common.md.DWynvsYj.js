import{_ as e,c as t,o as a,a4 as o}from"./chunks/framework.DkvLLw5I.js";const u=JSON.parse('{"title":"常见问题","description":"","frontmatter":{},"headers":[],"relativePath":"src/question/common.md","filePath":"src/question/common.md","lastUpdated":1721036629000}'),l={name:"src/question/common.md"},i=o('<h1 id="常见问题" tabindex="-1">常见问题 <a class="header-anchor" href="#常见问题" aria-label="Permalink to &quot;常见问题&quot;">​</a></h1><p>项目中常见的问题</p><h2 id="_1、找不到类似xxxtabledef文件" tabindex="-1">1、找不到类似<code>xxxTableDef</code>文件 <a class="header-anchor" href="#_1、找不到类似xxxtabledef文件" aria-label="Permalink to &quot;1、找不到类似`xxxTableDef`文件&quot;">​</a></h2><p>框架用到了<a href="https://mybatis-flex.com/zh/others/apt.html" target="_blank" rel="noreferrer">Mybatis Flex 的 APT 功能</a>，在项目编译的时候会自动生成这些文件。</p><p>你可以这样做：</p><ul><li>Build 你的项目；</li><li>执行 maven 的<code>mvn compile</code>命令；</li><li>配置完数据库直接启动；</li><li>【推荐】开启 idea 的<code>Build project automatically</code>自动编译功能（Settings -&gt; Build, Execution, Deployment -&gt; Compiler -&gt; Build Project Automatically）；</li></ul><p>这些方式都可以解决这个问题。</p>',7),c=[i];function r(n,s,d,_,m,p){return a(),t("div",null,c)}const x=e(l,[["render",r]]);export{u as __pageData,x as default};
