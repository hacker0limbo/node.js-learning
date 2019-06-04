/**
 * 路由部分, 根据路由调用对应视图函数
 */

const fs = require('fs')

const route = (handle, pathname, res, params) => {
    if (typeof handle[pathname] === 'function') {
        // 对应路由有对应的视图函数, 触发视图函数
        handle[pathname](res, params)
    } else {
        // 访问无效路由, 返回 404
        res.writeHead(404, { 'Content-Type': 'text/html' })
        fs.createReadStream(`${__dirname}/public/404.html`, 'utf8').pipe(res)
    }
}

module.exports = {
    route
}
