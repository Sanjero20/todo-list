function createProject(name) {
  return {
    id: Date.now().toString(),
    name: name,
    task: [],
  }
}

function createTask(name) {
  return {
    id: Date.now().toString(),
    title: name,
    description: desc,
    dueDate: date,
    priority: prio,
  }
}

const addTask = document.querySelector('.add-task')
const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')

function openForm() {
  addTask.addEventListener('click', (e) => {
    modal.classList.add('show')
    overlay.classList.add('show')
  })

  overlay.addEventListener('click', (e) => {
    closeForm()
  })
}

function closeForm(){
  modal.classList.remove('show')
  overlay.classList.remove('show')
}

export {
  openForm,
  closeForm,
  createProject,
  createTask,
}