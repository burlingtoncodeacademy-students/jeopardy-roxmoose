// DEFINING VARIABLES / Retrieving all the elements:
let activePlayer = document.getElementById("active-player"); // Active player's name element
let p1score = document.getElementById("p1score"); // Player 1 score element
let p2score = document.getElementById("p2score"); // Player 2 score element
let guessButton = document.getElementById("guess-button"); // Guess Button
let passButton = document.getElementById("pass-button"); // Pass Button
let grid = document.getElementById("grid");
let activeID = ""; // ID of current (active) card (string)
let roundTimer = document.getElementById("round-timer");
let roundTimerCount = 300; // eventually switch to min+sec
let turnTimer = document.getElementById("turn-timer");
let turnTimerCount = 10; // 5 seconds is too quick for me!
let shadowTurnTimerCount = turnTimerCount; // so the timer can be disrupted
let form = document.getElementById("form"); // the guess form
let userInput = document.getElementById("guess"); // player's guess
let cardValue = 0;
let correctAnswer = "";
let gridEventCount = 0;

/********************************************************************************************/
// ACTIONS:

// Starting out with buttons disabled, Player 1 up, and the round countdown starting:
activePlayer.textContent = "Player 1";
guessButton.disabled = true;
passButton.disabled = true;
p1score.value = 0; // maybe not necessary
p2score.value = 0; // maybe not necessary
roundCountdown();

// Event listener for when a card is clicked on:
grid.addEventListener("click", (event) => {
  gridEventCount += 1; // this is how I'm going to figure out if all 30 tiles have been clicked (and thus redirect to the next round)
  console.log("gridEventCount: ", gridEventCount);
  // activeID = the ID of the clicked card"
  activeID = event.target.id; // e.g. 010101
  console.log("card ID: ", activeID);
  // Takes the card ID from html page:
  getQuestion(activeID);
  // Wardrobe change:
  event.target.style.backgroundColor = "black";
  event.target.style.fontFamily = "Gill Sans";
  event.target.style.fontSize = "14px";
  event.target.style.fontWeight = "normal";
  grid.style.pointerEvents = "none"; // to stop player from clicking again. HEY this was working and now not?! Only works the first time around it seems....
  // Enable guess and pass buttons:
  guessButton.disabled = false;
  passButton.disabled = false;
  // Start turn timer:
  turnCountdown();

  // NEXT: event listener for when user submits an answer (clicks "GUESS" button):
  form.addEventListener("submit", (event2) => {
    event2.preventDefault();
    stopTurnTimer();
    grid.style.pointerEvents = "auto"; // allows cards to be clicked again if not already allowed
    console.log("activeID: ", activeID);
    correctAnswer = getAnswer(activeID); // returns the correct answer of the active card as a string, e.g.: Denmark
    cardValue = getValue(activeID); // returns the value of the active card as a number, e.g.: 100
    console.log("cardValue: ", cardValue);

    // If answer is correct, active player's score increases by the card's value and they get to go again.
    // If answer is incorrect, active player's score decreases by the card's value and active player switches.
    // Bug: the second+ time around, even if answer is correct, program runs if's for both correct and incorrect answer so the score cancels out. and other weird things happen too. LOOKS LIKE with each new tile click, it's holding onto all previous answers. (so the second time around, if the input field was cleared (say it was originally correct), it'll check the most recent input AND the cleared input, so it'll see correct + incorrect and card value will be added then subtracted. And if the input field was not cleared, it'll see correct + correct and will add the card value twice). ALSO LOOKS LIKE event.target still refers to the first clicked card even though activeID changes.  
    if (
      userInput.value === correctAnswer &&
      activePlayer.textContent === "Player 1"
    ) {
      console.log("1");
      console.log("userInput.value: ", userInput.value);
      console.log("p1score.value: ", p1score.value);
      p1score.value += cardValue;
      console.log("p1score.value after addition: ", p1score.value);
      p1score.textContent = p1score.value;
      console.log("p1score.textContent: ", p1score.textContent);
      console.log("event.target.textContent in 1: ", event.target.textContent);
      event.target.textContent = ""; // clear the card
      console.log(
        "event.target.textContent in 1 after clear: ",
        event.target.textContent
      );
    } else if (
      userInput.value !== correctAnswer &&
      activePlayer.textContent === "Player 1"
    ) {
      console.log("2");
      console.log("userInput.value: ", userInput.value);
      console.log("p1score.value: ", p1score.value);
      p1score.value -= cardValue;
      console.log("p1score.value after subtraction: ", p1score.value);
      p1score.textContent = p1score.value;
      activePlayer.textContent = "Player 2";
    } else if (
      userInput.value === correctAnswer &&
      activePlayer.textContent === "Player 2"
    ) {
      console.log("3");
      p2score.value += cardValue;
      p2score.textContent = p2score.value;
      console.log("event.target.textContent in 3: ", event.target.textContent);
      event.target.textContent = ""; // clear the card
      console.log(
        "event.target.textContent in 3 after clear: ",
        event.target.textContent
      );
    } else if (
      userInput.value !== correctAnswer &&
      activePlayer.textContent === "Player 2"
    ) {
      console.log("4");
      p2score.value -= cardValue;
      p2score.textContent = p2score.value;
      activePlayer.textContent = "Player 1";
    } else {
      console.log("why are we here?");
    } // end if statement

    // When all tiles have been clicked (grid event listener has been called 30 times), redirect to Final Jeopardy
    if (gridEventCount === 30) {
      document.location =
        "./final-jeopardy.html#" + p1score.value + "," + p2score.value;
    }
    userInput.value = ""; // clear the submission box. 
  }); // end event2 function
  

  // Event listener for when user clicks PASS button:
  passButton.addEventListener("click", (event3) => {
    // what should happen: If it's the first time Pass is clicked for that card: 1) active player changes to other player and 2) the turn timer starts again. If it's the second time Pass is clicked for that card: 1) alert pops up with the correct answer, 2) card goes blank, and 3) activePlayer returns to the first player to pass. // But I haven't figured out how to do all that yet so for now it just lets them each click Pass back and forth as many times as they want...
    event3.preventDefault();
    if (activePlayer.textContent === "Player 1") {
      activePlayer.textContent = "Player 2";
    } else {
      activePlayer.textContent = "Player 1";
    }
    stopTurnTimer(); // stops the current turn timer (if I restart the turn timer without this it acts weird)
    turnCountdown(); // restarts turn timer
  }); // end event3 function
}); // end event 1 function

