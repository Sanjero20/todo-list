
const addItemBtn = document.querySelector('.add-item')
const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')

const form = document.getElementById('input-todo')
const inputs = form.querySelectorAll('input')
const description = document.querySelector('#description')
// const priority = document.getElementById('priority')

const cancelBtn = document.getElementById('cancel')
const submitBtn = document.getElementById('submit')

// Form functionalites 
function show() {
  modal.classList.add('show')
  overlay.classList.add('show')
  addItemBtn.classList.add('hide')
}

function hide() {
  modal.classList.remove('show')
  overlay.classList.remove('show')
  addItemBtn.classList.remove('hide')
}

function resetFormInput() {
  inputs.forEach(input => {
    input.value = "";
  })
  description.value = ""
}

// Form Event listeners
function openForm() {
  addItemBtn.onclick = show;
}

function closeForm() {
  overlay.onclick = hide;
}

function cancelInput() {
  cancelBtn.onclick = () => {
    hide()
    resetFormInput()
  }
  
}

export {openForm, closeForm, cancelInput}



