# http-proxy-to-socks

[![build](https://api.travis-ci.org/oyyd/http-proxy-to-socks.svg?branch=master)](https://travis-ci.org/oyyd/http-proxy-to-socks)

hpts(http-proxy-to-socks)是node上，将socks proxy转换成http proxy的工具。

npm，atom/apm，docker images以及iOS的代理设置等我们常用的工具在发送请求时往往支持http proxy代理来加快网络请求或解决网络问题，但是常见的一些代理工具（如：ss）支持的是socks协议。而socks协议本身是支持tcp请求代理的，所以我们可以将对http(s) proxy发送的请求转换成对socks发送的请求。并且这样开启的http proxy仍然能够利用socks协议代理工具上所具有的一些特性（如：加密请求等）。

其它替代工具:

- [polipo](https://github.com/jech/polipo)

## 安装

```
npm install -g http-proxy-to-socks
```

需要node版本为`4`及以上。

## 使用

```
hpts -s 127.0.0.1:1080 -p 8080
```

该命令会监听本地的`1080`端口，请确保本地socks服务开启在相应的端口上。开启的http proxy会监听`8080`端口。

所有配置项如下:

```
Options:

  -h, --help             output usage information
  -V, --version          output the version number
  -s, --socks [socks]    specify your socks proxy host, default: 127.0.0.1:1080
  -p, --port [port]      specify the listening port of http proxy server, default: 8080
  -c, --config [config]  read configs from file in json format
  --level [level]        log level, vals: info, error
```

`-c`可以指定配置文件，请将配置文件以`json`形式保存，如：

```json
{
  "socks": "127.0.0.1:1080",
  "port": 8080
}
```

## CONTRIBUTE

新增特性和修改特性时，请添加相应的测试例子。提交代码前请在本地确保测试通过:

```
npm run test
```

## License

MIT
