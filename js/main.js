
/******************** VARIABLES ********************/

// Declare and initialise all the variables (buttons, array, booleans...)
const cellMatrix = [] // Create a 2D array that represents the grid
const startButton = document.querySelector(".start-button")
const pauseButton = document.querySelector(".pause-button")
const refreshButton = document.querySelector(".refresh-button")
let isSimulationOn = false; // Represents whether the simulation is on or off
let simultInterval = null; // Declare the variable used for setInterval()


/******************** INITIALISATION ********************/

// Invoke the createGrid() method
createGrid();

// Disabled the buttons by default
startButton.disabled = true
pauseButton.disabled = true
refreshButton.disabled = true

// Invoke the setNeighbor() method for each cells of the grid
cellMatrix.forEach((rows) => {
    rows.map((cell) => cell.setNeighbors())
})


/******************** EVENT LISTENERS ********************/

// Add an eventlistener to the start button 
// When clicked, start the automatic generation process
startButton.addEventListener("click", () => {
    startSimulation();
})


// Add an eventlistener to the pause button 
// When clicked, pause the simulation
pauseButton.addEventListener("click", () => {
    pauseSimulation();
})

// Add an eventlistener to the refresh button
// When clicked, refresh the board
refreshButton.addEventListener("click", () => {
    refreshBoard();
})


/******************** FUNCTIONS ********************/

// Create functions 
function createGrid() {
    let rowMatrix = [] // Array representing a row inside the cellMatrix array
    let rowIndex = 0 // Row index of the cellMatrix 2D array
    let colIndex = 0 // Column index of the cellMatrix 2D array

    // Create a functional clickable 2D grid with dead and alive cell
    for (let i = 0; i < 3600; i++) {  // Create a grid 60x60 (3600 cases)
        const cellObj = new Cell(rowIndex, colIndex) // Create a new instance of the Cell() class

        cellObj.newCell.addEventListener("click", () => { // Create an event listener for each div element
            // Check the state of the cell
            cellObj.futureState = cellObj.state ? 0 : 1 // If alive, switch its state to 0 (dead), if dead switch it to 1 (alive)

            cellObj.changeState() // Change its current state to its future state

            // Toggle the start and refresh buttons when a cell is activated or deactivated
            if (isCellsActive() && isSimulationOn) {
                refreshButton.disabled = false;
            } else if (isCellsActive() && !isSimulationOn) {
                refreshButton.disabled = false;
                startButton.disabled = false;
            } else {
                startButton.disabled = true;
                refreshButton.disabled = true;
            }
        })

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
}

function startSimulation() {
    // Create an interval to automate the generations
    simultInterval = setInterval(() => {

        if (!isCellsActive()) {
            clearInterval(simultInterval); // If there are no active cells on the grid, clear the setInterval()
            isSimulationOn = false;
            startButton.disabled = true;
            pauseButton.disabled = true;
            refreshButton.disabled = true;
            return;
        }

        isSimulationOn = true;
        startButton.disabled = true;
        pauseButton.disabled = false;

        cellMatrix.forEach((rows) => {
            rows.map((cell) => cell.evolve()) // Make the cells evolve
        })
        cellMatrix.forEach((rows) => {
            rows.map((cell) => cell.changeState()) // Apply their changes afterward
        })

    }, 100) // Generate a new generation every 100 ms
}

function pauseSimulation() {
    clearInterval(simultInterval) // Clear the interval that automates generations
    isSimulationOn = false
    startButton.disabled = false
    pauseButton.disabled = true
}

function refreshBoard() {
    window.location.reload() // Relaod the page
}

function isCellsActive() {
    // Check whether at least one cell is alive on the grid
    const hasActiveCell = Boolean(cellMatrix.flat().reduce((value, cell) => value + cell.state, 0))
    return hasActiveCell; // Return the boolean variable
}