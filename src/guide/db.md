# 数据库

Cool Admin 集成了比 [Mybatis-Plus](https://baomidou.com/) 更加强大的，[Mybatis-Flex](https://mybatis-flex.com/)，详细用法请查看
[Mybatis-Flex 官网文档](https://mybatis-flex.com/)

主要特点；

- 更轻量：除了 MyBatis 本身，再无任何第三方依赖，因此会带来更高的自主性、把控性和稳定性。在任何一个系统中，依赖越多，稳定性越差。

- 更灵活：提供了非常灵活的 QueryWrapper，支持关联查询、多表查询、多主键、逻辑删除、乐观锁更新、数据填充、数据脱敏等等。

- 高性能：通过独特的架构，没有任何 MyBatis 拦截器、在 SQL 执行的过程中，没有任何的 SQL Parse，因此会带来指数级的性能增长。

## 功能对比

| 功能或特点                                                                            | MyBatis-Flex | MyBatis-Plus       | Fluent-MyBatis |
| ------------------------------------------------------------------------------------- | ------------ | ------------------ | -------------- |
| 对 entity 的基本增删改查                                                              | ✅           | ✅                 | ✅             |
| 分页查询                                                                              | ✅           | ✅                 | ✅             |
| 分页查询之总量缓存                                                                    | ✅           | ✅                 | ❌             |
| 分页查询无 SQL 解析设计（更轻量，及更高性能）                                         | ✅           | ❌                 | ✅             |
| 多表查询： from 多张表                                                                | ✅           | ❌                 | ❌             |
| 多表查询： left join、inner join 等等                                                 | ✅           | ❌                 | ✅             |
| 多表查询： union，union all                                                           | ✅           | ❌                 | ✅             |
| 单主键配置                                                                            | ✅           | ✅                 | ✅             |
| 多种 id 生成策略                                                                      | ✅           | ✅                 | ✅             |
| 支持多主键、复合主键                                                                  | ✅           | ❌                 | ❌             |
| 字段的 typeHandler 配置                                                               | ✅           | ✅                 | ✅             |
| 除了 MyBatis，无其他第三方依赖（更轻量）                                              | ✅           | ❌                 | ❌             |
| QueryWrapper 是否支持在微服务项目下进行 RPC 传输                                      | ✅           | ❌                 | 未知           |
| 逻辑删除                                                                              | ✅           | ✅                 | ✅             |
| 乐观锁                                                                                | ✅           | ✅                 | ✅             |
| SQL 审计                                                                              | ✅           | ❌                 | ❌             |
| 数据填充                                                                              | ✅           | ✅                 | ✅             |
| 数据脱敏                                                                              | ✅           | ✔️ **（收费）**    | ❌             |
| 字段权限                                                                              | ✅           | ✔️ **（收费）**    | ❌             |
| 字段加密                                                                              | ✅           | ✔️ **（收费）**    | ❌             |
| 字典回写                                                                              | ✅           | ✔️ **（收费）**    | ❌             |
| Db + Row                                                                              | ✅           | ❌                 | ❌             |
| Entity 监听                                                                           | ✅           | ❌                 | ❌             |
| 多数据源支持                                                                          | ✅           | 借助其他框架或收费 | ❌             |
| 多数据源是否支持 Spring 的事务管理，比如 `@Transactional` 和 `TransactionTemplate` 等 | ✅           | ❌                 | ❌             |
| 多数据源是否支持 "非 Spring" 项目                                                     | ✅           | ❌                 | ❌             |
| 多租户                                                                                | ✅           | ✅                 | ❌             |
| 动态表名                                                                              | ✅           | ✅                 | ❌             |
| 动态 Schema                                                                           | ✅           | ❌                 | ❌             |

::: warning 注意
以上内容来自第三方相关产品的官方文档或第三方平台，若有错误，欢迎纠正。
:::

## 支持数据库

MyBatis-Flex 支持的数据库类型，如下表格所示，我们还可以通过自定义方言的方式，持续添加更多的数据库支持。

| 数据库        | 描述                    |
| ------------- | ----------------------- |
| mysql         | MySQL 数据库            |
| mariadb       | MariaDB 数据库          |
| oracle        | Oracle11g 及以下数据库  |
| oracle12c     | Oracle12c 及以上数据库  |
| db2           | DB2 数据库              |
| H2            | H2 数据库               |
| hsql          | HSQL 数据库             |
| sqlite        | SQLite 数据库           |
| postgresql    | PostgreSQL 数据库       |
| sqlserver2005 | SQLServer2005 数据库    |
| sqlserver     | SQLServer 数据库        |
| dm            | 达梦数据库              |
| xugu          | 虚谷数据库              |
| kingbasees    | 人大金仓数据库          |
| phoenix       | Phoenix HBase 数据库    |
| gauss         | Gauss 数据库            |
| clickhouse    | ClickHouse 数据库       |
| gbase         | 南大通用(华库)数据库    |
| gbase-8s      | 南大通用数据库 GBase 8s |
| oscar         | 神通数据库              |
| sybase        | Sybase ASE 数据库       |
| OceanBase     | OceanBase 数据库        |
| Firebird      | Firebird 数据库         |
| derby         | Derby 数据库            |
| highgo        | 瀚高数据库              |
| cubrid        | CUBRID 数据库           |
| goldilocks    | GOLDILOCKS 数据库       |
| csiidb        | CSIIDB 数据库           |
| hana          | SAP_HANA 数据库         |
| impala        | Impala 数据库           |
| vertica       | Vertica 数据库          |
| xcloud        | 行云数据库              |
| redshift      | 亚马逊 redshift 数据库  |
| openGauss     | 华为 openGauss 数据库   |
| TDengine      | TDengine 数据库         |
| informix      | Informix 数据库         |
| greenplum     | Greenplum 数据库        |
| uxdb          | 优炫数据库              |
| Doris         | Doris 数据库            |
| Hive SQL      | Hive 数据库             |
| lealone       | Lealone 数据库          |
| sinodb        | 星瑞格数据库            |

::: warning 注意
虽然 Mybatis-flex 支持很多数据库，但是 Cool Admin 是具体的业务框架，无法做到全部支持，那样工作量太大了。但是它为我们提供了改造的可能，理论上你只需修改一些不兼容的代码就可以正常运行了。

除了 Mysql，我们正在适配：`PostgreSQL`、`Sqlite`
:::

## 自动建表

根据 Java 实体，自动映射成数据库的表结构。

用过 JPA 的都知道，JPA 有一项重要的能力就是表结构自动维护，这让我们可以可以专注于业务逻辑和实体，而不需要关心数据库的表、列的配置，尤其是开发过程中频繁的新增表及变更表结构，节省了大量手动工作。

框架集成了[Auto Table](https://autotable.tangzc.com/)，可以自动创建表，并且支持表字段的修改。

::: warning 注意
切勿在生产环境开启自动建表功能，因为这可能会造成数据丢失。
:::
