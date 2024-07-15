# 快速开始

开始使用 Cool-Admin！！！

## 环境准备

- Java Jdk >= 17 (注意：选择 GraalVM)
- Mysql >= 5.7 (推荐 8.0)
- Maven >= 3.6 (推荐 3.9)

## 运行系统

### 1、拉取源码

项目是前后端分离的，需要分别拉取前后端代码到本地，[源码仓库](/src/introduce/src.html)

### 2、配置数据库

后端修改数据库配置，配置文件位于`src/resources/application-local.yml`

以 Mysql 为例，其他数据库适配中...

Mysql(`>=5.7版本`)，建议 8.0，首次启动会自动初始化并导入数据

```yaml
# mysql，驱动已经内置，无需安装
spring:
  datasource:
    url: jdbc:mysql://127.0.0.1:3306/cool?useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT%2b8
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver
```

### 3、启动后端服务

启动文件：`src/main/java/com/cool/CoolApplication.java`，控制台打印出下面信息，说明后端服务启动成功

```
2024-07-15T14:38:45.382+08:00  INFO 31908 --- [cool-admin-java] [           main] c.c.c.plugin.service.CoolPluginService   : 没有可初始化的插件
2024-07-15T14:38:45.383+08:00  INFO 31908 --- [cool-admin-java] [           main] com.cool.core.eps.EpsEvent               : 构建eps信息
2024-07-15T14:38:45.941+08:00  INFO 31908 --- [cool-admin-java] [         task-1] o.springdoc.api.AbstractOpenApiResource  : Init duration for springdoc-openapi is: 556 ms
2024-07-15T14:38:46.101+08:00  INFO 31908 --- [cool-admin-java] [pool-3-thread-1] com.cool.core.eps.CoolEps                : 初始化eps完成，服务启动成功，端口：8001
```

访问：[http://127.0.0.1:8001](http://127.0.0.1:8001)，你将会看到后端的欢迎页面

![](/guide/run.png)

### 4、启动前端服务

在项目根目录下(跟 package.json 同级)执行命令：

```shell
# 安装依赖
npm install
# 启动
npm run dev
```

访问[http://127.0.0.1:9000/](http://127.0.0.1:9000/)
默认账户密码

> 账户：admin  
> 密码：123456

![](/show/admin.png)
