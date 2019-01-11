class AddButton {
    constructor(api) {
        this.api = api
        this._elm = e('.comment-submit')
        this.init()
    }

    init() {
        bindEvent(this._elm, 'click', (event) => {
            const blog_id = window.location.pathname.split('/')[2]
            const addData = {
                blog_id: Number(blog_id),
                author: e('.comment-author').value,
                content: e('.comment-content').value,
            }
            this.api.add(addData, (data) => {
                console.log('前端接受到的新数据', data)
                    // 更新数据以后刷新界面
                window.location.reload()
            })
        })
    }
}

class DeleteButton {
    constructor(api) {
        this.api = api
        this._elms = es('.comment-delete')
        this.init()
    }

    init() {
        bindAll(this._elms, 'click', (event) => {
            const target = event.target
            const commentElm = target.parentNode
            const id = commentElm.dataset.id
            this.api.delete(id, (data) => {
                // 更新数据以后刷新界面
                window.location.reload()
                console.log('删除的数据为', data);
            })
        })
    }
}


const __main = () => {
    const api = new CommentApi()
    new DeleteButton(api)
    new AddButton(api)
}

__main()