class Cell {
    constructor(positionX, positionY) {
        this.positionX = positionX; // Store the horizontal position of the cell instance 
        this.positionY = positionY; // Store the vertical position of the cell instance
        this.state = 0; // Represents the state of a cell (alive or dead)

        this.updateUI()
    }

    updateUI() {
        this.newCell = document.createElement("div") // Create a div element for each case (cell) of the grid
        const gridContainer = document.querySelector(".grid-container")  // Get the grid container element from the DOM

        this.newCell.classList.add("cell", "dead") // Add the 'cell' and 'dead' classes to each div element
        gridContainer.appendChild(this.newCell) // Append each element to the grid container

        this.newCell.addEventListener("click", () => { // Create an event listener for each div element
            this.newCell.classList.toggle("alive") // When a case (cell) is clicked, toggle the 'alive' class
            if(this.state){ // Check the state of the cell
                this.state = 0; // If alive, switch it state to 0 (dead)
            }else{
                this.state = 1; // If dead, switch it state to 1 (alive)
            }
        })
    }
}