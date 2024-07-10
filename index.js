import { imgArr } from "./images.js";

// Variable initialisation
let cardsPicked = [];
let cardsPickedId = [];
let cardMatches = 0;
let moves = 0;
const blank = "./images/back.gif";
const girdEl = document.getElementById("grid");
const movesEl = document.getElementById("moves");
let allCardEl;
let timerId;

// This creates the inital grid of cards
function createGrid() {
  girdEl.innerHTML = "";
  console.log(girdEl);
  let count = 0;
  allCardEl = [];
  moves = 0;
  movesEl.textContent = 0;
  cardMatches = 0;
  cardsPicked = [];
  cardsPickedId = [];
  imgArr.sort((a, b) => 0.5 - Math.random());
  //Creating an img element for each of the 12 cards and attaching an event listener that calls the flipCard function on click
  imgArr.forEach(() => {
    let img = document.createElement("img");
    img.setAttribute("src", blank);
    img.setAttribute("id", count);
    img.setAttribute("class", "y");
    img.addEventListener("click", flipCard);
    girdEl.appendChild(img);
    count++;
  });
}

function cancelTimer() {
  clearTimeout(timerId);
}

// This checks whether the two cards chosen by the player are a match
function checkMatch() {
  allCardEl = document.querySelectorAll("#grid img");

  //If match is found they two cards disappear
  if (
    (cardsPicked[0] == cardsPicked[1]) &
    (cardsPickedId[0] != cardsPickedId[1])
  ) {
    allCardEl[cardsPickedId[0]].style.opacity = 0;
    allCardEl[cardsPickedId[1]].style.opacity = 0;

    // cards that have been matched are marked by changing the class to "n"
    allCardEl[cardsPickedId[0]].setAttribute("class", "n");
    allCardEl[cardsPickedId[1]].setAttribute("class", "n");

    cardMatches++;
  }

  //otherwise the two cards are flipped back
  else {
    allCardEl[cardsPickedId[0]].setAttribute("src", blank);
    allCardEl[cardsPickedId[1]].setAttribute("src", blank);
  }

  // if there have been 6 matches, meaning the are no more cards the game ends by creating a dialogue
  if (cardMatches == 6) {
    createDialogue();
  }

  // The two variables are reinitialised
  cardsPicked = [];
  cardsPickedId = [];
  // Each card that has not been matched has its event listener readded
  for (let card of allCardEl) {
    if (card.getAttribute("class") == "y") {
      card.addEventListener("click", flipCard); // this has to be added in order to allow the last two cards to be picked again
      card.removeEventListener("click", checkMatch);
    }
  }
}

// Displays the value of a card and if there are 2 cards flipped, calls the checkMatch function a
// after a delay of 1.5 seconds.
function flipCard() {
  let cardId = this.id;

  this.setAttribute("src", imgArr[cardId].img);
  cardsPickedId.push(cardId);
  cardsPicked.push(imgArr[cardId].name);

  allCardEl = document.querySelectorAll("#grid img");

  if (cardsPicked.length == 1) {
    this.removeEventListener("click", flipCard); // makes sure that the current card cannot be clicked again
  } else if (cardsPicked.length == 2) {
    moves++;
    movesEl.textContent = moves;

    //Adds checkMatch as first event listener to ensure the cards are checked straight away if the user presses another card and timeout is cancelled using cancelTimer
    for (let card of allCardEl) {
      card.removeEventListener("click", flipCard);
      card.addEventListener("click", checkMatch);
      card.addEventListener("click", cancelTimer);
      card.addEventListener("click", flipCard);
    }
    // makes sure the current two cards cannot be picked again
    this.removeEventListener("click", flipCard);
    allCardEl[cardsPickedId[0]].removeEventListener("click", flipCard);

    // the two picked cards are displayed for 1.5 seconds before being removed (if matched) or flipped over
    timerId = setTimeout(checkMatch, 1500);
  }
}

// This creates the dialogue box that asks the user if they'd like to restart the game
function createDialogue() {
  const dialogueWindowEl = document.getElementById("dialogue");
  dialogueWindowEl.setAttribute("class", "dialogue");
  const dialogueH2El = document.createElement("h2");
  const dialogueH3El = document.createElement("h3");
  const dialogueButtonEl = document.createElement("button");
  const cross = document.createElement("img");
  dialogueButtonEl.addEventListener("click", function () {
    dialogueWindowEl.setAttribute("class", "nothing");
    dialogueWindowEl.innerHTML = "";
    createGrid();
  });
  cross.src = "./images/cross.png";
  cross.addEventListener("click", function () {
    dialogueWindowEl.setAttribute("class", "nothing");
    dialogueWindowEl.innerHTML = "";
  });
  dialogueWindowEl.appendChild(cross);
  dialogueH2El.textContent = "Congratulations! You Won!!!";
  dialogueWindowEl.appendChild(dialogueH2El);
  dialogueH3El.textContent = "Start new game?";
  dialogueWindowEl.appendChild(dialogueH3El);
  dialogueButtonEl.textContent = "Start Game";
  dialogueWindowEl.appendChild(dialogueButtonEl);
}

createGrid();
