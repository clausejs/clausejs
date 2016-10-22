var expect = require('chai').expect;

var s = require('../src');
var Problem = s.Problem;
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
    var unconformed1 = { title: 'Do it', content: false, userId: 'wrong' };
    var unconformed2 = { title:  1234, content: null, userId: 2 };
    var unconformed3 = { title: 'Do it', content: false, userId: 'wrong', unknownField: 2 };
    expect(ObjSpec.conform(unconformed1)).to.be.an.instanceof(Problem);
    expect(ObjSpec.conform(unconformed2)).to.be.an.instanceof(Problem);
    expect(ObjSpec.conform(unconformed3)).to.be.an.instanceof(Problem);
  });
});
