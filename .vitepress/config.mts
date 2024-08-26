import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Cool Admin",
  description: "一个很酷的后台管理系统开发框架",
  lastUpdated: true,

  themeConfig: {
    logo: "/logo.png",
    search: {
      provider: "local",
    },
    footer: {
      message: "COOL为开发者而生",
      copyright:
        '<a href="https://beian.miit.gov.cn">Copyright © COOL | 闽ICP备2024042701号</a>',
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      label: "页面导航",
      level: [2, 3],
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },

    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    editLink: {
      text: "在GitHub上编辑",
      pattern:
        "https://github.com/cool-team-official/cool-admin-java-docs/blob/main/:path",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "介绍", link: "/src/introduce/index.md", noIcon: false },
      { text: "教程", link: "/src/guide/quick.md" },
      { text: "🔥插件市场", link: "https://cool-js.com/plugin" },
      { text: "交流合作", link: "/src/about/index.md" },
      {
        text: "v7.1.0",
        items: [
          {
            text: "更新日志",
            link: "/src/todo/update.md",
          },
          {
            text: "版本计划",
            link: "/src/todo/plan.md",
          },
        ],
      },
      {
        text: "更多",
        items: [
          {
            text: "Cool 官网",
            link: "https://cool-js.com",
          },
          {
            text: "Cool Admin(Nodejs版)",
            link: "https://node.cool-admin.com",
          },
          {
            text: "Cool Admin Vue(前端)",
            link: "https://node.cool-js.com",
          },
          {
            text: "Uni（基于uni-app跨端移动端开发）",
            link: "https://uni-docs.cool-js.com",
          },
        ],
      },
    ],
    sidebar: [
      {
        text: "介绍",
        items: [
          {
            text: "简介",
            link: "/src/introduce/index.md",
          },
          {
            text: "演示",
            link: "/src/introduce/show.md",
          },
          {
            text: "源码",
            link: "/src/introduce/src.md",
          },
        ],
      },
      {
        text: "教程",
        items: [
          { text: "快速开始", link: "/src/guide/quick.md" },
          { text: "目录结构", link: "/src/guide/dir.md" },
          { text: "Ai编码", link: "/src/guide/ai.md" },
          { text: "Ai流程编排", link: "/src/guide/flow.md" },
          { text: "扩展插件", link: "/src/guide/plugin.md" },
          { text: "开发方式", link: "/src/guide/dev.md" },
          {
            text: "核心",
            items: [
              { text: "控制器(controller)", link: "/src/guide/controller.md" },
              { text: "服务(service)", link: "/src/guide/service.md" },
              { text: "数据库(db)", link: "/src/guide/db.md" },
              { text: "缓存(cache)", link: "/src/guide/cache.md" },
              { text: "文件上传(file)", link: "/src/guide/upload.md" },
              { text: "统一异常(exception)", link: "/src/guide/exception.md" },
              { text: "权限校验(security)", link: "/src/guide/security.md" },
              { text: "数据初始化(init)", link: "/src/guide/initData.md" },
              { text: "分布式ID(id)", link: "/src/guide/uniqueIDGen.md" },
              { text: "锁(lock)", link: "/src/guide/lock.md" },
              { text: "请求日志(log)", link: "/src/guide/recordLog.md" },
              { text: "接口文档(swagger)", link: "/src/guide/swagger.md" },
            ],
          },
          { text: "部署项目", link: "/src/guide/deploy.md" },
        ],
      },
      {
        text: "计划&更新",
        items: [
          {
            text: "更新",
            link: "/src/todo/update.md",
          },
          {
            text: "计划",
            link: "/src/todo/plan.md",
          },
        ],
      },
      {
        text: "常见问题",
        link: "/src/question/common.md",
      },
      {
        text: "交流合作",
        link: "/src/about/index.md",
      },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/cool-team-official/cool-admin-java",
      },
    ],
  },
});
