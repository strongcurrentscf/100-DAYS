const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let gameIsOver = false;

const players = [
  {
    name: "",
    symbol: "X",
  },
  {
    name: "",
    symbol: "O",
  },
];

const editPlayer1ButtonElement = document.getElementById("edit-player-1-btn");
const editPlayer2ButtonElement = document.getElementById("edit-player-2-btn");

const playerNameFormBackdropElement = document.querySelector(".overlay");
const playerNameFormElement = document.querySelector(".modal");
const alertSetNamesElement = document.getElementById("alert-set-names-overlay");

const cancelFormButtonElement = document.getElementById("cancel-btn");
const okAlertButtonElement = document.getElementById("ok-btn");

const startGameButtonElement = document.getElementById("start-game");
const gameConfigurationElement = document.getElementById("game-configuration");
const gameBoardAreaElement = document.getElementById("active-game");
const gameBoardElement = document.getElementById("game-board");
const activePlayerNameElement = document.getElementById("active-player-name");

const formElement = document.querySelector("form");
const nameInputElement = document.getElementById("player-name");
const errorsOutputElement = document.getElementById("error-config");

editPlayer1ButtonElement.addEventListener("click", displayForm);
editPlayer2ButtonElement.addEventListener("click", displayForm);
cancelFormButtonElement.addEventListener("click", closeForm);
okAlertButtonElement.addEventListener("click", closeForm);
playerNameFormBackdropElement.addEventListener("click", closeForm);
formElement.addEventListener("submit", setPlayerName);
startGameButtonElement.addEventListener("click", startNewGame);

gameBoardElement.addEventListener("click", selectField);
