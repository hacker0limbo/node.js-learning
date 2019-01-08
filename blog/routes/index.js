const express = require('express')
const router = express.Router()
const blogModel = require('../models/blog.js').BlogModel
const Blog = require('../models/blog.js').Blog
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
    res.sendFile('index.html', options)
})

router.get('/blog/:id', (req, res) => {
    const blogId = req.params.id
    const index = blogId - 1
    const blog = blogModel.getBlog(index)

    // 使用 es6 render 引擎
    res.render('content', {
        locals: {
            id: blog.id,
            author: blog.author,
            created_time: utils.time(blog.created_time),
            title: blog.title,
            content: md.render(blog.content)
        }
    })
})


module.exports = {
    router: router
}