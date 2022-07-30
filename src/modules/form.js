// Form DOM Elemets
const addItemBtn = document.querySelector('.add-item')
const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')

const form = document.getElementById('input-todo')
const inputs = form.querySelectorAll('input')
const description = document.querySelector('#description')

const cancelBtn = document.getElementById('cancel')
const submitBtn = document.getElementById('submit')

// Error DOM Elements
const titleInput = document.querySelector('input[name="title"]')
const titleError = document.querySelector('.title-error-msg')

const todoList = []

// Class -> create a ToDo item
class ToDo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

// functionalities 
function show() {
  modal.classList.add('show');
  overlay.classList.add('show');
  addItemBtn.classList.add('hide');
}

function hide() {
  modal.classList.remove('show');
  overlay.classList.remove('show');
  addItemBtn.classList.remove('hide');
}

function removeError() {
  titleError.textContent = "";
  titleInput.classList.remove('error');
}

function showError() {
  titleError.textContent = "Please enter a title";
  titleInput.classList.add('error');
}

function resetForm() {
  inputs.forEach(input => input.value = "");
  description.value = "";
}

// Form Event listeners
function inputValidation() {
  titleInput.addEventListener('keydown', removeError)
}

function openForm() {
  addItemBtn.onclick = show;
}

function closeForm() {
  overlay.onclick = hide;
}

function cancelInput() {
  cancelBtn.onclick = () => {
    hide()
    removeError()
    resetForm()
  }
}

function submitInput() {
  submitBtn.onclick = () => {
    createToDO()
  }
}

function popupForm() {
  inputValidation()
  openForm()
  closeForm()
  cancelInput()
  submitInput()
}

function createToDO() {
  if (titleInput.value.trim() === "") {
    showError()
    return;
  }

  const title = titleInput.value.trim()
  const desc = description.value
  const date = document.querySelector('input[type=date]').value
  const prio = priority.value

  const todo = new ToDo(title, desc, date, prio)
  // Push new todo item to the todo List
  todoList.push(todo)

  hide()
  resetForm()
}

function getToDOList() {
  return todoList;
}

export {popupForm, getToDOList}