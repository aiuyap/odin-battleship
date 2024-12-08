import "./styles.css";
import { generateCells, showShips, loadListeners } from "./loadField";
import { Player } from "./factories";

(function driver() {
  const userPlayer = Player("player", "human");
  const computerPlayer = Player("computer", "computer");

  userPlayer.gameboard.placeShips();
  computerPlayer.gameboard.placeShips();

  generateBtn();
  btnListeners(userPlayer, computerPlayer);

  generateCells(".player-field", userPlayer.type);
  showShips(userPlayer.gameboard.getAllShipCoordinates(), "human");
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

function generateBtn() {
  const container = document.querySelector("#container>div");
  const div = document.createElement("div");
  const btn = document.createElement("button");
  btn.setAttribute("type", "button");

  div.id = "button-container";

  const placementBtn = btn.cloneNode();
  placementBtn.id = "change-placement";
  placementBtn.textContent = "Change Placement";

  const startBtn = btn.cloneNode();
  startBtn.id = "start-btn";
  startBtn.textContent = "Start Game";

  container.appendChild(div);
  div.appendChild(placementBtn);
  div.appendChild(startBtn);
}

function generateEnemyContainer() {
  const container = document.querySelector("#container");
  const div = document.createElement("div");
  const h1 = document.createElement("h1");
  const cellContainer = div.cloneNode();

  h1.textContent = "Enemy Fleet";
  container.appendChild(div);
  div.appendChild(h1);

  cellContainer.classList.add("computer-field");
  cellContainer.classList.add("field-container");

  div.appendChild(cellContainer);
}

function btnListeners(userPlayer, computerPlayer) {
  document.querySelector("#new-game").addEventListener("click", () => {
    document.querySelector("#winner").close();
  });
  //prevent closing dialog with escape btn
  document.querySelector("#winner").addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
    }
  });
  //change placement btn listener
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
  //start btn listener
  document.querySelector("#start-btn").addEventListener("click", () => {
    generateEnemyContainer();
    generateCells(".computer-field", computerPlayer.type);
    loadListeners(userPlayer.gameboard, computerPlayer.gameboard);
    document.querySelector("#button-container").remove();
  });
}
