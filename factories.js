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
    } else {
      hitAtk.push(atk);
    }
  }

  function checkAllShipIsSunk() {
    if (carrier.isSunk() && battleship.isSunk() && cruiser.isSunk() && submarine.isSunk() && destroyer.isSunk) {
      return true;
    }
    return false;
  }

  return { placeShips, receiveAttack, checkAllShipIsSunk };
}

export function checkIfHit(ship, atk) {
  if (ship.getCoordinates().includes(atk)) {
    ship.hit();
    return 1;
  } else return 0;
}

function Player(name, type) {
  const gameboard = Gameboard();
  return { name, type, gameboard };
}
