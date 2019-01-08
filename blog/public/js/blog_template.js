class BlogTemplate {
    constructor() {
        this.blogContainer = e('blog-container')
    }

    template(blog) {
        const id = blog.id
        const title = blog.title
        const author = blog.author
        const d = new Date(blog.created_time * 1000)
        const time = d.toLocaleString()

        const t = `
        <div class="blog-cell">
            <a href="/blog/${id}" class="blog-title">${title}</a>
            <div class="">
                <span>${author}</span> @ <time>${time}</time>
            </div>
        </div>
        `
        return t
    }


}