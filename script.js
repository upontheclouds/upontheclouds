/* =========================
   UP ON THE CLOUDS
   ========================= */


/* =========================
   CLOUDS + STARS
   ========================= */

let clouds =
  Number(localStorage.getItem("clouds")) || 0;

let stars =
  Number(localStorage.getItem("stars")) || 0;


/* =========================
   CLOUD MEMORY
   ========================= */

const symbols = [
  "☁️",
  "⭐",
  "🌙",
  "☀️",
  "🌸",
  "🦋"
];

let sequence = [];
let userSequence = [];
let round = 0;
let showingSequence = false;


const sequenceElement =
  document.getElementById("sequence");

const choicesElement =
  document.getElementById("choices");

const messageElement =
  document.getElementById("message");


function randomSymbol() {

  return symbols[
    Math.floor(
      Math.random() * symbols.length
    )
  ];

}


function nextRound() {

  sequence = [
    randomSymbol(),
    randomSymbol(),
    randomSymbol()
  ];

  userSequence = [];
  round = 0;
  showingSequence = true;

  messageElement.textContent = "";

  choicesElement.innerHTML = "";

  sequenceElement.textContent =
    sequence.join(" ");

  setTimeout(function() {

    sequenceElement.textContent = "";

    showChoices();

    showingSequence = false;

  }, 1500);

}


function showChoices() {

  choicesElement.innerHTML = "";

  symbols.forEach(function(symbol) {

    const button =
      document.createElement("button");

    button.className = "choice";
    button.textContent = symbol;

    button.addEventListener(
      "click",
      function() {
        chooseSymbol(symbol);
      }
    );

    choicesElement.appendChild(button);

  });

}


function chooseSymbol(symbol) {

  if (showingSequence) return;

  userSequence.push(symbol);

  const correct =
    symbol ===
    sequence[userSequence.length - 1];


  if (!correct) {

    messageElement.textContent =
      "not quite — try that sequence again ☁️";

    userSequence = [];

    return;

  }


  round++;

  messageElement.textContent =
    round + " / 3 ✓";


  if (round === 3) {

    messageElement.textContent =
      "you caught the cloud ☁️";

    clouds++;

    localStorage.setItem(
      "clouds",
      clouds
    );

    updateCloudCount();


    setTimeout(function() {

      nextRound();

    }, 1000);

  }

}


/* =========================
   CLOUD MEMORY START
   ========================= */

function startGame() {

  document.getElementById(
    "game"
  ).scrollIntoView({
    behavior: "smooth"
  });


  setTimeout(function() {

    const startButton =
      document.getElementById(
        "startMemoryGame"
      );

    if (startButton) {
      startButton.style.display =
        "none";
    }

    nextRound();

  }, 500);

}


const startMemoryButton =
  document.getElementById(
    "startMemoryGame"
  );


if (startMemoryButton) {

  startMemoryButton.addEventListener(
    "click",
    startGame
  );

}


/* =========================
   HOME PLAY BUTTON
   ========================= */

const playButton =
  document.getElementById(
    "playButton"
  );


if (playButton) {

  playButton.addEventListener(
    "click",
    function() {

      document.getElementById(
        "game"
      ).scrollIntoView({
        behavior: "smooth"
      });

    }
  );

}


/* =========================
   YOUR SKY
   ========================= */

const skyDisplay =
  document.getElementById(
    "skyDisplay"
  );


const positions = [
  [8, 20],
  [20, 55],
  [34, 18],
  [48, 62],
  [62, 28],
  [76, 55],
  [88, 18],
  [14, 72],
  [42, 42],
  [70, 75],
  [92, 68]
];


