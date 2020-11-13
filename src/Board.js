// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)
let resultArr = [];
(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },



    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {

      // console.log(this.attributes[rowIndex]);
      let counter = 0;
      for (let i = 0; i < this.attributes[rowIndex].length; i++) {
        if (this.attributes[rowIndex][i] === 1) {
          counter++;
        }
      }

      if (counter > 1) {
        return true;
      }
      // console.log(rowIndex);
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      let counter;
      for (let key in this.attributes) {
        counter = 0;
        for (let i = 0; i < this.attributes[key].length; i++) {
          if (this.attributes[key][i] === 1) {
            counter++;
            if (counter > 1) {
              return true;
            }
          }
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      let bigArr = [];

      for (let k in this.attributes) {
        if (k === 'n') {
          continue;
        }
        let n = this.attributes.n - 1;
        while (n >= 0) {
          bigArr.push(this.attributes[k][n]);
          n--;
        }
      }

      //i < this.attributes.n doesn't work because it only works on the first row...
      for (let i = 0; i < bigArr.length; i++) {
        if (bigArr[i] === 1) {
          for (let j = i; j < bigArr.length; j += this.attributes.n) {
            // alert('i-> ' + i + ' <-j-> ' + (j - 1) + ' bigArr ' + bigArr);
            if (bigArr[j] === 1 && j !== i) {
              return true;
            }
          }
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right \\\\\
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // alert(majorDiagonalColumnIndexAtFirstRow);
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function () {
      // console.log('before ' + JSON.stringify(this.attributes));
      for (let key in this.attributes) {
        if (key === 'n') {
          continue;
        }
        this.attributes[key] = this.attributes[key].reverse();
      }

      let test = this.hasAnyMinorDiagonalConflicts();
      // this.attributes.this.hasAnyMinorDiagonalConflicts()
      return test;
      // let counter = 0;
      // let initIndex = -1;

      // let testBoard = this.attributes;

      // for (let i = 0; i < testBoard.n; i++) {
      //   for (let key in testBoard) {
      //     if (key !== 'n' && testBoard[key].indexOf(1) !== -1 && initIndex === -1) {
      //       initIndex = testBoard[key].indexOf(1);
      //       counter++;
      //       continue;
      //     }
      //     if (testBoard[key][initIndex + counter] === 1) {
      //       return true;
      //     } else if (initIndex === -1) {
      //       continue;
      //     } else {
      //       counter++;
      //     }
      //   }
      //   delete testBoard[i];
      // }

      // return false;
    },
    // hasAnyMajorDiagonalConflicts: function() {
    //   let resetFlag = false;
    //   let counter = 0;
    //   let initIndex = -1;

    //   for (let key in this.attributes) {
    //     if (key !== 'n' && this.attributes[key].indexOf(1) !== -1 && initIndex === -1) {
    //       initIndex = this.attributes[key].indexOf(1);
    //       counter++;
    //     }
    //     if (counter + initIndex > this.attributes.n - 1) {
    //       counter = 0;
    //       initIndex = -1;
    //       resetFlag = true;
    //       continue;
    //     }
    //     if (this.attributes[key][initIndex + counter] === 1) {
    //       return true;
    //     } else if (initIndex === -1) {
    //       continue;
    //     } else if (!resetFlag) {
    //       counter++;
    //     } else {
    //       resetFlag = false;
    //     }
    //   }
    //   return false;
    // },



    // Minor Diagonals - go from top-right to bottom-left /////
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      let counter = 0;
      let initIndex = -1;

      let testBoard = this.attributes;

      for (let i = 0; i < testBoard.n; i ++) {
        for (let key in testBoard) {
          if (key !== 'n' && testBoard[key].indexOf(1) !== -1 && initIndex === -1) {
            initIndex = testBoard[key].indexOf(1);
            counter--;
            continue;
          }
          if (testBoard[key][initIndex + counter] === 1) {
            return true;
          } else if (initIndex === -1) {
            continue;
          } else {
            counter--;
          }
        }
        delete testBoard[i];
      }
      return false;
    }

    //     hasAnyMinorDiagonalConflicts: function() {
    //       let resultArr = [];
    //       let result = this.helper(this.attributes, resultArr);
    //       alert(result);
    //       return result.includes(true);
    //     },

    //     helper: function(board, resultArr) {
    //       let counter = 0;
    //       let initIndex = -1;
    //       let initRow = -1;

    //       for (let key in board) {
    //         if (key !== 'n' && board[key].indexOf(1) !== -1 && initIndex === -1) {
    //           initIndex = board[key].indexOf(1);
    //           initRow = key;
    //           counter--;
    //           continue;
    //         }
    //         if (board[key][initIndex + counter] === 1) {
    //           resultArr.push(true);
    // //             return true;
    //         } else if (initIndex === -1) {
    //           continue;
    //         } else {
    //           counter--;
    //         }
    //       }
    //     if (initRow > -1) {
    //         let testBoard = board;
    //         testBoard[initRow][initIndex] = 0;
    //          this.helper(testBoard, resultArr);
    //     }
    //         resultArr.push(false);
    //         return resultArr;
    //     }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
