// A list of related Tasks

export default class Project {
    constructor(projectName){
        this.projectName = projectName;
        this.taskList = [];
    }
    setName(newName){
        this.projectName = newName;
    }
    getName(){
        return this.projectName;
    }
    addTask(task) {
        this.taskList.add(task);
    }
    deleteTask(targetTask){
        this.taskList = this.taskList.filter(t => t !== targetTask)
    }
    getTasks(){
        return this.taskList;
    }
    setTaskList(newList){
        this.taskList = newList;
    }
    sortTasksByPrio(){
        this.taskList.sort((a,b) => a.priority - b.priority)
    }
}
