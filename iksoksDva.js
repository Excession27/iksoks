const firstRowOfBoxes = document.querySelectorAll(".top .box");
const secondRowOfBoxes = document.querySelectorAll(".middle .box");
const thirdRowOfBoxes = document.querySelectorAll(".bottom .box");

const allBoxes = document.querySelectorAll(".box");

const player1Input = document.querySelector("#first-player");
const player2Input = document.querySelector("#second-player");

const startGameBtn = document.querySelector("#start-game");
const enterPlayers = document.querySelector(".enter-players");
const scoreboard = document.querySelector(".scoreboard");
const scoreboard2 = document.querySelector(".scoreboard ol");

const displayError = document.createElement("div");

let stateOfTheBoard = [[], [], []];
let player1Name = "";
let player2Name = "";

let gameProgress = 0;

function draw() {
    let lastSymbol = "oks";

    function changeLastDrawnSymbol() {
        if (gameProgress === 0) {
            lastSymbol = "oks";
        };
        return (lastSymbol = lastSymbol === "oks" ? "iks" : "oks");
    }
    return changeLastDrawnSymbol;
}

let nextSymbol = draw();

function render() {
    stateOfTheBoard.forEach(function (row, rowIndex) {
        let chosenRow = "";
        if (rowIndex === 0) {
            chosenRow = ".top";
        }
        if (rowIndex === 1) {
            chosenRow = ".middle";
        }
        if (rowIndex === 2) {
            chosenRow = ".bottom";
        }

        row.forEach(function (cell, cellIndex) {
            let selector = `${chosenRow} div:nth-child(${cellIndex + 1})`;
            const selectBox = document.querySelector(selector);

            selectBox.classList.add(cell);


        });
    });
}

let selectTopRow = new Set([0, 1, 2]);
let selectMiddleRow = new Set([3, 4, 5]);

allBoxes.forEach(function (element, index) {
    element.addEventListener("click", function (event) {

        if (!(element.classList.contains("iks") || event.target.classList.contains("oks"))) {

            let currentRow = selectTopRow.has(index) ? 0 : selectMiddleRow.has(index) ? 1 : 2;

            let currentBox = (index + currentRow) === 0 ? 0 :
                (index + currentRow) === 1 ? 1 :
                    (index + currentRow) === 2 ? 2 :
                        (index + currentRow) === 4 ? 0 :
                            (index + currentRow) === 5 ? 1 :
                                (index + currentRow) === 6 ? 2 :
                                    (index + currentRow) === 8 ? 0 :
                                        (index + currentRow) === 9 ? 1 : 2;


            let chosenSymbol = nextSymbol();

            stateOfTheBoard[currentRow][currentBox] = chosenSymbol;
            render();
            gameProgress++;
            

            if (gameProgress > 4) {
                victoryConditions();
            }

        }
    });
});


function victoryConditions() {
    stateOfTheBoard.forEach(function (row) {
        let rowIksTrue = row[0] + row[1] + row[2] === "iksiksiks";
        let rowOksTrue = row[0] + row[1] + row[2] === "oksoksoks";

        
        if (rowIksTrue) {
            newGame("Iks");
            recordResults("Iks");
            displayResults();
        }
        if (rowOksTrue) {
            newGame("Oks");
            recordResults("Oks");
            displayResults();
        }
    });


    let diagonalLeft = stateOfTheBoard[0][0] + stateOfTheBoard[1][1] + stateOfTheBoard[2][2];

    let diagonalRight = stateOfTheBoard[0][2] + stateOfTheBoard[1][1] + stateOfTheBoard[2][0];

    for (let cell = 0; cell <= 2; cell++) {

        let columnStatus = "";
        for (let row = 0; row <= 2; row++) {
            if (stateOfTheBoard[row][cell]) {
                columnStatus += stateOfTheBoard[row][cell];
            }

        }
        if (columnStatus === "iksiksiks" || diagonalLeft === "iksiksiks" || diagonalRight === "iksiksiks") {
            newGame("Iks");
            recordResults("Iks");
            displayResults();
            break;
        } else if (columnStatus === "oksoksoks" || diagonalLeft === "oksoksoks" || diagonalRight === "oksoksoks") {
            newGame("Oks");
            recordResults("Oks");
            displayResults();
            break;
        }
    }
}



function newGame(victor) {
    gameProgress = 0;
    stateOfTheBoard = [[], [], []];
    player1Input.value = "";
    player2Input.value = "";

    let enterPlayers = document.querySelector(".enter-players");

    let allClicked = document.querySelectorAll(".oks, .iks");

    function clearBoard() {
        allClicked.forEach(function (element) {
            element.classList.remove("oks");
            element.classList.remove("iks");
        });
    }


    let displayVictor = document.createElement("div");
    let text = document.createElement("p");
    displayVictor.classList.add("victory");
    text.textContent = `${victor} has been victorious. New game will start right away.`;
    displayVictor.appendChild(text);
    document.querySelector("body").appendChild(displayVictor);


    setTimeout(function () {
        clearBoard();
        document.querySelector("body").removeChild(displayVictor);
        enterPlayers.style.display = "flex";
    }, 2500);
}

function startGame() {
    if (!(player1Input.value == "") && !(player2Input.value == "")) {
        enterPlayers.style.display = "none";
        player1Name = player1Input.value;
        player2Name = player2Input.value;

    } else {
        if (!(displayError.classList.contains("noname-error"))) {

            let text = document.createElement("p");
            displayError.classList.add("noname-error");
            text.textContent = `You need to enter the name of both players to play.`;
            displayError.appendChild(text);
            document.querySelector("body").appendChild(displayError);

            setTimeout(function () {
                displayError.classList.remove("noname-error");
                displayError.innerHTML = "";
                document.querySelector("body").removeChild(displayError);
            }, 2500);
        }
    }
}


function recordResults(victor) {
    switch (victor) {
        
        case "Iks":
            
            if (!(localStorage.getItem(player1Name))) {
                console.log("Ovde je " + !(localStorage.getItem(player1Name)));
                localStorage.setItem(player1Name, 1);
                break;

            } else {
                localStorage.setItem(player1Name, Number(localStorage.getItem(player1Name)) + 1);
                break;
            }

        case "Oks":
            
            if (!(localStorage.getItem(player2Name))) {
                localStorage.setItem(player2Name, 1);
                break;

            } else {
                localStorage.setItem(player2Name, Number(localStorage.getItem(player2Name)) + 1);
                break;
            }
            
    }
}

function displayResults() {
    scoreboard.innerHTML = "";
    let title = document.createElement("h2");
    title.textContent = "Scoreboard";
    scoreboard.appendChild(title);
    if (localStorage) {
        for (const entry in localStorage) {
            if (localStorage.hasOwnProperty(entry)) {
                let scoreboardEntry = document.createElement("li")
                let name = document.createElement("span");
                let score = document.createElement("span");
                name.textContent = entry;
                score.textContent = localStorage[entry];

                scoreboardEntry.appendChild(name);
                scoreboardEntry.appendChild(score);

                scoreboardEntry.style.order = -localStorage[entry];

                scoreboard.appendChild(scoreboardEntry);
            }
        }

    }
}



player1Input.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        startGame();
    }
});

player2Input.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        startGame();
    }
});

startGameBtn.addEventListener("click", function () {
    startGame();
});

displayResults();

