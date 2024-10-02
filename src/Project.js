// A list of related Tasks

class Project {
    constructor(projectName, description){
        this.projectName = projectName;
        this.description = description;
        this.taskList = [];
    }
}

export default Project;