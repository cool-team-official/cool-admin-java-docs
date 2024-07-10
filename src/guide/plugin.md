# 扩展插件

为了丰富系统功能，我们提供了插件系统，可以通过插件的方式来扩展系统功能。  
  
而不用一味地堆功能，导致系统臃肿。你可以自己开发插件，也可以使用别人开发的插件。 或者通过官网[下载插件](https://cool-js.com/plugin/list.html)。

## 使用插件

### 1、安装
首先下载插件包，然后在系统中安装插件包。插件包可以通过官网[下载插件](https://cool-js.com/plugin/list.html)。

打开后台管理系统，点击左侧菜单扩展管理->插件管理，点击+按钮，选择插件包进行安装。

### 2、调用
安装插件之后，就可以在代码中调用插件的方法了。

```java
package com.cool.core;

import com.cool.core.plugin.service.CoolPluginService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class JarLoaderController {

    @Resource
    private CoolPluginService coolPluginService;

    @PostMapping("/loadJar/invokeMethod")
    public String invokeMethod(@RequestParam String className, @RequestParam String methodName) {
        String[] params = new String[1];
        params[0] = "COOL";
        Object result = coolPluginService.invokePlugin("demoCoolPlugin", params);
        System.out.println(result);
        return "Dynamic method invoked successfully! Result: " + result;
    }
}
```
运行结果
```
2024-06-29T03:14:54.610+08:00  INFO 9158 --- [cool-admin-java] [nio-8001-exec-5] c.c.c.plugin.service.CoolPluginService   : 调用插件类: demo-plugin, 方法: invokePlugin 参数: [[COOL, COOL1]]
汉字：COOL，拼音：COOL
2024-06-29T03:14:54.621+08:00  INFO 9158 --- [cool-admin-java] [nio-8001-exec-5] com.cool.core.plugin.BaseCoolPlugin      : 调用主应用: coolCache, 方法: get 参数: [verify:img:4fd03504-47ac-4b57-b8e4-3c64059230d0]
缓存结果：vQV3
```

对应插件内的方法

```java
package com.cool.plugin;

import com.cool.core.annotation.CoolPlugin;
import com.cool.core.plugin.BaseCoolPlugin;
import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;

/**
 * - 类必须要有 @CoolPlugin 注解，一个插件jar有且只能有一个类被 @CoolPlugin 注解
 * - 类必须继承 BaseCoolPlugin, 并实现 invokePlugin 插件方法
 */
@CoolPlugin
public class DemoCoolPlugin extends BaseCoolPlugin {

    @Override
    public Object invokePlugin(String... params) {
        String chineseChar = params[0]; // 汉字字符
        HanyuPinyinOutputFormat format = new HanyuPinyinOutputFormat();
        format.setToneType(HanyuPinyinToneType.WITHOUT_TONE); // 不带声调

        String pinyin = null;
        try {
            pinyin = PinyinHelper.toHanyuPinyinString(chineseChar, format, "");
        } catch (BadHanyuPinyinOutputFormatCombination e) {
            throw new RuntimeException(e);
        }
        System.out.println("汉字：" + chineseChar + "，拼音：" + pinyin);
        Object cache = invokeMain("coolCache", "get", "verify:img:4fd03504-47ac-4b57-b8e4-3c64059230d0");
        System.out.println("缓存结果：" +  cache);
        return String.format("hello，%s 我是插件", chineseChar);
    }
}
```
其中我们可以在插件包里通过 invokeMain 方法去调用主应用的一些对象方法

比如 coolCache 缓存对象, 通过反射实现

在加载jar包时会想该插件注入ApplicationContext，使得可以在插件中获取主应用中的bean

### 3、配置
有时候开发时的配置和生产环境的配置是不一样的，我们可以通过配置文件来实现。

例如原本的配置文件是这样的
```json
{
	"appId": "xxxxx",
	"appSecret": "xxxxx",
	"filePath": "classpath:cool/xxx.txt"
}
```
其中 classpath 为到resources资源目录下查找文件

## 开发插件
### 1、脚手架
为了方便开发插件和统一插件开发规范，我们提供了插件脚手架，可以快速开发我们的插件。

### 2、目录结构
```
.
main
├─ java
│  └─ com.cool
│      ├─core           核心包  
│      │  ├─ annotation  
│      │  └─ ...
│      └─ plugin  
│           └─ ...插件包，插件类放在这个包下
├─ resources
│       └─ plugin.json 插件信息配置文件
└──pom.xml
```
### 3、开发过程
- 配置插件信息(plugin.json)
```json
{
  "name": "测试",
  "key": "demo-plugin",
  "hook": "",
  "version": "1.0.0",
  "description": "插件描述",
  "author": "作者",
  "logo": "assets/logo.png",
  "readme": "assets/README.md",
  "config": {
    "aaa": "xxx",
    "bbb": "xxx"
  }
}
```
config 是插件的配置信息，不同的插件有不同的配置，上面只是个例子，实际开发中可以根据自己的需求来配置,在后台插件管理里可以动态修改

### 4、字段解释

| 字段          | 说明                      |
|-------------|-------------------------|
| name        | 角色数组                    |
| key         | 插件唯一标识                  |
| hook        | 插件钩子，比如替换系统的上传组件，upload |
| version     | 版本号                     |
| description | 插件描述                    |
| author      | 作者                      |
| logo        | 插件 logo，建议尺寸 256x256    |
| readme      | 插件介绍，会展示在插件的详情中         |
| config      | 插件配置， 每个插件的配置各不相同       |

## 插件详解
```java
package com.cool.plugin;

import com.cool.core.annotation.CoolPlugin;
import com.cool.core.plugin.BaseCoolPlugin;
import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;

/**
 * - 类必须要有 @CoolPlugin 注解，一个插件jar有且只能有一个类被 @CoolPlugin 注解
 * - 类必须继承 BaseCoolPlugin
 */
@CoolPlugin
public class DemoCoolPlugin extends BaseCoolPlugin {

    @Override
    public Object invokePlugin(String... params) {
        String chineseChar = params[0]; // 汉字字符
        HanyuPinyinOutputFormat format = new HanyuPinyinOutputFormat();
        format.setToneType(HanyuPinyinToneType.WITHOUT_TONE); // 不带声调

        String pinyin = null;
        try {
            pinyin = PinyinHelper.toHanyuPinyinString(chineseChar, format, "");
        } catch (BadHanyuPinyinOutputFormatCombination e) {
            throw new RuntimeException(e);
        }
        System.out.println("汉字：" + chineseChar + "，拼音：" + pinyin);
        Object cache = invokeMain("coolCache", "get", "verify:img:4fd03504-47ac-4b57-b8e4-3c64059230d0");
        return String.format("hello，%s 我是插件", chineseChar);
    }
}
```


- 类必须要有 @CoolPlugin 注解，一个插件jar有且只能有一个类被 @CoolPlugin 注解
- 类必须继承 BaseCoolPlugin, 并实现 invokePlugin 插件方法
  满足以上条件，在插件导入时才能被识别到。

在开发过程中如果需要引入第三方类库，可使用maven引入依赖，如我们这边示例使用到了中文转拼音
```xml
<dependency>
    <groupId>com.belerweb</groupId>
    <artifactId>pinyin4j</artifactId>
    <version>2.5.0</version>
</dependency>
```
在我们脚手架上你可以发现，我们还引入了其他包 springframework、hutool 等，这会使得打包结果很臃肿，这边使用到了
maven-shade-plugin maven插件可以在打包的时候将在我们 cool-admin-java 主应用项目已经有的依赖给排除掉，避免打包结果过大

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-shade-plugin</artifactId>
            <version>3.2.4</version>
            <executions>
                <execution>
                    <phase>package</phase>
                    <goals>
                        <goal>shade</goal>
                    </goals>
                    <configuration>
                        <artifactSet>
                            <excludes>
                                <!--主应用以有这些依赖，打包时可以排除-->
                                <exclude>org.springframework:spring-beans</exclude>
                                <exclude>org.springframework:spring-core</exclude>
                                <exclude>org.springframework:spring-jcl</exclude>
                                <exclude>org.springframework:spring-context</exclude>
                                <exclude>org.springframework:spring-aop</exclude>
                                <exclude>org.springframework:spring-expression</exclude>
                                <exclude>io.micrometer:micrometer-observation:jar</exclude>
                                <exclude>io.micrometer:micrometer-commons:jar</exclude>
                                <exclude>jakarta.annotation:jakarta.annotation-api</exclude>
                                <exclude>org.slf4j:slf4j-api</exclude>
                                <exclude>org.projectlombok:lombok</exclude>
                                <exclude>cn.hutool:hutool-core</exclude>
                                <exclude>cn.hutool:hutool-json</exclude>
                                <exclude>org.springframework:spring-beans</exclude>
                                <exclude>io.micrometer:micrometer-observation</exclude>
                                <exclude>io.micrometer:micrometer-commons</exclude>
                            </excludes>
                        </artifactSet>
                    </configuration>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```
在执行打包的过程，可以在打包日志中查看我们排除和引入了哪些包
- Including 为引入
- Excluding 为排除引入
```
[INFO] --- maven-shade-plugin:3.2.4:shade (default) @ cool-admin-java-plugin ---
[INFO] Including com.belerweb:pinyin4j:jar:2.5.0 in the shaded jar.
[INFO] Excluding org.springframework:spring-beans:jar:6.1.6 from the shaded jar.
[INFO] Excluding org.springframework:spring-core:jar:6.1.6 from the shaded jar.
[INFO] Excluding org.springframework:spring-jcl:jar:6.1.6 from the shaded jar.
[INFO] Excluding org.springframework:spring-context:jar:6.1.6 from the shaded jar.
[INFO] Excluding org.springframework:spring-aop:jar:6.1.6 from the shaded jar.
[INFO] Excluding org.springframework:spring-expression:jar:6.1.6 from the shaded jar.
[INFO] Excluding io.micrometer:micrometer-observation:jar:1.12.5 from the shaded jar.
[INFO] Excluding io.micrometer:micrometer-commons:jar:1.12.5 from the shaded jar.
[INFO] Excluding jakarta.annotation:jakarta.annotation-api:jar:2.1.1 from the shaded jar.
[INFO] Excluding org.slf4j:slf4j-api:jar:2.0.13 from the shaded jar.
[INFO] Excluding org.projectlombok:lombok:jar:1.18.32 from the shaded jar.
[INFO] Excluding cn.hutool:hutool-core:jar:5.8.26 from the shaded jar.
[INFO] Excluding cn.hutool:hutool-json:jar:5.8.26 from the shaded jar.
```

## 打包
打包命令
```
mvn clean package
```
打包结果, 在 target目录下 .cool后缀的文件，就是我们的插件包
```
target/cool-admin-java-plugin-1.0-SNAPSHOT.cool
```

## 安装插件
在后台插件管理页面，安装插件将打包好的.cool文件上传。

## 实现原理
- 动态加载 Jar 包
> 实现动态加载的技术方案  
在 SpringBoot 中实现动态加载 Jar 包：
URLClassLoader 是 Java 标准库中提供的一个类加载器，它可以加载指定的 URL 资源，包括本地文件系统、远程服务器和 JAR 文件等。  
通过 URLClassLoader，我们可以在运行时动态地加载外部的 Jar 包或类。

- 优势：
> 1、灵活性高：可以动态指定 Jar 包的位置和版本。  
> 2、可控性强：可以通过代码控制加载、卸载和替换 Jar 包。

实现方法：
```java
URL jarUrl = new URL("jar:file:" + new File(jarFilePath).getAbsolutePath() + "!/");
DynamicJarClassLoader dynamicJarClassLoader = new DynamicJarClassLoader(new URL[]{jarUrl}, Thread.currentThread().getContextClassLoader());
```
动态加载 Jar 包具有以下几个显著的优势：

- 1、灵活性: 动态加载允许应用程序在运行时根据需求加载、卸载和替换 Jar 包或其内部的类和资源，提供了极大的灵活性。
- 2、可维护性: 通过动态加载，可以将应用程序的核心逻辑和配置分离，使得代码更加清晰、模块化，提高了代码的可维护性。
- 3、热更新: 动态加载使得应用程序能够在不停机的情况下进行热更新，大大提高了系统的可用性和稳定性。
- 4、扩展性: 通过动态加载，可以轻松地添加新的功能模块或服务，实现应用程序的快速扩展和升级。
