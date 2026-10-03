// ================================
// CLOUD MEMORY
// ================================

const symbols = [
  "☁️",
  "⭐",
  "🌙",
  "☀️",
  "🌸",
  "🦋"
];

const quotes = [
  "you don't have to have everything figured out today.",
  "little steps still count.",
  "you deserve good things, even on ordinary days.",
  "there is no rush to become who you're meant to be.",
  "you are allowed to take up space and be yourself.",
  "today doesn't have to be perfect to be a good day.",
  "something good might be closer than you think.",
  "you've made it through every hard day you've faced so far.",
  "your best can look different every day, and that's okay.",
  "you are more than one bad day.",
  "it's okay to slow down and enjoy where you are.",
  "there's still so much ahead of you."
];

let sequence = [];
let playerIndex = 0;
let clouds = Number(localStorage.getItem("clouds")) || 0;


// ================================
// CLOUD COUNT + YOUR SKY
// ================================

function updateCloudCount() {
  document.getElementById("siteCloudCount").textContent = clouds;
  document.getElementById("cloudCount").textContent = clouds;
  document.getElementById("skyCloudCount").textContent = clouds;

  updateSky();
}

function updateSky() {
  const skyDisplay = document.getElementById("skyDisplay");

  if (!skyDisplay) return;

  skyDisplay.innerHTML = "";

  const positions = [
    [12, 20],
    [42, 12],
    [72, 24],
    [25, 55],
    [58, 48],
    [82, 62],
    [8, 72],
    [38, 78],
    [68, 78],
    [88, 18],
    [55, 28],
    [18, 38]
  ];

  for (let i = 0; i < clouds; i++) {
    const cloud = document.createElement("button");

    cloud.className = "sky-cloud";
    cloud.textContent = "☁️";

    const position = positions[i % positions.length];

    cloud.style.left = position[0] + "%";
    cloud.style.top = position[1] + "%";

    cloud.addEventListener("click", function() {
      showQuote(i);
    });

    skyDisplay.appendChild(cloud);
  }
}

function showQuote(index) {
  const quoteText = document.getElementById("quoteText");
  const quoteOverlay = document.getElementById("quoteOverlay");

  const quote = quotes[index % quotes.length];

  quoteText.textContent = quote;
  quoteOverlay.style.display = "flex";
}

function closeQuote() {
  document.getElementById("quoteOverlay").style.display = "none";
}

document.getElementById("closeQuote").addEventListener(
  "click",
  closeQuote
);

document.getElementById("quoteOverlay").addEventListener(
  "click",
  function(event) {
    if (event.target === this) {
      closeQuote();
    }
  }
);


// ================================
// CLOUD MEMORY GAME
// ================================

function startGame() {
  document.getElementById("game").scrollIntoView({
    behavior: "smooth"
  });

  setTimeout(function() {
    nextRound();
  }, 500);
}

function nextRound() {
  playerIndex = 0;
  sequence = [];

  for (let i = 0; i < 3; i++) {
    let randomSymbol =
      symbols[Math.floor(Math.random() * symbols.length)];

    sequence.push(randomSymbol);
  }

  document.getElementById("message").textContent =
    "remember this...";

  document.getElementById("choices").innerHTML = "";

  document.getElementById("nextButton").style.display =
    "none";

  document.getElementById("sequence").textContent =
    sequence.join(" ");

  setTimeout(function() {

    document.getElementById("sequence").textContent = "";

    document.getElementById("message").textContent =
      "your turn ☁️";

    createChoices();

  }, 2000);
}

function createChoices() {
  const choices = document.getElementById("choices");

  choices.innerHTML = "";

  symbols.forEach(function(symbol) {

    const button = document.createElement("button");

    button.className = "choice";
    button.textContent = symbol;

    button.addEventListener("click", function() {
      chooseSymbol(symbol);
    });

    choices.appendChild(button);
  });
}

function chooseSymbol(symbol) {
  const message = document.getElementById("message");

  if (symbol === sequence[playerIndex]) {

    playerIndex++;

    if (playerIndex < 3) {

      message.textContent =
        playerIndex + " / 3 ✓";

    } else {

      // Add one cloud
      clouds++;

      localStorage.setItem("clouds", clouds);

      updateCloudCount();

      message.textContent =
        "you caught the cloud ☁️";

      document.getElementById("choices").innerHTML = "";

      document.getElementById("nextButton").style.display =
        "inline-block";
    }

  } else {

    message.textContent =
      "not quite — try that sequence again ☁️";

    playerIndex = 0;
  }
}

document.getElementById("playButton").addEventListener(
  "click",
  startGame
);

document.getElementById("nextButton").addEventListener(
  "click",
  nextRound
);


// ================================
// BETWEEN THE LINES
// ================================

