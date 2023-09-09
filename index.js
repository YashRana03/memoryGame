let imgArr = [
    {
        name: "bird",
        img: "./images/bird.png"
    },

    {
        name: "cat",
        img: "./images/cat.png"
    },

    {
        name: "dog",
        img: "./images/dog.png"
    },

    {
        name: "hamburger",
        img: "./images/hamburger.png"
    },

    {
        name: "cheese",
        img: "./images/cheese.png"
    },

    {
        name: "pizza",
        img: "./images/pizza.png"
    },

    {
        name: "bird",
        img: "./images/bird.png"
    },

    {
        name: "cat",
        img: "./images/cat.png"
    },

    {
        name: "dog",
        img: "./images/dog.png"
    },

    {
        name: "hamburger",
        img: "./images/hamburger.png"
    },

    {
        name: "cheese",
        img: "./images/cheese.png"
    },

    {
        name: "pizza",
        img: "./images/pizza.png"
    }

]

// Variable initialisation
let cardsPicked = []
let cardsPickedId = []
let cardMatches = 0
let moves = 0
const blank = "./images/back.gif"
const girdEl = document.getElementById("grid")
const movesEl = document.getElementById("moves")
let allCardEl;


// This creates the inital grid of cards 
function createGrid() {
    
    girdEl.innerHTML = ""
    console.log(girdEl)
    let count = 0
    allCardEl = []
    moves = 0
    movesEl.textContent = 0
    cardMatches = 0
    cardsPicked = []
    cardsPickedId = []
    imgArr.sort((a, b) => 0.5 - Math.random())
    //Creating an img element for each of the 12 cards and attaching an event listener that calls the flipCard function on click
    imgArr.forEach(()=> {
        let img = document.createElement("img")
        img.setAttribute("src", blank)
        img.setAttribute("id", count)
        img.setAttribute("class", "y")
        img.addEventListener("click", flipCard)
        girdEl.appendChild(img)
        count++
    })
}

// This checks whether the two cards chosen by the player are a match
function checkMatch() {
    allCardEl = document.querySelectorAll("#grid img")
    
    //If match is found they two cards disappear
    if(cardsPicked[0] == cardsPicked[1] & cardsPickedId[0] != cardsPickedId[1]) {
        
        allCardEl[cardsPickedId[0]].style.opacity = 0
        allCardEl[cardsPickedId[1]].style.opacity = 0

        // cards that have been matched are marked by changing the class to "n"
        allCardEl[cardsPickedId[0]].setAttribute("class", "n")
        allCardEl[cardsPickedId[1]].setAttribute("class", "n")
        
        cardMatches++
    }

    //otherwise the two cards are flipped back
    else {
        
        allCardEl[cardsPickedId[0]].setAttribute("src", blank)
        allCardEl[cardsPickedId[1]].setAttribute("src", blank)
    }

    // if there have been 6 matches, meaning the are no more cards the game ends by creating a dialogue 
    if(cardMatches == 6) {
        createDialogue()
    }
    
    // The two variables are reinitialised 
    cardsPicked = []
    cardsPickedId = []
    // Each card that has not been matched has its event listener readded 
    for(let card of allCardEl) {
        if(card.getAttribute("class") == "y") {
            card.addEventListener("click", flipCard)
            
        }
        
    }
    

}

// Displays the value of a card and if there are 2 cards flipped, calls the checkMatch function a
// after a delay of 1.5 seconds.
function flipCard() {
    let cardId = this.id
    
    this.setAttribute("src", imgArr[cardId].img)
    cardsPickedId.push(cardId)
    cardsPicked.push(imgArr[cardId].name)
    
    allCardEl = document.querySelectorAll("#grid img")
    if(cardsPicked.length == 2 ){
        moves++
        movesEl.textContent = moves
        //Removes any event listeners from each card so that no more cards can be clicked while 
        // timeout is on
        for(let card of allCardEl) {
            card.removeEventListener("click", flipCard)
        }
        setTimeout(checkMatch, 1500)
        
    }
}

// This creates the dialogue box that asks the user if they'd like to restart the game
function createDialogue() {
    const dialogueWindowEl = document.getElementById("dialogue")
    dialogueWindowEl.setAttribute("class", "dialogue")
    const dialogueH2El  = document.createElement("h2")
    const dialogueH3El  = document.createElement("h3")
    const dialogueButtonEl  = document.createElement("button")
    const cross = document.createElement("img")
    dialogueButtonEl.addEventListener("click", function() {
        dialogueWindowEl.setAttribute("class", "nothing")
        dialogueWindowEl.innerHTML = ""
        createGrid()
        
    })
    cross.src = "./images/cross.png"
    cross.addEventListener("click", function() {
        dialogueWindowEl.setAttribute("class", "nothing")
        dialogueWindowEl.innerHTML = ""
    })
    dialogueWindowEl.appendChild(cross)
    dialogueH2El.textContent = "Gongratulations! You Won!!!"
    dialogueWindowEl.appendChild(dialogueH2El)
    dialogueH3El.textContent = "Start new game?"
    dialogueWindowEl.appendChild(dialogueH3El)
    dialogueButtonEl.textContent = "Start Game"
    dialogueWindowEl.appendChild(dialogueButtonEl)
    
}
    





createGrid()