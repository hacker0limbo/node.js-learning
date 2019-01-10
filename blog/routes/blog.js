const express = require('express')
const router = express.Router()
const blogModel = require('../models/blog.js').blogModel
const Blog = require('../models/blog.js').Blog
const commentModel = require('../models/comment.js').commentModel

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

router.get('/:id/delete', (req, res) => {
    const blogId = req.params.id
    const index = blogId - 1
    const deletedBlog = blogModel.deleteBlog(index)

    blogModel.orderBlogs()
        // 写入数据文件中
        // blogModel.saveBlogs()
    res.json(deletedBlog)
})

router.get('/:id/comment', (req, res) => {
    const blogId = req.params.id
    const comments = commentModel.getCommentByBlogId(blogId)
    res.json(comments)
})

module.exports = router