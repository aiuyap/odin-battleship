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

  if (player1) {
    alert(`Computer won!`);
  } else if (player2) {
    alert(`You won!`);
  }
}
