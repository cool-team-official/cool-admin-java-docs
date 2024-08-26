# 缓存

为了不过多依赖环境，框架自带基于 springCache 默认实现了两种缓存

- caffeine 无需额外安装软件，由 Ben Manes 开发的一个 Java 缓存库，旨在提供高性能、高效的缓存解决方案。
- redis 需安装 redis，提供了一种高效且可靠的解决方案，能够显著提升应用程序的性能和响应速度。

```yaml
spring:
  # caffeine 缓存
  cache:
    type: caffeine
    file: cache

  #redis 缓存
#  cache:
#    type: redis
#  data:
#    redis:
#      host: 127.0.0.1
#      port: 6379
#      database: 0
#      password:
```

可以选择你想使用的缓存，性能要求比较高或有分布式部署需求的建议配置成 redis

## 使用

- 原生 [spring](https://spring.io/guides/gs/caching)方式

```java
@CacheConfig(cacheNames = {"comm"})
@Service
public class DemoCacheServiceImpl implements DemoCacheService {
    @Cacheable(key = "targetClass + methodName +#p0")
    @Override
    public Object test(String id) {
        System.out.println("我被调用了");
        return "我被缓存了";
    }
}
```

## 框架特有的通用工具类，CoolCache

```java
@Service
public class DemoCacheServiceImpl implements DemoCacheService {
    @Resource
    CoolCache coolCache;

    @Override
    public Object test(String id) {
        coolCache.set("a", 1);
        return coolCache.get("a", Integer.class);
    }
}
```

## 通过coolCache缓存模板，获取数据

```java
 public Object logistics(String num) {
    // 物流单号
    String num = orderInfoEntity.getLogistics().getNum();
    String cacheKey = "logistics:" + orderId + ":" + num;
    // 获取物流信息
    return coolCache.get(cacheKey, Duration.ofMinutes(30),
        () -> {
            // 从第三方 或者DB 获取数据
            Object invoke = CoolPluginInvokers.invoke("wuliu", "query", num, "");
            if (ObjUtil.isEmpty(invoke)) {
                return null;
            }
            String result = (String) invoke;
            return JSONUtil.parseObj(result).get("result");
        });
}
```