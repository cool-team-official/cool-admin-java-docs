import{_ as s,a as i,o as a,aj as n}from"./chunks/framework.BjhQB2K5.js";const g=JSON.parse('{"title":"请求日志记录","description":"","frontmatter":{},"headers":[],"relativePath":"src/guide/recordLog.md","filePath":"src/guide/recordLog.md","lastUpdated":1722705865000}'),e={name:"src/guide/recordLog.md"},p=n(`<h1 id="请求日志记录" tabindex="-1">请求日志记录 <a class="header-anchor" href="#请求日志记录" aria-label="Permalink to &quot;请求日志记录&quot;">​</a></h1><p>记录接口请求日志入库</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> BaseLogFilter</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> implements</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Filter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Resource</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    private</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> BaseSysLogService baseSysLogService;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Override</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> doFilter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ServletRequest </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">servletRequest</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, ServletResponse </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">servletResponse</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, FilterChain </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">filterChain</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            throws</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> IOException, ServletException {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 记录日志</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        HttpServletRequest request </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (HttpServletRequest) servletRequest;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        baseSysLogService.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">record</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(request, (JSONObject) request.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getAttribute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;requestParams&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        filterChain.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">doFilter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(servletRequest, servletResponse);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>同时如果个别接口需要忽略记录请求日志</p><p>可以在yml文件中配置， 默认忽略APP端接口</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 忽略url</span></span>
<span class="line"><span>ignored:</span></span>
<span class="line"><span>  # 忽略记录请求日志url</span></span>
<span class="line"><span>  logUrls:</span></span>
<span class="line"><span>    - /</span></span>
<span class="line"><span>    - /app/**</span></span>
<span class="line"><span>    - /css/*</span></span>
<span class="line"><span>    - /js/*</span></span>
<span class="line"><span>    - /favicon.ico</span></span></code></pre></div>`,6),t=[p];function l(h,k,r,d,E,c){return a(),i("div",null,t)}const y=s(e,[["render",l]]);export{g as __pageData,y as default};
