# 文件上传
框架自带两种文件上传方式本地上传与云存储，与前端紧密结合，

前端会根据后端返回的上传模式进行本地上传或者云存储签名直传(不经过服务器，直接上传到对应的云存储)
- 本地上传
- 阿里云oss (通过插件市场搜索OSS，下载安装插件实现[下载插件](https://cool-js.com/plugin/list.html))

# 使用
application.yml

```yaml
cool:
  # 文件上传相关
  file:
    #上传模式
    mode: local
    # 本地上传配置
    local:
      # 文件根地址
      base-url: http://127.0.0.1:${server.port}
      # 可选，文件存放路径 线上环境请用nginx等静态服务器代理
      filePath:
```
动静分离有许多好处，如不占用主服务器带宽，防止上传恶意文件等。

条件允许的话尽量选择云存储上传，如：oss 还可以对图片进行各种如压缩、裁剪、水印等处理，方便一张图片使用在多种场景。
```java
@RequiredArgsConstructor
@Tag(name = "系统通用", description = "系统通用")
@CoolRestController()
public class AdminBaseCommController {
    final private FileUploadStrategyFactory fileUploadStrategyFactory;

    @Operation(summary = "文件上传")
    @PostMapping(value = "/upload", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE,
        MediaType.ALL_VALUE})
    public R upload(
        @RequestPart(value = "file", required = false) @Parameter(description = "文件") MultipartFile[] files,
        HttpServletRequest request) {
        return R.ok(fileUploadStrategyFactory.upload(files, request));
    }

    @Operation(summary = "文件上传模式")
    @GetMapping("/uploadMode")
    public R uploadMode() {
        return R.ok(fileUploadStrategyFactory.getMode());
    }
}
```
