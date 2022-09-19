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
        });
    }
});

/**
 * This function gets the player's name from the DOM after the player has clicked "submit"
 * It uses the name to personalize the site and winner's message.
 */
function getName() {
    let userName = document.getElementById("name-box").value;
    if(userName === ""){
        alert("Oeps! You did not enter a name. Try again!");
    } else if(typeof userName === 'string') {
        alert("Oeps! You did not enter text, probably a number or sign. Try again!");
    }
    else{
    document.getElementById("userName").innerText = userName;
    return userName;
}
}

/**
 * the main game loop, which will start when the user clicks 'hit me!'
 */
function runGame(selectedControl) {
    let userName = getName();
    let playerScore = parseInt(document.getElementById("playerScore").innerText);

    // creates two random numbers out of the possible cards/numbers of the 21 game
    let allCards = [1, 2, 3, 11, 7, 8, 9, 10, 11];
    let playerCard = allCards[Math.floor(Math.random() * allCards.length)];
    let bankCard = allCards[Math.floor(Math.random() * allCards.length)];

    if (selectedControl === "hit") {
        if (playerScore < 21) {
            document.getElementById("playersCard").innerText = playerCard;
            incrementPlayerScore(playerCard);
        } else {
            document.getElementById("winner").innerText = `Ai ${userName}, the computer won, you lost!`;
            document.getElementById("winner").style.color = "red";
        }
    }

    if (selectedControl === "hold") {
        if (playerScore === 0) {
            alert("You have to start playing before you can hold");
        } else if (playerScore > 21) {
            document.getElementById("winner").innerText = `Ai ${userName}, the computer won, you lost!`;
            document.getElementById("winner").style.color = "red";
        } else {
            playBank(bankCard);
        }
    }
}

/**
 * This functions increments the player's score by getting the current score from the DOM and adding the random selected card value to it. 
 * Which is passed as parameter (playerCard)
 */
function incrementPlayerScore(playerCard) {
    let oldScore = parseInt(document.getElementById("playerScore").innerText);
    document.getElementById("playerScore").innerText = oldScore + playerCard;
}

/**
 * This functions runs the bank's game after the user has clicked on hold. The bank will take a card as long as its total score is below 17. When higher than 17 the bank holds.
 */
function playBank(bankCard) {
    let bankScore = 0;
    do {
        bankScore = bankScore + bankCard;
    }
    while (bankScore < 17);
    document.getElementById("bankScore").innerText = bankScore;
    calculateWinner(bankScore);
}

/**
 * Calculates the winner of the game by comparing the bank's score to player's score
 * It takes the paramater bankScore and gets the player's score from the DOM.
 */
function calculateWinner(bankScore) {
    let userName = getName();
    let playersTotalScore = document.getElementById("playerScore").innerText;
    let banksTotalScore = bankScore;

    if (playersTotalScore > banksTotalScore && playersTotalScore < 22 || banksTotalScore > 21) {
        document.getElementById("winner").innerText = `Congratulations ${userName}! You are the winner!`;
        document.getElementById("winner").style.color = "green";
    } else {
        document.getElementById("winner").innerText = `Oh no ${userName}, the computer won, you lost!`;
        document.getElementById("winner").style.color = "red";
    }
}

/** 
 * This function resets the game by setting players' values back to zero and setting the bank's score back to "?""
 * It also removes the display of the winner.
 */
function reset() {
    document.getElementById("playerScore").innerText = 0;
    document.getElementById("playersCard").innerText = 0;
    document.getElementById("bankScore").innerText = "?";
    document.getElementById("winner").innerText = "";
}