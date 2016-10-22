var expect = require('chai').expect;

var s = require('../src');
var props = s.props;

describe.skip('props', function() {
  it('simple keyset', function() {
    var ObjSpec = props({
      req: ['title', 'userId'],
      opt: ['content'],
    }, {
      'userId': s.isNum,
      'title': s.isStr,
      'content': s.isStr,
    });

    var conformed = { title: 'Do it', content: null, userId: 2 };
    expect(ObjSpec.conform(conformed)).to.deep.equal(conformed);
  });
});
