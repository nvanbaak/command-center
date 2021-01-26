// Global variables
const titleContent = $(".title-content");
const saveBtn = $("#saveBtn");


// Save functionality
saveBtn.click( event => {

    localStorage.setItem("linkValues", "It works!")

});

// Load functionality
