var formEl = document.querySelector("#task-form"); //Assigns html from to a variable as "formEl"
var tasksToDoEl = document.querySelector("#tasks-to-do"); //Assigns <ul> from html to a variable as "tasksToDoEl"

var taskFormHandler = function() { //Creates the new task with a click of a button.
    event.preventDefault(); //Stops default reloading event of your browser.
    var taskNameInput = document.querySelector("input[name='task-name']").value; //Creates a variable for the text input.
    var taskTypeInput = document.querySelector("select[name='task-type']").value; //Creates a variable for selected option.
    
    
    var taskDataObj = { //Packages up data as an object.
        name: taskNameInput,
        type: taskTypeInput
    };

    createTaskEl(taskDataObj);
}

var createTaskEl = function(taskDataObj) { 

    var listItemEl = document.createElement("li"); //Creates the element for <li>.
    listItemEl.className = "task-item"; //Says what style the created task will have.
    var taskInfoEl = document.createElement("div"); //creates div to hold task info and add to list item.
    taskInfoEl.className = "task-info"; //gives it a class name.
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>"; // adds HTML content to div
    listItemEl.appendChild(taskInfoEl);
    tasksToDoEl.appendChild(listItemEl); // adds entire list item to list
}

formEl.addEventListener("submit", taskFormHandler); //Links button click to taskFormHandler function.
