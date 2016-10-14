var s = require('../src');
var expect = require('chai').expect;

var isSpec = require('../src/utils/isSpec');

describe.skip('namespace', function() {

  afterEach(function () {
    //TODO: clear registry
  });

  it('should register and retrieve', function() {

    s('todo', {
      'item': [s.keys({req: ['title', 'content', 'date', 'isDone']}), {
        'title': s.isstr,
        'content': s.and(s.isstr, s.notEmpty),
        'date': s.isDate,
        'isDone': s.isBool,
      }],
      // 'list': s.collOf('item'),
    });

    var ListSpec = s('todo.list');
    var ItemSpec = s('todo.item');

    expect(isSpec(ListSpec)).to.be.true;
    expect(isSpec(ItemSpec)).to.be.true;

    expect(s.isValid(ListSpec, [])).to.be.true;
    expect(s.isValid(ItemSpec, [])).to.be.false;
  });
});
