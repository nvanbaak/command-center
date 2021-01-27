// Global variables
const titleContent = $(".title-content");
const saveBtn = $("#saveBtn");
const loadBtn = $("#loadBtn");
const toDoFrame = $(".to-do-frame");
const toDoArr = [{text:"example item", date:Date.now()},{text:"example 2", date:Date.now()},{text:"other example", date:Date.now()},{text:"buy groceries", date:Date.now()}]

for (let i = 0; i < toDoArr.length; i++) {
    addToDo(toDoArr[i], i)
}




// Save functionality
saveBtn.click( event => {

    localStorage.setItem("linkValues", "It works!")

});

// Load functionality
loadBtn.click( event => {

    titleContent.append(
        $("<p>",{"text":localStorage.getItem("linkValues")})
    )

})

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


    entryDiv.append(
            `<span class="toDoText">${toDoObj.text} — ${dateStr}</span>`)
        // .append( $("<br>",{"class":"toDoBr"}));

    // Attach div to frame
    toDoFrame.append(entryDiv);
}