// Contains the logic for managing projects and tasks
import Task from "./Task";
import Project from "./Project";
import { isToday, isThisWeek} from "date-fns";

//TODO:Edit Tasks
//TODO:Edit Projects
//TODO:Add lists to Local Storage when creating or adding

export default class TodoList {
    constructor(){
        if (localStorage.getItem("projects")) {
            this.projectList = localStorage.getItem("projects")
        }
        else {
            this.projectList = [new Project("Inbox")];
        }
    }
    loadProjects() {
        if (localStorage.getItem("projects")) {
            this.projectList = localStorage.getItem("projects")
        }
    }
    saveToStorage() {
        localStorage.setItem("projects", this.projectList);
    }
    
    getProject(projectName){
        index = this.projectList.find(p => p.getName = projectName);
        return this.projectList[index];
    }

    deleteProject(targetProject){ 
        projectList = projectList.filter(p => p !== targetProject);
        this.saveToStorage();
    }

    getProjectList(){
        return this.projectList;
    }

    getTodaysTasks(){
        let todaysTasks = [];
        this.projectList.forEach(p => {
            p.getTasks.forEach(t => {
                if (isToday(t.getDate())) {
                    todaysTasks.push(t);
                }
            });
        });
        return todaysTasks;
    }
    getThisWeeksTasks(){
        let weekTasks = [];
        this.projectList.forEach(p => {
            p.getTasks.forEach(t => {
                if (isThisWeek(t.getDate())) {
                    weekTasks.push(t);
                }
            });
        });
        return weekTasks;
    }

}