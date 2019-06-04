const http = require('http')
const url = require('url')
const querystring = require('querystring')

const startServer = (route, handle) => {
    const onRequest = (req, res) => {
        // 将路由 api?a=b 只解析为 api, 后面 a=b 为发送的数据
        const pathname = url.parse(req.url).pathname

        let data = ''
        req.on('error', err => {
            console.error(err)
        }).on('data', chunk => {
            // 监听客户端发送的数据
            data += chunk
        }).on('end', () => {
            if (req.method == 'POST') {
                route(handle, pathname, res, querystring.parse(data))
            } else {
                const params = url.parse(req.url, true).query
                route(handle, pathname, res, params)
            }
        })
    }

    const server = http.createServer(onRequest)

    server.listen(3000, '127.0.0.1')
    console.log('Server started on localhost:3000')
}

module.exports = {
    startServer
}
