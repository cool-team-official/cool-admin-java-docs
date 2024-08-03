# 请求日志记录

记录接口请求日志入库

```java
public class BaseLogFilter implements Filter {
    @Resource
    private BaseSysLogService baseSysLogService;

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {
        // 记录日志
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        baseSysLogService.record(request, (JSONObject) request.getAttribute("requestParams"));
        filterChain.doFilter(servletRequest, servletResponse);
    }

}
```
同时如果个别接口需要忽略记录请求日志

可以在yml文件中配置， 默认忽略APP端接口
```
# 忽略url
ignored:
  # 忽略记录请求日志url
  logUrls:
    - /
    - /app/**
    - /css/*
    - /js/*
    - /favicon.ico
```