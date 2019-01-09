const __main = () => {
    const api = new BlogApi()
    const blogTemplate = new BlogTemplate()
    const controller = new Controller(api, blogTemplate)
    const addController = new AddController(api, blogTemplate)
    const textArea = new TextArea()
    controller.init()
}

__main()