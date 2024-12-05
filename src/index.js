import "./styles.css";
import { generateCells, showShips } from "./loadField";
import { Player } from "./factories";

(function main() {
  const userPlayer = Player();
  userPlayer.gameboard.placeShips();

  generateCells(".player-field");
  generateCells(".computer-field");
  showShips(userPlayer.gameboard.getAllShipCoordinates());
})();
