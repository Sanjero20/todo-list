import { loadProjectLists, saveProjectList, loadSelectedProject, saveSelectedProject} from "./saveLocal"

// DOM Elements
const projectsContainer = document.querySelector('[data-projects]')
const newProjForm = document.querySelector('[data-new-project-form]')
const newProjInput = document.querySelector('[data-new-project-input]')
const deleteProjBtn = document.querySelector('[data-delete-project-btn]')

// To do list Elements
const toDoListContainer = document.querySelector('[data-project-display-container]')
const toDoListTitle = document.querySelector('[data-project-title]')
const tasksContainer = document.querySelector('[data-tasks]')

// local Storage keys
const LOCAL_STORAGE_PROJECT_KEY = 'task.projects'
const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = 'task.selectedProject'

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

// functions
function createProject(name) {
  return {
    id: Date.now().toString(),
    name: name,
    task: [],
  }
}

function saveAndRender() {
  saveProjectList(LOCAL_STORAGE_PROJECT_KEY, projects)
  saveSelectedProject(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY, selectedProjectID)
  render()
}

function render() {
  clearElement(projectsContainer)
  renderProjectList()

  // Tasks
  const selectedProject = projects.find(project => project.id === selectedProjectID)

  if (selectedProjectID == null) {
    toDoListContainer.style.display = 'none'
  } else {
    toDoListContainer.style.display = ''
    toDoListTitle.innerText = selectedProject.name
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



function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

// Driver Code
render()