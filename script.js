// High Card is a card game where each player draws a
// random card, and the player with the highest card wins.

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

// Player 1 starts first
let playersTurn = 0;

// Use let for player1Card object because player1Card will be reassigned
let player1Card;
const player1Hand = [];
let player2Card;
const player2Hand = [];

const player1DrawButton = document.createElement('button');
player1DrawButton.id = 'p1draw';
player1DrawButton.innerText = 'P1 Draw';
document.body.appendChild(player1DrawButton);
const player1StandButton = document.createElement('button');
player1StandButton.innerText = 'P1 Stand';
document.body.appendChild(player1StandButton);

const player2DrawButton = document.createElement('button');
player2DrawButton.id = 'p2draw';
player2DrawButton.innerText = 'P2 Draw';
document.body.appendChild(player2DrawButton);

const player2StandButton = document.createElement('button');
player2StandButton.innerText = 'P2 Stand';
document.body.appendChild(player2StandButton);

const gameInfo = document.createElement('div');
gameInfo.classList.add('gameInfo');
gameInfo.innerText = 'It\'s either player\'s turn. Click to draw a card!';
document.body.appendChild(gameInfo);

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerHTML = message;
};

const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit', cardInfo.colour);
  suit.innerHTML = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add('name', cardInfo.colour);
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

const cardContainer = document.createElement('div');
cardContainer.classList.add('card-container');
const player1Container = document.createElement('div');
player1Container.classList.add('player-1-hand');
cardContainer.appendChild(player1Container);
const player2Container = document.createElement('div');
player2Container.classList.add('player-2-hand');
cardContainer.appendChild(player2Container);
document.body.insertBefore(cardContainer, player1DrawButton);

const player1Draw = () => {
  output('Player 1 draws');
  // Pop player 1's card metadata from the deck
  if (deck.length === 0) {
    deck = shuffleCards(makeDeck());
  }

  player1Card = deck.pop();
  player1Hand.push(player1Card);
  // Create card element from card metadata
  const cardElement = createCard(player1Card);
  // Append the card element to the card container
  player1Container.appendChild(cardElement);
};

const player2Draw = () => {
  output('Player 2 draws');

  player2Card = deck.pop();
  player2Hand.push(player2Card);
  // Create card element from card metadata
  const cardElement = createCard(player2Card);
  // Append the card element to the card container
  cardContainer.appendChild(cardElement);
};

const highestDiff = (playerHand) => {
  const rankArray = [];
  for (let i = 0; i < playerHand.length; i += 1) {
    rankArray[i] = playerHand[i].rank;
  }
  const max = Math.max(...rankArray);
  const min = Math.min(...rankArray);

  return max - min;
};

const endGame = () => {
  // Determine and output winner
  if (highestDiff(player1Hand) > highestDiff(player2Hand)) {
    const winningDiff = highestDiff(player1Hand);
    // player1Hand = [];
    // player2Hand = [];
    output(`Player 1 wins, with a card difference of ${winningDiff}.`);
    gameInfo.innerHTML += '<br>Click to play again';
  } else if (highestDiff(player1Hand) < highestDiff(player2Hand)) {
    const winningDiff = highestDiff(player2Hand);
    // player1Hand = [];
    // player2Hand = [];
    output(`Player 2 wins, with a card difference of ${winningDiff}.`);
    gameInfo.innerHTML += '<br>Click to play again';
  } else {
    // player1Hand = [];
    // player2Hand = [];
    output('Tie!');
    gameInfo.innerHTML += '<br>Click to play again';
  }
};

const player1Stand = () => {
  if (playersTurn === 0) {
    playersTurn = 1;
    document.getElementById('p1draw').disabled = true;
    // disable hit and wait
  } if (playersTurn === 2) {
    document.getElementById('p1draw').disabled = true;
    endGame();
  }
};

const player2Stand = () => {
  if (playersTurn === 0) {
    playersTurn = 2;
    document.getElementById('p2draw').disabled = true;
    // disable hit and wait
  } if (playersTurn === 1) {
    document.getElementById('p2draw').disabled = true;
    endGame();
  }
};

player1DrawButton.addEventListener('click', player1Draw);
player2DrawButton.addEventListener('click', player2Draw);

player1StandButton.addEventListener('click', player1Stand);
player2StandButton.addEventListener('click', player2Stand);
