const express = require('express')
const router = express.Router()

// fs.readFile(路径, 回调函数(err, 文件内容))
const sentHtml = (path, res) => {
    var fs = require('fs')
    var options = {
        encoding: 'utf-8'
    }
    fs.readFile(path, options, (err, data) => {
        // console.log('数据类型为', typeof(data));
        res.send(data)
    })
}


router.get('/', (req, res) => {
    sentHtml('index.html', res)
})


module.exports = {
    router: router
}