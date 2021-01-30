const projectLinks = $("#project-tab");

const linkArr = [{text:"Command Center",href:"https://github.com/nvanbaak/command-center"},{text:"Pocket Butler",href:"https://github.com/nvanbaak/pocket-butler"},{text:"The Archivist",href:"https://github.com/nvanbaak/the-archivist"},{text:"Cuisine",href:"https://github.com/nvanbaak/cuisine"},{text:"Medival Town Simulator",href:"https://github.com/nvanbaak/medieval-town-simulator"}]



// Adds the links in a grind format
function populateLinks() {

    let remainingLinks = linkArr.length;
    let beginningLine = true;

    for (let i = 0; i < linkArr.length; i += 2) {

        let newRow = $("<div>", {"class":"arrayRow"})

        newRow.append( $("a") )







    }






}