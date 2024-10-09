import TodoList from "./TodoList";
import Project from "./Project";
import Task from "./Task";
import {format} from "date-fns";

//Functionality:
//TODO:View all projects
//TODO:View all tasks in a project
//TODO:Exapnd task for more details

export default class UI {
    todoList = new TodoList();
    // Load content
    loadBase(){}

    loadProjects(){}

    loadTasks(){}

    loadProjectContent(){}

    // Clearing Content
    clear(){
        this.clearProjects();
        this.clearTasks();
    }

    clearProjectContent(){
    }

    clearProjects(){
        document.querySelector("project-ul").innerHTML = '';
    }

    clearTasks(){
        document.querySelector(".task-ul").innerHTML ='';
    }

    closePopUps(){}
    
    // Create Content
    createTaskCard(task){
        let taskList = document.querySelector(".task-list");
        let taskCard = document.createElement("li");
        taskCard.classList.add("task","cyber-card");
        taskList.appendChild(taskCard);

        let taskLabel = document.createElement("p");
        taskLabel.classList.add("task-name");
        taskLabel.innerHTML = task.getName();
        taskCard.appendChild(taskLabel);
    }

    createProjectCard(project) {
        let projectUl = document.querySelector(".project-ul");
        
        let projectDiv = document.createElement("button");
        projectDiv.classList.add("project");
        projectUl.appendChild(projectDiv);

        let projectLabel = document.createElement("p");
        projectLabel.classList.add("project-label");
        projectLabel.innerHTML = project.getName();
        projectDiv.appendChild(projectLabel);
    }

    // Project Event Listeners

    //Task Event Listeners
}