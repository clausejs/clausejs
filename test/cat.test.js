var S = require('../src/');
var expect = require('chai').expect;
var Problem = S.Problem;

describe('cat', function() {
  var fn = function() {};
  var conformist = [ fn, {}, fn, {a: 1} ];
  var nonconformist = [ {}, fn, {}, fn];
  var extendedCase = conformist.concat([{extra: 'elements'}, 2]);
  var emptyCase = [];
  var lesserCase = conformist.slice(0, -1);
  var NamedSpec, UnnamedSpec;

  function init() {
    NamedSpec = S.cat('z', S.isFn, 'b', S.isObj, 'c', S.isFn, 'a', S.isObj);
    UnnamedSpec = S.cat(S.isFn, S.isObj,S.isFn, S.isObj);
  }

  describe('conform', function() {

    beforeEach(init);

    it('empty case', function() {
      var EmptySpec = S.cat();
      var conformed = EmptySpec.conform([]);
      var unconformed = EmptySpec.conform([1]);
      expect(conformed).to.deep.equal([]);
      expect(unconformed instanceof Problem).to.be.true;
    });

    it('single val case', () => {
      var ss = S.cat(S.isNum);
      var r = ss.conform([44]);
      expect(r).to.deep.equal([44]);
    });

    it('named', function() {
      var NamedCommentedSpec = S.cat('z', 'it\'s a fuuuunction', S.isFn, 'b', S.isObj, 'c', 'another fuuuunction', S.isFn, 'a', S.isObj);

      var conformed = NamedCommentedSpec.conform(conformist);
      expect(conformed).to.deep.equal({ z: fn, b: {}, c: fn, a: { a: 1 } });
      var nonconformed = NamedCommentedSpec.conform(nonconformist);
      expect(nonconformed instanceof Problem).to.be.true;
    });

    it('named, grouped', function() {
      var NamedGroupedSpec = S.cat(
        ['z', 'it\'s a fuuuunction', S.isFn],
        ['b', S.isObj],
        ['c', 'another fuuuunction', S.isFn],
        ['a', S.isObj]
      );

      var conformed = NamedGroupedSpec.conform(conformist);
      expect(conformed).to.deep.equal({ z: fn, b: {}, c: fn, a: { a: 1 } });
      var nonconformed = NamedGroupedSpec.conform(nonconformist);
      expect(nonconformed instanceof Problem).to.be.true;
    });

    it('named with some comments', function() {
      var conformed = NamedSpec.conform(conformist);
      expect(conformed).to.deep.equal({ z: fn, b: {}, c: fn, a: { a: 1 } });
      var nonconformed = NamedSpec.conform(nonconformist);
      expect(nonconformed instanceof Problem).to.be.true;
    });

    it('unnamed', function() {
      var conformed = UnnamedSpec.conform(conformist);
      expect(conformed).to.deep.equal(conformist);
      var nonconformed = UnnamedSpec.conform(nonconformist);
      expect(nonconformed instanceof Problem).to.be.true;
    });
  });

  describe('validity', function() {

    beforeEach(init);

    [[() => NamedSpec, 'named'], [() => UnnamedSpec, 'unnamed']].forEach(function(p) {
      var name = p[1];
      it(name, function() {
        var Spec = p[0]();

        //invalid case: more elems than specs
        expect(S.isValid(Spec, extendedCase)).to.be.false;

        //empty case
        expect(S.isValid(Spec, emptyCase)).to.be.false;

        //invalid case: less elem than spec
        expect(S.isValid(Spec, lesserCase)).to.be.false;
      });
    });
  });
});
