const cards = document.querySelectorAll(".memory-card");

let cardFlipped = false;
let firstCard, secondCard;

function flipCard() {
  this.classList.toggle("flip");

  if (!cardFlipped) {
    // First click
    cardFlipped = true;
    firstCard = this;
  } else {
    // Second click
    cardFlipped = false;
    secondCard = this;
  }
}

cards.forEach((card) => card.addEventListener("click", flipCard));
