class AddButton {
    constructor(api) {
        this.api = api
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
                console.log('前端接受到的新数据', data)
                    // 更新数据以后刷新界面
                window.location.reload()
            })
        })
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


class DeleteButton {
    constructor(api) {
        this.api = api
        this._elms = es('.blog-delete')
        this.init()
    }

    init() {
        bindAll(this._elms, 'click', (event) => {
            const target = event.target
            const blogElm = target.parentNode
            const index = Array.from(blogElm.parentNode.children).indexOf(blogElm)
            const id = index + 1
            this.api.delete(id, (data) => {
                // 更新数据以后刷新界面
                window.location.reload()
                console.log('删除的数据为', data);
            })
        })
    }
}

const __main = () => {
    const api = new BlogApi()
    new AddButton(api)
    new DeleteButton(api)
    new TextArea()
}

__main()