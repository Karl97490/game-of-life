
/******************** VARIABLES ********************/

const cellsArr = [] // Create a 2D array that represents the grid
const startButton = document.querySelector(".start-button")
const pauseButton = document.querySelector(".pause-button")
const refreshButton = document.querySelector(".refresh-button")
const counterElm = document.getElementById("counter")
const speedElm = document.getElementById("speed")
const totalCols = 60;
const totalRows = 60;
const totalCells = totalRows * totalCols; // For a grid 60x60 (3600 cells)
let isSimulationOn = false;
let timeout = null;
let counter = 0; // Counts the number of generations

/******************** INITIALISATION ********************/

// Invoke the createGrid() method
createGrid();

// Initialise the counter to 0
updateCounter(counter)

// Disabled the buttons by default
startButton.disabled = true
pauseButton.disabled = true
refreshButton.disabled = true

// Invoke the setNeighbors() method for each cells of the grid
cellsArr.forEach((rows) => {
    rows.map((cell) => cell.setNeighbors())
})

/******************** EVENT LISTENERS ********************/

// When clicked, start the automatic generation process
startButton.addEventListener("click", () => {
    startSimulation();
})

// When clicked, pause the simulation
pauseButton.addEventListener("click", () => {
    pauseSimulation();
})

// When clicked, refresh the board
refreshButton.addEventListener("click", () => {
    refreshBoard();
})

/******************** FUNCTIONS ********************/

function createGrid() {
    let rowArr = []
    let rowIndex = 0
    let colIndex = 0

    // Create a functional clickable 2D grid with dead and alive cell
    for (let i = 0; i < totalCells; i++) {
        const cellObj = new Cell(rowIndex, colIndex)

        cellObj.newCell.addEventListener("click", () => { // Create an event listener for each cell element
            // Reset counter when no cells are active
            if (!isCellsActive()) {
                counter = 0;
                updateCounter(counter)
            }

            // Check the state of the cell
            cellObj.futureState = cellObj.state ? 0 : 1 // If alive, switch its state to 0 (dead), if dead switch it to 1 (alive)

            cellObj.changeState() // Change its current state to its future state

            // Toggle the start and refresh buttons when a cell is activated or desactivated
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

        rowArr.push(cellObj)

        if (colIndex >= totalCols - 1) { // Check when a row is complete

            cellsArr.push(rowArr) // Push the complete row to the matrix
            rowArr = [] // Reset the rowArray - start a new row
            rowIndex++;// Increment the rowIndex 
            colIndex = 0 // Reset the column index

        } else {
            colIndex++; // Otherwise, increment the column index until it reaches 59 to complete a row
        }
    }
}

function startSimulation() {

    const speedValue = speedElm.value // Update the speedvalue every iteration

    if (!isCellsActive()) {
        startButton.disabled = true;
        pauseButton.disabled = true;
        refreshButton.disabled = true;
        return; // If there are no active cells on the grid, break out the function()
    }

    isSimulationOn = true;
    startButton.disabled = true;
    pauseButton.disabled = false;

    cellsArr.forEach((rows) => {
        rows.map((cell) => cell.evolve()) // Make the cells evolve
    })
    cellsArr.forEach((rows) => {
        rows.map((cell) => cell.changeState()) // Apply their changes afterward
    })

    // Increment and update the counter during each loop iteration
    counter++;
    updateCounter(counter);

    // Using setTimeout() for frame generation
    timeout = setTimeout(() => {
        startSimulation()
    }, speedValue)

}

function pauseSimulation() {
    clearTimeout(timeout) // Clear the timeout in the startSimulation() method
    isSimulationOn = false
    startButton.disabled = false
    pauseButton.disabled = true
}

function refreshBoard() {
    window.location.reload() // Relaod the page
}

function isCellsActive() {
    // Check whether at least one cell is alive on the grid
    const hasActiveCell = Boolean(cellsArr.flat().reduce((value, cell) => value + cell.state, 0))
    return hasActiveCell; // Return the boolean variable
}

function updateCounter(counter) {
    counterElm.innerText = `Generations : ${counter}`;
}   