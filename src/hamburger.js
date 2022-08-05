const allProjects = document.querySelector('.all-projects');
const overlayBurger = document.querySelector('.overlay-burger');
const hamburger = document.getElementById('hamburger');

export default function hamburgerMenu() {
  hamburger.addEventListener('click', (e) => {
    allProjects.classList.add('show');
    overlayBurger.classList.add('show');
  });

  overlayBurger.addEventListener('click', (e) => {
    allProjects.classList.remove('show');
    overlayBurger.classList.remove('show');
  });
}
