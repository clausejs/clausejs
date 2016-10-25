var s = require('../src');
var expect = require('chai').expect;

function isFamily(x) {
  return x.lastName.indexOf('Staff') >= 0;
}

describe('example model', () => {
  it('stampapp', () => {
    var IdSpec = s.isNum;
    var UserSpec = s.props({
      req: {
        id: IdSpec,
        firstName: s.isStr,
        lastName: s.isStr,
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
        items: s.oneOrMore(s.and(StampSpec, s.isObj)),
        owner: s.and(UserSpec, isFamily)
      },
      opt: {
        vendor: s.isStr,
      }
    });
    var s1 = {year: 2012, title: 'h'};
    var s2 = {year: 2000, title: 'w'};
    var s3 = {year: 1910, title: 'z'};

    var u = { id: 1, firstName: 'John', lastName: 'Staff' };

    var coll1 = {
      title: 'Panda 2015',
      items: [s1, s2, s3],
      vendor: 'black market',
      owner: u,
    };

    var r = CollectionSpec.conform(coll1);
    expect(r).to.deep.equal(coll1);
  });
});
