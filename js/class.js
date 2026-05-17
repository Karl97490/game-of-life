class Cell {
    constructor(positionX, positionY) {
        this.positionX = positionX; // Store the horizontal position of the cell instance 
        this.positionY = positionY; // Store the vertical position of the cell instance
        this.state = 0; // Represents the state of a cell (alive or dead)
        this.neighbors = []; // Store the cell’s neighbors

        this.createCellElm() // Create a cell element for each cell instance in the grid
    }

    createCellElm() {
        this.newCell = document.createElement("div") // Create a div element for each case (cell) of the grid
        const gridContainer = document.querySelector(".grid-container")  // Get the grid container element from the DOM

        this.newCell.classList.add("cell", "dead") // Add the 'cell' and 'dead' classes to each div element
        gridContainer.appendChild(this.newCell) // Append each element to the grid container

        this.newCell.addEventListener("click", () => { // Create an event listener for each div element
            this.updateUI() // Invoke the method updateUI()

            // Check the state of the cell
            this.state = this.state ? 0 : 1 // If alive, switch its state to 0 (dead), if dead switch it to 1 (alive)
        })
    }

    updateUI() {
        this.newCell.classList.toggle("alive") // Toggle the 'alive' class
    }

    setNeighbors() {
        // Differentiate the cells based on their position in the grid

        // For cells in the corners :
        // Top left
        if (this.positionX === 0 && this.positionY === 0) {
            // Push the neighbors to the neighbors array
            if (!this.neighbors.length) {  // Check if array is empty
                this.neighbors.push(
                    cellMatrix[this.positionX][this.positionY + 1], // Right
                    cellMatrix[this.positionX + 1][this.positionY + 1], // Diagonal 
                    cellMatrix[this.positionX + 1][this.positionY] // Below
                )
            }
        }
        // Bottom left
        else if (this.positionX === 59 && this.positionY === 0) {
            if (!this.neighbors.length) {  // Check if array is empty
                this.neighbors.push(
                    cellMatrix[this.positionX][this.positionY + 1], // Right
                    cellMatrix[this.positionX - 1][this.positionY + 1], // Diagonal
                    cellMatrix[this.positionX - 1][this.positionY] // Above
                )
            }
        }
        // Top right
        else if (this.positionX === 0 && this.positionY === 59) {
            if (!this.neighbors.length) {  // Check if array is empty
                this.neighbors.push(
                    cellMatrix[this.positionX][this.positionY - 1], // Left
                    cellMatrix[this.positionX + 1][this.positionY - 1], // Diagonal
                    cellMatrix[this.positionX + 1][this.positionY] // Below
                )
            }
        }
        // Bottom right
        else if (this.positionX === 59 && this.positionY === 59) {
            if (!this.neighbors.length) {  // Check if array is empty
                this.neighbors.push(
                    cellMatrix[this.positionX][this.positionY - 1], // Left
                    cellMatrix[this.positionX - 1][this.positionY - 1], // Diagonal
                    cellMatrix[this.positionX - 1][this.positionY] // Above 
                )
            }
        }

        // For cells on the borders (excluding the corners) :
        // Top border
        else if (this.positionX === 0 && this.positionY >= 1 && this.positionY <= 58) {
            if (!this.neighbors.length) {  // Check if array is empty
                this.neighbors.push(
                    cellMatrix[this.positionX][this.positionY - 1], // Left
                    cellMatrix[this.positionX + 1][this.positionY - 1], // Diagonal-left
                    cellMatrix[this.positionX + 1][this.positionY], // Below
                    cellMatrix[this.positionX + 1][this.positionY + 1], // Diagonal-right
                    cellMatrix[this.positionX][this.positionY + 1], // Right
                )
            }
        }
        // Right border
        else if (this.positionX >= 1 && this.positionX <= 58 && this.positionY === 59) {
            if (!this.neighbors.length) {  // Check if array is empty
                this.neighbors.push(
                    cellMatrix[this.positionX - 1][this.positionY], // Above
                    cellMatrix[this.positionX - 1][this.positionY - 1], // Diagonal-above
                    cellMatrix[this.positionX][this.positionY - 1], // Left
                    cellMatrix[this.positionX + 1][this.positionY - 1], // Diagonal-below
                    cellMatrix[this.positionX + 1][this.positionY], // Below
                )
            }
        }
        // Bottom border
        else if (this.positionX === 59 && this.positionY >= 1 && this.positionY <= 58) {
            if (!this.neighbors.length) {  // Check if array is empty
                this.neighbors.push(
                    cellMatrix[this.positionX][this.positionY - 1], // Left
                    cellMatrix[this.positionX - 1][this.positionY - 1], // Diagonal-left
                    cellMatrix[this.positionX - 1][this.positionY], // Above
                    cellMatrix[this.positionX - 1][this.positionY + 1], // Diagonal-right
                    cellMatrix[this.positionX][this.positionY + 1], // Right
                )
            }
        }
        // Left border
        else if (this.positionX >= 1 && this.positionX <= 58 && this.positionY === 0) {
            if (!this.neighbors.length) {  // Check if array is empty
                this.neighbors.push(
                    cellMatrix[this.positionX - 1][this.positionY], // Above
                    cellMatrix[this.positionX - 1][this.positionY + 1], // Diagonal-above
                    cellMatrix[this.positionX][this.positionY + 1], // Right
                    cellMatrix[this.positionX + 1][this.positionY + 1], // Diagonal-below
                    cellMatrix[this.positionX + 1][this.positionY], // Below
                )
            }
        }
        // For all other cells excluding corners and border cells :
        else {
            if (!this.neighbors.length) {  // Check if array is empty
                this.neighbors.push(
                    cellMatrix[this.positionX - 1][this.positionY], // Above
                    cellMatrix[this.positionX - 1][this.positionY + 1], // Diagonal-right-above
                    cellMatrix[this.positionX][this.positionY + 1], // Right
                    cellMatrix[this.positionX + 1][this.positionY + 1], // Diagonal-right-below
                    cellMatrix[this.positionX + 1][this.positionY], // Below
                    cellMatrix[this.positionX + 1][this.positionY - 1], // Diagonal-left-below
                    cellMatrix[this.positionX][this.positionY - 1], // Left
                    cellMatrix[this.positionX - 1][this.positionY - 1], // Diagonal-left-above
                )
            }
        }
    }
}