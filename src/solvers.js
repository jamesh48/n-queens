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

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0) {
    return [];
  } else if (n === 1) {
    return [[1]];
  }
  let board = [];
  for (let i = 0; i < n; i++) {
    let currRow = [];
    for (let j = 0; j < n; j++) {
      currRow.push(0);
    }
    board.push(currRow);
  }


  let testBoard = new Board(board);
  // hasAnyQueenConflictsOn: function(rowIndex, colIndex)
  // testBoard.attributes[0][0] = 1;
  // console.log('xxt,' + JSON.stringify(testBoard.attributes));
  for (let k in testBoard.attributes) {
    if (k === 'n') {
      continue;
    }
    for (let i = 0; i < testBoard.attributes[k].length; i++) {
      testBoard.attributes[k][i] = 1;
      let test = testBoard.hasAnyQueensConflicts();
      if (test) {
        testBoard.attributes[k][i] = 0;
      }
    }
  }
  console.log(testBoard.attributes);
  // var solution = undefined; //fixme

  // // 1: 1
  // // 2: 1
  // // 3: 2


  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  // return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme


  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
