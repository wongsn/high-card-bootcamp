// High Card is a card game where each player
// draws a random card, and the player with the highest card wins.

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['diamonds', 'clubs', 'hearts', 'spades'];
  const suitSymbol = ['♦', '♣', '♥', '♠'];
  const colour = ['red', 'black'];
  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    const currentSuitSymbol = suitSymbol[suitIndex];
    const currentColour = colour[suitIndex % 2];
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let display = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        display = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        display = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        display = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        display = 'K';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        suitSymbol: currentSuitSymbol,
        suit: currentSuit,
        name: cardName,
        displayName: display,
        colour: currentColour,
        rank: rankCounter,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

let deck = shuffleCards(makeDeck());

const inputContainer = document.createElement('div');
inputContainer.classList.add('input-container');
document.body.appendChild(inputContainer);

const player1Button = document.createElement('button');
player1Button.innerText = 'Player 1 Draw';
inputContainer.appendChild(player1Button);

const inputNum = document.createElement('input');
inputNum.setAttribute('id', 'input');
inputNum.setAttribute('type', 'number');
inputNum.setAttribute('min', '2');
inputNum.setAttribute('max', '26');
inputContainer.appendChild(inputNum);

const player2Button = document.createElement('button');
player2Button.innerText = 'Player 2 Draw';
inputContainer.appendChild(player2Button);

const gameInfo = document.createElement('div');
gameInfo.classList.add('gameInfo');
gameInfo.innerText = 'Input a number, and click on player to start game.';
inputContainer.appendChild(gameInfo);

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

const createCardFromArray = (playerHand, player) => {
  const rankArray = [];
  for (let i = 0; i < playerHand.length; i += 1) {
    rankArray[i] = playerHand[i].rank;
  }
  const maxRank = Math.max(...rankArray);
  const minRank = Math.min(...rankArray);

  for (let j = 0; j < playerHand.length; j += 1) {
    const suit = document.createElement('div');
    suit.classList.add('suit', playerHand[j].colour);
    suit.innerHTML = playerHand[j].suitSymbol;

    const name = document.createElement('div');
    name.classList.add('name', playerHand[j].colour);
    name.innerText = playerHand[j].displayName;

    if (j === rankArray.indexOf(maxRank) || j === rankArray.indexOf(minRank)) {
      const card = document.createElement('div');
      card.classList.add('highlight');

      card.appendChild(name);
      card.appendChild(suit);

      player.appendChild(card);
    } else {
      const card = document.createElement('div');
      card.classList.add('card');

      card.appendChild(name);
      card.appendChild(suit);

      player.appendChild(card);
    }
  }
};

const cardContainer = document.createElement('div');
cardContainer.classList.add('card-container');
const player1Container = document.createElement('div');
player1Container.classList.add('player-1-hand');
cardContainer.appendChild(player1Container);
const player2Container = document.createElement('div');
player2Container.classList.add('player-2-hand');
cardContainer.appendChild(player2Container);
document.body.insertBefore(cardContainer, inputContainer);

// Player 1 starts first
let playersTurn = 0;
let player1Hand = [];
let player2Hand = [];

// Use let for player1Card object because player1Card will be reassigned
let player1Card;
let player2Card;

const highestDiff = (playerHand) => {
  const rankArray = [];
  for (let i = 0; i < playerHand.length; i += 1) {
    rankArray[i] = playerHand[i].rank;
  }
  const max = Math.max(...rankArray);
  const min = Math.min(...rankArray);

  return max - min;
};

const reset = () => {
  player1Hand = [];
  player2Hand = [];
  deck = shuffleCards(makeDeck());
};

const endGame = () => {
  // Determine and output winner
  if (highestDiff(player1Hand) > highestDiff(player2Hand)) {
    const winningDiff = highestDiff(player1Hand);
    output(`Player 1 wins, with a card difference of ${winningDiff}.`);
    gameInfo.innerHTML += '<br>Click to play again';
    document.getElementById('input').disabled = false;
    setTimeout(reset, 1000);
  } else if (highestDiff(player1Hand) < highestDiff(player2Hand)) {
    const winningDiff = highestDiff(player2Hand);
    output(`Player 2 wins, with a card difference of ${winningDiff}.`);
    gameInfo.innerHTML += '<br>Click to play again';
    document.getElementById('input').disabled = false;
    setTimeout(reset, 1000);
  } else {
    output('Tie!');
    gameInfo.innerHTML += '<br>Click to play again';
    document.getElementById('input').disabled = false;
    setTimeout(reset, 1000);
  }
};

const player1Click = () => {
  // eslint-disable-next-line prefer-const
  const inputCards = document.getElementById('input');
  // eslint-disable-next-line prefer-const
  const cardsToBeDrawn = inputCards.value;
  console.log(cardsToBeDrawn);

  if (cardsToBeDrawn == 0) {
    output('Input number of cards to be drawn');
  } else if (playersTurn === 0) {
    output('Player 1 draws...');
    document.getElementById('input').disabled = true;
    player1Container.innerText = '';
    player2Container.innerText = '';
    // Pop player 1's card metadata from the deck
    for (let i = 0; i < cardsToBeDrawn; i += 1) {
      player1Card = deck.pop();
      player1Hand[i] = player1Card;
    }
    createCardFromArray(player1Hand, player1Container);
    // Switch to player 2's turn
    playersTurn = 2;
  } else if (playersTurn === 1) {
    // Pop player 1's card metadata from the deck
    for (let j = 0; j < cardsToBeDrawn; j += 1) {
      player1Card = deck.pop();
      player1Hand[j] = player1Card;
    }
    createCardFromArray(player1Hand, player1Container);
    playersTurn = 0;
    endGame();
  }
};

const player2Click = () => {
  // eslint-disable-next-line prefer-const
  const inputCards = document.getElementById('input');
  // eslint-disable-next-line prefer-const
  const cardsToBeDrawn = inputCards.value;
  console.log(cardsToBeDrawn);

  if (cardsToBeDrawn == 0) {
    output('Input number of cards to be drawn');
  } else if (playersTurn === 0) {
    output('Player 2 draws...');
    document.getElementById('input').disabled = true;
    player1Container.innerText = '';
    player2Container.innerText = '';
    // Pop player 2's card metadata from the deck
    for (let i = 0; i < cardsToBeDrawn; i += 1) {
      player2Card = deck.pop();
      player2Hand[i] = player2Card;
    }
    createCardFromArray(player2Hand, player2Container);
    // Switch to player 1's turn
    playersTurn = 1;
  } else if (playersTurn === 2) {
    // Pop player 2's card metadata from the deck
    for (let j = 0; j < cardsToBeDrawn; j += 1) {
      player2Card = deck.pop();
      player2Hand[j] = player2Card;
    }
    createCardFromArray(player2Hand, player2Container);
    playersTurn = 0;
    endGame();
  }
};

player1Button.addEventListener('click', player1Click);
player2Button.addEventListener('click', player2Click);
