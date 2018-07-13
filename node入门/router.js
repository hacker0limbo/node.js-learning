const route = (handle, pathname) => {
    console.dir(`About to route a request for ${pathname}`, { colors: true })
        // 判断 handle 对象里面方法是否存在(即请求处理程序)
    if (typeof(handle[pathname]) === 'function') {
        return handle[pathname]()
    } else {
        console.dir(`No request handler found for ${pathname}`, { colors: true })
        return '404'
    }
}

module.exports = {
    route: route
}