var formEl = document.querySelector("#task-form"); //Assigns html from to a variable as "formEl"
var tasksToDoEl = document.querySelector("#tasks-to-do"); //Assigns <ul> from html to a variable as "tasksToDoEl"

var createTaskHandler = function() { //Creates the new task with a click of a button.
    
    event.preventDefault(); //Stops default reloading event of your browser.

    var listItemEl = document.createElement("li"); //Creates the element for <li>.
    listItemEl.className = "task-item"; //Says what style the created task will have.
    listItemEl.textContent = "This is a new task."; //Displays new task.
    tasksToDoEl.appendChild(listItemEl); // Method attaches a node as the last child of the list.
};

formEl.addEventListener("submit", createTaskHandler); //Links button click to createTaskHandler function.
