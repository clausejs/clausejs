var s = require('../src');
var expect = require('chai').expect;

describe('example model', () => {
  it('stampapp', () => {
    var IdSpec = s.isNum;
    var UserSpec = s.props({
      req: {
        id: IdSpec,
      },
    });

    var StampSpec = s.props({
      req: {
        year: s.isNum,
        title: s.isStr,
      },
    });
    var CollectionSpec = s.props({
      req: {
        title: s.isStr,
        items: s.cat(s.oneOrMore(StampSpec)),
      },
      opt: {
        vendor: s.isStr,
      }
    });
    var s1 = {year: 2012, title: 'h'};
    var s2 = {year: 2000, title: 'w'};
    var s3 = {year: 1910, title: 'z'};

    var coll1 = {
      title: 'Panda 2015',
      items: [s1, s2, s3],
      vendor: 'black market',
    };

    var r = CollectionSpec.conform(coll1);
    expect(r).to.deep.equal(coll1);
  });
});
