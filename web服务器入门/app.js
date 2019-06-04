const server = require('./server')
const router = require('./router')
const handler = require('./handler')

const handle = {
    // 分配路由给视图函数
    '/': handler.home,
    '/about': handler.about,
    '/api/records': handler.apiRecords
}

server.startServer(router.route, handle)
