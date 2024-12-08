import { computerAtk } from "./computer";

export function generateCells(idName, player) {
  const container = document.querySelector(idName);
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.classList.add(player);

  let xAxis = 0;
  let yAxis = 0;

  for (let i = 0; i < 100; i++) {
    const newCell = cell.cloneNode();
    container.appendChild(newCell);
    newCell.textContent = `${xAxis},${yAxis}`;
    yAxis++;
    if (yAxis > 9) {
      yAxis = 0;
      xAxis++;
    }
  }
}

export function showShips(coordinates, player) {
  const allCells = document.querySelectorAll(`.${player}`);
  allCells.forEach((cell) => {
    if (coordinates.includes(cell.textContent)) {
      cell.classList.add("ship");
    }
  });
}

export function loadListeners(playerGB, computerGB) {
  const allCells = document.querySelectorAll(".computer");
  allCells.forEach((cell) => {
    cell.addEventListener("click", () => {
      const hit = computerGB.receiveAttack(cell.textContent);
      if (hit === true) {
        cell.classList.add("hit");
      } else {
        cell.classList.add("miss");
      }
      checkWinner(playerGB, computerGB);
      computerAtk(playerGB);
      checkWinner(playerGB, computerGB);
    });
  });
}

function checkWinner(gb1, gb2) {
  const player1 = gb1.checkAllShipIsSunk();
  const player2 = gb2.checkAllShipIsSunk();

  if (player1) {
    alert(`Computer won!`);
  } else if (player2) {
    alert(`You won!`);
  }
}
