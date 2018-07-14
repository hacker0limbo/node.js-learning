const server = require('./server')
const router = require('./router')
const requestHandlers = require('./requestHandlers')

// handle 对象是所有请求处理程序的集合, 可以将 url 映射到各自的请求处理程序上
// 同时也实现了不同 url 对应相同的请求处理程序, 例如 /start 和 / 都是由 start 这一程序处理
const handle = {
    '/': requestHandlers.start,
    '/start': requestHandlers.start,
    '/upload': requestHandlers.upload,
    '/show': requestHandlers.show
}


server.start(router.route, handle)


/**
 * 旧的方法:
 *  应用通过应用各层之间传递值的方式(请求处理程序 -> 请求路由 -> 服务器), 将请求处理程序返回的内容(请求处理程序最终要显示给用户的内容)传递给 http 服务器
 * 
 */
/**
 * 新的方法:
 *  采用服务器传递给内容的方式. 将 response 对象(server 的回调函数)通过请求路由传递给请求处理程序.
 *  随后处理程序采用该对象上的函数来对请求做出响应
 */