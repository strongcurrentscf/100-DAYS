function displayAlertSetNamesOverlay() {
  alertSetNamesElement.style.display = "block";
  playerNameFormBackdropElement.style.display = "block";
}
function closeAlertSetNamesOverlay() {
  alertSetNamesElement.style.display = "none";
  playerNameFormBackdropElement.style.display = "none";
}

function resetGame() {
  if (!gameIsOver) {
    return;
  }
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameBoardAreaElement.firstElementChild.firstElementChild.innerHTML =
    'You won, <span id="winner-name">PLAYER NAME</span>!';
  gameBoardAreaElement.firstElementChild.style.display = "none";

  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
      gameBoardItemElement.textContent = "";
      gameBoardItemElement.classList.remove("disabled");
      gameBoardIndex++;
    }
  }
}

function startNewGame() {
  if (players[0].name && players[1].name) {
    resetGame();
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
  if (e.target.tagName !== "LI" || gameIsOver) {
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

  const winnerId = checkIfGameOver();
  if (winnerId !== 0) {
    endGame(winnerId);
  }
  currentRound++;

  switchPlayer();
}

function checkIfGameOver() {
  //checking rows for equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  //checking columns for equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[1][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  //diagonal top left to bottom right
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  //diagonal bottom left to top right
  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }

  if (currentRound === 9) {
    return -1;
  }

  return 0;
}

function endGame(winnerId) {
  gameBoardAreaElement.firstElementChild.style.display = "block";
  gameIsOver = true;

  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name;
    gameBoardAreaElement.firstElementChild.firstElementChild.firstElementChild.textContent =
      winnerName;
  } else {
    gameBoardAreaElement.firstElementChild.firstElementChild.textContent =
      "It's a draw!";
  }
}

// function endGame(winnerId) {
//   if (winnerId !== 0) {
//     gameBoardAreaElement.firstElementChild.style.display = "block";
//     currentRound === 9
//       ? (gameBoardAreaElement.firstElementChild.firstElementChild.textContent =
//           "It's a draw!")
//       : winnerId === 1
//       ? (gameBoardAreaElement.firstElementChild.firstElementChild.firstElementChild.textContent =
//           players[winnerId - 1].name)
//       : winnerId === 2
//       ? (gameBoardAreaElement.firstElementChild.firstElementChild.firstElementChild.textContent =
//           players[winnerId - 1].name)
//       : null;
//   }
// }
