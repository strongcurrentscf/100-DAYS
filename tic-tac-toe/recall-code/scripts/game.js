function resetGame() {
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOverEl.firstElementChild.innerHTML =
    'You won, <span id="winner-name">PLAYER NAME</span>!';
  gameOverEl.style.display = "none";

  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;

      const gameSquareEl = gameBoardEl.children[gameBoardIndex];
      gameSquareEl.textContent = "";
      gameSquareEl.classList.remove("disabled");
      gameBoardIndex++;
    }
  }
}

function startNewGame() {
  if (players[0].name && players[1].name) {
    resetGame();
    gameSectionEl.style.display = "block";
    activePlayerNameEl.parentElement.style.display = "block";
    activePlayerNameEl.textContent = players[activePlayer].name;

    gameSectionEl.scrollIntoView({ behavior: "smooth" });
    return;
  }
  openSetPlayersAlert();
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameEl.textContent = players[activePlayer].name;
}

function selectGameSquare(e) {
  if (e.target.tagName !== "LI" || gameIsOver) {
    return;
  }

  const selectedSquare = e.target;
  const selectedColumn = selectedSquare.dataset.col - 1;
  const selectedRow = selectedSquare.dataset.row - 1;

  if (gameData[selectedColumn][selectedRow] > 0) {
    alert("Please select an empty square!");
    return;
  }

  selectedSquare.textContent = players[activePlayer].symbol;
  selectedSquare.classList.add("disabled");

  gameData[selectedColumn][selectedRow] = activePlayer + 1;

  const winnerId = checkForGameOver();
  if (winnerId !== 0) {
    endGame(winnerId);
  }

  currentRound++;
  switchPlayer();
}

function checkForGameOver() {
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[1][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

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
  if (winnerId > 0) {
    gameOverEl.firstElementChild.firstElementChild.textContent =
      players[winnerId - 1].name;
  } else {
    gameOverEl.firstElementChild.textContent = "It's a draw!";
  }
  activePlayerNameEl.parentElement.style.display = "none";
  gameOverEl.style.display = "block";
  gameIsOver = true;
}
