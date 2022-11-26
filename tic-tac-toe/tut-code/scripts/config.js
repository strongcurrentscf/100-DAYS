const editPlayer1ButtonElement = document.getElementById("edit-player-1-btn");
const editPlayer2ButtonElement = document.getElementById("edit-player-2-btn");

const playerNameFormElement = document.querySelector(".modal");
const playerNameFormBackdropElement = document.getElementById("backdrop");

const cancelFormButtonElement = document.getElementById("cancel-btn");

function displayForm() {
  playerNameFormElement.style.display = "block";
  playerNameFormBackdropElement.style.display = "block";
}

function closeForm() {
  playerNameFormElement.style.display = "none";
  playerNameFormBackdropElement.style.display = "none";
}

editPlayer1ButtonElement.addEventListener("click", displayForm);
cancelFormButtonElement.addEventListener("click", closeForm);
