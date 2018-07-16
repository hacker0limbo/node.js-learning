const fs = require('fs')

fs.readFile('./douban.json', (error, data) => {
    if (error !== null) {
        console.log('*** 读取文件失败');
    } else {
        // data 是一个 json 字符串
        processFile(data)
    }
})

const processFile = (data) => {
    const unIntactMovies = JSON.parse(data)
    console.log('数组长度为: ', unIntactMovies.length);
    const intactMovies = []

    for (let i = 0; i < unIntactMovies.length; i++) {
        const eachPage = unIntactMovies[i]
        intactMovies.concat(eachPage)
    }
    const newContent = JSON.stringify(intactMovies, null, 2)
    fs.writeFile('new-douban.json', newContent, (error) => {
        if (error !== null) {
            console.log('*** 写入新文件失败');
        } else {
            console.log('新数组长度', intactMovies.length);
            console.log('*** 写入新文件成功');
        }
    })
}


const __main = () => {

}

__main()