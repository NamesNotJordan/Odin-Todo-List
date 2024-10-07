// Contains the logic for managing projects and tasks
import Task from "./Task";
import Project from "./Project";

//TODO:Edit Tasks
//TODO:Edit Projects
//TODO:Add lists to Local Storage when creating or adding


const today = new Date();
taskList = [];
projectList = [];

const todayTasks = this.taskList.filter(task => isDueToday(Date(task.dueDate)));


function isDueToday(dueDate){
    let today = new Date();
    return dueDate.setHours(0,0,0,0) == today.setHours(0,0,0,0);
}
function loadLists() {
    if (localStorage.getItem("tasks")) {
        taskList = localStorage.getItem("tasks");
    }
    if (localStorage.getItem("projects")) {
        projectList = localStorage.getItem("projects")
    }
}
function saveToStorage() {
    localStorage.setItem("tasks", taskList);
    localStorage.setItem("projects", projectList);
}
function addTaskToList(task) {
    taskList.add(task);
    saveToStorage();
}