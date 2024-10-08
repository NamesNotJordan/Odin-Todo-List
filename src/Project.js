// A list of related Tasks

class Project {
    constructor(projectName, description){
        this.projectName = projectName;
        this.description = description;
        this.taskList = [];
    }
    addTask(task) {
        this.taskList.add(task);
    }
    setName(newName){
        this.projectName = newName;
    }
    deleteTask(targetTask){
        this.taskList = this.taskList.filter(t => t !== targetTask)
    }
    sortTasksByPrio(){
        this.taskList.sort((a,b) => a.priority - b.priority)
    }
}

export default Project;