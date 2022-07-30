import {popupForm, getToDOList} from "./modules/form";

// Form Event Listener
popupForm();

const home = document.querySelector('#home')
home.onclick = () => {
  const arr = getToDOList()

  console.log(arr)
}

