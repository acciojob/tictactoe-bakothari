document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.getElementById("submit");
    const playerInput = document.getElementById("player-input");
    const gameSection = document.getElementById("game");
    const board = document.getElementById("board");
    const messageDiv = document.getElementById("message");

    let currentPlayer;
    let players = {};
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    submitBtn.addEventListener("click", () => {
        const player1 = document.querySelector("#player-1").value.trim();
        const player2 = document.querySelector("#player-2").value.trim();

        if (player1 && player2) {
            players = { X: player1, O: player2 };
            currentPlayer = "X";
            playerInput.classList.add("hidden");
            gameSection.classList.remove("hidden");
            messageDiv.innerText = `${players[currentPlayer]}, you're up!`;
            createBoard();
        } else {
            alert("Please enter names for both players.");
        }
    });

    function createBoard() {
        board.innerHTML = "";
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = i;
            cell.addEventListener("click", handleMove);
            board.appendChild(cell);
        }
    }

    function handleMove(event) {
        const cell = event.target;
        cell.innerText = currentPlayer;

        if (checkWinner()) {
            messageDiv.innerText = `${players[currentPlayer]} congratulations you won!`;
            disableBoard();
            return;
        }

        if (currentPlayer === "X") {
            currentPlayer = "O";
        } else {
            currentPlayer = "X";
        }

        messageDiv.innerText = `${players[currentPlayer]}, you're up!`;
    }

    function checkWinner() {
        const cells = document.querySelectorAll(".cell");
        for (let i = 0; i < winPatterns.length; i++) {
            const [a, b, c] = winPatterns[i];

            if (
                cells[a].innerText !== "" &&
                cells[a].innerText === cells[b].innerText &&
                cells[a].innerText === cells[c].innerText
            ) {

                cells[a].style.backgroundColor = "purple";
                cells[b].style.backgroundColor = "purple";
                cells[c].style.backgroundColor = "purple";

                return true; // A winner is found
            }
        }
        return false; // No winner
    }


    function disableBoard() {
        document.querySelectorAll(".cell").forEach(cell => {
            cell.removeEventListener("click", handleMove);
        });
    }
});