function updateSky() {

  if (!skyDisplay) return;

  skyDisplay.innerHTML = "";


  /* CLOUDS */

  for (let i = 0; i < clouds; i++) {

    const cloud =
      document.createElement("button");

    cloud.className =
      "sky-cloud";

    cloud.textContent = "☁️";


    const position =
      positions[
        i % positions.length
      ];


    cloud.style.left =
      position[0] + "%";

    cloud.style.top =
      position[1] + "%";


    cloud.addEventListener(
      "click",
      function() {

        document.getElementById(
          "quoteText"
        ).textContent =
          "you caught a little piece of happiness. ☁️";

        document.getElementById(
          "quoteOverlay"
        ).style.display =
          "flex";

      }
    );


    skyDisplay.appendChild(cloud);

  }


  /* STARS */

  for (let i = 0; i < stars; i++) {

    const star =
      document.createElement("button");

    star.className =
      "sky-star";

    star.textContent = "⭐";


    const position =
      positions[
        (i + clouds) %
        positions.length
      ];


    star.style.left =
      position[0] + "%";

    star.style.top =
      position[1] + "%";


    star.addEventListener(
      "click",
      function() {

        document.getElementById(
          "quoteText"
        ).textContent =
          "you made yourself a little piece of the sky. ⭐";

        document.getElementById(
          "quoteOverlay"
        ).style.display =
          "flex";

      }
    );


    skyDisplay.appendChild(star);

  }

}


/* =========================
   CLOUD COUNT
   ========================= */

function updateCloudCount() {

  const siteCloudCount =
    document.getElementById(
      "siteCloudCount"
    );

  const cloudCount =
    document.getElementById(
      "cloudCount"
    );

  const skyCloudCount =
    document.getElementById(
      "skyCloudCount"
    );

  const skyStarCount =
    document.getElementById(
      "skyStarCount"
    );


  if (siteCloudCount) {

    siteCloudCount.textContent =
      clouds;

  }


  if (cloudCount) {

    cloudCount.textContent =
      clouds;

  }


  if (skyCloudCount) {

    skyCloudCount.textContent =
      clouds;

  }


  if (skyStarCount) {

    skyStarCount.textContent =
      stars;

  }


  updateSky();

  updateStarUnlock();

}


/* =========================
   STAR UNLOCK
   ========================= */

function updateStarUnlock() {

  const starUnlock =
    document.getElementById(
      "starUnlock"
    );


  if (!starUnlock) return;


  if (clouds >= 10) {

    starUnlock.style.display =
      "block";

  } else {

    starUnlock.style.display =
      "none";

  }

}


/* =========================
   TRADE 10 CLOUDS
   FOR 1 STAR
   ========================= */

function tradeForStar() {

  if (clouds < 10) return;


  clouds -= 10;

  stars++;


  localStorage.setItem(
    "clouds",
    clouds
  );

  localStorage.setItem(
    "stars",
    stars
  );


  updateCloudCount();


  document.getElementById(
    "quoteText"
  ).textContent =
    "you made yourself a little piece of the sky. ⭐";


  document.getElementById(
    "quoteOverlay"
  ).style.display =
    "flex";

}


const tradeStarButton =
  document.getElementById(
    "tradeStarButton"
  );


if (tradeStarButton) {

  tradeStarButton.addEventListener(
    "click",
    tradeForStar
  );

}


/* =========================
   BETWEEN THE LINES
   ========================= */

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


const startWordGame =
  document.getElementById(
    "startWordGame"
  );


const wordCard =
  document.querySelector(
    ".word-card"
  );


const clueText =
  document.getElementById(
    "clueText"
  );


const clueNumber =
  document.getElementById(
    "clueNumber"
  );


const guessInput =
  document.getElementById(
    "guessInput"
  );


const guessButton =
  document.getElementById(
    "guessButton"
  );


const nextClueButton =
  document.getElementById(
    "nextClueButton"
  );


const skipButton =
  document.getElementById(
    "skipButton"
  );


const wordMessage =
  document.getElementById(
    "wordMessage"
  );


function chooseWord() {

  currentWord =
    wordBank[
      Math.floor(
        Math.random() *
        wordBank.length
      )
    ];


  currentClue = 0;

  showClue();


  if (guessInput) {

    guessInput.value = "";

    guessInput.focus();

  }


  if (wordMessage) {

    wordMessage.textContent = "";

  }

}


function showClue() {

  if (!currentWord) return;


  clueText.textContent =
    currentWord.clues[currentClue];


  clueNumber.textContent =
    "clue " +
    (currentClue + 1) +
    " of 3";

}


function startWordGameNow() {

  document.getElementById(
    "between-the-lines"
  ).scrollIntoView({
    behavior: "smooth"
  });


  setTimeout(function() {

    if (startWordGame) {

      startWordGame.style.display =
        "none";

    }


    if (wordCard) {

      wordCard.style.display =
        "block";

    }


    chooseWord();

  }, 500);

}


if (startWordGame) {

  startWordGame.addEventListener(
    "click",
    startWordGameNow
  );

}


