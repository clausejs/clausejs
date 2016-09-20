var S = require('../src');

describe.only('named specs', function() {
  afterEach(function () {
    //TODO: clear registry
  });

  it('should register', function() {

    S('todo', {
      'item': [S.keys({req: ['title', 'content', 'date', 'isDone']}), {
        'title': S.isStr,
        'content': S.and(S.isStr, S.notEmpty),
        'date': S.isDate,
        'isDone': S.isBool
      }],
      'list': S.collOf('item'),
    });

    expect(S.isValid('todo.list', [])).to.be.true;
    expect(S.isValid('todo.item', [])).to.be.false;
  });
});
