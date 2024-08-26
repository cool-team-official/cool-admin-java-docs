# 锁
简单锁的使用
如果项目中启用了redis，锁是基于redis 实现，否则使用 ReentrantLock
如下防重复提交
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