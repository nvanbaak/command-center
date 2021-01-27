// Global variables
const titleContent = $(".title-content");
const loadBtn = $("#loadBtn");
const toDoFrame = $(".to-do-frame");
const toDoArr = []

// Before we do anything else, populate the to-do list
loadToDos();
populateToDo();

// Allow to-do checkboxes to remove item from list
toDoFrame.click( event => {

    item = $(event.target);

    if ( item.hasClass("task-done") ) {

        index = item.attr("data-index");

        toDoArr.splice(index, 1);

        saveToDos();
        populateToDo();
    }
});

// Load functionality
loadBtn.click( event => {

    loadToDos();
    populateToDo();

});

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

    let month = objDate.getMonth() + 1
    let dayNum = objDate.getDate()
    let dateStr = `${month}/${dayNum}`

    // Adds the content of the to-do item
    entryDiv.append(
            `<span class="toDoText">${toDoObj.text} — ${dateStr}</span>`);

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