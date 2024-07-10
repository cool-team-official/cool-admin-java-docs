# 代码生成
系统根据框架特性封装了一个简单的代码生成器

请先参考快速开始，把entity对象创建出来，在通过自动生成代码创建对应的 controller、service、mapper
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