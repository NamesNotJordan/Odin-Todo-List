// Contains the logic for managing projects and tasks
import Task from "./Task";
import Project from "./Project";
import { isToday } from "date-fns";

//TODO:Edit Tasks
//TODO:Edit Projects
//TODO:Add lists to Local Storage when creating or adding

export default class TodoList {
    projectList = [new Project("Inbox")];

    loadProjects() {
        if (localStorage.getItem("projects")) {
            projectList = localStorage.getItem("projects")
        }
    }
    saveToStorage() {
        localStorage.setItem("projects", projectList);
    }
    
    getProject(projectName){
        index = this.projectList.find(p => p.getName = projectName);
        return this.projectList[index];
    }

    deleteProject(targetProject){ 
        projectList = projectList.filter(p => p !== targetProject);
    }

    getTodaysTasks(){
        
    }

}