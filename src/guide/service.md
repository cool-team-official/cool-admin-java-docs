# 服务

处理业务逻辑的代码应该被封装在服务中。

## Crud

`BaseService`中集成了常用的 CRUD 操作，可以参考`BaseService`的实现。

## 修改前后

可以重写`modifyBefore`和`modifyAfter`方法，在修改数据之前或之后做一些处理

- 修改之前

```java
/**
 * 修改之前
 *
 * @param requestParams 请求参数
 * @param t             对应实体
 * @param type          修改类型
 */
@Override
public void modifyBefore(JSONObject requestParams, T t, ModifyEnum type) {

}
```

- 修改之后

```java
/**
 * 修改之后
 *
 * @param requestParams 请求参数
 * @param t             对应实体
 * @param type          修改类型
 */
@Override
public void modifyAfter(JSONObject requestParams, T t, ModifyEnum type) {
}
```
