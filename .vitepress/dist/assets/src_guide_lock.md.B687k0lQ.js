import{_ as a,c as s,o as n,a5 as e}from"./chunks/framework.C_oE5szm.js";const h=JSON.parse('{"title":"锁","description":"","frontmatter":{},"headers":[],"relativePath":"src/guide/lock.md","filePath":"src/guide/lock.md","lastUpdated":1724685357000}'),p={name:"src/guide/lock.md"},t=e(`<h1 id="锁" tabindex="-1">锁 <a class="header-anchor" href="#锁" aria-label="Permalink to &quot;锁&quot;">​</a></h1><p>简单锁的使用</p><p>如果项目中启用了redis，锁是基于redis 实现，否则使用 ReentrantLock</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 注入锁</span></span>
<span class="line"><span>private final CoolLock coolLock;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>String key = &quot;lockKey&quot;;</span></span>
<span class="line"><span>// 尝试获取锁</span></span>
<span class="line"><span>if (coolLock.tryLock(key, Duration.ofMillis(noRepeatSubmit.expireTime()))) {</span></span>
<span class="line"><span>    // TODO 获取锁后的逻辑</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 释放锁</span></span>
<span class="line"><span>    coolLock.unlock(key);</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,4),o=[t];function c(l,i,r,d,_,k){return n(),s("div",null,o)}const m=a(p,[["render",c]]);export{h as __pageData,m as default};
