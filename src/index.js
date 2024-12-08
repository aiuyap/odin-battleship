import "./styles.css";
import { generateCells, showShips, loadListeners } from "./loadField";
import { Player } from "./factories";

(function driver() {
  const userPlayer = Player("Aiu", "human");
  const computerPlayer = Player("computer", "computer");

  userPlayer.gameboard.placeShips();
  computerPlayer.gameboard.placeShips();

  generateCells(".player-field", "human");
  generateCells(".computer-field", "computer");
  showShips(userPlayer.gameboard.getAllShipCoordinates(), "human");
  loadListeners(userPlayer.gameboard, computerPlayer.gameboard);
})();

export function checkWinner(gb1, gb2) {
  const player1 = gb1.checkAllShipIsSunk();
  const player2 = gb2.checkAllShipIsSunk();
  const dialog = document.querySelector("#winner");
  const winnerText = document.querySelector("#win-msg");

  if (player1) {
    dialog.showModal();
    winnerText.textContent = "Better luck next time, captain. The enemy won!";
  } else if (player2) {
    dialog.showModal();
    winnerText.textContent = "Congratulations captain, you won!";
  }
}

(function newGameListener() {
  document.querySelector("#new-game").addEventListener("click", () => {
    document.querySelector("#winner").close();
  });
})();
