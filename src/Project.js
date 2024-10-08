// A list of related Tasks

class Project {
    constructor(projectName, description){
        this.projectName = projectName;
        this.description = description;
        this.taskList = [];
    }
    toDOM() {
        taskComps = this.taskList.map(task => task.toDOM());
    }
    addTask(task) {
        this.taskList.add(task);
    }
    setName(newName){
        this.projectName = newName;
    }
    setDescription(description){
        this.description = description;
    }
    deleteTask(task){
        
    }
}

export default Project;