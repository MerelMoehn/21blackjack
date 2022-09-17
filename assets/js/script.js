//Wait for the DOM to finish laoding before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function(){
        if (this.getAttribute("data-type") === "hit"){
            alert("You clicked hit!")
        } else if (this.getAttribute("data-type") === "hold"){
            alert("You clicked hold!")
        } else {
            alert("You clicked reset!")
        }
        })
    }
})

function runGame() {
    let allCards = [1, 2, 3, 11, 7, 8, 9, 10, 11];
    let playerCard = allCards[Math.floor(Math.random() * allCards.length)];
    let bankCard = allCards[Math.floor(Math.random() * allCards.length)];
    console.log(playerCard, bankCard);
}
