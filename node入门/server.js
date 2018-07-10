const http = require('http')
const url = require('url')

const start = (route) => {
    // http.Server 是一个类
    // http.createServer() 返回一个 http.Server 实例, 该实例有 server.listen() 方法, 用于开启服务器的监听
    const server = http.createServer((req, res) => {
        // 加入对 url 的识别
        let pathname = url.parse(req.url).pathname;

        console.log(`Request for ${pathname} received`);

        route(pathname)

        res.writeHead(200, { 'Content-type': 'text/plain' })
        res.write('Hello World')
        res.end()
    })

    server.listen(8888, () => {
        console.log('server listening at 8888');
    })
}

module.exports = {
    start: start
}