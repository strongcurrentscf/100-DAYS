function displayAlertSetNamesOverlay() {
  alertSetNamesElement.style.display = "block";
  playerNameFormBackdropElement.style.display = "block";
}
function closeAlertSetNamesOverlay() {
  alertSetNamesElement.style.display = "none";
  playerNameFormBackdropElement.style.display = "none";
}

function displayGameBoard() {
  if (players[0].name && players[1].name) {
    gameBoardAreaElement.style.display = "block";
    activePlayerNameElement.textContent = players[activePlayer].name;
    return;
  }
  displayAlertSetNamesOverlay();
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectField(e) {
  if (e.target.tagName !== "LI") {
    return;
  }
  const selectedField = e.target;
  const selectedRow = selectedField.dataset.row - 1;
  const selectedColumn = selectedField.dataset.col - 1;
  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("Please select an empty field!");
    return;
  }
  gameData[selectedRow][selectedColumn] = activePlayer + 1;
  selectedField.classList.add("disabled");
  selectedField.textContent = players[activePlayer].symbol;

  switchPlayer();
}
