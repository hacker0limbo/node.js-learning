// 本模块作为请求处理模块
// 这样可以将请求处理程序和路由模块连接起来
// 对于不同的 url 需要有不同的处理方式, 例如处理 /start 的业务逻辑就应该和 /upload 不同
// 该模块将从服务器(主文件, index.js) 传递到路由而不是直接传递


const start = () => {
    console.dir(`Request handler 'start' was called.`, { colors: true })
    return 'Start'
}

const upload = () => {
    console.dir(`Request handler 'upload' was called.`, { colors: true })
    return 'Upload'
}

module.exports = {
    start: start,
    upload: upload
}