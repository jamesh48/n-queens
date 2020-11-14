/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  let solution = [];
  let counter = 0;
  for (let i = 0; i < n; i++) {
    let currentRow = [];
    for (let j = 0; j < n; j++) {
      if (j === counter) {
        currentRow.push(1);
      } else {
        currentRow.push(0);
      }
    }
    solution.splice(counter, 0, currentRow);
    counter++;
  }
  return solution;
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  let factorial = function (n) {
    if (n === 0) {
      return 1;
    } else if (n === 1) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
  };

  let solutionCount = factorial(n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.recursiveFunction = function(testBoard, startingRow, maxNumberOfRows, cb) {
  if (startingRow === maxNumberOfRows) {
    return cb(testBoard); //breaks recursion
  }

  for (let i = 0; i < maxNumberOfRows; i ++) {
    testBoard.togglePiece(startingRow, i);
    if (!testBoard.hasAnyQueensConflicts()) {
      let boardInProgress = recursiveFunction(testBoard, startingRow + 1, maxNumberOfRows, cb);
      if (boardInProgress) {
        return boardInProgress;
      }
    }
    testBoard.togglePiece(startingRow, i);
  }
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  let solution;

  let testBoard = new Board({n: n});
  solution = testBoard.rows();

  recursiveFunction(testBoard, 0, n, (testBoard) => {
    return solution = testBoard.rows();
  });

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));

  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  let board = new Board({n: n});

  recursiveFunction(board, 0, n, (board) => {
    solutionCount ++;
  });


  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
