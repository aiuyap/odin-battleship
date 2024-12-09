export function computerAtk(humanBoard) {
  let atk;
  if (humanBoard.getLastHit()) {
    atk = aimForShip(humanBoard);
  } else {
    atk = randomAtk();
  }

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

function aimForShip(humanBoard) {
  const lastHit = humanBoard.getLastHit();
  const [x, y] = lastHit.split(",").map(Number);

  const possibleAttacks = [
    `${x - 1},${y}`, // up
    `${x + 1},${y}`, // down
    `${x},${y - 1}`, // left
    `${x},${y + 1}`, // right
  ];

  // Loop through possible cells and return the first valid one
  for (let i = 0; i < possibleAttacks.length; i++) {
    const atk = possibleAttacks[i];
    if (isValidAtk(atk) && !humanBoard.getAtksMade().includes(atk)) {
      return atk;
    }
  }

  // If no adjacent valid attacks, pick a random attack
  return randomAtk();
}

function isValidAtk(atk) {
  const [x, y] = atk.split(",").map(Number);

  if (Number.isInteger(x) && Number.isInteger(y) && x >= 0 && x <= 9 && y >= 0 && y <= 9) {
    return true;
  }

  return false;
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
