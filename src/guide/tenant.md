# 多租户（v8.0新增）
多租户（Multi-tenancy）是一种软件架构模式，允许单个应用实例服务多个租户（客户组织）。每个租户的数据是相互隔离的，但共享同一个应用程序代码和基础设施。

# 主要特点

- 数据隔离: 确保不同租户之间的数据严格分离，互不可见
- 资源共享: 多个租户共享同一套应用程序代码和基础设施
- 独立配置: 每个租户可以有自己的个性化配置和定制化需求
- 成本优化: 通过资源共享降低运营和维护成本

# 实现

## 1、数据隔离
多租户的数据隔离有许多种方案，但最为常见的是以列进行隔离的方式。Cool Admin 通过在TenantEntity中加入指定的列（租户ID tenantId）对数据进行隔离。

如果登录的用户token信息有携带tenantId，则框架会自动注入tenantId。

# 使用
## 1、开启多租户
框架默认关闭多租户，需要手动开启 enable修改为 true
```yaml
# Cool相关配置
cool:
  multi-tenant:
    # 是否开启多租户，默认关闭
    enable: false
```
关于tenantId的使用请参考 [mybatis-flex](https://mybatis-flex.com/zh/core/multi-tenancy.html)

## 2、继承对象调整
对于需要租户隔离的表，需要对应的表实体继承对象进行调整 BaseEntity -> TenantEntity