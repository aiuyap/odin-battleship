import { Gameboard } from "../src/factories";

const game = Gameboard();
game.placeShips();

test("Check receiveAtk", () => {
  expect(game.receiveAttack("1,1")).toBe(true);
});
