const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let playerToEdit = 0;
let activePlayer = 0;
let currentRound = 1;
let gameIsOver = false;

const players = [
  { name: "", symbol: "X" },
  { name: "", symbol: "O" },
];

//////////config-elements
const configPlayerFormOverlayEl = document.getElementById("config-overlay");
const setPlayersAlertOverlayEl = document.getElementById(
  "set-players-alert-overlay"
);
const backdropEl = document.getElementById("backdrop");
const modalEl = document.querySelector(".modal");
const formEl = document.querySelector("form");
const configErrorMessage = document.getElementById("config-error-message");
/////game-elements
const gameSectionEl = document.getElementById("active-game");
const activePlayerNameEl = document.getElementById("active-player-name");
const gameBoardEl = document.getElementById("game-board");
const gameOverEl = document.getElementById("game-over");
const winnerName = document.getElementById("winner-name");

//////////buttons
const editPlayer1NameBtnEl = document.getElementById("edit-player-1-btn");
const editPlayer2NameBtnEl = document.getElementById("edit-player-2-btn");
const configPlayerCancelBtnEl = document.getElementById("cancel-btn");
const cancelPlayerConfigBtnEl = document.getElementById("cancel-btn");
const okAlertSetPlayerNamesBtnEl = document.getElementById("ok-btn");
const startNewGameBtnEl = document.getElementById("start-new-game-btn");

/////////listeners
editPlayer1NameBtnEl.addEventListener("click", openPlayerConfig);
editPlayer2NameBtnEl.addEventListener("click", openPlayerConfig);
backdropEl.addEventListener("click", closeModals);
cancelPlayerConfigBtnEl.addEventListener("click", closeModals);
okAlertSetPlayerNamesBtnEl.addEventListener("click", closeModals);
formEl.addEventListener("submit", savePlayerConfigData);
startNewGameBtnEl.addEventListener("click", startNewGame);
/////game-listeners
gameBoardEl.addEventListener("click", selectGameSquare);
