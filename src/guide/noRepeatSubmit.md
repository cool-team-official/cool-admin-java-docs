# 防重复提交
基于用户维度的防重复提交，该接口需要登录鉴权
```java
@Aspect
@Component
@RequiredArgsConstructor
public class NoRepeatSubmitAspect {

    private final CoolLock coolLock;

    @Around("@annotation(noRepeatSubmit)")
    public Object around(ProceedingJoinPoint joinPoint, NoRepeatSubmit noRepeatSubmit) throws Throwable {
        HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(
            RequestContextHolder.getRequestAttributes())).getRequest();
        String key = request.getRequestURI() + ":" + CoolSecurityUtil.getCurrentUserId();
        // 加锁
        CoolPreconditions.check(!coolLock.tryLock(key, Duration.ofMillis(noRepeatSubmit.expireTime())), "请勿重复操作");
        try {
            return joinPoint.proceed();
        } finally {
            // 移除锁
            coolLock.unlock(key);
        }
    }
}
```

使用 在controller接口上加上 @NoRepeatSubmit  注解

```java
    @Operation(summary = "'领取优惠券'")
    @PostMapping("/receive")
    @NoRepeatSubmit
    public R receive(@RequestAttribute() JSONObject requestParams) {
        Long couponId = requestParams.get("couponId", Long.class);
        return R.ok(marketCouponInfoService.receive(couponId, CoolSecurityUtil.getCurrentUserId()));
    }
```
