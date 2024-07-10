# swagger 文档
默认集成[springdoc](https://springdoc.org/)，作为文档。

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
系统启动完成访问：http://127.0.0.1:8001/swagger-ui/index.html#/