# 文件存储数据

## 效果

页面有一个输入框一个提交按钮，在输入框输入内容点击提交，则在下方显示输入内容，将内容存储在服务器，刷新页面或者重启服务器内容不会丢失

## 思路

```
|--client.js
|--server.js
|--data.txt
|--index.html
```

server.js 创建一个服务器, 用来处理 POST 请求和 Get 请求, 当为 POST 请求时, 将请求里面的数据写入 data.txt 中, 当请求为 GET 时, 返回 data.txt 里面的内容

client.js 使用 fetch 获取数据, 绑定点击事件, 点击以后发送 POST 请求, 同时刷新页面(相当于一次 GET 请求). 普通的 fetch GET 请求用来获取后端返回的 data.txt 内容, 插入到输入框下方
