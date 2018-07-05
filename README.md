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
终端中输入`node index.js`, 浏览器打开输入`localhost:3000`访问服务器

### supervisor

开发过程中, 每次代码修改保存后都需要手动重启程序, `supervisor`可以帮助在发生修改时自动重启程序

终端中输入:
```bash
sudo npm install -g supervisor
```

运行`supervisor index.js`启动程序