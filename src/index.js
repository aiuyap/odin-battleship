import "./styles.css";
import { generateCells, showShips, loadListeners } from "./loadField";
import { Player } from "./factories";

(function main() {
  const userPlayer = Player("Aiu", "human");
  const computerPlayer = Player("computer", "computer");

  userPlayer.gameboard.placeShips();
  computerPlayer.gameboard.placeShips();

  generateCells(".player-field", "human");
  generateCells(".computer-field", "computer");
  showShips(userPlayer.gameboard.getAllShipCoordinates(), "human");
  loadListeners(computerPlayer.gameboard);
})();
