import TodoList from "./TodoList";
import Project from "./Project";
import Task from "./Task";
import {format} from "date-fns";

//Functionality:
//TODO:View all projects
//TODO:View all tasks in a project
//TODO:Exapnd task for more details

export default class UI {
    constructor(){
        this.todoList = new TodoList();
        this.activeProjectName = '';
    }
    // Load content
    loadBase(){
        this.loadProjects();
        
    }

    loadProjects(){
        this.todoList.getProjectList().forEach((project) =>{
            if (
                project.getName() !== 'Inbox' &&
                project.getName() !== 'Today' &&
                project.getName() !== 'This Week' 
            ){
                this.createProjectCard(project);
            }
        })
    }

    loadTasks(projectName){
        this.todoList.getProject(projectName)
        .getTaskList()
        .forEach((task) => this.createTaskCard(task))
    }

    loadProjectContent(projectName){
        // Update Heading
        let projectHeading = document.getElementById('project-heading');
        projectHeading.innerHTML = projectName;

        //Add an "Add Task" button if no in the Today or Weekly view
        if (projectName !== 'Today' && projectName !== 'This Week') {
            
        }
    }

    // Clearing Content
    clear(){
        this.clearProjects();
        this.clearTasks();
    }

    clearProjectContent(){
        document.getElementById('project-heading').innerHTML='';
        document.querySelector('.task-ul').innerHTML = '';
    }

    clearProjects(){
        document.querySelector("project-ul").innerHTML = '';
    }

    clearTasks(){
        document.querySelector(".task-ul").innerHTML ='';
    }

    closePopUps(){}
    
    closeAllInputs(){}

    handleEscape(e){
        if (e.key === 'Escape') 
            this.closePopUps();
    }
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
        projectDiv.classList.add("project-button");
        projectUl.appendChild(projectDiv);

        let projectLabel = document.createElement("p");
        projectLabel.classList.add("project-label");
        projectLabel.innerHTML = project.getName();
        projectDiv.appendChild(projectLabel);
    }

    addProject(){
        //Get data from inputs

    }
    // Project Event listeners
    initAddProjectButton(){
        let addProjectButton = document.querySelector('.add-project-button');
        let addProjectPopupInput = document.querySelector('#add-project-input');
        let addProjectPopupButton = document.querySelector('#popup-add-project-button');
        let cancelAddProjectPopupButton = document.querySelector('#popup-cancel-project-button');

        addProjectButton.addEventListener('click', this.openAddProjectPopup);
        addProjectPopupButton.addEventListener('click', this.addProject);
        cancelAddProjectPopupButton.addEventListener('click', this.closeAddProjectPopup);
        addProjectPopupInput.addEventListener('keypress', this.handleAddProjectPopupInput);
    }

    openProject(projectName, projectButton){
        const projectButtons = document.querySelectorAll('.project-button');
        projectButtons.forEach((button) => button.classList.remove('active'));
        projectButton.classList.add('active');

        this.loadProjectContent(projectName);
    }
    static openTodayProject(){
        this.todoList.updateTodaysTasks();
        this.openProject('Today', this);
    }
    static openThisWeekProject(){
        this.todoList.updateThisWeeksTasks();
        this.openProject('This Week', this);
    }

    openAddProjectPopup(){
        let addProjectPopup = document.querySelector('.add-project-popup');
        let addProjectButton = document.querySelector('.add-project-button');

        this.closePopUps();
        addProjectPopup.classList.add('active');
        addProjectButton.classList.add('active');
    }
    // Task Event Listeners
    
}