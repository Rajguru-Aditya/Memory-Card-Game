const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false; // We will lock the board to prevent any bugs occurring due to edge cases
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  // if (firstCard.dataset.framework === secondCard.dataset.framework) {
  //   // Its a match
  //   disableCards();
  // } else {
  //   // Not a match
  //   unFlipCards();
  // }

  // We will write the above if else block with ternary operator
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
  // In ternary operator, the first thing is our condition "isMatch" and then "?" means "if" .. and  ":" means "else"
  // If it is a match then first function after "?" will be executed, else the function after ":" will be executed
  // If you want to try if else instead of ternary operator then remove the comments from above if else block and comment the ternary operator
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  // This will automatically flip the cards back after 1.5 seconds
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

// Resetting the board
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Shuffling the cards so they appear at random positions
(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})(); // We wrap the entire function into parenthesis to make this function an "immediately invoked function"
// It will be called immediately after its definition

cards.forEach((card) => card.addEventListener("click", flipCard));
