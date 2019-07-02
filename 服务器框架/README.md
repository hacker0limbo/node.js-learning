# 服务器框架

实现一个类似 express 框架, 功能
- 中间件(包括中间件)
- `bodyParser`解析发送到服务端的数据(也是一个中间件)
- 静态文件目录设置


## 中间件
> 引用官网的定义: 中间件函数能够访问请求对象 (req)、响应对象 (res) 以及应用程序的请求/响应循环中的下一个中间件函数。下一个中间件函数通常由名为 next 的变量来表示

模板为:
```javascript
app.get('/', function(req, res, next) {
  next()
})
```
- 中间件函数即为上面的匿名函数
- 该中间件函数适用的路径为`/`, 即根路径
- 该中间件函数适用的 HTTP 方法为`GET`
- `next()`保证可以继续调用下一个中间件函数

实例如下:
```javascript
// 没有指定中间件函数使用的路径(路由), 应用程序每次收到请求时(不管什么请求方法), 都执行该中间件函数
app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

// 指定了是 get 方法, 同时在 /user 路由下会调用该中间件
app.get('/user', function (req, res, next) {
  res.send('USER');
})

// 传入一系列中间件函数
app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})
```

顺序问题:
- 首先装入的中间件函数也首先被执行
- 使用中间件函数需要在对应路由之前装入, 否则会由于路由处理程序终止了请求/响应循环, 导致该中间件永远无法被执行

实例:
```javascript
var m1 = function(req, res, next) {
  console.log('m1')
  next()
}

var m2 = function(req, res, next) {
  console.log('m2')
  next()
}

app.use(m2)

app.get('/', function (req, res) {
  res.send('Hello World!');
})

app.use(m1)
```
- 如果访问 `/` 根路由, 那么`m2`中间件可以被执行, `m1`由于路由处理程序终止了请求/响应循环, 无法处理该函数
- 如果访问其他路径, 比如`/a`, 那么`m1`和`m2`均会被执行

写中间件的思路:

`app.use()`的时候按照顺序将所有中间件函数传入到一个维护中间件的数组里面, 在请求过来的时候, 匹配该中间件的路由并执行函数