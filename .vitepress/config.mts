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
      { text: "🔥插件市场", link: "https://cool-js.com/plugin/list.html" },
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
            text: "Cool Admin(Nodejs版)",
            link: "https://cool-js.com",
          },
          {
            text: "Uni（基于uni-app跨端移动端开发）",
            link: "https://cool-js.com/uni/introduce.html",
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
          { text: "Ai编码", link: "/src/guide/ai.md" },
          { text: "Ai流程编排", link: "/src/guide/flow.md" },
          { text: "扩展插件", link: "/src/guide/plugin.md" },
          {
            text: "核心",
            items: [
              { text: "Spring Boot3", link: "/src/guide/springboot3.md" },
              { text: "控制器(controller)", link: "/src/guide/controller.md" },
              { text: "缓存", link: "/src/guide/cache.md" },
              { text: "文件上传", link: "/src/guide/upload.md" },
              { text: "统一异常", link: "/src/guide/exception.md" },
              { text: "权限校验", link: "/src/guide/security.md" },
              { text: "数据初始化", link: "/src/guide/initData.md" },
              { text: "代码生成", link: "/src/guide/generatorCode.md" },
              { text: "swagger 文档", link: "/src/guide/swagger.md" },
            ],
          },
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
        link: "/src/question/commonQuestion.md",
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
