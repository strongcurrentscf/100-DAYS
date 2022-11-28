function displayForm(e) {
  e.preventDefault();
  editedPlayer = +e.target.dataset.playerid;
  playerNameFormElement.style.display = "block";
  playerNameFormBackdropElement.style.display = "block";
}

function closeForm() {
  playerNameFormElement.style.display = "none";
  playerNameFormBackdropElement.style.display = "none";
  formElement.classList.remove("error");
  errorsOutputElement.textContent = "";
  nameInputElement.value = "";
  closeAlertSetNamesOverlay();
}

function setPlayerName(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const enteredPlayerName = formData.get("player-name").trim().toUpperCase();

  if (!enteredPlayerName) {
    nameInputElement.value = "";
    formElement.classList.add("error");
    errorsOutputElement.textContent = "Please enter a valid name!";
    return;
  }

  const updatedPlayerElement = document.getElementById(
    "player-" + editedPlayer
  );
  updatedPlayerElement.children[1].textContent = enteredPlayerName;
  players[editedPlayer - 1].name = enteredPlayerName;
  console.log(players);

  closeForm();
}
