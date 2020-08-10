var buttonEl = document.querySelector("#save-task"); //Assigns html button to a variable as "buttonEl"
var tasksToDoEl = document.querySelector("#tasks-to-do"); //Assigns <ul> from html to a variable as "tasksToDoEl"

var createTaskHandler = function() { //Creates the new task with a click of a button.
    var listItemEl = document.createElement("li"); //Creates the element for <li>.
    listItemEl.className = "task-item"; //Says what style the created task will have.
    listItemEl.textContent = "This is a new task."; //Displays new task.
    tasksToDoEl.appendChild(listItemEl); // Method attaches a node as the last child of the list.
}

buttonEl.addEventListener("click", createTaskHandler) //Links button click to createTaskHandler function.
