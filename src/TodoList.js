// Contains the logic for managing projects and tasks
import Task from "./Task";
import Project from "./Project";

//TODO:Edit Tasks
//TODO:Edit Projects
//TODO:Add lists to Local Storage when creating or adding


const inboxProject = new Project("Inbox", "All your loose tasks");
projectList = [inboxProject];



function isDueToday(dueDate){
    let today = new Date();
    return dueDate.setHours(0,0,0,0) == today.setHours(0,0,0,0);
}
function loadProjects() {
    if (localStorage.getItem("projects")) {
        projectList = localStorage.getItem("projects")
    }
}
function saveToStorage() {
    localStorage.setItem("projects", projectList);
}
function addTaskToList(task) {
    saveToStorage();
}

function deleteProject(targetProject){ 
    projectList = projectList.filter(p => p!== targetProject);
}