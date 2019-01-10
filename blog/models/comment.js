const fs = require('fs')

class CommentModel {
    constructor() {
        this.comments = []
        this.dataFile = './db/comment.json'
        this.loadComments()
    }

    getComments() {
        return this.comments
    }

    getCommentsByBlogId(blogId) {
        return this.comments.filter(c => c['blog_id'] == blogId)
    }

    loadComments() {
        const data = fs.readFileSync(this.dataFile, 'utf8')
        this.comments = JSON.parse(data)
    }

    saveComments() {
        const data = JSON.stringify(this.comments)
        fs.writeFile(this.dataFile, data, 'utf8', (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('数据已经被写入 comment.json')
            }
        })
    }

    addComment(newComment) {
        this.comments.push(newComment)
    }

    deleteComment(index) {
        return this.comments.splice(index, 1)
    }

    orderComments() {
        for (let i = 0; i < this.comments.length; i++) {
            const c = this.comments[i]
            c['id'] = i + 1
        }
    }

}

class Comment {
    constructor(comment) {
        this.id = comment.id || 0
        this.blog_id = comment.blog_id || 0
        this.author = comment.author || ''
        this.content = comment.content || ''
        this.created_time = Math.floor(new Date() / 1000)
    }
}

module.exports = {
    commentModel: new CommentModel(),
    Comment: Comment
}