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