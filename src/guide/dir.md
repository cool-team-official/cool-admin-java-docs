# 目录结构

项目按照模块化的方式组织，每个模块都有其特有的功能，清晰明了便于管理。

## 结构

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

::: tip 提示

- core 为核心模块，包括一些核心的组件工具
- modules 为业务模块，业务代码放在这边，在新增功能模块时，按上面的包结构新增即可
  > 比如你有一个订单管理的模块，在 modules 新增一个 order 包，在 order 包下创建 controller、entity、mapper、service 等包

:::
