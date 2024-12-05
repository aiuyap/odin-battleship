export function generateCells(idName) {
  const container = document.querySelector(idName);
  const cell = document.createElement("div");
  cell.classList.add("cell");

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

export function showShips(coordinates) {
  const allCells = document.querySelectorAll(".cell");
  allCells.forEach((cell) => {
    if (coordinates.includes(cell.textContent)) {
      cell.classList.add("ship");
    }
  });
}
