import { CustomWindow } from "../types";
declare let window: CustomWindow;

describe("solvers", function () {
  window.displayBoard = function () {};
  describe("findNRooksSolution()", function () {
    it("finds a valid solution for n of 1-8", function () {
      // @ts-ignore
      _.range(1, 9).map(function (n: number) {
        // @ts-ignore
        var solutionBoard = new Board(findNRooksSolution(n));
        // @ts-ignore
        var numPieces = _.reduce(
          solutionBoard.rows(),
          function (memo: number, row: number) {
            return (
              memo +
              // @ts-ignore
              _.reduce(
                row,
                function (memo: number, col: number) {
                  return memo + col;
                },
                0
              )
            );
          },
          0
        );
        // @ts-ignore
        expect(solutionBoard.get("n")).to.equal(n);
        // @ts-ignore
        expect(numPieces).to.equal(n);
        // @ts-ignore
        expect(solutionBoard.hasAnyRooksConflicts()).to.be.equal(false);
      });
    });
  });

  describe("countNRooksSolutions()", function () {
    it("finds the number of valid solutions for n of 1-8", function () {
      // @ts-ignore
      _.range(1, 9).map(function (n: number) {
        // @ts-ignore
        var solutionCount = countNRooksSolutions(n);
        var expectedSolutionCount = [1, 1, 2, 6, 24, 120, 720, 5040, 40320][n];
        // @ts-ignore
        expect(solutionCount).to.be.equal(expectedSolutionCount);
      });
    });
  });

  describe("findNQueensSolution()", function () {
    it("finds a valid solution for n of 0-7", function () {
      // Skip 2 and 3 because they have no solution.
      [0, 1, 4, 5, 6, 7, 8].map(function (n) {
        // @ts-ignore
        var solutionBoard = new Board(findNQueensSolution(n));
        // @ts-ignore
        var numPieces = _.reduce(
          solutionBoard.rows(),
          function (memo: number, row: number) {
            return (
              memo +
              // @ts-ignore
              _.reduce(
                row,
                function (memo: number, col: number) {
                  return memo + col;
                },
                0
              )
            );
          },
          0
        );
        // @ts-ignore
        expect(solutionBoard.get("n")).to.equal(n);
        // @ts-ignore
        expect(numPieces).to.equal(n);
        // @ts-ignore
        expect(solutionBoard.hasAnyQueensConflicts()).to.be.equal(false);
      });

      // Check 2 and 3 for no solution
      [2, 3].map(function (n) {
        // @ts-ignore
        var solutionBoard = new Board(findNQueensSolution(n));
        // @ts-ignore
        var numPieces = _.reduce(
          solutionBoard.rows(),
          function (memo: number, row: number) {
            return (
              memo +
              // @ts-ignore
              _.reduce(
                row,
                function (memo: number, col: number) {
                  return memo + col;
                },
                0
              )
            );
          },
          0
        );
        // @ts-ignore
        expect(numPieces).to.equal(0);
        // @ts-ignore
        expect(solutionBoard.get("n")).to.equal(n);
      });
    });
  });

  describe("countNQueensSolutions()", function () {
    it("finds the number of valid solutions for n of 0-8", function () {
      // @ts-ignore
      _.range(0, 9).map(function (n: number) {
        // @ts-ignore
        var solutionCount = countNQueensSolutions(n);
        var expectedSolutionCount = [1, 1, 0, 0, 2, 10, 4, 40, 92][n];
        // @ts-ignore
        expect(solutionCount).to.be.equal(expectedSolutionCount);
      });
    });
  });
});
