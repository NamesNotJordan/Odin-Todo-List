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
        taskContentContainer.classList.add('task-content');
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
        taskDateContainer.classList.add('task-date-container')
        let taskDueDateLabel = document.createElement("p");
        taskDueDateLabel.className = "due-date-text";
        taskDueDateLabel.innerText = taskDueDate;

        let taskDueDateInput = document.createElement("input");
        taskDueDateInput.classList = "due-date-input";
        taskDueDateInput.type = "date";

        taskDateContainer.appendChild(taskDueDateLabel);
        taskDateContainer.appendChild(taskDueDateInput);
        
        taskCard.appendChild(taskContentContainer);
        taskCard.appendChild(taskDateContainer);
        taskList.appendChild(taskCard);

        this.initTaskButtons();
    }

    createProjectCard(projectName) {
        let projectUl = document.querySelector(".project-ul");
        
        let projectButton = document.createElement("button");
        projectButton.classList.add("project-button");
        projectButton.classList.add("user-project");
        projectUl.appendChild(projectButton);

        let projectLabel = document.createElement("p");
        projectLabel.classList.add("project-label");
        projectLabel.innerHTML = projectName;
        projectButton.appendChild(projectLabel);

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

    deleteProject(projectName, button){
        if (button.classList.contains('active')){
            this.clearProjectContent();
        }
        this.todoList.deleteProject(this.todoList.getProject(projectName));
        this.clearProjects();
        this.loadProjects();
    }

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
    openTodayProject(button){
        this.todoList.updateTodaysTasks();
        this.openProject('Today', button);
    }
    openThisWeekProject(button){
        this.todoList.updateThisWeeksTasks();
        this.openProject('This Week', button);
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
        let inboxButton = document.getElementById('inbox-button');
        let todayButton = document.getElementById('today-button');
        let weekButton = document.getElementById('week-button');
        let projectButtons = document.querySelectorAll('.user-project');

        inboxButton.addEventListener('click', () =>{ this.openProject('Inbox',inboxButton)});
        todayButton.addEventListener('click', ()=> { this.openTodayProject(todayButton)});
        weekButton.addEventListener('click', ()=> { this.openThisWeekProject(weekButton)});
        projectButtons.forEach((projectButton) =>{
            projectButton.addEventListener('click', (e) => {
                let projectName = projectButton.children[0].textContent;
                // TODO: Add delete button
                if (e.target.classList.contains('delete-task-thing')) {
                    
                }

                this.openProject(projectName, projectButton);
            })
        })
    }

    //handleProjectButton(e){}

    // Task Event Listeners
    initAddTaskButtons(){
        let addTaskButton = document.getElementById('button-add-task');
        let addTaskPopupButton = document.getElementById('button-add-task-popup');
        let cancelTaskPopupButton = document.getElementById('button-cancel-task-popup');
        let addTaskPopupInput = document.getElementById('input-add-task-popup');

        addTaskButton.addEventListener('click', this.openAddTaskPopup);
        addTaskPopupButton.addEventListener('click', this.addTask);
        cancelTaskPopupButton.addEventListener('click', this.closeAddTaskPopup);
        addTaskPopupInput.addEventListener('keypress', this.handleAddTaskPopupInput)
    }

    openAddTaskPopup(){
        let addTaskPopup = document.getElementById('add-task-popup');
        let addTaskButton = document.getElementById('button-add-task');

        this.closePopUps();
        addTaskPopup.classList.add('active');
        addTaskButton.classList.add('active');
    }

    closeAddTaskPopup(){
        let addTaskPopup = document.getElementById('add-task-popup')
        let addTaskButton = document.getElementById('button-add-task')
        let addTaskInput = document.getElementById('input-add-task-popup')

        addTaskPopup.classList.remove('active')
        addTaskButton.classList.remove('active')
        addTaskInput.value = '';
    }

    addTask(){
        let projectName = document.getElementById('project-heading').textContent;
        let addTaskPopupInput = document.getElementById('input-add-task-popup');
        let taskName = addTaskPopupInput.value;

        if (taskName === '') {
            alert("Task name can't be empty")
            return
        }

        if (this.todoList.getProject(projectName).getTask(taskName)) {
            alert('This project already has that task. PLease enter a different task name.');
            addTaskPopupInput.value = '';
            return
        }

        this.todoList.addTask(projectName, new Task(taskName,'','No Date', 0))
        this.closeAddTaskPopup();
    }

    handleAddTaskPopupInput(e){
        if (e.key === 'Enter') {
            this.addTask();
        }
    }

    initTaskButtons(){
        let taskButtons = document.querySelectorAll('.task-button');
        let taskNameInputs = document.querySelectorAll('.task-name-input');
        let dueDateInputs = document.querySelectorAll('.due-date-input');

        taskButtons.forEach((taskButton) =>
            taskButton.addEventListener('click', (e) => {
                // Todo: Consider combining delete and complete
                // Complete
                //Todo: Add icons
                if (e.target.classList.contains('check-button')) {
                    this.setTaskComplete(taskButton);
                    return
                }

                // Delete
                if(e.target.classList.contains('cross-icon')) {
                    this.deleteTask(taskButton);
                    return
                }

                // Rename
                if (e.target.classList.contains('task-content')) {
                    this.openRenameInput(taskButton);
                    return
                }

                // Re-Schedule
                if (e.target.classList.contains('task-date-container')) {
                    this.openSetDueDateInput(taskButton);
                }
            })
        );

        taskNameInputs.forEach((taskNameInput) => 
            taskNameInput.addEventListener('keypress', (e) => {
                if (e.key !== 'Enter'){
                    return
                }
                
                let projectName = document.getElementById('project-heading');
                let taskName = taskNameInput.previousElementSibling.textContent;
                let newTaskName = taskNameInput.value;

                if (newTaskName === ''){
                    alert('Task names must be at least 1 character long');
                    return;
                }
                if ( this.todoList.getProject(projectName).getTask(taskName) ) {
                    alert('That task already exists. Task names must be different');
                    taskNameInput.value = '';
                    return;
                }

                if (projectName === 'Today' || projectName === 'This Week') {
                    let parentProjectName = taskName.split('[')[1].split(']')[0];
                    let actualTaskName = taskName.split(' [')[0];

                    this.todoList.renameTask(projectName, taskName, `${newTaskName} [${parentProjectName}]`);
                    this.todoList.renameTask(parentProjectName, actualTaskName, newTaskName);
                }else {
                    this.todoList.renameTask(projectName, taskName, newTaskName);
                }
                this.clearTasks();
                this.loadTasks(projectName);
                this.closeRenameInput(taskNameInput.parentNode.parentNode);
            }));

        dueDateInputs.forEach((dueDateInput) =>
            dueDateInput.addEventListener('change', this.setTaskDueDate))

    }

    //handleTaskButton(){}

    setTaskComplete(taskButton){
        let projectName = document.getElementById('project-heading');
        let taskName = taskButton.children[0].children[0].textContent;

        // If today or week, extract project name from task name
        if (projectName === 'Today' || projectName === 'This Week') {
            let parentProjectName = taskName.split('[')[1].split(']')[0];
            this.todoList.deleteTask(parentProjectName, taskName.split(' [')[0]);
            if (projectName === 'Today') {
                this.todoList.updateTodaysTasks();
            } else {
                this.todoList.updateThisWeeksTasks();
            }
        }
        else {
            this.todoList.deleteTask(projectName, taskName);
        }
        this.clearTasks();
        this.loadTasks();
    }

    deleteTask(taskButton){
        let projectName = document.getElementById('project-heading');
        let taskName = taskButton.children[0].children[0].textContent;

        if (projectName === 'Today' || projectName === 'This Week') {
            let parentProjectName = taskName.split('[')[1].split(']')[0];
            this.todoList.deleteTask(parentProjectName, taskName.split(' [')[0]);
            if (projectName === 'Today') {
                this.todoList.updateTodaysTasks();
            } else {
                this.todoList.updateThisWeeksTasks();
            }
        }
        else {
            this.todoList.deleteTask(projectName, taskName);
        }
        this.clearTasks();
        this.loadTasks();
    }

    openRenameInput(taskButton){
        let taskNamePara = taskButton.children[0].children[0];
        let taskName = taskNamePara.textContent;
        let taskNameInput = taskButton.children[0].children[1];
        let projectName = document.getElementById('project-heading').textContent;

        if (projectName === 'Today' || projectName === 'This Week') {
            taskName = taskName.split(' [')[0];
        }

        this.closePopUps();
        taskNamePara.classList.add('active');
        taskNameInput.classList.add('active');
        taskNameInput.textContent = taskName;
    }

    closeRenameInput(taskButton){
        let taskNamePara = taskButton.children[0].children[0];
        let taskNameInput = taskButton.children[0].children[1];

        taskNamePara.classList.remove('active');
        taskNameInput.classList.remove('active');
        taskNameInput.textContent = '';
    }

    //renameTask(){}

    openSetDueDateInput(taskButton){}

    closeSetDueDateInput(){}

    //setTaskDueDate(){}
}