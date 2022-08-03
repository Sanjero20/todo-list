import { loadProjectLists, saveProjectList, loadSelectedProject, saveSelectedProject} from "./saveLocal"
import { openForm, closeForm, createProject, createTask } from "./form"

// DOM Elements
const projectsContainer = document.querySelector('[data-projects]')
const newProjForm = document.querySelector('[data-new-project-form]')
const newProjInput = document.querySelector('[data-new-project-input]')
const deleteProjBtn = document.querySelector('[data-delete-project-btn]')

// Add Task Form Elements

const formTitle = document.querySelector('[data-form-title]')
const formDescription = document.querySelector('[data-form-description]')
const formDueDate = document.querySelector('[data-form-due-date]')
const formPriority = document.querySelector('[data-form-priority]')
const formTitleError = document.querySelector('.title-msg')

// To do list Elements
const toDoListContainer = document.querySelector('[data-project-display-container]')
const toDoListTitle     = document.querySelector('[data-project-title]')
const tasksContainer    = document.querySelector('[data-tasks]')

const formCancelBtn = document.getElementById('cancel')
const formSubmitBtn = document.getElementById('submit')

// Template
const taskTemplate = document.getElementById('task-template') 

// local Storage keys
const LOCAL_STORAGE_PROJECT_KEY = 'task.projects'
const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = 'task.selectedProjectId'

// Variables
let projects = loadProjectLists((LOCAL_STORAGE_PROJECT_KEY))
let selectedProjectID = loadSelectedProject(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY)

// Event Listeners
projectsContainer.addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'li') {
    selectedProjectID = e.target.dataset.projID
    saveAndRender()
  }
})

newProjForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const projectName = newProjInput.value 
  if (projectName == null || projectName === '') return
  const project = createProject(projectName);
  projects.push(project)
  newProjInput.value = null
  saveAndRender()
})

deleteProjBtn.addEventListener('click', (e) => {
  projects = projects.filter(project => project.id !== selectedProjectID)
  selectedProjectID = null
  saveAndRender()
})

// Form Event Listener 
formCancelBtn.addEventListener('click', (e) => {
  closeForm()
  resetForm()
})

formSubmitBtn.addEventListener('click', (e) => {
  if (formTitle.value == null || formTitle.value === '') {
    formTitle.classList.add('error')
    formTitleError.innerHTML = 'Please include a title'
    return
  }

  const title = formTitle.value
  const desc = formDescription.value
  const dueDate = formDueDate.value
  const prio = formPriority.value

  const task = createTask(title, desc, dueDate, prio)

  // push to project tasks
  const selectedProject = projects.find(project => project.id === selectedProjectID)
  selectedProject.tasks.push(task)
  saveAndRender()
  closeForm()
  resetForm()
})

formTitle.addEventListener('keydown', (e) => {
  if (formTitle.value !== '') {
    formTitle.classList.remove('error')
    formTitleError.innerHTML = ''
  }
})

// functions
function saveAndRender() {
  saveProjectList(LOCAL_STORAGE_PROJECT_KEY, projects)
  saveSelectedProject(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY, selectedProjectID)
  render()
}

function render() {
  clearElement(projectsContainer)
  renderProjectList()

  const selectedProject = projects.find(project => project.id === selectedProjectID)
  if (selectedProjectID == null|| selectedProjectID == 'null') {
    toDoListContainer.classList.add('hide')
  } else {
    toDoListContainer.classList.remove('hide');
    toDoListTitle.innerText = selectedProject.name;
    clearElement(tasksContainer)
    renderProjectTask(selectedProject)
  }
}

function renderProjectList() {
  projects.forEach(project => {
    // create element (sample: <li class="project-name></li>")
    const projElement = document.createElement('li')
    projElement.dataset.projID = project.id
    projElement.classList.add('project-name')
    projElement.innerText = project.name

    // Highlight selected project
    if (project.id === selectedProjectID) {
      projElement.classList.add('active-project')
    }
    projectsContainer.appendChild(projElement)
  })
}

function renderProjectTask(selectedProject) {
  selectedProject.tasks.forEach(task => {
    const taskElement = document.importNode(taskTemplate.content, true)
    const taskTitle = taskElement.querySelector('.task-title')
    const taskDueDate = taskElement.querySelector('.task-dueDate')

    const editBtn = document.querySelector('.edit-task')
    const deleteBtn = document.querySelector('.delete-task')

    taskTitle.innerText = task.title
    taskDueDate.innerText = task.dueDate
    tasksContainer.appendChild(taskElement)
  })
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

function resetForm() {
  formTitle.value = ''
  formDescription.value = ''
  formDueDate.value = ''
  formPriority.value = 'low'

  formTitle.classList.remove('error')
  formTitleError.innerHTML = ''
}

// Driver Code
openForm()
render()