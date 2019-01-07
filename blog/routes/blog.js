const express = require('express')
const router = express.Router()
const blogModel = require('../models/blog.js').BlogModel
const Blog = require('../models/blog.js').Blog

router.get('/all', (req, res) => {
    const blogs = blogModel.getBlogs()
    res.json(blogs)
})

router.post('/api/blog/add', (req, res) => {
    const form = req.body
    const newBlog = new Blog(form)

    // 写入数据文件中
    // blogModel.saveBlogs()
    res.json(newBlog)
})

router.get('/api/blog/content/:id', (req, res) => {
    const blogId = req.params.id
    const index = blogId - 1
    const blog = blogModel.getBlog(index)
    const content = blog['content']

    // 写入数据文件中
    // blogModel.saveBlogs()
    res.json(content)
})

router.get('/blog/content/:id', (req, res) => {
    const blogId = req.params.id
    const index = blogId - 1
    const blog = blogModel.getBlog(index)
    const content = blog['content']

    // 写入数据文件中
    // blogModel.saveBlogs()
    // res.render('content', { content: content }, (req, res) => {
    //     console.log('内容为: ', content)
    // })
})


module.exports = {
    router: router
}