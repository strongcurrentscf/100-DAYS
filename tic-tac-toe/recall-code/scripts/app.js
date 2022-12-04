let playerToEdit = 0;

const players = [
  { name: "", symbol: "X" },
  { name: "", symbol: "O" },
];

//////////elements
const configPlayerFormOverlayEl = document.getElementById("config-overlay");
const setPlayersAlertOverlayEl = document.getElementById(
  "set-players-alert-overlay"
);
const backdropEl = document.getElementById("backdrop");
const modalEl = document.querySelector(".modal");
const formEl = document.querySelector("form");
const configErrorMessage = document.getElementById("config-error-message");

//////////buttons
const editPlayer1NameEl = document.getElementById("edit-player-1-btn");
const editPlayer2NameEl = document.getElementById("edit-player-2-btn");
const configPlayerCancelBtnEl = document.getElementById("cancel-btn");
const startNewGameBtnEl = document.getElementById("start-new-game-btn");
const cancelPlayerConfigBtnEl = document.getElementById("cancel-btn");

/////////listeners
editPlayer1NameEl.addEventListener("click", openPlayerConfig);
editPlayer2NameEl.addEventListener("click", openPlayerConfig);
backdropEl.addEventListener("click", closeModals);
cancelPlayerConfigBtnEl.addEventListener("click", closeModals);
formEl.addEventListener("submit", savePlayerConfigData);
startNewGameBtnEl.addEventListener("click", openSetPlayersAlert);
