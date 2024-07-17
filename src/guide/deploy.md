# 项目部署

[🔥 低价云服务器推荐](https://cool-js.com/service/cloud)

::: tip 注意
以下教程以 Nodejs 版本为例，Java 版本的也可以参考
:::

## 普通方式

本部署教程以 node 版本+宝塔为例，其他部署方式也可以参考这个流程。

[cool-admin 部署视频教程](https://www.bilibili.com/video/BV1m1421S7tm/)

#### 1、部署流程(以宝塔为例)：

1. 拉取前后端代码；
2. 本地配置完数据库运行，等待数据库初始化完成；
3. 打包前后端代码，打包之前注意配置生产环境的数据库配置`config/config.prod.ts`，[查看 midway 官方多环境配置文档](http://www.midwayjs.org/docs/env_config)；
4. 服务器环境准备，安装宝塔、mysql、nodejs、nginx、pnpm 等；
5. 上传前后端代码到服务器；
6. 安装依赖，编译打包后端服务，启动服务；
7. 配置 nginx 反向代理；
8. 访问域名，如果一切正常，恭喜你，部署成功！

::: warning 注意

- 线上的数据库是需要本地传上去的，安全考虑生产环境不会自动初始化数据库；
- 前端访问后端的接口地址默认是前端根地址+/api，所以需要配置 nginx 反向代理/api 到后端服务；

:::

#### 2、推荐使用 pnpm 安装依赖

[pnpm 官网](https://pnpm.io/)

安装

```bash
npm install -g pnpm
```

配置淘宝镜像

```bash
pnpm config set registry https://registry.npmmirror.com
```

#### 3、PM2 运行后端服务

```shell
// 命令行安装 pm2
npm install pm2 -g
```

常用命令

```shell
// 启动一个服务
pm2 start
// 列出当前的服务
pm2 list
// 停止某个服务
pm2 stop
// 重启某个服务
pm2 restart
// 删除某个服务
pm2 delete
// 查看服务的输出日志
pm2 logs
```

cluster 方式启动

```shell
// -i 表示 number-instances 实例数量
// max 表示 PM2将自动检测可用CPU的数量 可以自己指定数量
pm2 start ./bootstrap.js -i max --name cool-admin(改成自己的应用名称)

// 重启
pm2 restart cool-admin
```

日志

```shell
pm2 logs cool-admin

// 默认的日志位置
/root/.pm2/logs
```

#### 4、nginx 配置示例

```ts
upstream cool {
        server 127.0.0.1:8001;
    }
server
{
    ...
    # 前端打包完放这边
    root /home/test/front;

    # 防止刷新404
    location / {
    try_files $uri $uri/ /index.html;
    }

    # 代理服务端地址  访问/api 表示访问服务端接口而不是静态资源
    location /api/
    {
        proxy_pass http://cool/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header REMOTE-HOST $remote_addr;

        proxy_cache_bypass no_cache;

        #缓存相关配置
        #proxy_cache cache_one;
        #proxy_cache_key $host$request_uri$is_args$args;
        #proxy_cache_valid 200 304 301 302 1h;

        #持久化连接相关配置
        proxy_connect_timeout 3000s;
        proxy_read_timeout 86400s;
        proxy_send_timeout 3000s;
        #proxy_http_version 1.1;
        #proxy_set_header Upgrade $http_upgrade;
        #proxy_set_header Connection "upgrade";

        add_header X-Cache $upstream_cache_status;

        #expires 12h;
    }

    # socket需额外配置
    location /socket {
        proxy_pass http://cool/socket;
        proxy_connect_timeout 3600s; #配置点1
        proxy_read_timeout 3600s; #配置点2,如果没效,可以考虑这个时间配置长一点
        proxy_send_timeout 3600s; #配置点3
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header REMOTE-HOST $remote_addr;
        #proxy_bind $remote_addr transparent;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        rewrite /socket/(.*) /$1 break;
        proxy_redirect off;

    }
}
```

## Docker 方式

docker 部署的配置方式可以参考普通的部署方式，以下是 docker 部署的简单流程；

[cool-admin 部署视频教程（Docker 方式）](https://www.bilibili.com/video/BV14z421f7S9/)

#### 1、部署流程(以宝塔为例)：

1. 拉取前后端代码；
2. 本地配置完数据库运行，等待数据库初始化完成；
3. 打包后端和前端镜像；
4. 创建 docker network；
5. docker 运行后端和前端；
6. 访问如果登录页正常出现验证码，恭喜你，部署成功！

#### 2、打包镜像

::: warning 注意
打包镜像之前，需要确保前端和后端在本地运行过一次，让前端能够自动生成`eps.json`文件，该文件是前端自动扫描后端接口生成的，有了该文件，前端不需要特意写调用接口的 service。

如果你是自动化部署，你需要把生成的`eps.json`也提交到代码仓库，否则你将无法正常访问你的 api 接口。
:::

```shell
// 创建docker network
docker network create cool

// 打包后端镜像
docker build -t cool-admin-midway:1.0 .

// 打包前端镜像
docker build -t cool-admin-vue:1.0 .

```

#### 3、运行

```shell
// 运行后端
docker run --network cool -p 8001:8001 --name midway cool-admin-midway:1.0

// 运行后端
docker run --network cool -p 80:80 --name vue cool-admin-vue:1.0

```

#### 注意事项

docker 部署，建议将缓存换成 redis，文件上传换成云存储，如：oss，防止操作不当导致的数据丢失。
