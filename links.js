const projectLinks = $("#project-tab");
const launchLinks = $("#launch-tab");

const projectLinkArr = [{text:"Command Center",href:"https://github.com/nvanbaak/command-center"},{text:"Pocket Butler",href:"https://github.com/nvanbaak/pocket-butler"},{text:"The Archivist",href:"https://github.com/nvanbaak/the-archivist"},{text:"Cuisine",href:"https://github.com/nvanbaak/cuisine"},{text:"Medival Town Simulator",href:"https://github.com/nvanbaak/medieval-town-simulator"}]


const launchLinkArr = [{text:"Github",href:"https://github.com/nvanbaak"},{text:"Bootstrap Docs",href:"https://getbootstrap.com/docs/4.5/getting-started/introduction/"},{text:"LinkedIn",href:"https://www.linkedin.com/in/nick-van-baak/"},{text:"Portfolio",href:"https://nvanbaak.github.io/profile-page/"}]


populateLinks(projectLinks, projectLinkArr);
populateLinks(launchLinks, launchLinkArr);

// Adds the given links in a grid format
function populateLinks(appendHere, givenArray) {

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