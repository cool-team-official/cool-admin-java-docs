import{_ as a,a as e,o as l,aj as i}from"./chunks/framework.BjhQB2K5.js";const _=JSON.parse('{"title":"更新","description":"","frontmatter":{},"headers":[],"relativePath":"src/todo/update.md","filePath":"src/todo/update.md","lastUpdated":1744512083000}'),t={name:"src/todo/update.md"},r=i('<h1 id="更新" tabindex="-1">更新 <a class="header-anchor" href="#更新" aria-label="Permalink to &quot;更新&quot;">​</a></h1><p>因为有你们的支持，cool-admin 会持续不断地更新，如果方便请点下 Star，这将会给我们带来更多的动力！！！</p><h2 id="v8-0-0-2025-04-13" tabindex="-1">v8.0.0(2025-04-13) <a class="header-anchor" href="#v8-0-0-2025-04-13" aria-label="Permalink to &quot;v8.0.0(2025-04-13)&quot;">​</a></h2><ul><li>新增: 支持多租户，全局动态注入查询条件<a href="/src/guide/tenant.html">详情</a></li><li>新增: 支持多语言，基于大模型自动翻译，无需更改原有代码<a href="/src/guide/i18n.html">详情</a></li><li>优化: 响应类型封装优化 by @ximu-tao</li><li>升级: 升级autotable和mybatis-flex版本，涉及包结构变更 com.tangzc.autotable -&gt; org.dromara.autotable</li><li>升级: AI 自动编码<a href="https://www.deepseek.com/" target="_blank" rel="noreferrer">(基于DeepSeek R1)</a></li></ul><h2 id="v7-1-3-2024-08-25" tabindex="-1">v7.1.3(2024-08-25) <a class="header-anchor" href="#v7-1-3-2024-08-25" aria-label="Permalink to &quot;v7.1.3(2024-08-25)&quot;">​</a></h2><ul><li>新增: list和page支持关联查询，支持自定义返回结果类型，并可以在init方法中初始化返回字段类型及数据组装函数定义(参考：<a href="/src/guide/controller.html#查询配置">控制器</a>)</li><li>新增: 分布式ID生成组件(参考：<a href="/src/guide/uniqueIDGen.html">分布式ID</a>)</li><li>新增: 锁工具(参考：<a href="/src/guide/lock.html">锁工具</a>)</li><li>新增: 防重提交注解(参考：<a href="/src/guide/noRepeatSubmit.html">防重提交</a>)</li><li>调整: 缓存数据模板(参考：<a href="/src/guide/cache.html#通过coolcache缓存模板-获取数据">缓存</a>)</li><li>调整: 优化eps解析规则 (参考：<a href="/src/guide/controller.html#接口路由规则">解析规则</a>)</li><li>调整: 优化角色修改循环单个处理为批量处理，并异步进行刷新用户权限</li><li>调整: 图形验证码获取区分app和admin</li><li>修复: 初始化数据，指定id插入不生效问题</li><li>修复: 后台人员查询列表字段关联错误</li></ul><h2 id="v7-1-2-2024-08-04" tabindex="-1">v7.1.2(2024-08-04) <a class="header-anchor" href="#v7-1-2-2024-08-04" aria-label="Permalink to &quot;v7.1.2(2024-08-04)&quot;">​</a></h2><ul><li>新增: 支持postgresql</li><li>新增: 忽略记录请求日志url配置</li><li>新增: app端手机密码登录和手机验证码登录</li><li>调整: 鉴权调整兼容app端</li><li>调整: 优化插件过大加载慢问题，移除插件jar文件落库</li><li>修复: refreshToken可以当token使用问题</li></ul><h2 id="v7-1-1-2024-07-15" tabindex="-1">v7.1.1(2024-07-15) <a class="header-anchor" href="#v7-1-1-2024-07-15" aria-label="Permalink to &quot;v7.1.1(2024-07-15)&quot;">​</a></h2><ul><li>新增 Ai 自动编码功能，简单功能零代码实现；</li><li>新增后台扩展插件，如文件上传、支付、短信等功能可以通过安装插件的方式添加；</li></ul><h2 id="v7-1-0-2024-06-27" tabindex="-1">v7.1.0(2024-06-27) <a class="header-anchor" href="#v7-1-0-2024-06-27" aria-label="Permalink to &quot;v7.1.0(2024-06-27)&quot;">​</a></h2><ul><li>升级到 Springboot3.x；</li><li>升级所有相关依赖到最新；</li><li>跟进<a href="https://cool-js.com" target="_blank" rel="noreferrer">Nodejs 版</a>相关功能；</li><li>优化若干问题；</li></ul>',12),o=[r];function h(s,c,n,d,u,p){return l(),e("div",null,o)}const f=a(t,[["render",h]]);export{_ as __pageData,f as default};
