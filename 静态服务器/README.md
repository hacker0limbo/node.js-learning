# 静态服务器

一个静态服务器可以托管 static 目录下的文件

思路为:
- 解析请求的 url, 得到路径
- 和静态目录拼接成对应的文件路径, 并读取该文件内容(注意可能会有图片等, 一律使用二进制形式读取)
- 服务端返回读取的内容

问题: 由于没有设置响应头, 实际会有警告, 例如:

```
Resource interpreted as Stylesheet but transferred with MIME type text/plain: "http://localhost:3000/css/style.css"
```

解决方法为可以写一个正则匹配后缀名, 根据不同的后缀名设置不同的 `content-type`

## 路由匹配
增加功能可以匹配路由, 基本思路为:

- 解析 url, 得到 pathname 还有参数(查询字符串 query) /name?a=1&b=2
- 根据 pathname 匹配路由函数, 如果存在
  - 将请求时带有的参数(query)存入`req.query`里
  - 监听请求那边到服务器的数据(比如 POST 方法), 存入`req.body`里
  - 调用路由函数(`handleFn()`), 此时可以直接通过 req 这个对象获取刚刚传过来的数据了, 不管是 get 请求还是 post 请求
- 静态服务器处理请求, 直接返回静态页面