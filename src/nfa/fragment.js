var predicates = require('./predicates.js');
var EPSILON = "\u03B5";

var fragmentState = function(transitions, index) {
  return {
    transitions: transitions ? transitions : [],
    index: index
  };
};

var fragmentTransition = function(name, target) {
  return {
    name: name,
    target: target
  };
};

var fragment = function(head, tails) {
  return {
    head: head,
    tails: tails
  }
};

var patch = function(tails, state) {
  tails.forEach(function(tail) {
    tail.target = state;
  });
};

var build = {};

build['PRED'] = function(name) {
  var trans = fragmentTransition(name, null);
  var head = fragmentState([trans]);
  var tails = [trans];
  return fragment(head, tails);
};

build['CAT'] = function(frags) {
  var binaryConcat = function(frag1, frag2) {
    patch(frag1.tails, frag2.head);
    var head = frag1.head;
    var tails = frag2.tails;
    return fragment(head, tails);
  };
  return frags.reduce(binaryConcat);
};

build['OR'] = function(frags) {
  var binaryAlt = function(frag1, frag2) {
    var trans1 = fragmentTransition(EPSILON, frag1.head);
    var trans2 = fragmentTransition(EPSILON, frag2.head);
    var head = fragmentState([trans1, trans2]);
    var tails = frag1.tails.concat(frag2.tails);
    return fragment(head, tails);
  };
  return frags.reduce(binaryAlt);
};

build['ZERO_OR_MORE'] = function(frag) {
  var loopTrans = fragmentTransition(EPSILON, frag.head);
  var breakTrans = fragmentTransition(EPSILON, null);
  var head = fragmentState([loopTrans, breakTrans]);
  patch(frag.tails, head);
  return fragment(head, [breakTrans]);
};

build['ONE_OR_MORE'] = function(frag) {
  var loopTrans = fragmentTransition(EPSILON, frag.head);
  var breakTrans = fragmentTransition(EPSILON, null);
  var state = fragmentState([loopTrans, breakTrans]);
  patch(frag.tails, state);
  return fragment(frag.head, [breakTrans]);
};

build['ZERO_OR_ONE'] = function(frag) {
  var matchTrans = fragmentTransition(EPSILON, frag.head);
  var skipTrans = fragmentTransition(EPSILON, null);
  var head = fragmentState([matchTrans, skipTrans]);
  var tails = frag.tails.concat([skipTrans]);
  return fragment(head, tails);
};

build.root = function(frag) {
  var finalState = fragmentState();
  patch(frag.tails, finalState);
  return fragment(frag.head, []);
};

module.exports = build;
