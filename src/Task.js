export default class Task {
    constructor(name, description, dueDate, priority){
        this.name = name;
        this.description = description;
        this.dueDate = dueDate; // Date object
        this.priority = priority; // int
    }

    // Accessors:
    getName(){
        return this.title;
    }
    setName(name){
        this.name = name;
    }
    getDescription() {
        return this.description;
    }
    setDescription(newDescription) {
        this.description = newDescription;
    }
    getDate(){
        return this.dueDate;
    }
    setDate(newDate){
        this.dueDate = newDate;
    }
    getPriority(){
        return this.priority;
    }
    setPriority(newPriority){
        this.priority = newPriority;
    }
    
}