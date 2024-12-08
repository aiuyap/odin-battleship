import "./styles.css";
import { generateCells, showShips, loadListeners } from "./loadField";
import { Player } from "./factories";

(function driver() {
  const userPlayer = Player("player", "human");
  const computerPlayer = Player("computer", "computer");

  userPlayer.gameboard.placeShips();
  computerPlayer.gameboard.placeShips();

  btnListeners(userPlayer);

  generateCells(".player-field", userPlayer.type);
  // generateCells(".computer-field", "computer");
  showShips(userPlayer.gameboard.getAllShipCoordinates(), "human");
  // loadListeners(userPlayer.gameboard, computerPlayer.gameboard);
})();

export function checkWinner(gb1, gb2) {
  const player1 = gb1.checkAllShipIsSunk();
  const player2 = gb2.checkAllShipIsSunk();
  const dialog = document.querySelector("#winner");
  const winnerText = document.querySelector("#win-msg");
  dialog.CloseDialogOnEsc = false;

  if (player1) {
    dialog.showModal();
    winnerText.textContent = "Better luck next time, captain. The enemy won!";
  } else if (player2) {
    dialog.showModal();
    winnerText.textContent = "Congratulations captain, you won!";
  }
}

function btnListeners(userPlayer) {
  document.querySelector("#new-game").addEventListener("click", () => {
    document.querySelector("#winner").close();
  });
  //prevent closing modal with escape btn
  document.querySelector("#winner").addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
    }
  });

  document.querySelector("#change-placement").addEventListener("click", () => {
    userPlayer = Player("player", "human");
    const allCells = document.querySelectorAll(".human");
    allCells.forEach((cell) => {
      cell.remove();
    });
    generateCells(".player-field", userPlayer.type);
    userPlayer.gameboard.placeShips();
    showShips(userPlayer.gameboard.getAllShipCoordinates(), "human");
  });
}
