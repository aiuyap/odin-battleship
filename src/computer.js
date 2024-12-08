export function computerAtk(humanBoard) {
  let atk = randomAtk();

  while (humanBoard.getAtksMade().includes(atk)) {
    atk = randomAtk();
  }

  const hit = humanBoard.receiveAttack(atk);
  getCell(atk, hit);
}

function randomAtk() {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);

  return `${x},${y}`;
}

function getCell(atk, hit) {
  const allCells = document.querySelectorAll(".human");
  const div = document.createElement("div");
  allCells.forEach((cell) => {
    if (cell.textContent === atk) {
      if (hit === true) {
        const hitDiv = div.cloneNode();
        cell.appendChild(hitDiv);
        hitDiv.classList.add("hit");
      } else {
        cell.classList.add("miss");
      }
    }
  });
}
