// Global variables
const titleContent = $(".title-content");
const saveBtn = $("#saveBtn");
const loadBtn = $("#loadBtn");
const toDoFrame = $(".to-do-frame");
const toDoArr = [{text:"example item", date:Date.now()},{text:"example 2 which has a really long name so let's see what happens", date:Date.now()},{text:"", date:Date.now()},{text:"buy groceries", date:Date.now()}]

// Before we do anything else, populate the to-do list
populateToDo();

// Allow to-do checkboxes to remove them from list
toDoFrame.click( event => {

    item = $(event.target)

    if ( item.hasClass("task-done") ) {



    }
});



// Save functionality
saveBtn.click( event => {

    localStorage.setItem("linkValues", "It works!")

});

// Load functionality
loadBtn.click( event => {

    titleContent.append(
        $("<p>",{"text":localStorage.getItem("linkValues")})
    )

});

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

    console.log(objDate);

    let month = objDate.getMonth() + 1
    let dayNum = objDate.getDate()
    let dateStr = `${month}/${dayNum}`

    // Adds the content of the to-do item
    entryDiv.append(
            `<span class="toDoText">${toDoObj.text} — ${dateStr}</span>`);

    // Adds a button which will be used to remove the task from the list
    entryDiv.append( `<button type="button" data-index="${index}" class="task-done btn btn-success" aria-label="task complete">
        <span aria-hidden="true">&check;</span>
        </button>`
      );

    // Attach div to frame
    toDoFrame.append(entryDiv);
}

// function to populate the to-do list
function populateToDo() {
    for (let i = 0; i < toDoArr.length; i++) {
        addToDo(toDoArr[i], i)
    }
}