// Contains the logic for managing projects and tasks
import Task from "./Task";
import Project from "./Project";

//TODO:Edit Tasks
//TODO:Edit Projects
//TODO:Add lists to Local Storage when creating or adding

export default function TodoList(){
    const today = new Date();

    this.taskList = [];
    this.projectList = [];

//TODO:Create "Today" project
    const todayTasks = this.taskList.filter(task => isDueToday(task.dueDate));
}

function isDueToday(dueDate){
    let today = new Date();
    return dueDate.setHours(0,0,0,0) == today.setDate();
}