/* ****************************************************************************************************/
// ALL FUNCTIONS AND DATA THAT ARE REFERRED TO:

// function for round timer:
function roundCountdown() {
  roundTimer.textContent = roundTimerCount;
  if (roundTimerCount <= 0) {
    // alert("ROUND OVER"); // I want a pop-up to make users read it (probably change language here), then they should click ok (or something) and be brought to Double Jeopardy. but for now...just redirect
    // document.location = "./round-2.html#" + p1score.value + "," + p2score.value // this will be the redirect but want to make sure i can do the final jeopardy stories first
    document.location =
      "./final-jeopardy.html#" + p1score.value + "," + p2score.value;
  }
  roundTimerCount = roundTimerCount - 1;

  setTimeout(roundCountdown, 1000);
}

// function for turn timer:
function turnCountdown() {
  turnTimer.textContent = turnTimerCount;
  if (turnTimerCount <= 0) {
    // when turn timer hits 0
    // things that need to be done when the timer runs out (before the player hits guess or pass)
    // 1: score is changed (maybe?):
    //// commenting out for now while I work on other things:
    // 2: active player is changed (if player 1 then now player 2 and vice versa)""
    if (activePlayer.textContent === "Player 1") {
      activePlayer.textContent = "Player 2";
    } else activePlayer.textContent = "Player 1";

    // 3: timer goes back to 10:
    turnTimerCount = 10;
    turnTimer.textContent = "10";

    // 4: grid becomes clickable again
    grid.style.pointerEvents = "auto"; // allows cards to be clicked again

    return; // prevents the timer from restarting after running out. have to think about what happens next...i guess if the player was the first to try to answer the question and the timer ran out, that's akin to passing, and it'd go to the next player, and the timer would restart at 10 right away. But if the timer ran out on the same question for the second player, then what? (same question for if second player hits Pass)
  }

  if (shadowTurnTimerCount === "reset") {
    shadowTurnTimerCount = "";
    process.exit(); // I'm getting a console error here but it still works? and without it, the timer restarts after stopTurnTimer() is called. I guess I should find another way to prevent the timer from restarting that doesn't involve an error....maybe this is what's messing other things up tho I don't think so.
  }

  turnTimerCount = turnTimerCount - 1;
  setTimeout(turnCountdown, 1000);
}

// Function to stop the Turn Timer
function stopTurnTimer() {
  turnTimerCount = 10;
  shadowTurnTimerCount = "reset";
  turnTimer.textContent = 10;
}

// a function to search Q&A collection below - search card ID and get question
function getQuestion(ID) {
  // spits out true or false for every object (true if ID is included):
  function checkIDs(item) {
    return item.cardID.includes(ID);
  }

  // gets the object(s) that match the ID:
  let matchedItems = cards.filter(checkIDs);

  // Prints the card's question
  matchedItems.forEach((card) => {
    event.target.textContent = card.question;
  });
}

