const server = require('./server')
const router = require('./router')
const requestHandlers = require('./requestHandlers')

// handle 对象是所有请求处理程序的集合, 可以将 url 映射到各自的请求处理程序上
// 同时也实现了不同 url 对应相同的请求处理程序, 例如 /start 和 / 都是由 start 这一程序处理
const handle = {
    '/': requestHandlers.start,
    '/start': requestHandlers.start,
    '/upload': requestHandlers.upload
}


server.start(router.route, handle)