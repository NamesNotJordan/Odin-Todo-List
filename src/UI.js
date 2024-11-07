import TodoList from "./TodoList";
import Project from "./Project";
import Task from "./Task";
import {format} from "date-fns";

//Functionality:
//TODO:Exapnd task for more details

export default class UI {
    constructor(){
        this.todoList = new TodoList();
        this.activeProjectName = '';
    }
    // Load content
    loadBase(){
        this.loadProjects();
        this.initProjectButtons();
        this.openProject('Inbox', document.getElementById('inbox-button'));
        document.addEventListener('keydown',this.handleEscape);
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
        this.initAddProjectButton();
    }

    loadTasks(projectName){
        this.todoList.getProject(projectName)
        .getTaskList()
        .forEach((task) => this.createTaskCard(task.getName(), task.getDate()));

        if (projectName !== 'Today' && projectName !== 'This Week') {
            this.initAddTaskButtons();
        }
    }

    loadProjectContent(projectName){
        // Update Heading
        let projectHeading = document.getElementById('project-heading');
        projectHeading.innerHTML = projectName;

        //Add an "Add Task" button if not in the Today or Weekly view
        if (projectName !== 'Today' && projectName !== 'This Week') {
            let taskUL = document.querySelector('.task-ul');
            //TODO: Add Icon
            taskUL.innerHTML =  `
                <button class="button-add-task" id="button-add-task">
                    <i class=""></i> 
                    Add Task
                </button>
                <div class="add-task-popup" id="add-task-popup">
                    <input
                        class="input-add-task-popup"
                        id="input-add-task-popup"
                        type="text"
                    />
                    <div class="add-task-popup-buttons">
                        <button class="button-add-task-popup" id="button-add-task-popup">
                            Add
                        </button>
                        <button
                        class="button-cancel-task-popup"
                        id="button-cancel-task-popup"
                        >
                            Cancel
                        </button>
                    </div>
                </div>`
        }

        this.loadTasks(projectName);
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

    closePopUps(){
        this.closeAddProjectPopup();
        if(document.querySelector("#button-add-task")){
            this.closeAddTaskPopup();
        }

        if (document.querySelector(".task-ul").innerHTML !== ''){
            this.closeAllInputs();
        }
    }
    
    closeAllInputs(){
        let taskButtons = document.querySelectorAll('.task-button');

        taskButtons.forEach((button) =>{
            this.closeRenameInput();
            this.closeSetDueDateInput();
        })
    }

    handleEscape(e){
        if (e.key === 'Escape') 
            this.closePopUps();
    }

    // Create Content
    createTaskCard(taskName, taskDueDate){
        let taskList = document.querySelector(".task-ul");
        let taskCard = document.createElement("button");
        taskCard.classList.add("task-button","cyber-card");

        // Task Content and input for renaming
        let taskContentContainer = document.createElement("div");
        let taskLabel = document.createElement("p");
        taskLabel.classList.add("task-name");
        taskLabel.innerHTML = taskName;

        let taskNameInput = document.createElement("input");
        taskNameInput.type = "text";
        taskNameInput.classList.add("task-name-input");
        
        taskContentContainer.appendChild(taskLabel);
        taskContentContainer.appendChild(taskNameInput);

        // Container for date attribute
        let taskDateContainer = document.createElement("div");
        let taskDueDateLabel = document.createElement("p");
        taskDueDateLabel.className = "due-date-text";
        taskDueDateLabel.innerText = taskDueDate;

        let taskDueDateInput = document.createElement("input");
        taskDueDateInput.classList = "due-date-input";
        taskDueDateInput.type = "date";

        taskDateContainer.appendChild(taskDueDateLabel);
        taskDateContainer.appendChild(taskDueDateInput);
        taskList.appendChild(taskCard);

        this.initTaskButtons();
    }

    createProjectCard(projectName) {
        let projectUl = document.querySelector(".project-ul");
        
        let projectDiv = document.createElement("button");
        projectDiv.classList.add("project-button");
        projectUl.appendChild(projectDiv);

        let projectLabel = document.createElement("p");
        projectLabel.classList.add("project-label");
        projectLabel.innerHTML = projectName;
        projectDiv.appendChild(projectLabel);

        this.initProjectButtons();
    }

    // Project Events

    addProject(){
        //Get data from inputs
        let addProjectPopupInput = document.querySelector('#add-project-input');
        let projectName = addProjectPopupInput.value;

        if (projectName === '') {
            alert("Project name can't be empty")
            return
          }
        
        if (this.todoList.getProject(projectName)) {
            addProjectPopupInput.value = '';
            alert('There is already a project with that name');
            return;
        }
        this.todoList.addProject(new Project(projectName));
        this.createProjectCard(projectName);
        this.closeAddProjectPopup();

    }

    deleteProject(){}

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

    closeAddProjectPopup(){
        let addProjectPopup = document.querySelector('.add-project-popup');
        let addProjectButton = document.querySelector('.add-project-button');
        let addProjectPopupInput = document.querySelector('#add-project-input');
        
        addProjectButton.classList.remove('active');
        addProjectPopup.classList.remove('active');
        addProjectPopupInput.value = '';
    }

    handleAddProjectPopupInput(e){
        if (e.key === 'Enter'){this.addProject()}
    }

    initProjectButtons(){

    }

    handleProjectButton(e){}

    openNav(){}

    // Task Event Listeners
    initAddTaskButtons(){}

    openAddTaskPopup(){}

    closeAddTaskPopup(){}

    addTask(){}

    handleAddTaskPopupInput(){}

    initTaskButtons(){}

    handleTaskButton(){}

    setTaskComplete(){}

    deleteTask(){}

    openRenameInput(){}

    closeRenameInput(){}

    renameTask(){}

    openSetDueDateInput(){}

    closeSetDueDateInput(){}

    setTaskDueDate(){}
}