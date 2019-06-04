# Web 服务器的一些个人笔记

模块结构:
```
/public
    index.html  主页面
    about.html  关于页面
    404.html    访问无效路由页面
app.js          主文件
handler.js      视图函数
router.js       根据路由返回视图函数
server.js       服务器
```

## 流

所有流都是`EventEmitter`的实例

HTTP 响应在客户端是一个可读流，但在服务器端它却是一个可写流. 即一个对象（`http.IncomingMessage`）读取数据，向另一个对象（`http.ServerResponse`）写入数据

可以使用`.pipe()`方法将可读流输入到可写流中

### 可写流:

原生:
- `HTTP`客户端的请求(request): 需要 POST 数据
- `HTTP`服务端的响应(response): 需要写入响应头, 响应体等

可写流会暴露了一些方法，比如 `write()` 和 `end()` 用于写入数据到流

所有的可写流都遵循同一基本的使用模式, 如下:
```javascript
const myStream = getWritableStreamSomehow()
myStream.write('一些数据')
myStream.write('更多数据')
myStream.end('完成写入数据')
```


### 可读流
原生: 
- `HTTP`客户端的响应, 返回了头文件, 响应体等
- `HTTP`服务端的请求, 返回了客户端请求的信息, 比如 url, post 过来的数据等

可读流有一些事件, 比如`data`, `end`等等




## http 模块
可以使用 `http.createServer`方法创建一个`http`服务器, 也可以使用`http.request`方法创建一个`http`客户端, 即该模块可以支持客户端和服务端

### http 模块对 http 服务端的支持
可以使用该模块创建一个服务器, `http.createServer`会创建一个服务端对象`http.Server`, 该方法接受一个可选传入参数`requestListener`, 该参数是一个函数, 传入后作为`http.Server`对象的`request`事件监听, 不传入时, 则需要通过绑定`request`事件单独添加, 实例如下:

```javascript
var http = require('http');

// 创建server对象，并添加request事件监听器, 该监听器为一个匿名函数
var server = http.createServer(function(req, res) {
    res.writeHeader(200,{'Content-Type':'text/plain'});
    res.end('itbilu.com');
});
 
// 创建server对象，通过server对象的request事件添加事件事件监听器
var server = new http.Server();
server.on('request', function(req, res){
    res.writeHeader(200,{'Content-Type':'text/plain'});
    res.end('itbilu.com');
});
```

#### http.Server
该对象有`request`, `connection`, `close`等事件, 其中`request`事件监听函数中两个参数: `request`是一个`http.IncomingMessage`实例，`response`是一个`http.ServerResponse`实例

`http.Server`对象还有一些其他方法, 比如`server.listen`可以接受客户端传入的连接

#### http.ServerResponse
该对象用于处理客户端请求, 是`http.Server`内部创建的对象, 作为第二个参数传递给`request`事件的监听函数. 同时该对象继承了`Writable Stream`的接口, 本质是一个可写流, 同时也继承了`EventEmitter`, 包含了`close`, `finish`事件

### http 模块对 http 客户端的支持
可以使用该模块创建一个客户端对象, 客户端对象可以创建对 http 服务的访问

#### http.request
可以使用该方法创建一个`http`请求, 刚方法会返回一个`http.ClientRequest`对象, 该对象是一个可写流, 当使用`POST`发送数据的时候, 就要将其写入到`ClientRequest`对象

`http.get`是`http.request`方法的简写, 其默认设置了请求方式为`GET`, 请求结束以后自动调用`req.end()`方法

实例:
```javascript
var http = require('http')

var options = {
    host: 'baidu.com',
    method: 'GET',
    path: '/'
}

var req = http.request(options)

req.on('response', function(res) {
    res.setEncoding('utf8')
    res.on('data', function(chunk) {
        console.log('收到数据：%s', chunk);
    })
})
req.end()
```

#### http.ClientRequest
该对象由`http.request`方法创建并返回, 该对象是一个正在处理的`HTTP`请求

为了获得服务器响应对象, 需要给这个对象设置一个`response`监听器, 该监听函数的参数即为服务端的响应, 是一个可读流, 是
`http.IncomingMessage`的一个实例

### http.IncomingMessage
`IncomingMessage`对象是由`http.Server`或`http.ClientRequest`创建的，并作为第一参数分别传递给`http.Server`的`'request'`事件和h`ttp.ClientRequest`的`'response'`事件

该对象实现了`Readable Stream`接口, 本质是一个可读流

该对象有一些有一些方法和属性, 例如: `message.url`

## 参考:
- https://itbilu.com/nodejs/core/N1okQ7Eh.html