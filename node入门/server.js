const http = require('http')

// http.Server 是一个类
// http.createServer() 返回一个 http.Server 实例, 该实例有 server.listen() 方法, 用于开启服务器的监听
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'text/plain' })
    res.write('Hello World')
    res.end()
})

server.listen(8888, () => {
    console.log('server listening at 8888');
})