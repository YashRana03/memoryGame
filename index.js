let imgArr = [
    {
        name: "bird",
        img: "./images/bird2.png"
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
        img: "./images/cheese2.png"
    },

    {
        name: "pizza",
        img: "./images/pizza.png"
    },

    {
        name: "bird",
        img: "./images/bird2.png"
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
        img: "./images/cheese2.png"
    },

    {
        name: "pizza",
        img: "./images/pizza.png"
    }

]


let cardsPicked = []
let cardsPickedId = []
let cardMatches = 0
let moves = 0
const blank = "./images/back.gif"
const girdEl = document.getElementById("grid")
const movesEl = document.getElementById("moves")
let allCardEl;
let count = 0




function createGrid() {
    moves = 0
    girdEl.innerHTML = ""
    console.log(girdEl)
    count = 0
    allCardEl = []
    movesEl.textContent = 0
    cardMatches = 0
    cardsPicked = []
    cardsPickedId = []
    imgArr.sort((a, b) => 0.5 - Math.random())
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


function checkMatch() {
    allCardEl = document.querySelectorAll("#grid img")
    
    //console.log(allCardEl[cardsPickedId[0]].className)
    if(cardsPicked[0] == cardsPicked[1] & cardsPickedId[0] != cardsPickedId[1]) {
        
        allCardEl[cardsPickedId[0]].style.opacity = 0
        allCardEl[cardsPickedId[1]].style.opacity = 0
        
        allCardEl[cardsPickedId[0]].setAttribute("class", "n")
        allCardEl[cardsPickedId[1]].setAttribute("class", "n")
        
        cardMatches++


    }
    else {
        
        allCardEl[cardsPickedId[0]].setAttribute("src", blank)
        allCardEl[cardsPickedId[1]].setAttribute("src", blank)
    }

    

    if(cardMatches == 6) {
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

    cardsPicked = []
    cardsPickedId = []
    for(let card of allCardEl) {
        if(card.getAttribute("class") == "y") {
            card.addEventListener("click", flipCard)
            
        }
        
    }
    

}


function flipCard() {
    let cardId = this.id
    
    this.setAttribute("src", imgArr[cardId].img)
    cardsPickedId.push(cardId)
    cardsPicked.push(imgArr[cardId].name)
    
    allCardEl = document.querySelectorAll("#grid img")
    if(cardsPicked.length == 2 ){
        moves++
        movesEl.textContent = moves
        for(let card of allCardEl) {
            card.removeEventListener("click", flipCard)
        }
        setTimeout(checkMatch, 1500)
        
    }
}

createGrid()