import { Gameboard } from "./factories";

const game = Gameboard();
game.placeShips();

test("Check if checkIfHit function works", () => {
  expect(game.receiveAttack("1,1")).toBe(1);
});
