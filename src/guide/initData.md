# 数据初始化
有些功能模块上线时，需要初始化一些数据

可以在resources下的 cool/data/db目录创建 demo.json文件

json格式如下,demo 为表的名称，里面是个数组，数组里可以包含多个对象，每个对象中的key为表的字段，value为对应的值

> 规范：实体需以Entity结尾
```json
{
  "demo": [
      {
          "keyName": "rich",
          "name": "富文本参数",
          "remark": null
      },
      {
          "keyName": "json",
          "name": "JSON参数",
          "remark": null
      }
  ]
}
```
创建 demo.json文件后，在项目启动的时候会去加载该文件，并实现值的插入  

处理逻辑在以下方法
```java
package com.cool.core;


/**
 * 数据库初始数据初始化 在 classpath:cool/data/db 目录下创建.json文件 并定义表数据，
 * 由该类统一执行初始化
 **/
@Slf4j
@RequiredArgsConstructor
public class DBFromJsonInit implements ApplicationRunner {
    @Override
    public void run(ApplicationArguments args) {
        // 初始化自定义的数据
        extractedDb();
        // 初始化菜单数据
        extractedMenu();
        log.info("数据初始化完成！");
    }
    //......
}

```
>注意：如果同一张表历史已经有初始化过数据，在某个版本需要新增数据的话，要新增一个.json文件;  
>比如demoV2.json, 如果在原文件直接修改将不生效，加载成功后文件名称将被当作唯一键标识，不会重复初始化。