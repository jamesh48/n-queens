// This file is a Backbone View.
// It's part of the board visualizer

import { CustomWindow } from "./types";
declare let window: CustomWindow;
(function () {
  // @ts-ignore
  window.BoardView = Backbone.View.extend({
    tagName: "table",

    initialize: function () {
      this.model.on("change", this.render, this);
    },

    render: function () {
      var model = this.model;
      // @ts-ignore
      return this.$el.html(
        // @ts-ignore
        _(_.range(model.get("n"))).map(function (rowIndex: number) {
          // @ts-ignore
          return $('<tr class="row"/>').html(
            // @ts-ignore
            _(_.range(model.get("n"))).map(function (colIndex: number) {
              // @ts-ignore
              var $square = $('<td class="square"/>')
                .on("click", function () {
                  model.togglePiece(rowIndex, colIndex);
                })
                .addClass(["positive", "negative"][(rowIndex + colIndex) % 2]);
              model.get(rowIndex)[colIndex] && $square.html("&#9813;");
              model.hasAnyQueenConflictsOn(rowIndex, colIndex) &&
                $square.addClass("inConflict");
              return $square;
            })
          );
        })
      );
    }
  });
})();
