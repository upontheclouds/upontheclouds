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


/* CLOUD COUNTER */

function updateCloudCount() {

  document.getElementById("siteCloudCount").textContent = clouds;

  document.getElementById("cloudCount").textContent = clouds;

  document.getElementById("skyCloudCount").textContent = clouds;

  updateSky();

}


/* YOUR SKY */

function updateSky() {

  const skyDisplay =
    document.getElementById("skyDisplay");

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

    const cloud =
      document.createElement("button");

    cloud.className = "sky-cloud";

    cloud.textContent = "☁️";

    const position =
      positions[i % positions.length];

    cloud.style.left =
      position[0] + "%";

    cloud.style.top =
      position[1] + "%";

    cloud.addEventListener("click", function() {

      showQuote(i);

    });

    skyDisplay.appendChild(cloud);

  }

}


/* SHOW POSITIVITY QUOTE */

function showQuote(index) {

  const quoteText =
    document.getElementById("quoteText");

  const quoteOverlay =
    document.getElementById("quoteOverlay");

  const quote =
    quotes[index % quotes.length];

  quoteText.textContent = quote;

  quoteOverlay.style.display = "flex";

}


/* CLOSE QUOTE */

function closeQuote() {

  document.getElementById("quoteOverlay").style.display =
    "none";

}

document.getElementById("closeQuote").addEventListener(
  "click",
  closeQuote
);


/* CLOSE WHEN CLICKING OUTSIDE */

document.getElementById("quoteOverlay").addEventListener(
  "click",
  function(event) {

    if (event.target === this) {
      closeQuote();
    }

  }
);


/* START GAME */

function startGame() {

  document.getElementById("game").scrollIntoView({
    behavior: "smooth"
  });

  setTimeout(function() {
    nextRound();
  }, 500);

}


/* NEW ROUND */

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

  document.getElementById("choices").innerHTML =
    "";

  document.getElementById("nextButton").style.display =
    "none";

  document.getElementById("sequence").textContent =
    sequence.join(" ");

  setTimeout(function() {

    document.getElementById("sequence").textContent =
      "";

    document.getElementById("message").textContent =
      "your turn ☁️";

    createChoices();

  }, 2000);

}


/* CREATE CHOICES */

function createChoices() {

  const choices =
    document.getElementById("choices");

  choices.innerHTML = "";

  symbols.forEach(function(symbol) {

    const button =
      document.createElement("button");

    button.className = "choice";

    button.textContent = symbol;

    button.addEventListener("click", function() {

      chooseSymbol(symbol);

    });

    choices.appendChild(button);

  });

}


/* CHECK THE PLAYER'S CHOICE */

function chooseSymbol(symbol) {

  const message =
    document.getElementById("message");

  if (symbol === sequence[playerIndex]) {

    playerIndex++;

    if (playerIndex < 3) {

      message.textContent =
        playerIndex + " / 3 ✓";

    } else {

      clouds++;

      localStorage.setItem(
        "clouds",
        clouds
      );

      updateCloudCount();

      message.textContent =
        "you caught the cloud ☁️";

      document.getElementById("choices").innerHTML =
        "";

      document.getElementById("nextButton").style.display =
        "inline-block";

    }

  } else {

    message.textContent =
      "not quite — try that sequence again ☁️";

    playerIndex = 0;

  }

}


/* CONNECT THE BUTTONS */

document.getElementById("playButton").addEventListener(
  "click",
  startGame
);

document.getElementById("nextButton").addEventListener(
  "click",
  nextRound
);


/* LOAD CLOUD COUNT */

updateCloudCount();