function checkGuess() {

  if (!currentWord) return;


  const guess =
    guessInput.value
      .trim()
      .toLowerCase();


  if (!guess) return;


  if (guess === currentWord.word) {

    clouds++;


    localStorage.setItem(
      "clouds",
      clouds
    );


    updateCloudCount();


    document.getElementById(
      "revealedWord"
    ).textContent =
      currentWord.word;


    document.getElementById(
      "wordThought"
    ).textContent =
      currentWord.thought;


    document.getElementById(
      "wordOverlay"
    ).style.display =
      "flex";


    guessInput.value = "";


  } else {

    wordMessage.textContent =
      "not quite — try again ☁️";

  }

}


if (guessButton) {

  guessButton.addEventListener(
    "click",
    checkGuess
  );

}


if (guessInput) {

  guessInput.addEventListener(
    "keydown",
    function(event) {

      if (event.key === "Enter") {

        checkGuess();

      }

    }
  );

}


if (nextClueButton) {

  nextClueButton.addEventListener(
    "click",
    function() {

      if (!currentWord) return;


      if (currentClue < 2) {

        currentClue++;

        showClue();

      }

    }
  );

}


if (skipButton) {

  skipButton.addEventListener(
    "click",
    function() {

      chooseWord();

    }
  );

}


/* =========================
   WORD POPUP
   ========================= */

const closeWord =
  document.getElementById(
    "closeWord"
  );


const nextWordButton =
  document.getElementById(
    "nextWordButton"
  );


if (closeWord) {

  closeWord.addEventListener(
    "click",
    function() {

      document.getElementById(
        "wordOverlay"
      ).style.display =
        "none";

    }
  );

}


if (nextWordButton) {

  nextWordButton.addEventListener(
    "click",
    function() {

      document.getElementById(
        "wordOverlay"
      ).style.display =
        "none";

      chooseWord();

    }
  );

}


const wordOverlay =
  document.getElementById(
    "wordOverlay"
  );


if (wordOverlay) {

  wordOverlay.addEventListener(
    "click",
    function(event) {

      if (
        event.target === wordOverlay
      ) {

        wordOverlay.style.display =
          "none";

      }

    }
  );

}


/* =========================
   POSITIVITY POPUP
   ========================= */

const closeQuote =
  document.getElementById(
    "closeQuote"
  );


if (closeQuote) {

  closeQuote.addEventListener(
    "click",
    function() {

      document.getElementById(
        "quoteOverlay"
      ).style.display =
        "none";

    }
  );

}


const quoteOverlay =
  document.getElementById(
    "quoteOverlay"
  );


if (quoteOverlay) {

  quoteOverlay.addEventListener(
    "click",
    function(event) {

      if (
        event.target === quoteOverlay
      ) {

        quoteOverlay.style.display =
          "none";

      }

    }
  );

}


/* =========================
   DAILY DOSE
   ========================= */

