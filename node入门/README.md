# 一个完整的基于 Node.js 的 web 应用

## 目标

- 用户访问 http://domain/start, 可以看到一个欢迎页面, 页面有一个文件上传的表单
- 用户可以选择一个图片并提交表单, 随后文件将被上传到 http://domain/upload, 页面完成上传以后会把图片显示在页面上

## 需求

- `HTTP`服务器
- 对于不同的请求, 根据请求的 URL, 服务器需要给与不同的响应, 因此需要一个*路由*, 用于把请求对应到请求处理程序
- 当请求被服务器接受并通过路由传递之后, 需要可以对其进行处理, 因此需要最终的*请求处理程序*
- 路由还应该能处理 POST 数据, 并且把数据封装成更友好的格式传递给请求处理程序, 因此需要*请求数据处理功能*
- 处理请求以后, 需要将内容显示出来, 需要*视图逻辑*供请求处理程序使用, 以便将内容发送给用户的浏览器
- 用户需要上传图片, 需要*上传处理功能来处理*来处理这方面的细节

## 构建一个 http 服务器

### 怎么写
不同的功能的代码放入不同的模块中, 拥有一个主文件, 使用`node.js`执行它, 其他模块可以被主文件或者其他模块调用

### http 基本原理

可以看 [http 简介](https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000/001432011939547478fd5482deb47b08716557cc99764e0000)

1. 浏览器向服务器发送`http`请求(**req**), 主要包括(Header 头文件) + (Body post请求带的数据)
    - 方法(GET/POST)
    - 路径 /...
    - 域名
    - 用户数据(Post 方法)
2. 服务器向浏览器返回响应(**res**), 包括
    - 状态码(200 响应成功, 等)
    - 响应类型 (例如: Content-Type: text:html), 这里注意浏览器是根据`Content-Type`判断判断响应内容是什么, 不是根据`url`
    - Body 部分, 通常是 html 源码
3. 浏览器需要继续向服务器请求其他资源, 比如图片, 就再次发送请求, 得到响应

但是注意: 一个 **请求** 只能处理一个资源

### 模块化
每一个文件就是一个模块, 可以使用`module.exports`进行导出, 导出的是一个对象, 写法如下:

```js
// m1.js
const x = 5
const add = (x, y) => {
    return x + y
}
module.exports = {
    x: x,
    add: add
}

// index.js
const m1 = require('m1')
console.log(m1.x, m1.add(1, 2)) // 5, 3
```

## 路由

### url
`url`字符串可以别解析为一个`url`对象, 其属性对应于字符串的各组成部分


### 解析 url

`url`提供了两套 API 来处理 URL 字符串, 一个是旧版本的, 另一个是 **WHATWG URL Standard**, 两套 API 使用`parse`返回的对象属性比较如下, 上方是旧版本的, 下方是新版本的:

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                            href                                             │
├──────────┬──┬─────────────────────┬─────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │        host         │           path            │ hash  │
│          │  │                     ├──────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │   hostname   │ port │ pathname │     search     │       │
│          │  │                     │              │      │          ├─┬──────────────┤       │
│          │  │                     │              │      │          │ │    query     │       │
"  https:   //    user   :   pass   @ sub.host.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          │  │          │          │   hostname   │ port │          │                │       │
│          │  │          │          ├──────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │        host         │          │                │       │
├──────────┴──┼──────────┴──────────┼─────────────────────┤          │                │       │
│   origin    │                     │       origin        │ pathname │     search     │ hash  │
├─────────────┴─────────────────────┴─────────────────────┴──────────┴────────────────┴───────┤
│                                            href                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

旧版本解析`url`:

```js
const url = require('url');
const myURL = url.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash')
```

返回大致如下:

```js
$ node
> require('url').parse('/status?name=ryan')
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?name=ryan',
  query: 'name=ryan',
  pathname: '/status',
  path: '/status?name=ryan',
  href: '/status?name=ryan' 
  }
```

新版本解析`url`:

```js
const { URL } = require('url');
const url = new URL('https://example.org/abc/xyz?123')

console.log(url.pathname) // /abc/xyz
```