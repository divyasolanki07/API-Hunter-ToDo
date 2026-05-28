const API = 'http://localhost:3000/todos'

const statusElement = document.getElementById('status')
const listElement = document.getElementById('todo-list')
const formElement = document.getElementById('todo-form')
const inputElement = document.getElementById('new-todo')

function setStatus(message, type = 'info') {
  statusElement.textContent = message
  statusElement.className = type
}

async function fetchTodos() {
  const res = await fetch(API)
  if (!res.ok) throw new Error('Unable to load todos')
  return res.json()
}

async function createTodo(title) {
  const res = await fetch(API, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title, completed: false})
  })
  if (!res.ok) throw new Error('Unable to save todo')
  return res.json()
}

async function updateTodo(id, patch) {
  const res = await fetch(`${API}/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(patch)
  })
  if (!res.ok) throw new Error('Unable to update todo')
  return res.json()
}

async function deleteTodo(id) {
  const res = await fetch(`${API}/${id}`, {method:'DELETE'})
  if (!res.ok) throw new Error('Unable to delete todo')
}

function createTodoItem(todo) {
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.checked = todo.completed
  checkbox.addEventListener('change', async () => {
    try {
      await updateTodo(todo.id, {completed: !todo.completed})
      loadTodos()
    } catch (err) {
      setStatus(err.message, 'error')
    }
  })

  const title = document.createElement('span')
  title.className = 'todo-title' + (todo.completed ? ' completed' : '')
  title.textContent = todo.title

  const label = document.createElement('label')
  label.className = 'todo-item'
  label.appendChild(checkbox)
  label.appendChild(title)

  const deleteButton = document.createElement('button')
  deleteButton.type = 'button'
  deleteButton.textContent = 'Delete'
  deleteButton.addEventListener('click', async () => {
    try {
      await deleteTodo(todo.id)
      loadTodos()
    } catch (err) {
      setStatus(err.message, 'error')
    }
  })

  const item = document.createElement('li')
  item.appendChild(label)
  const actions = document.createElement('div')
  actions.className = 'actions'
  actions.appendChild(deleteButton)
  item.appendChild(actions)
  return item
}

async function loadTodos() {
  listElement.innerHTML = ''
  setStatus('Loading todos...', 'info')
  try {
    const todos = await fetchTodos()
    if (todos.length === 0) {
      setStatus('No todos yet. Add your first task.', 'info')
      return
    }
    setStatus('')
    todos.forEach(todo => listElement.appendChild(createTodoItem(todo)))
  } catch (err) {
    setStatus(err.message, 'error')
  }
}

formElement.addEventListener('submit', async event => {
  event.preventDefault()
  const title = inputElement.value.trim()
  if (!title) return

  try {
    await createTodo(title)
    inputElement.value = ''
    setStatus('Todo added.', 'success')
    loadTodos()
  } catch (err) {
    setStatus(err.message, 'error')
  }
})

loadTodos()
