// Global variables
const titleContent = $(".title-content");
const saveBtn = $("#saveBtn");
const loadBtn = $("#loadBtn");


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
