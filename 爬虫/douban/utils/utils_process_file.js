const fs = require('fs')

const readFile = (path, processFile) => {
    fs.readFile(path, (error, data) => {
        if (error !== null) {
            console.log('*** 读取文件失败');
        } else {
            // data 是一个 json 字符串
            processFile(data)
        }
    })
}


const writeFile = (path, content) => {
    fs.writeFile(path, content, (error) => {
        if (error !== null) {
            console.log('*** 写入新文件失败');
        } else {
            console.log('--- 写入新文件成功');
        }
    })
}

module.exports = {
    readFile: readFile,
    writeFile: writeFile
}