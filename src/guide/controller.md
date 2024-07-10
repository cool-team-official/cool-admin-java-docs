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
                .queryWrapper(Wrappers.<DemoEntity>query().eq("name", requestParams.getStr("name")))); // 其他查询方式 具体看 https://baomidou.com/文档
        setListOption(createOp()); // 列表查询 跟分页查询一样
    }
}
```

## 请求参数
为了方便获取参数，框架封装了一个请求属性，将 URL、表单、body 

等参数封装在了一个JSONObject requestParams，开发者可以从中方便的获取各种参数；
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
同样也可以对service进行重写
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
和传统的controller对比一下是简化了不少，接下来我们看看实现的原理

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
- 生成的路由前缀为： /admin/demo/info/xxx与/app/demo/info/xxx
- 规则为: admin(app)/模块名/AdminDemoInfoController转成小写替换掉admin(app)、模块名和controller
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
## 重写getMappingForMethod
我们不直接使用 spring自带的注解，而是对它做一层封装，controller上加了这个注解后

将由以下这个类实现自动配置模块路由，该类继承了 spring的RequestMappingHandlerMapping，并重写了getMappingForMethod方法

根据一定规则生成path，返回给spring做解析。
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
