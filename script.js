// Please implement exercise logic here
/*####################
## HELPER FUNCTIONS ##
####################*/

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
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    // initialise variable suitSymbol
    let currentSymbol;

    // set suit symbol to match current suit
    if (currentSuit === 'hearts') {
        currentSymbol = '♥️';
    } else if (currentSuit === 'spades') {
        currentSymbol = '♠️';
    } else if (currentSuit === 'clubs') {
        currentSymbol = '♣️';
    } else {
        currentSymbol = '♦️';
    }

    // set the color of the card (used later to determine the css class which in turn determines the color)
    // does not directly set the color of the card
    let cardColor;
    if (currentSymbol === '♥️' || currentSymbol === '♦️' ) {
        cardColor = 'red';
    } else {
        cardColor = 'black';
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'A';
      } else if (cardName === '11') {
        cardName = 'J';
      } else if (cardName === '12') {
        cardName = 'Q';
      } else if (cardName === '13') {
        cardName = 'K';
      }

      // Create a new card with the current name, suit, suit symbol, display name colour and rank
      const cardInfo = {
        suitSymbol: currentSymbol,
        suit: currentSuit,
        name: cardName,
        color: cardColor,
        rank: rankCounter,
        };
      // Add the new card to the deck
      newDeck.push(cardInfo);
    }
  }

  // Return the completed card deck
  return newDeck;
};

// build the card display 
const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit', cardInfo.color);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add(cardInfo.name, cardInfo.color);
  name.innerText = cardInfo.name;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// helper function for getting and displaying player cards
const displayPlayerHand = (playerCard, numCards, playerHand, playerHandElements, cardContainer) => {
  if (playerHand.length <= numCards) {
    
    const cardElement = createCard(playerCard);
    playerHandElements.push(cardElement);

    cardContainer.appendChild(cardElement);
  } 
}

// helper function for getting the highest ranking card 
const getHighCard = (playerHand, numCards) => {
  console.log(playerHand.length);
  console.log(numCards);
  if ( playerHand.length === numCards) {
    const cardRanks = [];
    playerHand.forEach((card) => {
      cardRanks.push(card.rank);
    })
    cardRanks.sort((a, b) => a - b); 
    const playerHighCard = cardRanks[cardRanks.length - 1];                                                                                                           

    return playerHighCard;
  }
}

const determineAndDisplayWinner = (player1Hand, player2Hand, numCards, player1HighCard, player2HighCard) => {
  if (player1Hand.length === numCards && player2Hand.length === numCards) {
    // highest card win
    if (player1HighCard > player2HighCard) {
      output('player 1 wins, enter number of cards');
    } else if (player2HighCard > player1HighCard) {
      output('player 2 wins, enter number of cards');
    } else {
      output('tie, enter number of cards');
    }
    inputField.value = '';
  }
}

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

/*####################
## GLOBAL VARIABLES ##
####################*/
const deck = shuffleCards(makeDeck());

let playersTurn = 1; // matches with starting instructions
let numCards;
let player1Hand = [];
let player1HandElements = [];
let cardContainer1;
let player1HighCard;
let player2Hand = [];
let player2HandElements = [];
let cardContainer2;
let player2HighCard;

// elements for user input
const inputContainer = document.createElement('div');
const inputLabel = document.createElement('label');
const inputField = document.createElement('input');
const inputButton = document.createElement('button');

const player1Button = document.createElement('button');

const player2Button = document.createElement('button');

const gameInfo = document.createElement('div');


/* ##########################
## PLAYER ACTION CALLBACKS ##
###########################*/
const inputBtnClick = () => {
  // clear relevant data from the previous game
  cardContainer1.innerText = '';
  cardContainer2.innerText = '';
  player1Hand = [];
  player1HandElements = [];
  player2Hand = [];
  player2HandElements = [];
  output('anyone\'s turn');
  numCards = Number(document.querySelector('.input-field').value);
    return numCards;
}

const player1Click = () => {
  // get player's card from deck
  const playerCard = deck.pop();
  // add card to player's current hand
  player1Hand.push(playerCard);
  // call the function that displays the player's card
  displayPlayerHand(playerCard, numCards, player1Hand, player1HandElements, cardContainer1);
  // call the function that finds the highest rank of all the player's cards 
  player1HighCard = getHighCard(player1Hand, numCards);
  // call the function that will determine the winner based on who has the highest ranking card
  // if all cards have been drawn 
  determineAndDisplayWinner(player1Hand, player2Hand, numCards, player1HighCard, player2HighCard);
};

const player2Click = () => {
  const playerCard = deck.pop();
  player2Hand.push(playerCard);
  displayPlayerHand(playerCard, numCards, player2Hand, player2HandElements, cardContainer2);
  player2HighCard = getHighCard(player2Hand, numCards);
  determineAndDisplayWinner(player1Hand, player2Hand, numCards, player1HighCard, player2HighCard);
};

/*#######################
## GAME INITIALISATION ##
#######################*/
const initGame = () => {
    // container for player 1's cards
    cardContainer1 = document.createElement('div');
    cardContainer1.classList.add('card-container');
    document.body.appendChild(cardContainer1);

    // container for player 2's cards
    cardContainer2 = document.createElement('div');
    cardContainer2.classList.add('card-container');
    document.body.appendChild(cardContainer2);

    // initialize button functionality
    player1Button.innerText = 'Player 1 Draw';
    document.body.appendChild(player1Button);

    player2Button.innerText = 'Player 2 Draw';
    document.body.appendChild(player2Button);

    player1Button.addEventListener('click', player1Click);
    player2Button.addEventListener('click', player2Click);

    // fill game info div with starting instructions
    gameInfo.innerText = 'enter number of players and click submit';
    document.body.appendChild(gameInfo);

    // input field for number of players
    inputLabel.classList.add('input-label');
    inputLabel.innerText = 'Number of cards: ';
    inputContainer.appendChild(inputLabel);
    inputField.classList.add('input-field');
    inputContainer.appendChild(inputField);
    inputButton.classList.add('input-button');
    inputButton.innerText = 'submit';
    inputButton.addEventListener('click', inputBtnClick);
    inputContainer.appendChild(inputButton);
    inputContainer.classList.add('input-container');
    document.body.appendChild(inputContainer);
};

//############################################################

// call the function that will initialise gameplay
initGame();