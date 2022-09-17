//Wait for the DOM to finish laoding before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function(){
        if (this.getAttribute("data-type") === "hit"){
            runGame();
        } else if (this.getAttribute("data-type") === "hold"){
            alert("You clicked hold!")
        } else {
            alert("You clicked reset!")
        }
        })
    }
})

/**
 * the main game loop, which will start when the user clicks 'hit me!'
 */
function runGame() {

    // creates two random numbers out of the possible cards/numbers of the 21 game
    let allCards = [1, 2, 3, 11, 7, 8, 9, 10, 11];
    let playerCard = allCards[Math.floor(Math.random() * allCards.length)];
    let bankCard = allCards[Math.floor(Math.random() * allCards.length)];
    
    let playerScore = parseInt(document.getElementById("playerScore").innerText);
    if(playerScore < 21){
        document.getElementById("playersCard").innerText = playerCard;
        incrementPlayerScore(playerCard);
    } else {
        alert("You have lost, click the reset button to start again");
    }

    let bankScore = parseInt(document.getElementById("bankScore").innerText);
    if(bankScore < 17){
        document.getElementById("bankCard").innerText = bankCard;
        incrementBankScore(bankCard);
    } else {
        alert("The bank will hold");
        bankCard = 0;
        incrementBankScore(bankCard);
    }

}

function incrementPlayerScore(playerCard) {
    let oldScore = parseInt(document.getElementById("playerScore").innerText);
    document.getElementById("playerScore").innerText= oldScore + playerCard;
}

function incrementBankScore(bankCard) {
    let oldScore = parseInt(document.getElementById("bankScore").innerText);
    document.getElementById("bankScore").innerText= oldScore + bankCard;
}