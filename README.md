# node.js-learning

`node.js`学习

## 安装与初始化

### 初始化工程 

1. 新建一个目录, 名字为`hello-world`
2. 在该目录底下新建一个文件, 名字为`index.js`
3. `cd`到目录, 终端中输入`sudo npm init`, 根据指令完成`package.json`的创建
4. 终端中输入`sudo npm install express --save`, 其中`--save`自动可以将`express`模块自动添加到`package.json`里面
5. 在`index.js`里面输入如下代码:

```js
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(3000, () => {
    console.log('App listening on port 3000!');
})
```
终端中输入`node index.js`, 浏览器打开输入`localhost:3000`访问服务器, 页面会显示`Hello World`

### supervisor

开发过程中, 每次代码修改保存后都需要手动重启程序, `supervisor`可以帮助在发生修改时自动重启程序

终端中输入:
```bash
sudo npm install -g supervisor
```

运行`supervisor index.js`启动程序

## 核心概念

### 中间件(middleware)

处理`http`请求的函数, 特点为一个中间件处理完, 再传递给下一个中间件, `app`实例在运行过程中会调用一系列中间件

用法为, 每个中间件从`app`实例接受3个参数, req(http 请求), res(http 回应), next(回调函数, 代表下一个中间件), 每个中间件对请求(req)进行加工, 决定是否调用`next`, 然后将`req`传递给下一个中间件

### app.use('/', function)

注册中间件的方法, 用法为
```js
app.use('/', (req, res, next) => {
    next() // 可选
})
```