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
            this.projectList = [new Project("Inbox"), new Project("Today"), new Project('This Week')];
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

    addProject(project){
        this.projectList.push(project);
        this.saveToStorage();
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

    addTask(projectName, task){
        this.getProject(projectName).addTask(task);
        this.saveToStorage();
    }

    deleteTask(projectName, taskName){
        this.getProject(projectName).deleteTask(taskName);
        this.saveToStorage();
    }

    getTodaysTasks(){
        this.getProject('Today').setTaskList([]); //Empty today's tasks
        this.projectList.forEach(p => {
            p.getTasks.forEach(t => {
                if (isToday(t.getDate())) {
                    let cloneName = `${t.getName()} [${p.getName}]`;
                    let cloneTask = new Task()
                    this.getProject('Today').addTask(t)
                }
            });
        });
        return todaysTasks;
    }
    getThisWeeksTasks(){
        let weekTasks = [];
        this.projectList.forEach(p => {
            if (p.getName() === 'Today' || p.getName() === 'This week')
                return
            
            p.getTasks.forEach(t => {
                if (isThisWeek(t.getDate())) {
                    weekTasks.push(t);
                }
            });
        });
        return weekTasks;
    }
}