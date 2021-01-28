// Global variables
const titleContent = $(".title-content");
const toDoArr = []
const toDoFrame = $(".to-do-frame");
const saveTaskBtn = $("#saveTaskBtn");
const editTaskBtn = $("#editTaskBtn");
const newTaskModal = $("#new-task-modal")
const EditTaskModal = $("#edit-task-modal")

// Before we do anything else, populate the to-do list
loadToDos();
populateToDo();

// Normally the workflow makes sure error bars are only visible when they're supposed to be there, but the first time we have to hide them manually
$("#task-error").hide();
$("#edit-task-error").hide();

// Click behavior for to-do items
toDoFrame.click( event => {
    item = $(event.target);

    // If they click the done button, remove the item
    if ( item.hasClass("task-done") ) {

        index = item.attr("data-index");

        toDoArr.splice(index, 1);

        saveToDos();
        populateToDo();

    } 
    // If they click the text, edit the item
    else if (item.hasClass('toDoText')) {

        index = item.attr("data-index");

        // Open edit modal
        EditTaskModal.modal('show');

        // Update the save button with the index
        editTaskBtn.attr("data-index",index);
        
        // Update edit window with task information
        $("#task-edit").val(toDoArr[index].text)
        $("#due-date-edit").val(toDoArr[index].date)
    }
});

// Clear modal when closed
newTaskModal.on("hide.bs.modal", event => {

    // clear input fields
    $("#task-entry").val('');
    $("#due-date-entry").val('');

    // the alert bar is cleared whenever it's displayed, so we only have to hide it
    $("#task-error").hide()
});

// Check if a task is valid, then add it to todo array if so
saveTaskBtn.click( event => {

    let taskText = $("#task-entry").val();
    let taskDate = $("#due-date-entry").val();

    // add to array if we have all the information we need, otherwise make an alert
    if (taskText && taskDate) {

        addToTaskArray(taskText, taskDate);

        // Close modal
        $("#new-task-modal").modal('hide');

    } else {
        // Make sure the error bar is visible and empty
        $("#task-error").show().empty();

        // Give error message if there was no task name
        if (!taskText) {
            $("#task-error").append($("<p>",{"text":"Please name your task."}));
        }

        // Give error message if there was no due date
        if (!taskDate) {
            $("#task-error").append($("<p>",{"text":"Please enter a due date."}));
        }
    }
});

editTaskBtn.click( event => {

    // get new values
    let taskText = $("#task-edit").val();
    let taskDate = $("#due-date-edit").val();

    // get index value
    let index = $(event.target).attr("data-index");

    // add to array if we have all the information we need, otherwise make an alert
    if (taskText && taskDate) {

        // Delete item at index value, then add the edited version
        // We do it this way instead of just replacing it with the splice because if we changed the date we'll need to reposition the item in the to-do list
        toDoArr.splice(index, 1);
        addToTaskArray(taskText, taskDate);

        // Close modal
        $("#edit-task-modal").modal('hide');

    } else {
        // Make sure the error bar is visible and empty
        $("#edit-task-error").show().empty();

        // Give error message if there was no task name
        if (!taskText) {
            $("#edit-task-error").append($("<p>",{"text":"Please name your task."}));
        }

        // Give error message if there was no due date
        if (!taskDate) {
            $("#edit-task-error").append($("<p>",{"text":"Please enter a due date."}));
        }
    }
});


// function to add a task to toDoArr
function addToTaskArray(taskText, taskDate) {

    // It's not in the array to start
    let pushedToArray = false

    for (item in toDoArr) {
        // Comparing the dates means the new todo gets inserted when it hits the first todo with a longer due date
        if (taskDate < toDoArr[item].date) {
            toDoArr.splice(item, 0, {text:taskText, date:taskDate});

            // Then we mark that it's been inserted and break the loop
            pushedToArray = true;
            break;
        }
    }

    // If we haven't inserted it, it's larger than the rest of the dates, so it goes to the end
    if (!pushedToArray) {
        toDoArr.push({text:taskText, date:taskDate});
    }

    // Save to localstorage
    saveToDos();

    // populate todos
    populateToDo();
}

// Saves the local to-do array to localstorage
function saveToDos() {

    localStorage.setItem("toDoValues", JSON.stringify(toDoArr))

}

// Loads to-dos from localstorage
function loadToDos() {

    toDoArr.length = 0;
    storedValues = JSON.parse(localStorage.getItem("toDoValues"));

    for (value in storedValues) {

        toDoArr.push(storedValues[value]);

    }

}

// function to add a to-do item to the upcoming tasks list
function addToDo( toDoObj, index ) {
    // toDoObj is a json of the structure:
    // toDoObj {
    //      text: string
    //      date: date
    // }

    // Create div and put that info inside
    let entryDiv = $("<div>",{"class":"toDoSection"}).attr("data-index", index);

    const objDate = new Date(toDoObj.date)

    let month = objDate.getUTCMonth() + 1
    let dayNum = objDate.getUTCDate()
    let dateStr = `${month}/${dayNum}`

    // Adds the content of the to-do item
    entryDiv.append(
            `<span data-index="${index}" class="toDoText">${toDoObj.text} — ${dateStr}</span>`);

    // Adds a button which will be used to remove the task from the list
    entryDiv.append( `<button type="button" data-index="${index}" class="task-done btn btn-success" aria-label="task complete">
        <span class="task-done" data-index="${index}" aria-hidden="true">&check;</span>
        </button>`
      );

    // Attach div to frame
    toDoFrame.append(entryDiv);
}

// function to populate the to-do list
function populateToDo() {

    toDoFrame.empty();

    for (let i = 0; i < toDoArr.length; i++) {
        addToDo(toDoArr[i], i)
    }
}