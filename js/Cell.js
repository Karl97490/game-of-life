class Cell {
    constructor(positionX, positionY) {
        this.positionX = positionX; // Store the horizontal position of the cell instance 
        this.positionY = positionY; // Store the vertical position of the cell instance
        this.state = 0; // Represents the state of a cell (alive or dead)
        this.futureState = 0; // Represents the future state of the cell after evolution
        this.neighbors = []; // Store the cell’s neighbors

        this.createCellElm() // Create a cell element for each cell instance in the grid
    }

    createCellElm() {
        this.newCell = document.createElement("div") // Create a div element for each case (cell) of the grid

        this.newCell.classList.add("cell", "dead") // Add the 'cell' and 'dead' classes to each div element

        this.newCell.addEventListener("click", () => { // Create an event listener for each cell element

            // Reset counter when no cells are active
            if (!isCellsActive()) {
                counter = 0;
                updateCounter(counter)
            }

            // Check the state of the cell
            this.futureState = this.state ? 0 : 1 // If alive, switch its state to 0 (dead), if dead switch it to 1 (alive)

            this.changeState() // Change its current state to its future state

            // Toggle the start and refresh buttons when a cell is activated or desactivated
            disabledButtons()
        })
    }


    updateUI() {
        // Get the current state of the cell
        if (this.state) {
            this.newCell.classList.add("alive") // add the class 'alive'

        } else {
            this.newCell.classList.remove("alive") // remove the class 'alive'
        }
    }

    changeState() {
        this.state = this.futureState // Evolve to its future state
        this.updateUI() // Update UI after cells evolved
    }

    evolve() {
        /* For each cell :
        - A live cell with 2 or 3 neighbors survives.
        - A dead cell with exactly 3 neighbors becomes alive.
        - All other live cells die, and other dead cells stay dead. */

        // Represents the number of living neighbors
        const neighborsState = this.neighbors.reduce((value, neighbor) => value + neighbor.state, 0) // Sum of the state values of neighboring cells

        // Check the state of the cell (dead or alive)
        if (this.state) { // For alive cell, 2 rules : can die or survive
            // Survive rule
            if (neighborsState === 2 || neighborsState === 3) {
                this.futureState = 1
            } else { // Die rule
                this.futureState = 0
            }
        }
        else { // For dead cell, 1 rule : can become alive
            if (neighborsState === 3) {
                this.futureState = 1 // become alive
            }
        }
    }

    setNeighbors() {
        // Differentiate the cells based on their position in the grid

        // For cells in the corners :
        // Top left
        if (this.positionX === 0 && this.positionY === 0) {
            // Push the neighbors to the neighbors array
            if (!this.neighbors.length) {  // Check if array is empty
                this.neighbors.push(
                    cellsArr[this.positionX][this.positionY + 1], // Right
                    cellsArr[this.positionX + 1][this.positionY + 1], // Diagonal 
                    cellsArr[this.positionX + 1][this.positionY] // Below
                )
            }
        }
        // Bottom left
        else if (this.positionX === 59 && this.positionY === 0) {
            if (!this.neighbors.length) {  // Check if array is empty
                this.neighbors.push(
                    cellsArr[this.positionX][this.positionY + 1], // Right
                    cellsArr[this.positionX - 1][this.positionY + 1], // Diagonal
                    cellsArr[this.positionX - 1][this.positionY] // Above
                )
            }
        }
        // Top right
        else if (this.positionX === 0 && this.positionY === 59) {
            if (!this.neighbors.length) {  // Check if array is empty
                this.neighbors.push(
                    cellsArr[this.positionX][this.positionY - 1], // Left
                    cellsArr[this.positionX + 1][this.positionY - 1], // Diagonal
                    cellsArr[this.positionX + 1][this.positionY] // Below
                )
            }
        }
        // Bottom right
        else if (this.positionX === 59 && this.positionY === 59) {
            if (!this.neighbors.length) {  // Check if array is empty
                this.neighbors.push(
                    cellsArr[this.positionX][this.positionY - 1], // Left
                    cellsArr[this.positionX - 1][this.positionY - 1], // Diagonal
                    cellsArr[this.positionX - 1][this.positionY] // Above 
                )
            }
        }

        // For cells on the borders (excluding the corners) :
        // Top border
        else if (this.positionX === 0 && this.positionY >= 1 && this.positionY <= 58) {
            if (!this.neighbors.length) {  // Check if array is empty
                this.neighbors.push(
                    cellsArr[this.positionX][this.positionY - 1], // Left
                    cellsArr[this.positionX + 1][this.positionY - 1], // Diagonal-left
                    cellsArr[this.positionX + 1][this.positionY], // Below
                    cellsArr[this.positionX + 1][this.positionY + 1], // Diagonal-right
                    cellsArr[this.positionX][this.positionY + 1], // Right
                )
            }
        }
        // Right border
        else if (this.positionX >= 1 && this.positionX <= 58 && this.positionY === 59) {
            if (!this.neighbors.length) {  // Check if array is empty
                this.neighbors.push(
                    cellsArr[this.positionX - 1][this.positionY], // Above
                    cellsArr[this.positionX - 1][this.positionY - 1], // Diagonal-above
                    cellsArr[this.positionX][this.positionY - 1], // Left
                    cellsArr[this.positionX + 1][this.positionY - 1], // Diagonal-below
                    cellsArr[this.positionX + 1][this.positionY], // Below
                )
            }
        }
        // Bottom border
        else if (this.positionX === 59 && this.positionY >= 1 && this.positionY <= 58) {
            if (!this.neighbors.length) {  // Check if array is empty
                this.neighbors.push(
                    cellsArr[this.positionX][this.positionY - 1], // Left
                    cellsArr[this.positionX - 1][this.positionY - 1], // Diagonal-left
                    cellsArr[this.positionX - 1][this.positionY], // Above
                    cellsArr[this.positionX - 1][this.positionY + 1], // Diagonal-right
                    cellsArr[this.positionX][this.positionY + 1], // Right
                )
            }
        }
        // Left border
        else if (this.positionX >= 1 && this.positionX <= 58 && this.positionY === 0) {
            if (!this.neighbors.length) {  // Check if array is empty
                this.neighbors.push(
                    cellsArr[this.positionX - 1][this.positionY], // Above
                    cellsArr[this.positionX - 1][this.positionY + 1], // Diagonal-above
                    cellsArr[this.positionX][this.positionY + 1], // Right
                    cellsArr[this.positionX + 1][this.positionY + 1], // Diagonal-below
                    cellsArr[this.positionX + 1][this.positionY], // Below
                )
            }
        }
        // For all other cells excluding corners and border cells :
        else {
            if (!this.neighbors.length) {  // Check if array is empty
                this.neighbors.push(
                    cellsArr[this.positionX - 1][this.positionY], // Above
                    cellsArr[this.positionX - 1][this.positionY + 1], // Diagonal-right-above
                    cellsArr[this.positionX][this.positionY + 1], // Right
                    cellsArr[this.positionX + 1][this.positionY + 1], // Diagonal-right-below
                    cellsArr[this.positionX + 1][this.positionY], // Below
                    cellsArr[this.positionX + 1][this.positionY - 1], // Diagonal-left-below
                    cellsArr[this.positionX][this.positionY - 1], // Left
                    cellsArr[this.positionX - 1][this.positionY - 1], // Diagonal-left-above
                )
            }
        }
    }
}