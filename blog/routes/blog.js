const express = require('express')
const router = express.Router()
const blogModel = require('../models/blog.js').BlogModel
const Blog = require('../models/blog.js').Blog

router.get('/all', (req, res) => {
    const blogs = blogModel.getBlogs()
    res.json(blogs)
})

router.post('/add', (req, res) => {
    const form = req.body
    const id = blogModel.getBlogs().length + 1
    form['id'] = id
    const newBlog = new Blog(form)

    blogModel.addBlog(newBlog)
        // 写入数据文件中
        // blogModel.saveBlogs()
    res.json(newBlog)
})

router.get('/:id', (req, res) => {
    const blogId = req.params.id
    const index = blogId - 1
    const blog = blogModel.getBlog(index)

    // 写入数据文件中
    // blogModel.saveBlogs()
    res.json(blog)
})


module.exports = {
    router: router
}