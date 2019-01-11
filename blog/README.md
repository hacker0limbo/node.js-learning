# 博客程序

## 使用

```bash
cd blog
node app.js
```

## 效果

![demo](/demo.gif)

- 可以写博客并发布博客, 可以删除
- 可以针对博客发布评论, 可以删除

## 技术

- express
- [es6-template-engine](https://github.com/dondido/express-es6-template-engine)
- [markdown-it](https://github.com/markdown-it/markdown-it)
- [highlight.js](https://github.com/highlightjs/highlight.js)

## 总结注意点

- readFile 等路径名要为:`__dirname+path`
- 当数据更新时需要重新刷新页面, 后端根据数据重新渲染模板发送到客户端
- 也可以使用前后端分离, 后端写 api, 前端用 ajax 获取, js 动态刷新页面