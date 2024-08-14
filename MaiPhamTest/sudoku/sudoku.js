let numSelected = null; //Keeps track of the currently selected number
let errors = 0; //Counts the number of errors made by the user

const board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
];

//Calls setGame to set up the board when the page loads and attaches an event listener to the "Solve" button.
window.onload = function() {
    setGame();
    document.getElementById("solve-button").addEventListener("click", solveAndDisplay);
}

// Set up the game board
function setGame() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] !== "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r === 2 || r === 5) {
                tile.classList.add("horizontal-line");
            }
            if (c === 2 || c === 5) {
                tile.classList.add("vertical-line");
            }
            tile.classList.add("tile");
            tile.addEventListener("click", selectTile);
            document.getElementById("board").appendChild(tile);
        }
    }

    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i.toString();
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }
}

//Sets the currently selected number and highlights it.
function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

// Place the selected number in the clicked tile if valid
function selectTile() {
    if (numSelected) {
        if (this.innerText !== "") {
            return;
        }

        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (isValidMove(numSelected.id, r, c)) {
            this.innerText = numSelected.id;
            this.classList.remove("error");
        } else {
            this.classList.add("error");
            errors += 1;
            document.getElementById("errors").innerText = `Errors: ${errors}`;
        }
    }
}

// Solve the Sudoku puzzle using backtracking
function solveSudoku(grid) {
    function isValid(num, row, col) {
         // Check the row
        for (let c = 0; c < 9; c++) {
            if (grid[row][c] === num) return false;
        }
        // Check the column
        for (let r = 0; r < 9; r++) {
            if (grid[r][col] === num) return false;
        }
        // Check the 3x3 subgrid
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let r = startRow; r < startRow + 3; r++) {
            for (let c = startCol; c < startCol + 3; c++) {
                if (grid[r][c] === num) return false;
            }
        }
        return true;
    }

    function solve() {
        // Loop through each cell in the grid
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                // Find an empty cell
                if (grid[row][col] === 0) {
                    // Try numbers 1 to 9
                    for (let num = 1; num <= 9; num++) {
                        // Check if the number is valid
                        if (isValid(num, row, col)) {
                            // Place the number
                            grid[row][col] = num; 
                            // Recursively attempt to solve the rest of the board
                            if (solve()) return true;
                            // Backtrack if placing the number doesn't solve the board
                            grid[row][col] = 0;
                        }
                    }
                    // If no number is valid, return false to trigger backtracking
                    return false;
                }
            }
        }
        // If the board is completely filled, return true (solution found)
        return true;
    }

    solve(); // Start solving the Sudoku
    return grid; // Return the solved grid
}

// Get the current board state as a 2D array
function getBoardArray() {
    const array = [];
    for (let r = 0; r < 9; r++) {
        let row = [];
        for (let c = 0; c < 9; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            row.push(tile.innerText ? parseInt(tile.innerText) : 0);
        }
        array.push(row);
    }
    return array;
}

// Check if a move is valid according to Sudoku rules
function isValidMove(num, row, col) {
    const grid = getBoardArray();
    return solveSudoku(grid)[row][col] === parseInt(num);
}

// Display the solved Sudoku grid
function displaySolution(grid) {
    const solutionBoard = document.getElementById("solution");
    solutionBoard.innerHTML = ""; // Clear previous solution
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.innerText = grid[r][c] || "";
            if (r === 2 || r === 5) {
                tile.classList.add("horizontal-line");
            }
            if (c === 2 || c === 5) {
                tile.classList.add("vertical-line");
            }
            tile.classList.add("tile");
            solutionBoard.appendChild(tile);
        }
    }
}

// Handle solving and displaying the solution
function solveAndDisplay() {
    const boardArray = getBoardArray();
    const solvedBoard = solveSudoku(boardArray);
    displaySolution(solvedBoard);
}
