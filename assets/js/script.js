//Wait for the DOM to finish laoding before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "hit") {
                runGame("hit");
            } else if (this.getAttribute("data-type") === "hold") {
                runGame("hold");
            } else {
                alert("You clicked reset!")
            }
        })
    }
})

/**
 * the main game loop, which will start when the user clicks 'hit me!'
 */
function runGame(selectedControl) {

    // creates two random numbers out of the possible cards/numbers of the 21 game
    let allCards = [1, 2, 3, 11, 7, 8, 9, 10, 11];
    let playerCard = allCards[Math.floor(Math.random() * allCards.length)];
    let bankCard = allCards[Math.floor(Math.random() * allCards.length)];

    if (selectedControl === "hit") {
        let playerScore = parseInt(document.getElementById("playerScore").innerText);
        if (playerScore < 21) {
            document.getElementById("playersCard").innerText = playerCard;
            incrementPlayerScore(playerCard);
        } else {
            alert("Aii you should have stopped earlier, you lost!");
        }
    }

    if (selectedControl === "hold") {
        playBank(bankCard);
    }

}

function incrementPlayerScore(playerCard) {
    let oldScore = parseInt(document.getElementById("playerScore").innerText);
    document.getElementById("playerScore").innerText = oldScore + playerCard;
}

function playBank(bankCard) {
    let bankScore = 0;
    do {
        bankScore = bankScore + bankCard;
    }
    while (bankScore < 17);
    document.getElementById("bankScore").innerText = bankScore;
    calculateWinner();
}

function calculateWinner() {
let playersTotalScore = document.getElementById("playerScore").innerText;
let computersTotalScore = document.getElementById("bankScore").innerText;

if(playersTotalScore > computersTotalScore && playersTotalScore < 22){
    document.getElementById("winner").innerText = "Congratulations! You are the winner!";
} else {
    document.getElementById("winner").innerText = "Ai, the computer won, you lost!";
}
}
