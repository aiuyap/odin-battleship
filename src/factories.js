function Ship(length) {
  let hitCount = 0;
  const coordinates = [];

  function hit() {
    hitCount += 1;
  }

  function isSunk() {
    if (hitCount >= length) {
      return true;
    }
    return false;
  }

  function setCoordinates(crdnts) {
    coordinates.push(crdnts);
  }

  function getCoordinates() {
    return coordinates;
  }

  return { hit, isSunk, setCoordinates, getCoordinates };
}

export function Gameboard() {
  const missedAtk = [];
  const hitAtk = [];

  const carrier = Ship(5);
  const battleship = Ship(4);
  const cruiser = Ship(3);
  const submarine = Ship(3);
  const destroyer = Ship(2);

  function placeShips() {
    const takenCoordinates = [];
    randomCoordinates(carrier, 5, takenCoordinates);
    randomCoordinates(battleship, 4, takenCoordinates);
    randomCoordinates(cruiser, 3, takenCoordinates);
    randomCoordinates(submarine, 3, takenCoordinates);
    randomCoordinates(destroyer, 2, takenCoordinates);
  }

  function receiveAttack(atk) {
    let hitAShip = 0;

    hitAShip += checkIfHit(carrier, atk);
    hitAShip += checkIfHit(battleship, atk);
    hitAShip += checkIfHit(cruiser, atk);
    hitAShip += checkIfHit(submarine, atk);
    hitAShip += checkIfHit(destroyer, atk);

    if (hitAShip === 0) {
      missedAtk.push(atk);
      return false;
    } else {
      hitAtk.push(atk);
      return true;
    }
  }

  function getAllShipCoordinates() {
    const ship1 = carrier.getCoordinates();
    const ship2 = battleship.getCoordinates();
    const ship3 = cruiser.getCoordinates();
    const ship4 = submarine.getCoordinates();
    const ship5 = destroyer.getCoordinates();
    const allShip = ship1.concat(ship2, ship3, ship4, ship5);

    return allShip;
  }

  function checkAllShipIsSunk() {
    if (carrier.isSunk() && battleship.isSunk() && cruiser.isSunk() && submarine.isSunk() && destroyer.isSunk) {
      return true;
    }
    return false;
  }

  function getAtksMade() {
    return missedAtk.concat(hitAtk);
  }

  return { placeShips, receiveAttack, checkAllShipIsSunk, getAllShipCoordinates, getAtksMade };
}

export function checkIfHit(ship, atk) {
  if (ship.getCoordinates().includes(atk)) {
    ship.hit();
    return 1;
  } else return 0;
}

export function Player(name, type) {
  const gameboard = Gameboard();
  return { name, type, gameboard };
}

function randomCoordinates(ship, length, takenCrdnts) {
  let x = Math.floor(Math.random() * 10);
  let y = Math.floor(Math.random() * 10);
  //randomly decides if ship extends horizontally or vertically
  let orientation = Math.floor(Math.random() * 2);

  while (!testIfValid(x, y, orientation, takenCrdnts, length)) {
    //checks if coordinates are valid else generates a new one
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
    orientation = Math.floor(Math.random() * 2);
  }

  if (orientation === 0) {
    for (let i = 0; i < length; i++) {
      ship.setCoordinates(`${x},${y}`);
      takenCrdnts.push(`${x},${y}`);
      y++;
    }
  } else {
    for (let i = 0; i < length; i++) {
      ship.setCoordinates(`${x},${y}`);
      takenCrdnts.push(`${x},${y}`);
      x++;
    }
  }
}

function testIfValid(x, y, orientation, takenCrdnts, length) {
  if (orientation === 0) {
    if (y + length > 9) {
      return false;
    }
    for (let i = 0; i < length; i++) {
      if (takenCrdnts.includes(`${x},${y}`)) {
        return false;
      }
      y++;
    }
  } else {
    if (x + length > 9) {
      return false;
    }
    for (let i = 0; i < length; i++) {
      if (takenCrdnts.includes(`${x},${y}`)) {
        return false;
      }
      x++;
    }
  }
  return true;
}
