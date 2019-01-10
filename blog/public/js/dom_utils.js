const e = sel => document.querySelector(sel)

const es = sels => document.querySelectorAll(sels)

const bindEvent = (elm, eventName, callback) => {
    elm.addEventListener(eventName, (event) => {
        callback(event)
    })
}

const bindAll = (elements, eventName, callback) => {
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

const appendHTML = (elm, html) => {
    elm.insertAdjacentHTML('beforeend', html)
}