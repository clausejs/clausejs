var fragmentState = function(transitions, index) {
  return {
    transitions: transitions === null ? [] : transitions,
    index: index || null,
  };
};

var fragmentTransition = function(spec, target) {
  return {
    spec: spec,
    target: target,
  };
};

var fragment = function(head, tails) {
  return {
    head: head,
    tails: tails,
  }
};

var namedFragment = function(name, head, tails) {
  var f = fragment(head, tails);
  f.name = name;
  return f;
}

function patch (tails, state) {
  tails.forEach(function(tail) {
    tail.target = state;
  });
};

function epsilonState () {
  return {
    isEpsilon: true,
  };
}

function nameInEpsilonState (name, op) {
  var s = epsilonState();
  s.nameIn = name;
  s.op = op;
  return s;
}

function nameOutEpsilonState (name, op) {
  var s = epsilonState();
  s.nameOut = name;
  s.op = op;
  return s;
}

var build = {};

build.PRED = function(spec) {
  var trans = fragmentTransition(spec, null);
  var head = fragmentState([trans], null);
  var tails = [trans];
  var f = fragment(head, tails);
  return f;
};

build.CAT = function(frags) {
  // var i;
  // for (i = 0; i < frags.length; i++) {
  //   var curr = frags[i];
  //   var next = frags[i + 1];
  //   var trans = fragmentTransition(epsilonState(), f.head);
  //   trans.outName = curr.name;
  //
  // }
  var binaryConcat = function(frag1, currFrag) {

    // var util = require('util');
    // console.log('--------------------------------');
    // console.log(util.inspect(frag1.tails, false, null));
    // console.log('--------------------------------');
    patch(frag1.tails, currFrag.head);
    var head = frag1.head;
    var tails = currFrag.tails;
    var newF = fragment(head, tails);
    return newF;
  };

  frags = frags.map(function addEpsilonState (f) {
    var originalTails = f.tails;
    var trans = fragmentTransition(nameOutEpsilonState(f.name, 'CAT'), null);
    var nameOutState = fragmentState([trans]);
    patch(f.tails, nameOutState);

    var nameInTranstions = f.head.transitions.map(function (t) {
      var s = fragmentState([t]);
      var namedInTrans = fragmentTransition(nameInEpsilonState(f.name, 'CAT'), s);
      return namedInTrans;
    });
    var newHead = fragmentState(nameInTranstions);

    var newF = namedFragment(f.name, newHead, [trans]);

    // var util = require('util');
    // console.log('--------------------------------');
    // console.log(util.inspect(newHead, false, null));
    // console.log('--------------------------------');
    return newF;
    // return f;
  });
  var r = frags.reduce(binaryConcat);
  // console.log(r);
  // var util = require('util');
  // console.log('--------------------------------');
  // console.log(util.inspect(r, false, null));
  // console.log('--------------------------------');

  return r;
};

build.OR = function(frags) {
  frags = frags.map(function(f) {
    var originalTails = f.tails;
    var trans = fragmentTransition(nameOutEpsilonState(f.name, 'OR'), null);
    var nameOutState = fragmentState([trans]);
    patch(f.tails, nameOutState);

    // var nameInTranstions = f.head.transitions.map(function (t) {
    //   var s = fragmentState([t]);
    //   var namedInTrans = fragmentTransition(nameInEpsilonState(f.name), s);
    //   return namedInTrans;
    // });
    // var newHead = fragmentState(nameInTranstions);

    var newF = namedFragment(f.name, f.head, [trans]);
    return newF;

    // var util = require('util');
    // console.log('--------------------------------');
    // console.log(util.inspect(f, false, null));
    // console.log('--------------------------------');
    // return f;
  });
  var binaryAlt = function(frag1, frag2) {
    // console.log(frag1.head, frag2.head);
    var trans1 = fragmentTransition(nameInEpsilonState(frag1.name, 'OR'), frag1.head);
    var trans2 = fragmentTransition(nameInEpsilonState(frag2.name, 'OR'), frag2.head);
    var head = fragmentState([trans1, trans2]);
    var tails = frag1.tails.concat(frag2.tails);
    return namedFragment(frag1.name, head, tails);
  };
  var r = frags.reduce(binaryAlt);
  // console.log(r);
  // var util = require('util');
  // console.log('--------------------------------');
  // console.log(util.inspect(r, false, null));
  // console.log('--------------------------------');
  return r;
};

build.ZERO_OR_MORE = function(frag) {
  var loopTrans = fragmentTransition(epsilonState(), frag.head);
  var breakTrans = fragmentTransition(epsilonState(), null);
  var head = fragmentState([loopTrans, breakTrans]);
  patch(frag.tails, head);
  return fragment(head, [breakTrans]);
};

build.ONE_OR_MORE = function(frag) {
  var loopTrans = fragmentTransition(epsilonState(), frag.head);
  var breakTrans = fragmentTransition(epsilonState(), null);
  var state = fragmentState([loopTrans, breakTrans]);
  patch(frag.tails, state);
  return fragment(frag.head, [breakTrans]);
};

build.ZERO_OR_ONE = function(frag) {
  var matchTrans = fragmentTransition(epsilonState(), frag.head);
  var skipTrans = fragmentTransition(epsilonState(), null);
  var head = fragmentState([matchTrans, skipTrans]);
  var tails = frag.tails.concat([skipTrans]);
  return fragment(head, tails);
};

build.ROOT = function(frag) {
  var finalState = fragmentState(null, null);
  patch(frag.tails, finalState);
  return fragment(frag.head, []);
};

module.exports = build;
