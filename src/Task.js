class Task {
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate; // Date object
        this.priority = priority; // int
    }
    //TODO: method to create and return DOM element
    toDOM(){
        let div = document.createElement("div");
        div.classList.add("task","cyber-card");
        let label = document.createElement("p");
        label.classList.add("task-name");
        label.innerHTML = this.title;
        let date = document.createElement("p");
        date.classList.add("task-date");
        date.innerHTML = this.dueDate;

        div.appendChild(label);
        div.appendChild(date);

    }
    
}