/**
 * 视图函数部分
 */

const fs = require('fs')

const renderTemplate = (file, res) => {
    // 默认在 public 目录下
    res.writeHead(200, { 'Content-Type': 'text/html' })
    fs.createReadStream(`${__dirname}/public/${file}`, 'utf8').pipe(res)
}

const home = res => {
    renderTemplate('index.html', res)
}

const about = res => {
    renderTemplate('about.html', res)
}

const apiRecords = (res, params) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    const jsonObj = {
        name: 'test',
        age: 10
    }
    if (Object.keys(params).length !== 0) {
        res.end(JSON.stringify(params))
    } else {
        res.end(JSON.stringify(jsonObj))
    }
}

module.exports = {
    home,
    about,
    apiRecords
}
