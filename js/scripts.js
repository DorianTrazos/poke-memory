const gameContainerElement = document.getElementById('game-container');

const totalCards = 12;

let pokeNumbers = [];

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
};

const getPokemonsToPlay = () => {
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
      card.dataset.pokeImage = '';
      card.dataset.pokeImage = '';
      card.style.setProperty('--poke-image', '');
      card.style.setProperty('--poke-image', '');
    }
  });

  cardA = null;
  cardB = null;
  canPlay = true;
};

const checkCardsSelected = card => {
  if (card.dataset.win) return;
  if (!cardA) cardA = card;
  else if (!cardB) cardB = card;
  if (!cardA || !cardB) return;
  const pokeNumberA = cardA.dataset.pokeImage;
  const pokeNumberB = cardB.dataset.pokeImage;
  canPlay = false;
  if (pokeNumberA === pokeNumberB) {
    console.log('CORRECT');
    cardA.dataset.win = true;
    cardB.dataset.win = true;
  } else {
    console.log('NOP');
  }
  setTimeout(hideCards, 500);
};

const showCard = event => {
  const card = event.target.closest('.card'); // Buscar el ancestro que tenga la clase 'card'
  if (!card || !canPlay) return; // Si no clicaste en un .card, nos vamos

  card.classList.add('card-show');

  const index = [...gameContainerElement.children].indexOf(card);
  const pokeImage = `url(../assets/images/${pokeNumbers[index]}.png)`;
  card.style.setProperty('--poke-image', pokeImage);
  card.dataset.pokeImage = pokeNumbers[index];

  checkCardsSelected(card);
};

getPokemonsToPlay();

gameContainerElement.addEventListener('click', showCard);
