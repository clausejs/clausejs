var s = require('../src');

describe.skip('namespace', function() {

  afterEach(function () {
    //TODO: clear registry
  });

  it('should register', function() {

    s('todo', {
      'item': [s.keys({req: ['title', 'content', 'date', 'isDone']}), {
        'title': s.isstr,
        'content': s.and(s.isstr, s.notEmpty),
        'date': s.isDate,
        'isDone': s.isBool,
      }],
      'list': s.collOf('item'),
    });

    expect(s.isValid('todo.list', [])).to.be.true;
    expect(s.isValid('todo.item', [])).to.be.false;
  });
});
