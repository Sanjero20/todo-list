// Modal task information
const taskInformationModal = document.querySelector('.modal-task-info')
const overlay = document.querySelector('.overlay-task')

function openTaskInfo() {
  taskInformationModal.classList.add('show')
  overlay.classList.add('show') 
}

function taskInfoListener() {
  overlay.addEventListener('click', (e) => {
    taskInformationModal.classList.remove('show')
    overlay.classList.remove('show')
  })
}

function changeTaskInfoContent(taskObj) {
  const title = document.querySelector('.modal-task .task-title p')
  const description = document.querySelector('.modal-task .task-description')
  const dueDate = document.querySelector('.modal-task .task-dueDate')
  const priority  = document.querySelector('.priority')
  
  
  title.innerText = taskObj.title

  if (taskObj.description === '') {
    description.innerText = 'No Description'
  } else {
    description.innerText = taskObj.description
  }

  const deadline = taskObj.dueDate
  if (deadline === '') {
    dueDate.innerHTML = 'None'
  } else {
    dueDate.innerHTML = taskObj.dueDate
  }
  

  const prioLevel = taskObj.priority
  if (prioLevel === 'high') {
    // priority.classList.add('high')
    priority.style.color = 'green'
  }
  else if (prioLevel === 'medium') {
    priority.style.color = 'orange'
  }
  else if (prioLevel === 'low') {
    priority.style.color = 'red'
  }
}

export {
  openTaskInfo,
  taskInfoListener,
  changeTaskInfoContent,
}