// const fs = require('fs')
const fileProcess = require('./fileProcess')

const processFile = (data) => {
    const unIntactMovies = JSON.parse(data)
    console.log('数组长度为: ', unIntactMovies.length);
    let intactMovies = []

    for (let i = 0; i < unIntactMovies.length; i++) {
        const eachPage = unIntactMovies[i]
        intactMovies = intactMovies.concat(eachPage)
    }
    const newContent = JSON.stringify(intactMovies, null, 2)
    console.log('新数组长度', intactMovies.length);

    // 写入新文件
    const writePath = './douban_data/douban_integrated.json'
    fileProcess.writeFile(writePath, newContent)
}


const __main = () => {
    //  读文件, (数据格式转换, 写文件) 均在读文件里进行回调
    const readPath = './douban_data/douban_original.json'
    fileProcess.readFile(readPath, processFile)
}

__main()