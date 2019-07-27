const e = sel => document.querySelector(sel)

const form = e('form')

form.addEventListener('submit', event => {
  event.preventDefault()
  const item = e('form input')
  const todo = {
    item: item.value.trim()
  }

  fetch('/todo', {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json())
    .then(data => {
      // 后端在操作数据库完毕以后, 会向前端返回数据
      console.log('返回的数据为', data)
      location.reload()
    })
})


e('ul').addEventListener('click', (event) => {
  const item = event.target.innerText.trim().replace(/ /g, "-")
  fetch(`/todo/${item}`, {
    method: 'DELETE',
  }).then(() => location.reload())
    .catch(err => console.error(err))
})