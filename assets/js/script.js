var taskIdCounter = 0;
var formEl = document.querySelector("#task-form"); //Assigns to variable "formEl"
var tasksToDoEl = document.querySelector("#tasks-to-do"); //Assigns <ul> to variable "tasksToDoEl"
var pageContentEl = document.querySelector("#page-content"); //Assigns <main> to variable "pagecontent"
var deleteTask = function(taskId) { //Creates delete task function
    console.log(taskId)
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove(); //Deletes  task item
    
    var updatedTaskArr = []; //creates new array to hold updated list of tasks.

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id !== parseInt(taskId)) { //if tasks[i].id doesnt match the value of taskId, lets keep that task and push into the new array.
            updatedTaskArr.push(tasks[i]);
        }
    }
    tasks = updatedTaskArr; //reassign tasks array to be the same as updatedTaskArr.
    saveTasks();
};

var editTask = function(taskId) { //Makes tasks editable.
    console.log(taskId);

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    var taskName = taskSelected.querySelector("h3.task-name").textContent; //gets content from task name and type
    console.log(taskName);
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task"; //Changes Button to "Save Task" in edit mode

    formEl.setAttribute("data-task-id", taskId);
};
var completeEditTask = function(taskName, taskType, taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']"); //finds the matching task list item

    taskSelected.querySelector("h3.task-name").textContent = taskName; //sets new values
    taskSelected.querySelector("span.task-type").textContent = taskType;

    for (var i = 0; i < tasks.length; i++) { //loops through tasks array and task object with new content.
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };
    saveTasks();
    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";


};
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

var taskFormHandler = function() { //Creates the new task with a click of a button.
    event.preventDefault(); //Stops default reloading event of your browser.
    var taskNameInput = document.querySelector("input[name='task-name']").value; //Creates a variable for the text input.
    var taskTypeInput = document.querySelector("select[name='task-type']").value; //Creates a variable for selected option.
    
    if (!taskNameInput || !taskTypeInput) {//checks if input values are empty strings
        alert("You need to fill out the task form!");
        return false;
    }
    formEl.reset();

    var isEdit = formEl.hasAttribute("data-task-id");

    if (isEdit) { // has data attribute, so get task id and call function to complete edit process
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    else {
        var taskDataObj = { //Packages up data as an object.
        name: taskNameInput,
        type: taskTypeInput,
        status: "to do"
    };
    }

    createTaskEl(taskDataObj);
}

var createTaskEl = function(taskDataObj) { //Creates Tasks
    console.log(taskDataObj);
    console.log(taskDataObj.status);

    var listItemEl = document.createElement("li"); //Creates the element for <li>.
    listItemEl.className = "task-item"; //Says what style the created task will have.

    listItemEl.setAttribute("data-task-id", taskIdCounter); //adds task id as a custom attribute
    listItemEl.setAttribute("draggable", "true");

    var taskInfoEl = document.createElement("div"); //creates div to hold task info and add to list item.
    taskInfoEl.className = "task-info"; //gives it a class name.
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>"; // adds HTML content to div
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter); 
    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl); // adds entire list item to list

    taskDataObj.id = taskIdCounter;

    tasks.push(taskDataObj);

    saveTasks();

    taskIdCounter++; //increases task counter for next unique id
}

var tasks = []; //Where tasks are going to be stored.

var createTaskActions = function(taskId) { //Creates Task options
    var actionContainerEl = document.createElement("div"); //Creates a variable for <div> elements
    actionContainerEl.className = "task-actions"; //Creates new <div>

    var editButtonEl = document.createElement("button"); //Creates variable for Edit Button
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl); //Adds edit button to <div> element

    var deleteButtonEl = document.createElement("button"); //Creates variable for Delete Button
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl); //Adds edit button to <div> element
    
    var statusSelectEl = document.createElement("select"); //Create variable for dropdown menu
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statusSelectEl); //Adds task type drop down menu

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
        var statusOptionEl = document.createElement("option"); //creates option element
        statusOptionEl.textContent = statusChoices[i]
        statusOptionEl.setAttribute("value", statusChoices[i]);

        statusSelectEl.appendChild(statusOptionEl); //appends to select
    }

    return actionContainerEl;
};

var taskButtonHandler = function(event) {
    var targetEl = event.target; //gets target element from event.

    if (event.target.matches(".edit-btn")) {
        var taskId = event.target.getAttribute("data-task-id"); //gets the element's task id.
        editTask(taskId);

    }else if (event.target.matches(".delete-btn")) {
        var taskId = event.target.getAttribute("data-task-id"); //gets the element's task id.
        deleteTask(taskId);
    }
};

var taskStatusChangeHandler = function(event) {
    console.log(event.target.value)

    var taskId = event.target.getAttribute("data-task-id"); //gets the task item's id
    var statusValue = event.target.value.toLowerCase(); // gets the currently selected option's value and convert to lowercase
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
    saveTasks();
};

var dragTaskHandler = function(event) { //Drag function
    var taskId = event.target.getAttribute("data-task-id");
    event.dataTransfer.setData("text/plain", taskId);

    var getId = event.dataTransfer.getData("text/plain");
    console.log("getId:", getId, typeof getId);
};

var dragLeaveHandler = function(event) { //Removes all dragging styles after dragging and dropping
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
        taskListEl.removeAttribute("style");
    }
}


var dropZoneDragHandler = function(event) { //Dropzone function
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
        event.preventDefault();
        
        taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");
    }
};

var dropTaskHandler = function(event) { //Drop task function
    var id = event.dataTransfer.getData("text/plain");   
    var draggableElement = document.querySelector("[data-task-id='" + id + "']");
    var dropZoneEl = event.target.closest(".task-list");
    var statusType = dropZoneEl.id;
    var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
    if (statusType === "tasks-to-do") {
        statusSelectEl.slectedIndex = 0;
    }
    else if (statusSelectEl === "tasks-in-progress") {
        statusSelectEl.selectedIndex = 1;
    }
    else if (statusSelectEl === "tasks-completed") {
        statusSelectEl.selectedIndex = 2;
    }
    
    dropZoneEl.removeAttribute("style"); //removes cutout lines after dragging
    dropZoneEl.appendChild(draggableElement);

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(id)) {
          tasks[i].status = statusSelectEl.value.toLowerCase();
        }
    }
    saveTasks();
    console.log(tasks)    
};

var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

var loadTasks = function() {

};

pageContentEl.addEventListener("dragleave", dragLeaveHandler);
pageContentEl.addEventListener("drop", dropTaskHandler); //Links drop action.
pageContentEl.addEventListener("dragover", dropZoneDragHandler); //Links dragging action.
pageContentEl.addEventListener("dragstart", dragTaskHandler); //Links dragging action.
pageContentEl.addEventListener("change", taskStatusChangeHandler); //Links changes to taskStatusChangeHandler.
pageContentEl.addEventListener("click", taskButtonHandler); //Links button to taskButtonHandler.
formEl.addEventListener("submit", taskFormHandler); //Links button click to taskFormHandler.

loadTasks()
