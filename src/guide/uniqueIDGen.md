# 唯一id
基于表来完成分布式ID生成

原理参考[美团点评分布式ID](https://tech.meituan.com/2017/04/21/mt-leaf.html)
```java
@Table(value = "leaf_alloc", comment = "唯一id分配")
public class LeafAllocEntity  extends BaseEntity<LeafAllocEntity> {

    @UniIndex
    @ColumnDefine(comment = "业务key ，比如orderId", length = 20, notNull = true)
    private String key;

    @ColumnDefine(comment = "当前最大id", defaultValue = "1", notNull = true)
    private Long maxId;

    @ColumnDefine(comment = "步长", defaultValue = "500", notNull = true)
    private Integer step;

    @ColumnDefine(comment = "描述")
    private String description;
}
```
用法
```
// 注入service
private final IDGenService idGenService;
// 获取id，入参为key: orderId 需要提取初始化到上面那个
Long orderId = idGenService.next("orderId");
```
项目启动自动插入数据参考 [数据初始化](/src/guide/initData.md)

```json
{
  "leaf_alloc": [{
    "key": "orderId",
    "max_id": 1,
    "step": 500,
    "description": "订单ID"
  }]
}
```