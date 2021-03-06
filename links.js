const projectLinks = $("#project-tab");
const launchLinks = $("#launch-tab");

const projectLinkArr = [{text:"Command Center",href:"https://github.com/nvanbaak/command-center"},{text:"Pocket Butler",href:"https://github.com/nvanbaak/pocket-butler"},{text:"The Archivist",href:"https://github.com/nvanbaak/the-archivist"},{text:"Cuisine",href:"https://github.com/nvanbaak/cuisine"},{text:"Medival Town Simulator",href:"https://github.com/nvanbaak/medieval-town-simulator"}]

const launchLinkArr = [{text:"Github",href:"https://github.com/nvanbaak"},{text:"Bootstrap Docs",href:"https://getbootstrap.com/docs/4.5/getting-started/introduction/"},{text:"LinkedIn",href:"https://www.linkedin.com/in/nick-van-baak/"},{text:"Portfolio",href:"https://nvanbaak.github.io/profile-page/"}]

// Populate the links first
populateLinks(projectLinks, projectLinkArr);
populateLinks(launchLinks, launchLinkArr);

// Hide alerts on link modal for initial use
$("#link-error").hide();

// Point modal at project sidebar when project button is clicked
$("#project-btn").click( event=> {

    // Rename modal
    $("#link-title").text("Add Project Link")

    // add data attribute to save button
    $("#linkBtn").attr("data-sidebar", "project")
});

// Point modal at launch sidebar when its add button is clicked
$("#shortcut-btn").click( event=> {

    // Rename modal
    $("#link-title").text("Add Shortcut")

    // add data attribute to save button
    $("#linkBtn").attr("data-sidebar", "shortcut")
});

// Add link to sidebar when save button pressed
$("#linkBtn").click( event => {

    // get info from modal
    let linkName = $("#link-name").val();
    let linkHref = $("#link-href").val();

    let appendTarget = $("#linkBtn").attr("data-sidebar")

    // make sure both fields are filled in
    if (linkName && linkName) {

        // Check if they included the https://
        if ( !linkHref.startsWith("http") ) {
            // if not, we add it
            linkHref = "https://" + linkHref;
        }

        let targetTable;
        let targetSidebar;

        // Point to the correct sidebar
        if (appendTarget === "project") {

            targetTable = projectLinkArr;
            targetSidebar = projectLinks;

        } else if (appendTarget === "shortcut") {

            targetTable = launchLinkArr
            targetSidebar = launchLinks

        } 

        // add link info to array
        targetTable.push({text:linkName, href:linkHref});

        // reload sidebar
        targetSidebar.empty();
        populateLinks(targetSidebar, targetTable);

        // close modal
        $("#link-modal").modal('hide');
    } 
    // Otherwise fire the error alert
    else {

        // Make sure the error bar is visible and empty
        $("#link-error").show().empty();

        // Give error message if there was no link name
        if (!linkName) {
            $("#link-error").append($("<p>",{"text":"Please name your link."}));
        }

        // Give error message if there was no URL
        if (!linkHref) {
            $("#link-error").append($("<p>",{"text":"Your link needs a URL!"}));
        }
    }

});

// reset link modal when closed
$("#link-modal").on("hide.bs.modal", event => {

    // Clear inputs
    $("#link-name").val("");
    $("#link-href").val("");

    // hide alert
    $("#link-error").hide();
});

// Adds the given links in a grid format
function populateLinks(appendHere, givenArray) {

    appendHere.empty();

    let remainingLinks = givenArray.length;

    for (let i = 0; i < givenArray.length; i += 2) {

        // Make a new row
        let newRow = $("<div>", {"class":"arrayRow"})

        // Add the first link
        newRow.append( $("<a>", givenArray[i]) )

        // if we didn't just add the last link, add the next one
        if (remainingLinks > 1) {

            // First add separator
            newRow.append($("<div>", {"class":"arraySeparator"}))

            // Then the actual link
            newRow.append( $("<a>", givenArray[i+1]) )
        }

        // Append the new row
        appendHere.append(newRow);

        // Count down the remaining links
        remainingLinks -= 2;
    }
}

$("#project-del").click( event => {

    if ( $("#project-del").attr("data-delmode") === "true") {

        $("#project-del").text("⊘");
        $("#project-del").attr("data-delmode", "false");
        $("#project-del").removeClass("btn-success");
        $("#project-del").addClass("btn-warning");

        populateLinks(projectLinks, projectLinkArr);

    } else {

        $("#project-del").text("🗸");
        $("#project-del").attr("data-delmode", "true");
        $("#project-del").removeClass("btn-warning");
        $("#project-del").addClass("btn-success");

        evilPopulate(projectLinks, projectLinkArr);
    }

})

// Replaces the links in the selected sidebar with links that delete their reference in the array
function evilPopulate(appendHere, givenArray) {

    appendHere.empty();

    for ( let link = 0; link <= givenArray.length; link += 2) {

        // This function uses basically the same logic as the regular populate function; we're just adding a different kind of link
        let newRow = $("<div>", {"class":"arrayRow"});
        appendHere.append(newRow);

        newRow.append(
            $("<a>", {"text":givenArray[link].text, "class":"evil-link","data-index":link})
        )

        // If there's more than one link in this row, append the second one
        if ( (givenArray.length - link) > 1 ) {

            newRow.append($("<div>", {"class":"arraySeparator"}))

            newRow.append($("<a>", {"text":givenArray[link+1].text, "class":"evil-link","data-index":link}));
        }
    }
}

// project link removal functionality
projectLinks.click(event => {

    if ($(event.target).hasClass("evil-link")) {

        // delete the link with the specified index from the array
        let index = $(event.target).attr("data-index");
        console.log(index);
        projectLinkArr.splice(index, 1);

        // refresh the sidebar with delete links
        evilPopulate(projectLinks,projectLinkArr);
    }
})