var expect = require('chai').expect;

var s = require('../src');
var Problem = s.Problem;
var props = s.props;

function startWithOo(key) {
  return key.indexOf('oo') === 0;
}

describe.skip('props', function() {
  it('simple keyset', function() {
    var ObjSpec = props({
      req: {
        'title': s.isStr,
        'userId': s.isNum,
      },
      opt: {
        'content': s.isStr,
        'ooProps': [startWithOo, s.isNum],
      },
    });

    var conformed1 = { title: 'Do it', content: null, userId: 2 };
    var conformed2 = { title: 'Do it', content: null, userId: 2, ooA: 1, ooB: 2, ooC: 3 };
    var unconformed1 = { content: false, userId: 2 };
    var unconformed2 = { title: 'Do it', content: false, userId: 'wrong' };
    var unconformed3 = { title:  1234, content: null, userId: 2 };
    var unconformed4 = { title: 'Do it', content: false, userId: 'wrong', unknownField: 2 };

    expect(ObjSpec.conform(conformed1)).to.deep.equal(conformed1);
    // expect(ObjSpec.conform(conformed2)).to.deep.equal(
    //   { title: 'Do it', content: null, userId: 2, ooProps: {
    //     ooA: 1, ooB: 2, ooC: 3,
    //   }});
    //
    // expect(ObjSpec.conform(unconformed1)).to.be.an.instanceof(Problem);
    // expect(ObjSpec.conform(unconformed2)).to.be.an.instanceof(Problem);
    // expect(ObjSpec.conform(unconformed3)).to.be.an.instanceof(Problem);
    // expect(ObjSpec.conform(unconformed4)).to.be.an.instanceof(Problem);
  });
});
