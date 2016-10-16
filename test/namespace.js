var s = require('../src');
var expect = require('chai').expect;

var isSpec = require('../src/utils/isSpec');
var isPred = require('../src/utils/isPred');

describe('namespace', function() {

  afterEach(function () {
    //TODO: clear registry
  });

  describe('simple defs and gets', function() {
    it('should def and get', function() {
      s('xyz.superapp.item', s.and(s.isObj, s.keys('title', 'content')));
      s('xyz.superapp.item.title', s.isStr);

      expect(isSpec(s('xyz.superapp.item'))).to.be.true;
      expect(isPred(s('xyz.superapp.item.title'))).to.be.true;
    });
  });

  describe.skip('complex struct', function () {
    it('should register and retrieve', function() {
      s('todo', {
        'item': [
          s.keys({
            req: [s('title'), s('content'), s('date'), s('isDone')],
          }),
          s('title', s.isStr),
          s('content', s.and(s.isStr, s.notEmpty)),
          s('date', s.isDate),
          s('isDone', s.isBool),
        ],
        // 'list': s.collOf('item'),
      });

      var ListSpec = s('todo.list');
      var ItemSpec = s('todo.item');
      var contentSpec = s('todo.item.content');

      expect(isSpec(ListSpec)).to.be.true;
      expect(isSpec(ItemSpec)).to.be.true;
      expect(isSpec(ContentSpec)).to.be.true;

      expect(s.isValid(ListSpec, [])).to.be.true;
      expect(s.isValid(ItemSpec, [])).to.be.false;
    });
  });
});
