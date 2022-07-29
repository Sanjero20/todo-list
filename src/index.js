import loadHome from "./pages/home";

const addItemBtn = document.querySelector('.add-item')
const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')


addItemBtn.onclick = () => {
  modal.classList.add('show')
  overlay.classList.add('show')
  addItemBtn.classList.add('hide')
}

overlay.onclick = () => {
  modal.classList.remove('show')
  overlay.classList.remove('show')
  addItemBtn.classList.remove('hide')
}