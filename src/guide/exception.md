# 统一异常处理

提供了简化的业务异常抛出工具

- CoolPreconditions.check(check != null, "用户名已存在");

## 异常统一捕获

```java
@RestControllerAdvice
@Slf4j
public class CoolExceptionHandler {

    @ExceptionHandler(CoolException.class)
    public R handleRRException(CoolException e) {
        R r = new R();
        r.put("code", e.getCode());
        r.put("message", e.getMessage());

        return r;
    }

    @ExceptionHandler(DuplicateKeyException.class)
    public R handleDuplicateKeyException(DuplicateKeyException e) {
        log.error(e.getMessage(), e);
        return R.error("已存在该记录");
    }

    @ExceptionHandler(BadCredentialsException.class)
    public R handleBadCredentialsException(BadCredentialsException e) {
        log.error(e.getMessage(), e);
        return R.error("账户密码不正确");
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public R handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
        log.error(e.getMessage(), e);
        return R.error("不支持该请求方式，请区分POST、GET等请求方式是否正确");
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public R handleIllegalArgumentException(IllegalArgumentException e) {
        log.error(e.getMessage(), e);
        return R.error(e.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public R handleException(Exception e) {
        log.error(e.getMessage(), e);
        return R.error();
    }
}

```

一般抛异常写法

```java
public Long add(JSONObject requestParams, BaseSysUserEntity entity) {
    BaseSysUserEntity check = getOne(
            Wrappers.<BaseSysUserEntity>lambdaQuery().eq(BaseSysUserEntity::getUsername, entity.getUsername()));
    if (check != null) {
        throw new CoolException("用户名已存在");
    }
    entity.setPassword(MD5.create().digestHex(entity.getPassword()));
    super.add(requestParams, entity);
    return entity.getId();
}
```

系统提供了 业务校验的工具，无需手动通过 if 判断，在 手动抛异常
通过 CoolPreconditions.check 方法第一个参数如果为 true 即抛异常，异常信息为 "用户名已存在", 会更加简洁

```java
public Long add(JSONObject requestParams, BaseSysUserEntity entity) {
    BaseSysUserEntity check = getOne(
            Wrappers.<BaseSysUserEntity>lambdaQuery().eq(BaseSysUserEntity::getUsername, entity.getUsername()));
    CoolPreconditions.check(check != null, "用户名已存在");
    entity.setPassword(MD5.create().digestHex(entity.getPassword()));
    super.add(requestParams, entity);
    return entity.getId();
}
```