const wordBank = [

  {
    word: "camera",

    clues: [
      "you use me to take pictures.",
      "you might have me on your phone.",
      "I have a lens."
    ],

    thought: "capture the moment."
  },

  {
    word: "headphones",

    clues: [
      "you put me over your ears.",
      "I can play music.",
      "you might wear me on the bus."
    ],

    thought: "make a little space for yourself."
  },

  {
    word: "music",

    clues: [
      "you listen to me.",
      "I can be loud or quiet.",
      "Spotify has a lot of me."
    ],

    thought: "let yourself feel it."
  },

  {
    word: "sunset",

    clues: [
      "you see me in the evening.",
      "the sky can turn orange or pink.",
      "I happen before nighttime."
    ],

    thought: "slow down and look up."
  },

  {
    word: "notebook",

    clues: [
      "I have pages.",
      "you can write in me.",
      "students use me at school."
    ],

    thought: "put it somewhere instead of keeping it in your head."
  },

  {
    word: "photograph",

    clues: [
      "you can take me with a camera.",
      "I might live in your camera roll.",
      "I show a moment from the past."
    ],

    thought: "some moments are worth keeping."
  },

  {
    word: "playlist",

    clues: [
      "I have songs in me.",
      "you can make me on Spotify.",
      "I can match your mood."
    ],

    thought: "there's a song for every mood."
  },

  {
    word: "candle",

    clues: [
      "I have a flame.",
      "I can smell nice.",
      "you might light me in your room."
    ],

    thought: "make ordinary moments feel a little warmer."
  },

  {
    word: "polaroid",

    clues: [
      "I take a picture.",
      "you can hold me in your hand.",
      "my picture develops after you take it."
    ],

    thought: "keep a little piece of today."
  },

  {
    word: "concert",

    clues: [
      "you hear music here.",
      "lots of people go.",
      "you see an artist perform."
    ],

    thought: "be here while it's happening."
  },

  {
    word: "postcard",

    clues: [
      "I usually have a picture on me.",
      "you can send me in the mail.",
      "someone might send me from a trip."
    ],

    thought: "somewhere is waiting for you."
  },

  {
    word: "bookstore",

    clues: [
      "I have lots of books.",
      "you can browse my shelves.",
      "you can buy something new to read here."
    ],

    thought: "take your time finding something you love."
  }

];

let currentWord = null;
let currentClue = 0;


// ================================
// START BETWEEN THE LINES
// ================================

function startWordGame() {

  document.getElementById("between-the-lines")
    .scrollIntoView({
      behavior: "smooth"
    });

  setTimeout(function() {

    // Show the game card
    document.querySelector(".word-card").style.display =
      "block";

    startNewWord();

  }, 500);
}


// ================================
// NEW WORD
// ================================

function startNewWord() {

  currentWord =
    wordBank[
      Math.floor(Math.random() * wordBank.length)
    ];

  currentClue = 0;

  document.getElementById("clueNumber").textContent =
    "clue 1 of 3";

  document.getElementById("clueText").textContent =
    currentWord.clues[0];

  document.getElementById("guessInput").value = "";

  document.getElementById("wordMessage").textContent =
    "";

  document.getElementById("startWordGame").style.display =
    "none";

  document.getElementById("nextClueButton").style.display =
    "inline-block";
}


// ================================
// CHECK GUESS
// ================================

function checkWord() {

  if (!currentWord) return;

  const input =
    document.getElementById("guessInput");

  const guess =
    input.value.trim().toLowerCase();

  if (!guess) return;

  if (guess === currentWord.word.toLowerCase()) {

    // Add one cloud
    clouds++;

    localStorage.setItem("clouds", clouds);

    // Update navbar + Your Sky
    updateCloudCount();

    showWordPopup();

  } else {

    document.getElementById("wordMessage").textContent =
      "not quite — try again.";

    input.select();
  }
}


// ================================
// NEXT CLUE
// ================================

function nextClue() {

  if (!currentWord) return;

  if (currentClue >= 2) {

    document.getElementById("wordMessage").textContent =
      "that's the last clue — take your best guess.";

    return;
  }

  currentClue++;

  document.getElementById("clueNumber").textContent =
    "clue " + (currentClue + 1) + " of 3";

  document.getElementById("clueText").textContent =
    currentWord.clues[currentClue];

  document.getElementById("wordMessage").textContent =
    "";
}


// ================================
// SKIP
// ================================

function skipWord() {
  startNewWord();
}


// ================================
// WORD POPUP
// ================================

function showWordPopup() {

  document.getElementById("revealedWord").textContent =
    currentWord.word;

  document.getElementById("wordThought").textContent =
    currentWord.thought;

  document.getElementById("wordOverlay").style.display =
    "flex";
}

function closeWordPopup() {

  document.getElementById("wordOverlay").style.display =
    "none";
}

function nextWord() {

  closeWordPopup();

  startNewWord();
}


// ================================
// BETWEEN THE LINES BUTTONS
// ================================

document.getElementById("startWordGame")
  .addEventListener(
    "click",
    startWordGame
  );

document.getElementById("guessButton")
  .addEventListener(
    "click",
    checkWord
  );

document.getElementById("nextClueButton")
  .addEventListener(
    "click",
    nextClue
  );

document.getElementById("skipButton")
  .addEventListener(
    "click",
    skipWord
  );

document.getElementById("nextWordButton")
  .addEventListener(
    "click",
    nextWord
  );

document.getElementById("closeWord")
  .addEventListener(
    "click",
    closeWordPopup
  );

document.getElementById("wordOverlay")
  .addEventListener(
    "click",
    function(event) {

      if (event.target === this) {
        closeWordPopup();
      }

    }
  );

document.getElementById("guessInput")
  .addEventListener(
    "keydown",
    function(event) {

      if (event.key === "Enter") {
        checkWord();
      }

    }
  );


// ================================
// INITIAL SETUP
// ================================

// Hide the Between the Lines card
// until "start playing" is clicked.

document.querySelector(".word-card").style.display =
  "none";

// Load saved clouds
updateCloudCount();