# Node API 整理

## http 模块

该模块分为几个大类:
1. `http.createServer()`
2. `http.request()`
3. `http.get()`
4. `http.ClientRequest`类
    - `response`事件 
5. `http.Server`类
    - `request`事件 
6. `http.ServerResponse`类
7. `http.IncomingMessage`类

从`http.createServer()`说起

### [1] http.createServer([options][, requestListener])

官方文档如下:

> 返回 一个新的`http.Server`实例 (也就是[5]) 
> `requestListener`是一个回调函数, 并且是一个自动添加到`request`事件的方法 (也就说后面的回调函数负责监听请求, 事件类型为[5]下面的 request 事件  )

实例如下:
```js
const server = http.createServer((req, res) => {
    const url = req.url
    res.writeHead(200, { 'Content-type': 'text/plain' })
    res.write(url)
    res.end()
})
```

由于返回的是一个`http.Server`的实例, 并且自动添加了`request`事件(即回调函数), 因此转到如下部分:

### [5] http.Server 类 -> request 事件

该事件, 也就是`http.createServer()`有两个参数:
- `request`(也写做 req), 是`http.IncomingMessage` [6] 的一个实例
- `response`(也写做 res), 是`http.ServerResponse` [7] 的一个实例

因此查看 [6] 与 [7], 如下:

### [6] http.IncomingMessage & [7] http.ServerResponse

官方文档如下:

> `IncomingMessage`对象由 `http.Server` 或 `http.ClientRequest` 创建，并作为*第一个参数*分别递给 **request** 和 **response** 事件。 它可以用来访问响应状态、消息头、以及数据
> `http.ServerResponse`对象在 HTTP 服务器内部被创建。 它作为第二个参数被传入 **request** 事件

因此可以看到有类似`message.url`来获取请求的 url, `response.end()`来结束响应

### [2] http.request(options[, callback]) 类

官网如下:
> `http.request()` 返回一个 `http.ClientRequest` 类的实例(也就是 [4])
> 可选的 callback 参数会作为单次监听器被添加到 'response' 事件(也就是回调函数默认为 [4]下面的)