export function generateCells(idName) {
  const container = document.querySelector(idName);
  const cell = document.createElement("div");
  cell.classList.add("cell");

  for (let i = 0; i < 100; i++) {
    const newCell = cell.cloneNode();
    container.appendChild(newCell);
  }
}
