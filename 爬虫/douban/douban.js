const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

class Movie {
    constructor() {
        this.name = ''
        this.score = 0
        this.quote = ''
        this.ranking = 0
        this.coverUrl = ''
    }
}


const movieFromDiv = (movieItemDiv) => {
    const movie = new Movie()
    const e = cheerio.load(movieItemDiv)

    const pic = e('.pic')

    movie.name = e('.title').text()
    movie.score = e('.rating_num').text()
    movie.quote = e('.inq').text()
    movie.ranking = pic.find('em').text()
        // 元素的属性用 .attr('属性名') 确定
    movie.coverUrl = pic.find('img').attr('src')

    return movie
}


const saveMovie = (moviesArray) => {
    const path = 'douban.txt'
        // 将 movies 这个数组解析为 json 格式, 另外第三个参数是为了增加可读性
    const s = JSON.stringify(moviesArray, null, 2)
    fs.appendFile(path, s, (error) => {
        if (error !== null) {
            console.log('*** 写入文件错误', error);
        } else {
            console.log('--- 保存成功')
        }
    })

}


const moviesFromUrl = (url) => {
    request(url, (error, response, body) => {
        if (error === null && response.statusCode == 200) {
            const e = cheerio.load(body)
            const moviesArray = []
            const movieItemDivs = e('.item')

            for (let i = 0; i < movieItemDivs.length; i++) {
                let element = movieItemDivs[i]
                const movieItemDiv = e(element).html()
                const movieData = movieFromDiv(movieItemDiv)
                moviesArray.push(movieData)
            }
            // 保存 movies 数组到文件中
            saveMovie(moviesArray)
        } else {
            console.log('*** ERROR 请求失败 ', error)
        }
    })

}


const __main = () => {
    // 这是主函数
    // 下载网页, 解析出电影信息, 保存到文件
    for (var i = 25; i <= 0; i -= 25) {
        var url = 'https://movie.douban.com/top250'
        url += `?start=${i}&filter=`
        console.log(url);
        moviesFromUrl(url)
    }

    // const url = 'https://movie.douban.com/top250'
    // moviesFromUrl(url)
}


// 程序开始的主函数
__main()