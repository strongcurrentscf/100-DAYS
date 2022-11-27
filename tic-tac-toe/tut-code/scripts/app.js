let editedPlayer = 0;

const players = [
  { name: "", symbol: "X" },
  { name: "", symbol: "O" },
];

const playerConfigOverlayElement = document.getElementById("config-overlay");
const alertSetPlayersOverlayElement = document.getElementById(
  "alert-set-players-overlay"
);
const backdropElement = document.getElementById("backdrop");
const formElement = document.querySelector("form");
const errorsOutputElement = document.getElementById("config-errors");
const gameAreaElement = document.getElementById("active-game");

const editPlayer1ButtonElement = document.getElementById("edit-player-1-btn");
const editPlayer2ButtonElement = document.getElementById("edit-player-2-btn");
const cancelFormButtonElement = document.getElementById("cancel-btn");
const okAlertButtonElement = document.getElementById("ok-btn");
const startNewGameButtonElement = document.getElementById("start-game-btn");

editPlayer1ButtonElement.addEventListener("click", openPlayerConfig);
editPlayer2ButtonElement.addEventListener("click", openPlayerConfig);

cancelFormButtonElement.addEventListener("click", closePlayerConfig);
okAlertButtonElement.addEventListener("click", closeAlertSetPlayerOverlay);
backdropElement.addEventListener("click", closeAllModals);

formElement.addEventListener("submit", savePlayerConfig);

startNewGameButtonElement.addEventListener("click", startNewGame);
