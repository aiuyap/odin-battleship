import { Gameboard } from "../src/factories";

const game = Gameboard();
game.placeShips();

test("Check if all ships is sunk function works", () => {
  expect(game.checkAllShipIsSunk()).toBe(false);
});