const dailyDoses = [

  {
    word: "sonder",

    meaning:
      "the realization that everyone around you has a life as vivid and complicated as your own.",

    thought:
      "you don't have to make today extraordinary. sometimes a good ordinary day is enough.",

    joyTitle:
      "look up",

    joyText:
      "take a second to look at the sky.",

    songTitle:
      "Cloud 9",

    songArtist:
      "Megan Moroney",

    songUrl:
      "https://open.spotify.com/search/Cloud%209%20Megan%20Moroney"

  },

  {
    word: "mellifluous",

    meaning:
      "a sound that is pleasant and smooth to listen to.",

    thought:
      "let yourself enjoy something simply because it feels good.",

    joyTitle:
      "play a favorite song",

    joyText:
      "put on one song you love and really listen to it.",

    songTitle:
      "Pink Clouding",

    songArtist:
      "Taylor Swift",

    songUrl:
      "https://open.spotify.com/search/Pink%20Clouding%20Taylor%20Swift"

  },

  {
    word: "serendipity",

    meaning:
      "a happy discovery that happens by chance.",

    thought:
      "not everything has to be planned to turn out beautifully.",

    joyTitle:
      "notice something new",

    joyText:
      "look around and find one tiny thing you haven't noticed before.",

    songTitle:
      "Clouds",

    songArtist:
      "One Direction",

    songUrl:
      "https://open.spotify.com/search/Clouds%20One%20Direction"

  },

  {
    word: "glimmer",

    meaning:
      "a small moment that brings a feeling of happiness or calm.",

    thought:
      "small good moments still count.",

    joyTitle:
      "find a glimmer",

    joyText:
      "notice one tiny thing that makes you smile today.",

    songTitle:
      "Here Comes The Sun",

    songArtist:
      "The Beatles",

    songUrl:
      "https://open.spotify.com/track/6dGnYIeXmHdcikdzNNDMm2"

  },

  {
    word: "wander",

    meaning:
      "to move around without a fixed destination.",

    thought:
      "you don't always need to know exactly where you're going.",

    joyTitle:
      "take the long way",

    joyText:
      "if you can, take a slightly different route somewhere today.",

    songTitle:
      "Pocketful of Sunshine",

    songArtist:
      "Natasha Bedingfield",

    songUrl:
      "https://open.spotify.com/track/3g3aU1R3qTLjO8Sn3jXfBY"

  },

  {
    word: "bloom",

    meaning:
      "to grow or develop into something beautiful.",

    thought:
      "you are allowed to grow at your own pace.",

    joyTitle:
      "notice something growing",

    joyText:
      "look for a plant, flower, or tree on your way today.",

    songTitle:
      "Mr. Blue Sky",

    songArtist:
      "Electric Light Orchestra",

    songUrl:
      "https://open.spotify.com/track/2RlgNHKcydI9sayD2Df2xp"

  },

  {
    word: "pause",

    meaning:
      "a short break from activity or movement.",

    thought:
      "you can take a breath without having to earn it first.",

    joyTitle:
      "take a breath",

    joyText:
      "put everything down for a moment and take one slow breath.",

    songTitle:
      "September",

    songArtist:
      "Earth, Wind & Fire",

    songUrl:
      "https://open.spotify.com/track/3kXoKlD84c6OmIcOLfrfEs"

  }

];


function getTodayIndex() {

  const today =
    new Date();


  const startOfYear =
    new Date(
      today.getFullYear(),
      0,
      0
    );


  const difference =
    today - startOfYear;


  const oneDay =
    1000 * 60 * 60 * 24;


  const dayOfYear =
    Math.floor(
      difference / oneDay
    );


  return (
    dayOfYear %
    dailyDoses.length
  );

}


function loadDailyDose() {

  const dose =
    dailyDoses[
      getTodayIndex()
    ];


  const dailyWord =
    document.getElementById(
      "dailyWord"
    );


  const dailyWordMeaning =
    document.getElementById(
      "dailyWordMeaning"
    );


  const dailyThought =
    document.getElementById(
      "dailyThought"
    );


  const dailyJoyTitle =
    document.getElementById(
      "dailyJoyTitle"
    );


  const dailyJoyText =
    document.getElementById(
      "dailyJoyText"
    );


  const dailySongTitle =
    document.getElementById(
      "dailySongTitle"
    );


  const dailySongArtist =
    document.getElementById(
      "dailySongArtist"
    );


  const dailySongEmbed =
    document.getElementById(
      "dailySongEmbed"
    );


  if (dailyWord) {

    dailyWord.textContent =
      dose.word;

  }


  if (dailyWordMeaning) {

    dailyWordMeaning.textContent =
      dose.meaning;

  }


  if (dailyThought) {

    dailyThought.textContent =
      dose.thought;

  }


  if (dailyJoyTitle) {

    dailyJoyTitle.textContent =
      dose.joyTitle;

  }


  if (dailyJoyText) {

    dailyJoyText.textContent =
      dose.joyText;

  }


  if (dailySongTitle) {

    dailySongTitle.textContent =
      dose.songTitle;

  }


  if (dailySongArtist) {

    dailySongArtist.textContent =
      dose.songArtist;

  }


  /*
     Open the exact Spotify song
     in a new tab when clicked.
  */

  if (dailySongEmbed) {

    dailySongEmbed.onclick =
      function() {

        window.open(
          dose.songUrl,
          "_blank"
        );

      };

  }

}


loadDailyDose();


/* =========================
   INITIAL SETUP
   ========================= */

if (wordCard) {

  wordCard.style.display =
    "none";

}


const starUnlock =
  document.getElementById(
    "starUnlock"
  );


if (starUnlock) {

  starUnlock.style.display =
    "none";

}


updateCloudCount();