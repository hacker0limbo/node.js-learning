const express = require('express')
const app = express()


// 配置静态文件目录
app.use(express.static('public'))

// fs.readFile(路径, 回调函数(err, 文件内容))
const sendHtml = (path, response) => {
    var fs = require('fs')
    var options = {
        encoding: 'utf-8'
    }
    fs.readFile(path, options, (err, data) => {
        // console.log('数据类型为', typeof(data));
        response.send(data)
    })
}


app.get('/', function(request, response) {
    var path = 'index.html'
    sendHtml(path, response)
})


app.listen(3000, () => {
    console.log('App listening on port 3000!')
})