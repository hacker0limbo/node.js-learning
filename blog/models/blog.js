const fs = require('fs')

class BlogModel {
    constructor() {
        this.blogs = []
        this.dataFile = './db/blog.json'
        this.loadBlogs()
    }

    getBlogs() {
        return this.blogs
    }

    saveBlogs() {
        const data = JSON.stringify(this.blogs)
        fs.writeFile(this.dataFile, data, 'utf8', (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('数据已经被写入 blog.json');
            }
        })
    }

    loadBlogs() {
        // 在初始化的时候同步读取数据
        const data = fs.readFileSync(this.dataFile, 'utf8')
        this.blogs = JSON.parse(data)
    }

    getBlog(index) {
        return this.blogs[index]
    }

    addBlog(blog) {
        this.blogs.push(blog)
    }

    deleteBlog(index) {
        return this.blogs.splice(index, 1)
    }

    orderBlogs() {
        for (let i = 0; i < this.blogs.length; i++) {
            const blog = this.blogs[i]
            blog['id'] = i + 1
        }
    }
}


class Blog {
    constructor(blog) {
        this.id = blog.id
        this.title = blog.title || ''
        this.author = blog.author || '小夜勃'
        this.content = blog.content || ''
        this.created_time = Math.floor(new Date() / 1000)
    }
}


module.exports = {
    blogModel: new BlogModel(),
    Blog: Blog
}