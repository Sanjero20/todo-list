function loadProjectLists(key) {
  // load previous data, if null, return empty list
  return JSON.parse(localStorage.getItem(key)) || [];
}

function loadSelectedProject(ID_key) {
  return localStorage.getItem(ID_key);
}

function saveProjectList(key, list) {
  localStorage.setItem(key, JSON.stringify(list));
}

function saveSelectedProject(key, selectedProject) {
  localStorage.setItem(key, selectedProject);
}

export {
  loadProjectLists,
  saveProjectList,
  loadSelectedProject,
  saveSelectedProject,
};
