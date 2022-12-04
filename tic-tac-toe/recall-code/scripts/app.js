//////////
const configPlayerFormOverlayEl = document.getElementById("config-overlay");
const backdropEl = document.getElementById("backdrop");
const formEl = document.querySelector("form");

//////////buttons
const editPlayer1NameEl = document.getElementById("edit-player-1-btn");
const editPlayer2NameEl = document.getElementById("edit-player-2-btn");
const configPlayerCancelBtnEl = document.getElementById("cancel-btn");
const startNewGameBtnEl = document.getElementById("start-new-game-btn");

/////////listeners
startNewGameBtnEl.addEventListener("click", openPlayerConfig);
