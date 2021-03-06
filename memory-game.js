"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}


// create a way to keep track of score 
let scoreBoard = document.getElementById("score")
let scoreTally = document.createElement("h1")
scoreTally.classList.add("score")
scoreBoard.appendChild(scoreTally)
console.log(scoreTally.innerText)

// alert user when game is complete, and include # of attempts 
function updateScore(){
  if(score === 5){
    setTimeout(function(){
      return alert(`you win! attempts: ${attempt}`)
    }, 400)
  }
  scoreTally.innerText = "total score: " + score
  return
}



// create a flippable card for each color
function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
  var card = document.createElement("div");
  // card.style.backgroundColor = "black"
  card.classList = "card"
  card.setAttribute("data-color", [color]);
  card.addEventListener("click", handleCardClick);

  gameBoard.appendChild(card);
  }
}

// variables to keep track of cards flipped, total attemps, total score, and a lock for gameBoard to prevent overclicking
var card1, card2;
var gameLock = false
var cardsFlipped = 0
var score = 0
var attempt = 0
updateScore()

// alert to player that the game has been won! PLEASE HELP WHY ISNT THIS WORKING!!
if(score === 5){
  console.log("WINNER!")
}

// flips max of two cards and compared them 
function flipCard(card) {
  if(gameLock) return;
  

  // assign card1 and card 2 to eventually be compared
  if(!card1 && !card2){
    card1 = card;
 
    return; 
  } else if (card1 && !card2 && card !== card1){
    card2 = card;
    gameLock = true;
      
    // compare the two cards, if match keep flipped, if not, unflip them! 

    // if a match, remove ability to click, update score and refresh hand 
    if(card1.getAttribute("data-color") === card2.getAttribute("data-color")){
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick)
      gameLock = false;
      score++
      resetHand();
      updateScore()
      return;

    // if not a match
    } else {
      unFlipCard(card1);
      unFlipCard(card2);
      resetHand();
      return;
    }
  }
}

// resets comparison cards and in event of a match or mismatch
function resetHand(){
  card1 = undefined
  card2 = undefined
  cardsFlipped = 0
  attempt++
}

/** Flip a card face-down. */
function unFlipCard(card) {
  setTimeout(function(){
    card.classList.remove("flipped")
    card.style.backgroundColor = "black"
    gameLock = false
  }, 750)
}

/** Handle clicking on a card: this could be first-card or second-card. */
function handleCardClick(evt) {
    if (!gameLock){
    let currentCard = this;
    currentCard.classList.add("flipped");
    currentCard.style.backgroundColor = currentCard.getAttribute("data-color");
    flipCard(currentCard);
  }
}




// help button with directions on how to play when clicked 

var helpBtn = document.getElementById("help");
helpBtn.addEventListener("click", function(){
  alert("click on the squares to reveal their color, try and match the color pairs in as few attemps as possible!");
})