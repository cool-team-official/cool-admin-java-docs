# 权限校验

采用 spring-security 与 jwt 作为框架安全与权限校验。

## 配置

```yaml
cool:
  # token 相关配置
  token:
    # 过期时间 单位：秒 半小时
    expire: 1800
    # 刷新token过期时间 单位：秒 7天
    refreshExpire: 604800
```

## 原理

1、系统启动的时候，系统会查询并向[spring-security](https://spring.io/projects/spring-security)加载所有设置的权限；

```java
@Component
public class MySecurityMetadataSource implements FilterInvocationSecurityMetadataSource {
    @Resource
    private BaseSysPermsService baseSysPermsService;

    private Map<String, Collection<ConfigAttribute>> map = null;

    /**
     * 加载权限表中所有操作请求权限
     */
    public void loadResourceDefine() {
        map = new HashMap<>();
        Collection<ConfigAttribute> configAttributes;
        ConfigAttribute cfg;
        String[] perms = baseSysPermsService.getAllPerms();
        // 获取启用的权限操作请求
        for (String perm : perms) {
            configAttributes = new ArrayList<>();
            cfg = new SecurityConfig(perm);
            // 作为MyAccessDecisionManager类的decide的第三个参数
            configAttributes.add(cfg);
            // 用权限的path作为map的key，用ConfigAttribute的集合作为value
            map.put(perm.replaceAll(":", "/"), configAttributes);
        }
    }

    /**
     * 判定用户请求的url是否在权限表中 如果在权限表中，则返回给decide方法，用来判定用户是否有此权限 如果不在权限表中则放行
     *
     * @param o
     * @return
     * @throws IllegalArgumentException
     */
    @Override
    public Collection<ConfigAttribute> getAttributes(Object o) throws IllegalArgumentException {
        if (map == null) {
            loadResourceDefine();
        }
        // Object中包含用户请求request
        String url = ((FilterInvocation) o).getRequestUrl();
        return map.get(url.replace("/admin/", "").split("[?]")[0]);

    }

    @Override
    public Collection<ConfigAttribute> getAllConfigAttributes() {
        return new ArrayList<>();
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return true;
    }
}
```

2、用户登录，查询该用户所具有的权限并缓存；

```java
/**
 * 获得用户信息
 */
@Component
public class JwtUserDetailsServiceImpl implements UserDetailsService {
    @Resource
    private BaseSysUserService baseSysUserService;
    @Resource
    private BaseSysPermsService baseSysPermsService;
    @Resource
    private CoolCache coolCache;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        BaseSysUserEntity sysUserEntity = baseSysUserService.getOne(Wrappers.<BaseSysUserEntity>lambdaQuery()
                .eq(BaseSysUserEntity::getUsername, username).eq(BaseSysUserEntity::getStatus, 1));
        if (ObjectUtil.isEmpty(sysUserEntity)) {
            throw new UsernameNotFoundException("用户名不存在");
        }
        List<GrantedAuthority> authority = new ArrayList<>();
        String[] perms = baseSysPermsService.getPerms(sysUserEntity.getId());
        for (String perm : perms) {
            authority.add(new SimpleGrantedAuthority(perm));
        }
        Long[] departmentIds = baseSysPermsService.getDepartmentIdsByRoleIds(sysUserEntity.getId());
        JwtUser jwtUser = new JwtUser(sysUserEntity.getUsername(), sysUserEntity.getPassword(), authority,
                sysUserEntity.getStatus() == 1);
        Long[] roleIds = baseSysPermsService.getRoles(sysUserEntity);
        coolCache.set("admin:userDetails:" + jwtUser.getUsername(), jwtUser);
        coolCache.set("admin:passwordVersion:" + sysUserEntity.getId(), sysUserEntity.getPasswordV());
        coolCache.set("admin:userInfo:" + sysUserEntity.getId(), sysUserEntity);
        coolCache.set("admin:department:" + sysUserEntity.getId(), departmentIds);
        coolCache.set("admin:roleIds:" + sysUserEntity.getId(), roleIds);
        return jwtUser;
    }
}
```

3、每次调用接口的时候[spring-security](https://spring.io/projects/spring-security)权限拦截器校验当前用户权限；

```java
/**
 * 权限管理拦截器
 * 监控用户行为
 */
@Slf4j
@Component
public class MyFilterSecurityInterceptor extends AbstractSecurityInterceptor implements Filter {
    @Resource
    private FilterInvocationSecurityMetadataSource securityMetadataSource;


    @Autowired
    public void setMyAccessDecisionManager(MyAccessDecisionManager myAccessDecisionManager) {
        super.setAccessDecisionManager(myAccessDecisionManager);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        FilterInvocation fi = new FilterInvocation(request, response, chain);
        invoke(fi);
    }

    public void invoke(FilterInvocation fi) throws IOException, ServletException {
        InterceptorStatusToken token = super.beforeInvocation(fi);
        try {
            fi.getChain().doFilter(fi.getRequest(), fi.getResponse());
        } finally {
            super.afterInvocation(token, null);
        }
    }

    @Override
    public void destroy() {
    }

    @Override
    public Class<?> getSecureObjectClass() {
        return FilterInvocation.class;
    }

    @Override
    public SecurityMetadataSource obtainSecurityMetadataSource() {
        return this.securityMetadataSource;
    }
}
```

4.鉴权拦截配置 jwt

```java
@EnableWebSecurity
@Configuration
@Slf4j
public class JwtSecurityConfig {

    // 用户详情
    @Resource
    private UserDetailsService userDetailsService;

    @Resource
    private JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter;
    // 401
    @Resource
    private EntryPointUnauthorizedHandler entryPointUnauthorizedHandler;
    // 403
    @Resource
    private RestAccessDeniedHandler restAccessDeniedHandler;
    // 忽略权限控制的地址
    @Resource
    private IgnoredUrlsProperties ignoredUrlsProperties;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .authorizeHttpRequests(
                        conf -> conf.requestMatchers(ignoredUrlsProperties.getUrls().stream().toArray(String[]::new))
                                .permitAll().anyRequest().authenticated())
                .headers(config -> config.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))
                // 允许网页iframe
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(conf -> conf.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(config -> {
                    config.authenticationEntryPoint(entryPointUnauthorizedHandler);
                    config.accessDeniedHandler(restAccessDeniedHandler);
                }).build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new PasswordEncoder() {
            @Override
            public String encode(CharSequence rawPassword) {
                return DigestUtils.md5DigestAsHex(((String) rawPassword).getBytes());
            }

            @Override
            public boolean matches(CharSequence rawPassword, String encodedPassword) {
                return encodedPassword.equals(DigestUtils.md5DigestAsHex(((String) rawPassword).getBytes()));
            }
        };
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
```

## 当前用户

获取当前用户信息

### 后端用户

- Controller 中获得

```java
@GetMapping("/person")
public R person(@RequestAttribute() Long adminUserId);
```

- Security 方式

```java
 Long userId = CoolSecurityUtil.getCurrentUserId();
 String username = CoolSecurityUtil.getAdminUsername();
```

- 获得用户信息
  请求过程中会解析 token，并将用户信息存在整个请求过程中的 requestParams

```java
 JSONObject userInfo = CoolSecurityUtil.getAdminUserInfo(requestParams);
```

userInfo

| 字段            | 类型    | 说明       |
| --------------- | ------- | ---------- |
| roleIds         | Long[]  | 角色数组   |
| username        | String  | 用户名     |
| userId          | Long    | 用户 ID    |
| passwordVersion | Integer | 密码版本号 |

### 应用用户

```java
Long userId = CoolSecurityUtil.getCurrentUserId();
```

## 忽略 token

开放接口，忽略 token 校验

### 方法上

通过在方法上加`TokenIgnore`注解可以的接口不会进行 token 校验

```java
@TokenIgnore
@GetMapping("/eps")
public R eps() {
    return R.ok(coolEps.getApp());
}
```

### 类上

也可以注解在类上

```java
/**
 * 字典信息
 */
@TokenIgnore(value = {"page"})
@CoolRestController(api = {"add", "delete", "update", "page", "list", "info"})
public class AdminDictInfoController{ }
```

::: warning 注意
无论是注解在方法还是类上，都必须配合`CoolRestController`使用，其它的无效
:::
