
/******************** VARIABLES ********************/

const cellsArr = [] // Create a 2D array that represents the grid
const startButton = document.querySelector(".start-button")
const pauseButton = document.querySelector(".pause-button")
const refreshButton = document.querySelector(".refresh-button")
const counterElm = document.getElementById("counter")
const speedElm = document.getElementById("speed")
const patternsBtn = document.querySelectorAll(".patterns button")

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