// a function to search Q&A collection - search card ID and get value
function getValue(ID) {
  // spits out true or false for every object (true if ID is included):
  function checkIDs(item) {
    return item.cardID.includes(ID);
  }

  // gets the object(s) that match the ID:
  let matchedItems = cards.filter(checkIDs); // takes all objects with matching ID (based on "true" output from checkIDs)

  let value; // makes a variable for the main function's output

  // Prints the card's value
  matchedItems.forEach((card) => {
    value = card.value;
  });

  return value; // main function's output, in number format (e.g. 100)
}

// Function to search Q&A collection for card ID and get answer
function getAnswer(ID) {
  // spits out true or false for every object (true if ID is included):
  function checkIDs(item) {
    return item.cardID.includes(ID);
  }

  // gets the object(s) that match the ID:
  let matchedItems = cards.filter(checkIDs); // the whole object

  let answer; // makes a variable for the main function's output

  // Prints the card's answer:
  matchedItems.forEach((card) => {
    answer = card.answer; // I confirmed this would come out as the correct answer, as a string (e.g.: Denmark)
  });

  return answer; // main function's output, in string format (e.g. Denmark)
}

/********************************************************************************************/
// questions & answer collection:
let cards = [
  // Category 1 (column 1, so ID 01XX01)
  {
    cardID: "010101",
    question:
      "This country of 16,600 square miles has a possession that's more than 50 times as large",
    answer: "Denmark",
    value: 100,
  },
  {
    cardID: "010201",
    question: "question",
    answer: "answer",
    value: 200,
  },
  {
    cardID: "010301",
    question: "question",
    answer: "answer",
    value: 300,
  },
  {
    cardID: "010401",
    question: "question",
    answer: "answer",
    value: 400,
  },
  {
    cardID: "010501",
    question: "question",
    answer: "answer",
    value: 500,
  },

  // Category 2 (column 2, so ID 01XX02)
  {
    cardID: "010102",
    question: "The brown type of this is Louisiana's state bird",
    answer: "pelican",
    value: 100,
  },
  {
    cardID: "010202",
    question: "question",
    answer: "answer",
    value: 200,
  },
  {
    cardID: "010302",
    question: "question",
    answer: "answer",
    value: 300,
  },
  {
    cardID: "010402",
    question: "question",
    answer: "answer",
    value: 400,
  },
  {
    cardID: "010502",
    question: "question",
    answer: "answer",
    value: 500,
  },

  // Category 3 (column 3, so ID 01XX03)
  {
    cardID: "010103",
    question: "question",
    answer: "answer",
    value: 100,
  },
  {
    cardID: "010203",
    question: "question",
    answer: "answer",
    value: 200,
  },
  {
    cardID: "010303",
    question: "question",
    answer: "answer",
    value: 300,
  },
  {
    cardID: "010403",
    question: "question",
    answer: "answer",
    value: 400,
  },
  {
    cardID: "010503",
    question: "question",
    answer: "answer",
    value: 500,
  },
  // Category 4 (column 4, so ID 01XX04)
  {
    cardID: "010104",
    question: "question",
    answer: "answer",
    value: 100,
  },
  {
    cardID: "010204",
    question: "question",
    answer: "answer",
    value: 200,
  },
  {
    cardID: "010304",
    question: "question",
    answer: "answer",
    value: 300,
  },
  {
    cardID: "010404",
    question: "question",
    answer: "answer",
    value: 400,
  },
  {
    cardID: "010504",
    question: "question",
    answer: "answer",
    value: 500,
  },
  // Category 5 (column 5, so ID 01XX05)
  {
    cardID: "010105",
    question: "question",
    answer: "answer",
    value: 100,
  },
  {
    cardID: "010205",
    question: "question",
    answer: "answer",
    value: 200,
  },
  {
    cardID: "010305",
    question: "question",
    answer: "answer",
    value: 300,
  },
  {
    cardID: "010405",
    question: "question",
    answer: "answer",
    value: 400,
  },
  {
    cardID: "010505",
    question: "question",
    answer: "answer",
    value: 500,
  },

  // Category 6 (column 6, so ID 01XX06)
  {
    cardID: "010106",
    question: "question",
    answer: "answer",
    value: 100,
  },
  {
    cardID: "010206",
    question: "question",
    answer: "answer",
    value: 200,
  },
  {
    cardID: "010306",
    question: "question",
    answer: "answer",
    value: 300,
  },
  {
    cardID: "010406",
    question: "question",
    answer: "answer",
    value: 400,
  },
  {
    cardID: "010506",
    question: "question",
    answer: "answer",
    value: 500,
  },
];
