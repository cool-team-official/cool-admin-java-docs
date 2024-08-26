# 锁
简单锁的使用

如果项目中启用了redis，锁是基于redis 实现，否则使用 ReentrantLock

```
// 注入锁
private final CoolLock coolLock;

String key = "lockKey";
// 尝试获取锁
if (coolLock.tryLock(key, Duration.ofMillis(noRepeatSubmit.expireTime()))) {
    // TODO 获取锁后的逻辑
    
    // 释放锁
    coolLock.unlock(key);
}
```