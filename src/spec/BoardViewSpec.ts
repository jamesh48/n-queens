describe('ChessboardView', function() {
  var view: any;

  beforeEach(function() {
    // @ts-ignore
    view = new BoardView({model: new Board({n: 4})});
  });

  it('should exist', function() {
    // @ts-ignore
    expect(view).to.be.ok;
  });
});
