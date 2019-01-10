const express = require('express')
const router = express.Router()
const commentModel = require('../models/comment.js').commentModel
const Comment = require('../models/comment.js').Comment

router.get('/all', (req, res) => {
    const comments = commentModel.getComments()
    res.json(comments)
})

router.post('/add', (req, res) => {
    const form = req.body
    const id = commentModel.getComments().length + 1
    form['id'] = id
    const newComment = new Comment(form)

    // blog_id ?
    commentModel.addComment(newComment)
        // 写入数据文件中
        // blogModel.saveBlogs()
    res.json(newComment)

})

router.get('/:id/delete', (req, res) => {
    const commentId = req.params.id
    const index = commentId - 1
    const deletedComment = commentModel.deleteComment(index)

    commentModel.orderComments()
        // 写入数据文件中
        // blogModel.saveBlogs()
    res.json(deletedComment)
})

module.exports = router