const __main = () => {
    const api = new BlogApi()
    const blogTemplate = new BlogTemplate()
    const c = new Controller(api, blogTemplate)
    const addController = new AddController(api, blogTemplate)
    const textArea = new TextArea()
    c.init()
}

__main()