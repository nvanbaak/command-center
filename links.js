const projectLinks = $("#project-tab");

const linkArr = [{text:"Command Center",href:"https://github.com/nvanbaak/command-center"},{text:"Pocket Butler",href:"https://github.com/nvanbaak/pocket-butler"},{text:"The Archivist",href:"https://github.com/nvanbaak/the-archivist"},{text:"Cuisine",href:"https://github.com/nvanbaak/cuisine"},{text:"Medival Town Simulator",href:"https://github.com/nvanbaak/medieval-town-simulator"}]


populateLinks();

// Adds the links in a grind format
function populateLinks() {

    let remainingLinks = linkArr.length;

    for (let i = 0; i < linkArr.length; i += 2) {

        // Make a new row
        let newRow = $("<div>", {"class":"arrayRow"})

        // Add the first link
        newRow.append( $("<a>", {"text":linkArr[i].text, "href":linkArr[i].href}) )

        // if we didn't just add the last link, add the next one
        if (remainingLinks > 1) {

            // First add separator
            newRow.append($("<div>", {"class":"arraySeparator"}))

            // Then the actual link
            newRow.append( $("<a>", {"text":linkArr[i+1].text, "href":linkArr[i+1].href}) )
        }

        // Append the new row
        projectLinks.append(newRow);

        // Count down the remaining links
        remainingLinks -= 2;
    }






}