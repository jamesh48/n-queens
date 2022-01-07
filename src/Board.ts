// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)
import { CustomWindow } from "./types";
declare let window: CustomWindow;

(function () {
  // @ts-ignore
  window.Board = Backbone.Model.extend({
    initialize: function (params: any) {
      // @ts-ignore
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log(
          "Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:"
        );
        console.log(
          "\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})",
          "color: blue;",
          "color: black;",
          "color: blue;",
          "color: black;",
          "color: grey;"
        );
        console.log(
          "\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])",
          "color: blue;",
          "color: black;",
          "color: blue;",
          "color: black;",
          "color: blue;",
          "color: black;",
          "color: blue;",
          "color: black;",
          "color: blue;",
          "color: black;",
          "color: blue;",
          "color: black;",
          "color: blue;",
          "color: black;",
          "color: blue;",
          "color: black;",
          "color: blue;",
          "color: black;",
          "color: blue;",
          "color: black;",
          "color: grey;"
        );
      } else if (params.hasOwnProperty("n")) {
        this.set(makeEmptyMatrix(this.get("n")));
      } else {
        this.set("n", params.length);
      }
    },

    rows: function () {
      // @ts-ignore
      return _(_.range(this.get("n"))).map(function (rowIndex: number) {
        // @ts-ignore
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function (rowIndex: number, colIndex: number) {
      this.get(rowIndex)[colIndex] = +!this.get(rowIndex)[colIndex];
      this.trigger("change");
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (
      rowIndex: number,
      colIndex: number
    ) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (
      rowIndex: number,
      colIndex: number
    ) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex: number, colIndex: number) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(
          this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)
        ) ||
        this.hasMinorDiagonalConflictAt(
          this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex)
        )
      );
    },

    hasAnyQueensConflicts: function () {
      return (
        this.hasAnyRooksConflicts() ||
        this.hasAnyMajorDiagonalConflicts() ||
        this.hasAnyMinorDiagonalConflicts()
      );
    },

    _isInBounds: function (rowIndex: number, colIndex: number) {
      return (
        0 <= rowIndex &&
        rowIndex < this.get("n") &&
        0 <= colIndex &&
        colIndex < this.get("n")
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
    hasRowConflictAt: function (_rowIndex: number) {},

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function () {
      let counter;
      let board;

      if (this.attributes[0] === undefined) {
        // board = this._current_previousA
      } else {
        board = this.attributes;
      }

      for (let key in board) {
        counter = 0;
        for (let i = 0; i < board[key].length; i++) {
          if (board[key][i] === 1) {
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
    hasColConflictAt: function (_colIndex: number) {
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function () {
      let bigArr = [];

      for (let k in this.attributes) {
        if (k === "n") {
          continue;
        }
        let n = this.attributes.n - 1;
        while (n >= 0) {
          bigArr.push(this.attributes[k][n]);
          n--;
        }
      }

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
    hasMajorDiagonalConflictAt: function (_majorDiagonalColumnIndexAtFirstRow: number) {
      return false;
    },

    hasAnyMajorDiagonalConflicts: function () {
      let testBoard = this.attributes;
      let rowIndexCounter: number = -1;
      for (let i = 0; i < testBoard.n; i++) {
        let counter = 0;
        let initIndex = -1;

        for (let key in testBoard) {
          if (Number(key) <= rowIndexCounter) {
            continue;
          }
          if (key !== "n" && testBoard[key].indexOf(1) !== -1 && initIndex === -1) {
            initIndex = testBoard[key].indexOf(1);
            counter++;
            continue;
          }
          if (testBoard[key][initIndex + counter] === 1) {
            return true;
          } else if (initIndex === -1) {
            continue;
          } else {
            counter++;
          }
        }
        rowIndexCounter++;
      }
      return false;
    },

    // Minor Diagonals - go from top-right to bottom-left /////
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function (_minorDiagonalColumnIndexAtFirstRow: number) {
      return false; // fixme
    },

    hasAnyMinorDiagonalConflicts: function () {
      let testBoard = this.attributes;
      let rowIndexCounter = -1;
      for (let i = 0; i < testBoard.n; i++) {
        let counter = 0;
        let initIndex = -1;

        for (let key in testBoard) {
          if (Number(key) <= rowIndexCounter) {
            continue;
          }

          if (key !== "n" && testBoard[key].indexOf(1) !== -1 && initIndex === -1) {
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
        rowIndexCounter++;
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/
  });

  var makeEmptyMatrix = function (n: number) {
    // @ts-ignore
    return _(_.range(n)).map(function () {
      // @ts-ignore
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };
})();
