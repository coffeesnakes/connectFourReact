/* getRowAvail
takes a matrix (or an array of arrays) and a column index.
the matrix can contain '', 'red', 'blue'
the function returns the highest row index (or lowest on the board) that is not occupied.
*/
var getRowAvail = function (matrix, col) {
  for (let j = matrix.length - 1; j >= 0; j--) {
    if (matrix[j][col] === "") {
      return j;
    }
  }
};

/* evalOneLine
takes an array (individual rows, column, diagonals) as an argument.
current switches between '', 'red', and 'blue'
if it contains four consecutive 'red's or 'blue's - returns the color.
*/

var evalOneLine = function (arr) {
  var current = "";
  var counter;
  for (let i = 0; i < arr.length; i++) {
    // resetting the current and counter when it runs into ''
    // 'current' toggles between '', 'red', and 'blue'
    if (arr[i] === "") {
      current = "";
      counter = 0;
      // resetting the current and counter when it runs into different current value.
    } else if (arr[i] === "blue" && arr[i] !== current) {
      current = "blue";
      counter = 1;
    } else if (arr[i] === "red" && arr[i] !== current) {
      current = "red";
      counter = 1;
      // incrementing the counter if it runs into same value
      // also returning the color if the counter reaches 4.
    } else if (arr[i] === "blue" && arr[i] === current) {
      counter++;
      if (counter >= 4) {
        return "blue";
      }
    } else if (arr[i] === "red" && arr[i] === current) {
      counter++;
      if (counter >= 4) {
        return "red";
      }
    }
  }
  return null;
};

/* transpose
transposes an array of arrays. changes the dimensions as well
transpose([Array(3),Array(3),Array(3),Array(3)]) // => [Array(4),Array(4),Array(4)]
*/
var transpose = function (matrix) {
  var matrixTr = [];
  for (let i = 0; i < matrix[0].length; i++) {
    matrixTr[i] = [];
    for (let j = 0; j < matrix.length; j++) {
      matrixTr[i][j] = matrix[j][i];
    }
  }
  return matrixTr;
};

/* diagOfMatrix
accepts an array of arrays (or the array representation of the board) as an arguments and returns all minor and major diagonals.
*/

var diagOfMatrix = function (matrix) {
  var Diagonals = {};
  for (let j = 0; j < matrix.length; j++) {
    for (let k = 0; k < matrix[j].length; k++) {
      Diagonals[`${j - k}M`] = Diagonals[`${j - k}M`] || [];
      Diagonals[`${j - k}M`].push(matrix[j][k]);
      Diagonals[`${j + k}m`] = Diagonals[`${j + k}m`] || [];
      Diagonals[`${j + k}m`].push(matrix[j][k]);
    }
  }
  return Object.values(Diagonals);
};

var checkWinner = function (matrix, callback) {
  var allCombo = [...matrix, ...transpose(matrix), ...diagOfMatrix(matrix)];
  var evalDirections = allCombo.map((direction) => evalOneLine(direction));

  if (evalDirections.includes("red")) {
    alert("Red Wins!");
    callback(makeNewBoard(matrix.length, matrix[0].length));
  } else if (evalDirections.includes("blue")) {
    alert("Blue Wins!");
    callback(makeNewBoard(matrix.length, matrix[0].length));
  }
};

var makeNewBoard = function (rows, cols) {
  var boardInit = [];
  for (let i = 0; i < rows; i++) {
    boardInit.push([]);
    for (let j = 0; j < cols; j++) {
      boardInit[i][j] = "";
    }
  }
  return boardInit;
};

export {
  getRowAvail,
  evalOneLine,
  transpose,
  diagOfMatrix,
  checkWinner,
  makeNewBoard,
};
