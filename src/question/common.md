# 常见问题

项目中常见的问题

## 1、找不到类似`xxxTableDef`文件

框架用到了[Mybatis Flex 的 APT 功能](https://mybatis-flex.com/zh/others/apt.html)，在项目编译的时候会自动生成这些文件。

你可以这样做：

- Build 你的项目；
- 执行 maven 的`mvn compile`命令；
- 配置完数据库直接启动；
- 【推荐】开启 idea 的`Build project automatically`自动编译功能（Settings -> Build, Execution, Deployment -> Compiler -> Build Project Automatically）；

这些方式都可以解决这个问题。
