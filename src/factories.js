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
    carrier.setCoordinates("1,1");
    carrier.setCoordinates("1,2");
    carrier.setCoordinates("1,3");
    carrier.setCoordinates("1,4");
    carrier.setCoordinates("1,5");

    destroyer.setCoordinates("4,3");
    destroyer.setCoordinates("4,4");

    cruiser.setCoordinates("6,7");
    cruiser.setCoordinates("7,7");
    cruiser.setCoordinates("8,7");

    battleship.setCoordinates("9,1");
    battleship.setCoordinates("9,2");
    battleship.setCoordinates("9,3");
    battleship.setCoordinates("9,4");

    submarine.setCoordinates("0,8");
    submarine.setCoordinates("1,8");
    submarine.setCoordinates("2,8");
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
