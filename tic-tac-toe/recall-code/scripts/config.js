function openPlayerConfig(e) {
  playerToEdit = +e.target.dataset.playerid;
  backdropEl.style.display = "block";
  configPlayerFormOverlayEl.style.display = "block";

  console.log(playerToEdit);
}

function closePlayerConfig() {
  backdropEl.style.display = "none";
  configPlayerFormOverlayEl.style.display = "none";
  formEl.firstElementChild.classList.remove("error");
  formEl.firstElementChild.lastElementChild.value = "";
  configErrorMessage.textContent = "";
}

function openSetPlayersAlert() {
  backdropEl.style.display = "block";
  setPlayersAlertOverlayEl.style.display = "block";
}
function closeSetPlayersAlert() {
  backdropEl.style.display = "none";
  setPlayersAlertOverlayEl.style.display = "none";
}

function closeModals() {
  closePlayerConfig();
  closeSetPlayersAlert();
}

function savePlayerConfigData(e) {
  e.preventDefault();
  const formData = new FormData(formEl);
  const enteredPlayerName = formData.get("playername").trim().toUpperCase();

  if (!enteredPlayerName) {
    e.target.firstElementChild.classList.add("error");
    configErrorMessage.textContent = "Please enter a valid name!";
    return;
  }

  const playerElementToUpdate = document.getElementById(
    "player-" + playerToEdit + "-data"
  );

  playerElementToUpdate.children[1].textContent = enteredPlayerName;
  players[playerToEdit - 1].name = enteredPlayerName;

  closePlayerConfig();
}
