function createProject(name) {
  return {
    id: Date.now().toString(),
    name: name,
    tasks: [],
  };
}

function createTask(name, desc, date, prio) {
  return {
    id: Date.now().toString(),
    title: name,
    description: desc,
    dueDate: date,
    priority: prio,
  };
}

const addTask = document.querySelector('.add-task');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const formSubmitBtn = document.getElementById('submit');

// Form elements
const formTitle = document.querySelector('[data-form-title]');
const formDescription = document.querySelector('[data-form-description]');
const formDueDate = document.querySelector('[data-form-due-date]');
const formPriority = document.querySelector('[data-form-priority]');
const formTitleError = document.querySelector('.title-msg');

function formListener() {
  addTask.addEventListener('click', (e) => {
    if (formSubmitBtn.innerText !== 'Submit') {
      resetForm();
    }
    openForm();
  });

  overlay.addEventListener('click', (e) => {
    closeForm();
  });
}

function resetForm() {
  formTitle.value = '';
  formDescription.value = '';
  formDueDate.value = '';
  formPriority.value = 'low';

  formTitle.classList.remove('error');
  formTitleError.innerHTML = '';
  formSubmitBtn.innerText = 'Submit';
}

function openForm() {
  modal.classList.add('show');
  overlay.classList.add('show');
}

function closeForm() {
  modal.classList.remove('show');

  overlay.classList.remove('show');
}

export {
  formListener,
  openForm,
  closeForm,
  createProject,
  createTask,
  resetForm,
};
