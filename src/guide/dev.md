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

AI分析模式下，Ui 组件会根据字段智能选择。

不使用AI分析模式时，将根据字段命名匹配合适的UI组件。
具体配置可[参考](  https://service.cool-js.com/api/app/base/comm/param?key=epsFieldType )

以下是部分示例：

| UI组件 | Html 标签 | 介绍 | 字段匹配规则                                                                          | 分组规则 |
| --- |---------| --- |---------------------------------------------------------------------------------|------------|
| 省市区选择器 | pca | 用户选择省市区 |                                                                                 |  ["province","city","district"] | 
| 文本输入 | input | 文本编辑框 |                                                                                 |  | 
| 文本域 | textarea | 多行文本编辑框 | 以["remark","desc","address","addr"]结尾                                           |  | 
| 富文本编辑器 | editor-rich | 用于文章,商品详情的编辑 | 以["rich","text","html","content","introduce"]结尾                                 |  | 
| 代码编辑器 | coding | 用于开发人员编写代码,支持多种语言,支持代码高亮,支持代码格式化 | 以["code","codes"]结尾                                                             |  | 
| 数字输入 | input-number | 数字输入编辑框 | 以["num","price","age","amount","stock"]结尾                                       |  | 
| 日期选择器 | date | 用户选择 年-月-日 | 以["date","day"]结尾                                                               |  | 
| 日期范围选择器 | daterange | 用户选择起始 年-月-日 | 以["dates","dateRange","dateScope"]结尾                                            |  | 
| 时间选择器 | datetime | 用户选择 时:分:秒 | 以["time"]结尾                                                                     |  | 
| 时间范围选择器 | datetimerange | 用户选择起始 年-月-日 时:分:秒 | 以["times","timeRange","timeScope"]结尾                                            |  | 
| 单图上传 | upload-img | 用户上传单张图片，如：头像、logo、封面 | 以["avatar","img","image","pic","photo","picture","head","icon"]结尾               |  | 
| 多图上传 | upload-img-multiple | 用户上传多张图片， 如：照片、图片 | 以["avatars","imgs","images","pics","photos","pictures","heads","icons"]结尾       |  | 
| 单个文件上传 | upload-file | 用户上传单个文件 | 以["file","attachment","attach","url","video","music"]结尾                         |  | 
| 多个文件上传 | upload-file-multiple | 用户上传多个文件 | 以["files","Files","attachments","attachs","urls","videos","musics"]结尾 |  | 
| 状态选择器 | switch | 用户开启或者关闭操作，如：是否启用、是否推荐、是否默认、置顶、启用禁用等 | 以["enable","switch","isDefault"]结尾                                     |  | 
| 评分选择器 | rate | 用户评分 | 以["star","stars"]结尾                                                    |  | 
| 滑块选择器 | progress | 在一个固定区间内进行选择， 如：进度 | 以["progress","Progress"]结尾                                                      |  | 
| 单选框 | radio | 在一组备选项中进行单选，如：审批状态 | 以["status","mode","type","Type","classify","category"]结尾                    |  | 
| 多选框 | checkbox | 适用于选项比较少的情况，在一组备选项中进行多选， 如：学历、爱好等 | 以["types","classifys","categorys"]结尾                                    |  | 
| 下拉框 | select | 适用于当选项过多时，使用下拉菜单展示并选择内容，如：分类、标签等 |                                                                                 |  | 

![](/guide/gen-vue.png)
