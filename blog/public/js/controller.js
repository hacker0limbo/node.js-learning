class Controller {
    constructor(api, blogTemplate) {
        this.api = api
        this.blogTemplate = blogTemplate
        this.blogContainer = e('.blog-container')
            // this.init()
    }

    insertBlogAll(blogs) {
        let html = ''
        for (let i = 0; i < blogs.length; i++) {
            const blog = blogs[i];
            const t = this.blogTemplate.template(blog)
            html += t
        }

        appendHTML(this.blogContainer, html)
    }

    init() {
        this.api.all((data) => {
            this.insertBlogAll(data)
        })
    }
}


class AddController extends Controller {
    constructor(api, blogTemplate) {
        super(api, blogTemplate)
        this._elm = e('#id-button-submit')
        this.init()
    }

    init() {
        bindEvent(this._elm, 'click', (event) => {
            const addData = {
                title: e('#id-input-title').value,
                author: e('#id-input-author').value,
                content: e('#id-input-content').value,
            }

            this.api.add(addData, (data) => {
                console.log('前端接受到的新数据', data);
                this.insertBlog(data)
            })
        })
    }

    insertBlog(blog) {
        const t = this.blogTemplate.template(blog)
        appendHTML(this.blogContainer, t)
    }
}


class TextArea {
    constructor() {
        this._elm = e('#id-input-content')
        this.init()
    }

    init() {
        bindEvent(this._elm, 'keydown', (e) => {
            var keyCode = e.keyCode || e.which;
            if (keyCode == 9) {
                e.preventDefault()
                const tab = '    '
                this.typeInTextarea(this._elm, tab)
            }
        })
    }

    typeInTextarea(el, newText) {
        var start = el.selectionStart
        var end = el.selectionEnd
        var text = el.value
        var before = text.substring(0, start)
        var after = text.substring(end, text.length)
        el.value = (before + newText + after)
        el.selectionStart = el.selectionEnd = start + newText.length
        el.focus()
    }

}