class Cell {
    constructor() {
        this.cellElm = null;

        this.updateUI()
    }

    updateUI() {
        this.newCell = document.createElement("div") // Create a div element for each case (cell) of the grid
        const gridContainer = document.querySelector(".grid-container")  // Get the grid container element from the DOM

        this.newCell.classList.add("cell", "dead") // Add the 'cell' and 'dead' classes to each div element
        gridContainer.appendChild(this.newCell) // Append each element to the grid container

        this.newCell.addEventListener("click", () => { // Create an event listener for each div element
            this.newCell.classList.toggle("alive") // When a case (cell) is clicked, toggle the 'alive' class
        })
    }
}