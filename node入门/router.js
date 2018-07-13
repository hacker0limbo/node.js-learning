const route = (handle, pathname, res, postData) => {
    console.dir(`About to route a request for ${pathname}`, { colors: true })
        // 判断 handle 对象里面方法是否存在(即请求处理程序)
    if (typeof(handle[pathname]) === 'function') {
        handle[pathname](res, postData)
    } else {
        console.dir(`No request handler found for ${pathname}`, { colors: true })
        res.writeHead(200, { 'Content-type': 'text/plain' })
        res.write('404')
        res.end()

    }
}

module.exports = {
    route: route
}