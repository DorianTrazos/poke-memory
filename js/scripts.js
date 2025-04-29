const gameContainerElement = document.getElementById('game-container');
const pointsElement = document.getElementById('points');
const triesElement = document.getElementById('tries');
const restartButtonElement = document.getElementById('button-restart');

const totalCards = 12;
let pokeNumbers = [];
let tries = 0;
let points = 0;

let allCards = null;
let cardA = null;
let cardB = null;

let canPlay = false;

const getRandomNumber = (max = 150) => Math.floor(Math.random() * max + 1);

const showAllCards = () => {
  allCards.forEach((card, index) => {
    if (!card.dataset.win) {
      card.classList.add('card-show');
      const pokeImage = `url(../assets/images/${pokeNumbers[index]}.png)`;
      card.style.setProperty('--poke-image', pokeImage);
    }
  });

  setTimeout(hideCards, 4000);
};

const createGameBoard = () => {
  gameContainerElement.textContent = '';
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < totalCards; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    card.append(cardFront);
    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    card.append(cardBack);
    fragment.append(card);
  }

  gameContainerElement.append(fragment);
  allCards = gameContainerElement.querySelectorAll('.card');
  setTimeout(showAllCards, 1000);
  tries = 0;
  points = 0;
  triesElement.textContent = `TRIES: ${tries}`;
  pointsElement.textContent = `POINTS: ${points} `;
};

const getPokemonsToPlay = () => {
  pokeNumbers = [];
  while (pokeNumbers.length < totalCards / 2) {
    const randomNumber = getRandomNumber();
    if (!pokeNumbers.includes(randomNumber)) {
      pokeNumbers.push(randomNumber);
    }
  }

  pokeNumbers = [...pokeNumbers, ...pokeNumbers].sort(() => Math.random() - 0.5);

  createGameBoard();
};

const hideCards = () => {
  allCards.forEach(card => {
    if (!card.dataset.win) {
      card.classList.remove('card-show');
      card.style.setProperty('--poke-image', '');
    }
  });

  cardA = null;
  cardB = null;
  canPlay = true;
  triesElement.textContent = `TRIES: ${tries++}`;
};

const checkCardsSelected = card => {
  if (card.dataset.win || card === cardA || card === cardB) return;
  if (!cardA) {
    cardA = card;
    return;
  }
  if (!cardB) {
    cardB = card;
  }

  if (cardA && cardB) {
    canPlay = false;
    const pokeNumberA = cardA.dataset.pokeImage;
    const pokeNumberB = cardB.dataset.pokeImage;

    if (pokeNumberA === pokeNumberB) {
      console.log('CORRECT');
      cardA.dataset.win = true;
      cardB.dataset.win = true;
      pointsElement.textContent = `POINTS: ${(points += 100)}`;
      setTimeout(() => {
        hideCards();
      }, 500);
    } else {
      console.log('NOP');
      setTimeout(() => {
        hideCards();
      }, 1000); // Damos un poquito más de tiempo para ver el error
    }
  }
};

const showCard = event => {
  if (!canPlay) return;

  const card = event.target.closest('.card');
  if (!card || card.dataset.win || card === cardA || card === cardB) return;

  card.classList.add('card-show');

  const index = [...gameContainerElement.children].indexOf(card);
  const pokeImage = `url(../assets/images/${pokeNumbers[index]}.png)`;
  card.style.setProperty('--poke-image', pokeImage);
  card.dataset.pokeImage = pokeNumbers[index];

  checkCardsSelected(card);
};

getPokemonsToPlay();

gameContainerElement.addEventListener('click', showCard);
restartButtonElement.addEventListener('click', getPokemonsToPlay);
