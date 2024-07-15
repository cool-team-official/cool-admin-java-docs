# 开发方式

Cool Admin 推荐两种快速开发方式，可以大大节省开发时间，降低开发成本，提高开发效率。

## Ai 全自动

零代码开发(非低代码)，通过微调大模型学习框架特有写法，实现简单功能从 Api 接口到前端页面的一键生成

![](/show/code.png){data-zoomable}

开发过程只需点一点，调一调，不用写一行代码

[B 站视频教程](https://www.bilibili.com/video/BV1Hm421g7Br/?)

## 半自动

只需三步，创建实体类生成表，生成后端代码，生成前端代码

- 编写实体类，重启生成表；
- 运行代码生成器，生成 Service、Controller 等

文件：`src/test/java/com/cool/CoolAdminJavaApplicationTests.java`

```java
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

- 自动生成前端页面，通过管理后台菜单管理的快速创建即可生成

Ui 组件会根据字段智能选择

![](/guide/gen-vue.png)
