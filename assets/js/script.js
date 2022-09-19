//Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "hit") {
                runGame("hit");
            } else if (this.getAttribute("data-type") === "hold") {
                runGame("hold");
            } else if (this.getAttribute("data-type") === "reset") {
                reset();
            } else if (this.getAttribute("data-type") === "submit") {
                getName();
            } else {
                alert("Something went wrong, try again");
            }
        })
    }
})

function getName() {
    let userName = document.getElementById("name-box").value;
    document.getElementById("userName").innerText = userName;
    return userName;
}

/**
 * the main game loop, which will start when the user clicks 'hit me!'
 */
function runGame(selectedControl) {
    let userName = getName();

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
            document.getElementById("winner").innerText = `Ai ${userName}, the computer won, you lost!`;
        }
    }

    if (selectedControl === "hold") {
        if (playerScore > 21){
            document.getElementById("winner").innerText = `Ai ${userName}, the computer won, you lost!`;
        }
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
    let userName = getName();
    let playersTotalScore = document.getElementById("playerScore").innerText;
    let banksTotalScore = document.getElementById("bankScore").innerText;

    if (playersTotalScore > banksTotalScore && playersTotalScore < 22 || banksTotalScore > 21) {
        document.getElementById("winner").innerText = `Congratulations ${userName}! You are the winner!`;
    } else {
        document.getElementById("winner").innerText = `Oh no ${userName}, the computer won, you lost!`;
    }
}

function reset() {
    document.getElementById("playerScore").innerText = 0;
    document.getElementById("playersCard").innerText = 0;
    document.getElementById("bankScore").innerText = "?";
    document.getElementById("winner").innerText = "";
}