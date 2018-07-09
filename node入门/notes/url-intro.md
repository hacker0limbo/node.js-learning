# url 概述

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


## 查询字符串

实例:
```js
url?name1=value&name2&value2
```

问号后面的就是查询字符串，格式就像上面那样，所有**键值对**需要用`&`分开

### 作用

**传递额外的信息给服务器**

比如, `/getData`这个 URL 是可以拿到一个班的所有人信息
```js
xhr.open('get', '/getData', true)
xhr.send(null)
```
但是如果想要知道这个班所有男生或者所有女生的数据, 就需要使用查询字符串

```js
xhr.open('get', '/getData?gender=male', true)
xhr.send(null)
```