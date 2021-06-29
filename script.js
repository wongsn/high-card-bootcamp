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
const getAndDisplayPlayerHand = (playerHand, playerHandElements, cardContainer) => {
  // getting card data of player 1's hand
  // this could be any number, does not specifically have to be 3
  for (let i = 0; i < 3; i += 1) {
    playerHand.push(deck.pop());
  }

  // creating the display of player 1's hand from card data in player1Hand
  playerHand.forEach((card) => {
    const element = createCard(card);
    playerHandElements.push(element);
  })
  
  // Append the card elements to the card container
  playerHandElements.forEach((element) => {
    cardContainer.appendChild(element);
  })

  return playerHandElements;
}

// helper function for getting card difference
const getCardDifference = (playerHand) => {
  const rankArray = [];
  playerHand.forEach((card) => {
    rankArray.push(card.rank);
  })
  // sorts array according to ascending order
  rankArray.sort((a, b) => a - b);
  console.log(rankArray);
  const cardDifference = rankArray[2] - rankArray[0];
  console.log(cardDifference);

  return cardDifference;
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
let player1Hand = [];
let player1HandElements = [];
let cardContainer1;
let cardDifference1;
let player2Hand = [];
let player2HandElements = [];
let cardContainer2;

const player1Button = document.createElement('button');

const player2Button = document.createElement('button');

const gameInfo = document.createElement('div');


/* ##########################
## PLAYER ACTION CALLBACKS ##
###########################*/
const player1Click = () => {
  if (playersTurn === 1) {
    // Empty cardContainer in case this is not the 1st round of gameplay
    cardContainer1.innerHTML = '';
    cardContainer2.innerHTML = '';

    // call the function that will get and display player 1's hand
    getAndDisplayPlayerHand(player1Hand, player1HandElements, cardContainer1);
    cardDifference1 = getCardDifference(player1Hand);
    playersTurn = 2;
    gameInfo.innerText = 'Player 2\'s turn';
  }
};

const player2Click = () => {
  if (playersTurn === 2) {
    getAndDisplayPlayerHand(player2Hand, player2HandElements, cardContainer2);
    const cardDifference2 = getCardDifference(player2Hand);

    // logic that determines winner. Bigger cardDifference wins
    if (cardDifference1 > cardDifference2) {
      output('player 1 wins');
    } else if (cardDifference2 > cardDifference1) {
      output('player 2 wins');
    } else {
      output('tie');
    }

    // Switch to player 1's turn
    playersTurn = 1;
  }
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
    gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
    document.body.appendChild(gameInfo);
};

//############################################################

// call the function that will initialise gameplay
initGame();