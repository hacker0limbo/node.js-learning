const http = require('http')
const url = require('url')

/**
 * 在路由里面接受收集所有 post 数据, end 事件结束以后调用回调函数请求路由, 将数据传给路由, 最后路由将数据传给请求处理程序
 * 
 *  设置了接收数据的编码格式为UTF-8
 *  注册了“data”事件的监听器，用于收集每次接收到的新数据块，并将其赋值给postData 变量
 *  将请求路由的调用移到end事件处理程序中，以确保它只会当所有数据接收完毕后才触发，并且只触发一次
 *  把POST数据传递给请求路由，因为这些数据，请求处理程序会用到
 * 
 *  
 */

const start = (route, handle) => {
    // http.Server 是一个类
    // http.createServer() 返回一个 http.Server 实例, 该实例有 server.listen() 方法, 用于开启服务器的监听
    const server = http.createServer((req, res) => {
        let postData = ''
            // 加入对 url 的识别
        let pathname = url.parse(req.url).pathname;
        console.log(pathname);
        // console.dir(`Request for ${pathname} received`, { colors: true });

        req.setEncoding('utf8')

        req.addListener('data', (postDataChunk) => {
            postData += postDataChunk
        })

        req.addListener('end', () => {
            // 服务器发送给客户端的响应的内容
            route(handle, pathname, res, postData)

        })

    })

    server.listen(8888, () => {
        console.log('server listening at 8888');
    })
}

module.exports = {
    start: start
}