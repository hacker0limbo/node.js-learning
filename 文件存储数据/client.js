const btn = document.querySelector('#id-submit')
const input = document.querySelector('#id-input')
const content = document.querySelector('#id-content')

btn.addEventListener('click', (event) => {
    const postData = input.value
    const path = 'http://localhost:3000'
    fetch(path, {
            method: 'POST',
            body: postData,
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        }).then(res => res.text())
        .catch(error => console.error('Error:', error))
        .then(res => {
            // 刷新页面, 得到数据
            window.location.reload()
        })
})


fetch('http://localhost:3000')
    .then((res) => {
        return res.text();
    })
    .then((data) => {
        content.innerHTML = data
    })