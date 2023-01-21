function openPlayerConfig(e) {
  e.preventDefault();
  editedPlayer = +e.target.dataset.playerid;

  playerConfigOverlayElement.style.display = "block";
  backdropElement.style.display = "block";
}

function closePlayerConfig() {
  playerConfigOverlayElement.style.display = "none";
  backdropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error");
  formElement.firstElementChild.lastElementChild.value = "";
  errorsOutputElement.textContent = "";
}

function openAlertSetPlayersOverlay() {
  alertSetPlayersOverlayElement.style.display = "block";
  backdropElement.style.display = "block";
}

function closeAlertSetPlayerOverlay() {
  alertSetPlayersOverlayElement.style.display = "none";
  backdropElement.style.display = "none";
}

function closeAllModals() {
  closePlayerConfig();
  closeAlertSetPlayerOverlay();
}

function savePlayerConfig(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const enteredPlayerName = formData.get("playername").trim();

  if (!enteredPlayerName) {
    e.target.firstElementChild.classList.add("error");
    errorsOutputElement.textContent = "Please enter a valid name!";
    return;
  }

  const updatedPlayerDataElement = document.getElementById(
    "player-" + editedPlayer + "-data"
  );

  updatedPlayerDataElement.children[1].textContent = enteredPlayerName;
  players[editedPlayer - 1].name = enteredPlayerName;

  closePlayerConfig();
}
