
const cellMatrix = [] // Create a 2D array that represents the grid
let rowMatrix = [] // Array representing a row inside the cellMatrix array
let rowIndex = 0 // Row index of the cellMatrix 2D array
let colIndex = 0 // Column index of the cellMatrix 2D array


// Create a functional clickable 2D grid with dead and alive cell
for (let i = 0; i < 3600; i++) {  // Create a grid 60x60 (3600 cases)
    const cellObj = new Cell(rowIndex, colIndex) // Create a new instance of the Cell() class

    rowMatrix.push(cellObj) // Push the cell instance into the matrix row array

    if (colIndex >= 59) { // Check when a row is complete

        cellMatrix.push(rowMatrix) // Push the complete row to the matrix
        rowMatrix = [] // Reset the rowArray - start a new row
        rowIndex++;// Increment the rowIndex 
        colIndex = 0 // Reset the column index

    } else {
        colIndex++; // Otherwise, increment the column index until it reaches 59 to complete a row
    }
}

// Invoke the setNeighbor() method for each cells of the grid
cellMatrix.forEach((rows) => {
    rows.map((cell) => cell.setNeighbors())
})


// Add an eventlistener to the next button 
const evolveButton = document.querySelector(".next-button")

// When clicked, apply the evolve() and changeState() methods to every cel
evolveButton.addEventListener("click", () => {
    cellMatrix.forEach((rows) => {
        rows.map((cell) => cell.evolve()) // Make the cells evolve
    })
    cellMatrix.forEach((rows) => {
        rows.map((cell) => cell.changeState()) // Apply their changes afterward
    })
})

