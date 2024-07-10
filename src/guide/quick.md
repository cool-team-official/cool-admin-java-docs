# 快速开始

## 前置准备

- Java Jdk >= 17 选择 GraalVM
- Mysql >= 5.7
- Maven >= 3.0

## 运行系统

- 1、[拉取前后端代码到本地](/src/introduce/src.html)。
- 2、选择你熟悉的开发工具，打开你的项目。
- 3、确保打开的项目有Maven依赖，如没有具体参考[IDEA导入Maven项目右侧没有Maven](/src/question/commonQuestion.md#IDEA导入Maven项目右侧没有Maven)。
- 4、打开项目运行 <font color=4364CF>com.cool.CoolApplication.java</font>，出现如下日志表示启动成功。

```
2024-05-25T00:11:36.475+08:00  INFO 8321 --- [cool-admin-java] [uartzScheduler]] o.s.s.quartz.SchedulerFactoryBean        : Starting Quartz Scheduler now, after delay of 2 seconds
2024-05-25T00:11:36.475+08:00  INFO 8321 --- [cool-admin-java] [uartzScheduler]] org.quartz.core.QuartzScheduler          : Scheduler quartzScheduler_$_NON_CLUSTERED started.
2024-05-25T00:11:36.717+08:00  INFO 8321 --- [cool-admin-java] [nio-8001-exec-1] o.springdoc.api.AbstractOpenApiResource  : Init duration for springdoc-openapi is: 1044 ms
2024-05-25T00:11:40.195+08:00  INFO 8321 --- [cool-admin-java] [pool-3-thread-1] com.cool.core.eps.CoolEps                : 初始化eps
```

- 5、[启动前端系统](https://cool-js.com/admin/vue/introduce.html#%E4%BB%A3%E7%A0%81%E4%BB%93%E5%BA%93)
- 6、访问[http://127.0.0.1:9100](http://127.0.0.1:9100)
  默认账户密码
> 账户：admin  
> 密码：123456

## 项目包结构

```
.
main
├─ java
│  ├─ com.cool
│  ├─ core             核心包
│  │  ├─ annotation
│  │  └─ ...
│  ├─ modules          模块包
│  │  ├─ base              基础模块（系统用户、菜单、资源、角色）
│  │  │  ├─ controller
│  │  │  ├─ entity
│  │  │  ├─ mapper
│  │  │  └─ service
│  │  ├─ dict              字段模块
│  │  ├─ plugin            插件模块
│  │  ├─ recycle           数据回收站模块
│  │  ├─ space             文件管理模块
│  │  ├─ task              定时任务模块
│  │  └─ user              用户管理模块(c端用户)
│  └─ CoolApplication
└─ resources           资源文件
   ├─ cool
   │  └─ data
   │     └─ db         初始化数据json文件
   └─ mapper           mapper xml 文件
```

- core 为核心模块，包括一些核心的组件工具
- modules 为业务模块，业务代码放在这边，在新增功能模块时，按上面的包结构新增即可
  > 比如你有一个订单管理的模块，在 modules 新增一个 order 包，在 order 包下创建 controller、entity、mapper、service 等包

## 表结构创建

无需手动创建表结构，启动项目时会自动生成表结构
在 modules 包下新建一个 demo 模块，把 DemoEntity 实体创建出来

```java
package com.cool.modules.demo.entity;
import com.cool.core.base.BaseEntity;
import com.mybatisflex.annotation.Table;
import com.tangzc.mybatisflex.autotable.annotation.ColumnDefine;
import com.tangzc.autotable.annotation.Index;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Table(value = "demo", comment = "demo实体")
public class DemoEntity extends BaseEntity<DemoEntity> {
    @ColumnDefine(comment = "头像", notNull = true)
    private String headImg;

    @Index
    @ColumnDefine(comment = "名字", notNull = true)
    private String name;

    @ColumnDefine(comment = "年龄", defaultValue = "18")
    private Integer age;

    @ColumnDefine(comment = "手机号", notNull = true)
    private String phone;

    @ColumnDefine(comment = "介绍", type = "text")
    private String introduce;
}
```
无需手动添加数据库字段，只需修改实体对象就能自动添加表字段  
请参考 [AutoTable](https://autotable.tangzc.com/) 由该框架实现 
> 注意: <font color=red>默认仅开发环境开启该功能，如无调整生产环境需手动创建表结构</font>

## 第一个 CRUD

实体创建完成后，通过 运行以下代码(在 test 包下)

将在 com.cool.modules 下生成 demo 包且自动生成对应的 controller、service、mapper 文件

```
package com.cool;

import com.cool.core.code.CodeGenerator;
import com.cool.core.code.CodeModel;
import com.cool.core.code.CodeTypeEnum;
import com.cool.modules.demo.entity.DemoEntity;

public class CoolCodeGeneratorTest {
    public static void main(String[] args) {
        CodeGenerator codeGenerator = new CodeGenerator();
        codeGenerator.init();

        CodeModel codeModel = new CodeModel();
        codeModel.setType(CodeTypeEnum.ADMIN);
        codeModel.setName("测试CURD");
        codeModel.setModule("demo");
        codeModel.setEntity(DemoEntity.class);

        codeGenerator.controller(codeModel);
        codeGenerator.mapper(codeModel);
        codeGenerator.service(codeModel);
    }
}
```

## 配置数据库信息

/resources/application-local.yml(开发环境)   
  
/resources/application-prod.yml(生成环境)

```yaml
spring:
  datasource:
    url: jdbc:mysql://127.0.0.1:3306/cool?useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT%2b8
    username: root
    password: 123456
```
