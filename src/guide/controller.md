# 控制器

所有的 controller 都继承自 BaseController，该父类已经实现了以下六个基础方法：add、delete、update、page、list、info，可以大大简化代码，使得 controller 更加简洁。

## 示例

```java
@Tag(name = "测试CURD", description = "测试CURD")
@CoolRestController(value = "/cool", api = {"add", "delete", "update", "page", "list", "info"})
public class AdminDemoInfoController extends BaseController<DemoService, DemoEntity> {
    @Override
    protected void init(HttpServletRequest request, JSONObject requestParams) {
        // 可以在这边实现一下列表数据排序规则,查询条件过滤，返回哪些字段等
    }
}
```

这样就默认实现了以下六个接口：

- POST 新增
- POST 删除
- POST 修改
- POST 分页查询
- POST 查询列表
- GET 根据列表查询单个信息
  等 6 个接口

## 查询配置

```java
@Tag(name = "测试CURD", description = "测试CURD")
@CoolRestController(value = "/cool", api = {"add", "delete", "update", "page", "list", "info"})
public class AdminDemoInfoController extends BaseController<DemoService, DemoEntity> {
    @Override
    protected void init(HttpServletRequest request, JSONObject requestParams) {
        setPageOption(createOp() // 分页查询配置
                .fieldEq("status") // 字段全匹配，对应请求参数中同名参数
                .keyWordLikeFields("name", "phone") // 需要模糊查询的字段，对应请求参数中的 keyWord
                .select("name", "phone", "age") // 返回字段
                .queryWrapper(QueryWrapper.create())); // 其他查询方式 具体看 https://mybatis-flex.com/zh/base/querywrapper.html文档
        setListOption(createOp()); // 列表查询 跟分页查询一样
    }
}
```
以上是针对Entity单表查询方式，如果我们有需要连表查询，查询另一张表的字段，这样就需要在Entity加上另一张表的的字段，针对这种场景，我们可以使用
自定义的查询方式
```java
public class AppMarketCouponUserController extends BaseController<MarketCouponUserService, MarketCouponUserEntity> {
    protected void init(HttpServletRequest request, JSONObject requestParams) {
        setPageOption(
            createOp()
                .select(MARKET_COUPON_INFO_ENTITY.ALL_COLUMNS,
                    MARKET_COUPON_USER_ENTITY.STATUS.as("useStatus")) // 查询连表字段
                .queryWrapper(
                    QueryWrapper.create()
                        .from(MARKET_COUPON_USER_ENTITY)
                        .leftJoin(MARKET_COUPON_INFO_ENTITY) // leftJoin 连表查询
                        .on(MARKET_COUPON_USER_ENTITY.USER_ID.eq(
                                CoolSecurityUtil.getCurrentUserId())
                            .and(MARKET_COUPON_USER_ENTITY.COUPON_ID.eq(
                                MARKET_COUPON_INFO_ENTITY.ID))))
                .queryModeEnum(QueryModeEnum.CUSTOM)  // 自定义查询模式，默认为ENTITY 实体，自定义场景主要使用在关联表查询插件，
                // 需要返回的字段分布在各个表里，需要组装数据，通过这种方式，就不需要在entity 中加非存储数据库的字段；默认转成map，注意如果该表有json字段，
                // 需要通过下面的 transform 手动进行转换
                .asType(Map.class)  // 默认为Map，也可以自己定义VO
                .transform((list) -> {
                    list.forEach(o -> {
                        Map map = (Map) o; // 没有设置asType ，自定义类型默认为 map
                        if (ObjUtil.isNotEmpty(map.get("condition"))) {
                            map.put("condition",
                                JSONUtil.toBean(map.get("condition").toString(), Map.class));
                        }
                    });
                })); // 其他查询方式 具体看 https://mybatis-flex.com/zh/base/querywrapper.html文档
    }
}
```
查询模式queryModeEnum 还有 ENTITY_WITH_RELATIONS, 实体中 使用了关联查询 @RelationOneToMany 
如下面这个订单查询，订单产品列表也一并查出    

