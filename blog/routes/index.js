const express = require('express')
const router = express.Router()
const blogModel = require('../models/blog.js').blogModel
const commentModel = require('../models/comment.js').commentModel
const utils = require('../utils/utils.js')
const hljs = require('highlight.js')

const md = require('markdown-it')({
    html: true,
    xhtmlOut: false,
    breaks: false,
    langPrefix: 'hljs language-',
    linkify: true,
    typographer: true,
    quotes: '“”‘’',
    highlight: function(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (__) {}
        }
        return ''
    }
})

router.get('/', (req, res) => {
    const options = {
        root: __dirname + '/../views/',
    }
    const bs = blogModel.getBlogs()
    const blogs = bs.map(b => ({
        id: b.id,
        author: b.author,
        time: utils.time(b.created_time),
        title: b.title,
        content: b.content
    }))

    res.render('index', {
        locals: {
            blogs: blogs
        }
    })
})

router.get('/blog/:id', (req, res) => {
    const blogId = req.params.id
    const index = blogId - 1
    const b = blogModel.getBlog(index)
    const cs = commentModel.getCommentsByBlogId(blogId)

    const comments = cs.map(c => ({
        id: c.id,
        blog_id: c.blog_id,
        author: c.author,
        content: c.content,
        time: utils.time(c.created_time)
    }))

    const blog = {...b }
    blog['time'] = utils.time(b.created_time)
    blog['content'] = md.render(b.content)
        // blog['content'] = md.render(b.content)
        // 使用 es6 render 引擎
    res.render('content', {
        locals: {
            blog: blog,
            comments: comments
        }
    })
})


module.exports = router