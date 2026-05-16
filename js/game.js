console.log("Hello user!")

const gridContainer = document.querySelector(".grid-container")


const cellMatrix = []
let rowMatrix = []
let rowIndex = 0 // Index row
let colIndex = 0 // Calculate the index col


// Create a functionnal 2D Grid clickable with dead or alive cells 


for(let i = 0; i < 3600; i++){  // Create a grid 20x20
    const newCell = document.createElement("div") // create a cell for each case
    newCell.classList.add("cell", "dead") // Add the class cell and dead when they born
    gridContainer.appendChild(newCell) 
    newCell.addEventListener("click", () => { // add an eventlistener for each cell to be clickable
        newCell.classList.toggle("alive") // user can now activate or desactivate a cell by toggle class
    })
}
