
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

// Get the variables for buttons and the setInterval()
const startButton = document.querySelector(".start-button")
const pauseButton = document.querySelector(".pause-button")
const refreshButton = document.querySelector(".refresh-button")
let simultInterval = null;


// Add an eventlistener to the start button 
// When clicked, start the automatic generation process
startButton.addEventListener("click", () => {
    // Create an interval to automate the generations
    simultInterval = setInterval(() => {
        // Check whether at least one cell is alive on the grid
        const hasActiveCell = Boolean(cellMatrix.flat().reduce((value, cell) => value + cell.state, 0))
        if (!hasActiveCell) {
            console.log("No cells alive")
            clearInterval(simultInterval); // If there are no active cells on the grid, clear the setInterval()
        }
        cellMatrix.forEach((rows) => {
            rows.map((cell) => cell.evolve()) // Make the cells evolve
        })
        cellMatrix.forEach((rows) => {
            rows.map((cell) => cell.changeState()) // Apply their changes afterward
        })
    }, 500)
})


// Add an eventlistener to the pause button 
// When clicked, pause the simulation
pauseButton.addEventListener("click", () => {
    clearInterval(simultInterval)
})

// Add an eventlistener to the refresh button
// When clicked, refresh the board
refreshButton.addEventListener("click", () => {
    window.location.reload()
})