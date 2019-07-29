const e = sel => document.querySelector(sel)

e('.delete-article').addEventListener('click', function(event){
  const target = event.target
  const id = target.dataset.id
  fetch(`/articles/${id}`, {
    method: 'DELETE'
  }).then(res => window.location.href="/")
  .catch(err => console.error(err))
})