关联查询用法参考：https://mybatis-flex.com/zh/base/relations-query.html
```java
@Getter
@Setter
@Table(value = "order_info", comment = "订单信息")
public class OrderInfoEntity extends BaseEntity<OrderInfoEntity> {

    @Index
    @ColumnDefine(comment = "用户ID", notNull = true)
    private Long userId;
    // ......
    // 订单商品列表
    @Ignore
    @Column(ignore = true)
    @RelationOneToMany(selfField = "id", targetField = "orderId")
    private List<OrderGoodsEntity> goodsList;
}
```

## 请求参数

为了方便获取参数，框架封装了一个请求属性，将 URL、表单、body

等参数封装在了一个 JSONObject requestParams，开发者可以从中方便的获取各种参数；

```java
@Tag(name = "测试CURD", description = "测试CURD")
@CoolRestController(value = "/cool", api = {"add", "delete", "update", "page", "list", "info"})
public class AdminDemoInfoController extends BaseController<DemoService, DemoEntity> {
    @Override
    protected void init(HttpServletRequest request, JSONObject requestParams) {
        // 可以在这边实现一下列表数据排序规则,查询条件过滤，返回哪些字段等
    }

    @PostMapping("/test")
    public R test(@RequestAttribute JSONObject requestparams, String user) {
        System.out.println(requestparams.getStr("user"));
        return R.ok();
    }
}
```

## 重写实现

默认实现了通用的六个接口方法，如果不满足需求，可以在对应的 service 中重写方法。

```java
@Tag(name = "测试CURD", description = "测试CURD")
@CoolRestController(value = "/cool", api = {"add", "delete", "update", "page", "list", "info"})
public class AdminDemoInfoController extends BaseController<DemoService, DemoEntity> {
    @Override
    protected void init(HttpServletRequest request, JSONObject requestParams) {
        // 可以在这边实现一下列表数据排序规则,查询条件过滤，返回哪些字段等
    }

    @Override
    @PostMapping("/page")
    protected R page(JSONObject requestParams, CrudOption<DemoEntity> option) {
        // 重写逻辑
        return super.page(requestParams, option);
    }
}
```

同样也可以对 service 进行重写

```java
@Service
public class DemoServiceImpl extends BaseServiceImpl<DemoMapper, DemoEntity> implements DemoService {
    @Override
    public Object page(JSONObject requestParams, Page<DemoEntity> page, QueryWrapper<DemoEntity> queryWrapper) {
        // 重写逻辑
        return super.page(requestParams, page, queryWrapper);
    }
}
```

和传统的 controller 对比一下是简化了不少，接下来我们看看实现的原理

# 原理

## 接口路由规则

```
// 模块目录
├── modules
│   └── demo(模块名)
│   │    └── controller(接口)
│   │    │     └── admin(后端接口)
│   │    │     │     └── AdminDemoInfoController.java
│   │    │     └── app(前端接口)
│   │    │     │     └── AppDemoInfoController.java

```

- 生成的路由前缀为： /admin/demo/info/xxx 与/app/demo/info/xxx
- 规则为: admin(app)/模块名/AdminDemoInfoController 转成小写替换掉 admin(app)、模块名和 controller

## 自定义路由注解

```java
public @interface CoolRestController {

    @AliasFor(annotation = RequestMapping.class)
    String name() default "";

    @AliasFor(annotation = RequestMapping.class)
    String[] value() default {};

    String[] api() default {};
}
```

## 重写 getMappingForMethod

我们不直接使用 spring 自带的注解，而是对它做一层封装，controller 上加了这个注解后

将由以下这个类实现自动配置模块路由，该类继承了 spring 的 RequestMappingHandlerMapping，并重写了 getMappingForMethod 方法

根据一定规则生成 path，返回给 spring 做解析。

```java
public class AutoPrefixUrlMapping extends RequestMappingHandlerMapping {

    @Override
    protected RequestMappingInfo getMappingForMethod(Method method, Class<?> handlerType) {
        CoolRestController[] annotations = handlerType.getAnnotationsByType(CoolRestController.class);
        RequestMappingInfo info = super.getMappingForMethod(method, handlerType);
        // ... 按规则组装 path
        info = info.mutate().paths(path).build().combine(info);
        return info;
    }
}
```
