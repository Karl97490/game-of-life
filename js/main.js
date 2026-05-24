
/******************** VARIABLES ********************/

const cellsArr = [] // 2D array that represents the grid
const startButton = document.querySelector(".start-button")
const pauseButton = document.querySelector(".pause-button")
const refreshButton = document.querySelector(".refresh-button")
const counterElm = document.getElementById("counter")
const speedElm = document.getElementById("speed")
const scaleElm = document.getElementById("scale")
const patternsBtn = document.querySelectorAll(".patterns button")
const gridElm = document.querySelector(".grid")

const totalCols = 60;
const totalRows = 60;
const totalCells = totalRows * totalCols;
let isSimulationOn = false;
let timeout = null;
let counter = 0;

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
    disabledButtons()
})

// When clicked, pause the simulation
pauseButton.addEventListener("click", () => {
    pauseSimulation();
    disabledButtons();
})

// When clicked, refresh the board
refreshButton.addEventListener("click", () => {
    refreshBoard();
    disabledButtons();
})

patternsBtn.forEach((patternBtn) => {
    patternBtn.addEventListener("click", (e) => {
        const patternName = e.srcElement.name.toLowerCase()
        counter = 0
        refreshBoard()
        updateCounter(counter)
        generatePatterns(patternName)
        disabledButtons()
    })
})

scaleElm.addEventListener("input", (e) => {
    const scaleValue = e.srcElement.value
    console.log(scaleValue)
    gridElm.style.transform = `scale(${scaleValue})`;
})


gridElm.addEventListener("wheel", (e) => {
    let value = Number(scaleElm.value);
    let step = Number(scaleElm.step);
    if (e.deltaY < 0) {
        scaleElm.value = value += step;
        console.log(scaleElm.value)
    } else {
        scaleElm.value = value -= step;
        console.log(scaleElm.value)
    }
    gridElm.style.transform = `scale(${scaleElm.value})`;
})
