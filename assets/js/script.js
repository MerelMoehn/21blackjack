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
