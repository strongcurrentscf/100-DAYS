function startNewGame() {
  players[0].name && players[1].name
    ? (gameAreaElement.style.display = "block")
    : openAlertSetPlayersOverlay();
}
