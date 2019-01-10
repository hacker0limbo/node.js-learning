class CommentApi {
    constructor() {
        this.basePath = '/api/comment/'
    }

    all(callback) {
        const path = this.basePath + 'all'
        fetch(path)
            .then(res => res.json())
            .then(data => {
                callback(data)
            })
    }

    add(addData, callback) {
        const path = this.basePath + 'add'
        fetch(path, {
                method: 'POST',
                body: JSON.stringify(addData),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then(res => res.json())
            .then(data => {
                callback(data)
            })
    }

    delete(id, callback) {
        const path = this.basePath + `${id}/delete`
        fetch(path)
            .then(res => res.json())
            .then(data => {
                callback(data)
            })
    }

}