let gameField = document.getElementsByClassName('game-field')[0];
let cellArray = document.getElementsByClassName('game-field_cell');

let crossSvg = document.getElementById("cross");
let circleSvg = document.getElementById("circle");

for (let i = 0; i < 9; i++) {
  gameField.innerHTML += "<div class='game-field_cell' pos=" + i + `>${crossSvg.outerHTML} ${circleSvg.outerHTML} </div>`;
}

// Передача в функцию событий
for (let cell of cellArray) {
  cell.onclick = function(event) {
    makeMove(event.target.getAttribute('pos'));
  }
}

// Поля
field = [null, null, null, null, null, null, null, null, null];
winPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 9],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Процесс игры
stepOfGame = 0;

// Функции
getSymbolPlayer = (stepOfGame) => (stepOfGame % 2 ? "O" : "X");
resetGame = () => {
  stepOfGame = 0
  field = [null, null, null, null, null, null, null, null, null];

  let crossElements = Array.from(document.querySelectorAll("#cross"));
  let circleElements = Array.from(document.querySelectorAll("#circle"));

  for (let elem of circleElements.concat(crossElements)) {
    elem.style.display = "none"
  }
};

function makeMove(position) {
  if (!field[position]) {
    let cell = document.querySelector(`[pos='${position}']`);
    
    symbolCurrentPlayer = getSymbolPlayer(stepOfGame);
    field[position] = symbolCurrentPlayer;

    if (cell) {
      var circleSvg = cell.querySelector("#circle");
      var crossSvg = cell.querySelector("#cross");

      if (symbolCurrentPlayer == "X") {
        crossSvg.style.display = "block"
      } else {
        circleSvg.style.display = "block"
      }

      if (checkIsWin(symbolCurrentPlayer)) {
        alert(`Победили ${symbolCurrentPlayer == "X" ? "крестики" : "нолики"}!`);
      }

      stepOfGame++;
      console.log(stepOfGame);
    }

  } else {
    alert("Данная клетка занята!");
  }
}

function checkIsWin(symbol) {
  let isWin = true;

  for (const position of winPositions) {
    isWin = true;

    for (const cell of position) {
      isWin = isWin && field[cell] === symbol;
    }

    if (isWin) {
      return true;
    }
  }

  return false;
}
