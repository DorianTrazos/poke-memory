const gameContainerElement = document.getElementById('game-container');

const totalCards = 12;

let pokeNumbers = [];

const getRandomNumber = (max = 150) => Math.floor(Math.random() * max + 1);

const createGameBoard = () => {
  gameContainerElement.textContent = '';
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < totalCards; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    card.append(cardFront);
    const pokeImage = `url(../assets/images/${pokeNumbers[i]}.png)`;
    cardFront.style.setProperty('--poke-image', pokeImage);
    // const cardBack = document.createElement('div');
    // cardBack.classList.add('card-back');
    // card.append(cardBack);
    fragment.append(card);
  }

  gameContainerElement.append(fragment);
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

getPokemonsToPlay();

gameContainerElement.addEventListener('click', event => {
  const card = event.target.closest('.card'); // Buscar el ancestro que tenga la clase 'card'
  if (!card) return; // Si no clicaste en un .card, nos vamos

  const index = [...gameContainerElement.children].indexOf(card);
  console.log(index);
});
