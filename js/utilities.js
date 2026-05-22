
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
            disabledButtons()
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
        isSimulationOn = false;
        return; // If there are no active cells on the grid, break out the function()
    }

    isSimulationOn = true;

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
}

function refreshBoard() {
    cellsArr.flat().forEach((cell) => {
        cell.futureState = 0
        cell.changeState()
    })
}

function isCellsActive() {
    // Check whether at least one cell is alive on the grid
    const hasActiveCell = Boolean(cellsArr.flat().reduce((value, cell) => value + cell.state, 0))
    return hasActiveCell; // Return the boolean variable
}

function updateCounter(counter) {
    counterElm.innerText = `Generations : ${counter}`;
}

function generatePatterns(patternName) {

    const listPatterns = {
        "glider": {
            anchor: anchor = { x: 0, y: 0 },
            positions: [
                { x: anchor.x, y: anchor.y + 1 },
                { x: anchor.x + 1, y: anchor.y + 2 },
                { x: anchor.x + 2, y: anchor.y },
                { x: anchor.x + 2, y: anchor.y + 1 },
                { x: anchor.x + 2, y: anchor.y + 2 }
            ]
        },
        "r-pentomino": {
            anchor: anchor = { x: totalRows / 2, y: totalCols / 2 },
            positions: [
                anchor,
                { x: anchor.x, y: anchor.y - 1 },
                { x: anchor.x + 1, y: anchor.y },
                { x: anchor.x - 1, y: anchor.y },
                { x: anchor.x - 1, y: anchor.y + 1 }
            ]
        },
        "acorn": {
            anchor: anchor = { x: totalRows / 2, y: totalCols / 2 },
            positions: [
                anchor,
                { x: anchor.x + 1, y: anchor.y + 1 },
                { x: anchor.x + 1, y: anchor.y + 2 },
                { x: anchor.x + 1, y: anchor.y + 3 },
                { x: anchor.x + 1, y: anchor.y - 2 },
                { x: anchor.x + 1, y: anchor.y - 3 },
                { x: anchor.x - 1, y: anchor.y - 2 },
            ]
        }
    }

    const patternObj = listPatterns[patternName.toLowerCase()]

    patternObj.positions.forEach((position) => {
        const cell = cellsArr[position.x][position.y]
        cell.futureState = 1
        cell.changeState()
    })
}


function disabledButtons() {
    if (isCellsActive() && isSimulationOn) {
        startButton.disabled = true
        pauseButton.disabled = false
        refreshButton.disabled = false
    } else if (isCellsActive() && !isSimulationOn) {
        startButton.disabled = false
        pauseButton.disabled = true
        refreshButton.disabled = false
    } else {
        startButton.disabled = true
        pauseButton.disabled = true
        refreshButton.disabled = true
    }
}
