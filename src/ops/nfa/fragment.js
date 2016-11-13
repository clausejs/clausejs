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

function namedEpsilonState (dir, name, op, group) {
  var s = epsilonState();
  s.name = name;
  s.op = op;
  s.group = group;
  s.dir = dir;
  return s;
}

function frontWithState(state, f) {
  var transIn = fragmentTransition(state, f.head);
  var newHead = fragmentState([transIn]);
  var newF = fragment(newHead, f.tails);
  return newF;
}

function rearWithState(state, f) {
  var newTrans = fragmentTransition(state, null);
  var newS = fragmentState([newTrans], null)
  patch(f.tails, newS);
  var r = fragment(f.head, [newTrans]);
  return r;
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

  var binaryConcat = function(frag1, currFrag) {
    patch(frag1.tails, currFrag.head);
    var head = frag1.head;
    var tails = currFrag.tails;
    var newF = fragment(head, tails);
    return newF;
  };

  frags = frags.map(function addEpsilonState (f) {
    var trans = fragmentTransition(
      namedEpsilonState('out', f.name, 'CAT'), null);
    var nameOutState = fragmentState([trans]);
    patch(f.tails, nameOutState);

    var nameInTranstions = f.head.transitions.map(function (t) {
      var s = fragmentState([t]);
      var namedInTrans = fragmentTransition(
        namedEpsilonState('in', f.name, 'CAT'), s);
      return namedInTrans;
    });
    var newHead = fragmentState(nameInTranstions);

    var newF = namedFragment(f.name, newHead, [trans]);
    return newF;
  });
  var r;
  if(frags.length > 0) {
    r = frags.reduce(binaryConcat);
  } else {
    var s = epsilonState();
    var t = fragmentTransition(s, null);
    var ss = fragmentState([t]);
    r = fragment(ss, [t]);
  }
  r = frontWithState(namedEpsilonState('multi_enter', null, 'CAT', 'in'), r);
  r = rearWithState(namedEpsilonState('multi_exit', null, 'CAT', 'out'), r);
  return r;
};

build.OR = function(frags) {
  frags = frags.map(function(f) {
    var outState = namedEpsilonState('out', f.name, 'OR');
    var trans = fragmentTransition(outState, null);
    var nameOutState = fragmentState([trans]);
    patch(f.tails, nameOutState);
    var transIn = fragmentTransition(namedEpsilonState('in', f.name, 'OR'), f.head);
    var newHead = fragmentState([transIn]);
    var newF = namedFragment(f.name, newHead, [trans]);
    return newF;
  });
  var binaryAlt = function(frag1, frag2) {
    var combinedTransitions = frag1.head.transitions.concat(frag2.head.transitions);
    var head = fragmentState(combinedTransitions);
    var tails = frag1.tails.concat(frag2.tails);
    var acc = namedFragment(frag1.name, head, tails);
    return acc;
  };

  var newF = frags.reduce(binaryAlt);
  newF = frontWithState(namedEpsilonState('enter', null, 'OR'), newF);
  newF = rearWithState(namedEpsilonState('exit', null, 'OR'), newF);

  return newF;
};

build.Z_OR_M = function(frag) {
  var l = 'Z_OR_M';
  var loopTrans = fragmentTransition(namedEpsilonState('loop', null, l), frag.head);
  var breakTrans = fragmentTransition(epsilonState(), null);
  var head = fragmentState([loopTrans, breakTrans]);
  patch(frag.tails, head);
  var newF = fragment(head, [breakTrans]);

  var nameInTranstions = newF.head.transitions.map(function (t) {
    var s = fragmentState([t]);
    var namedInTrans = fragmentTransition(epsilonState(), s);
    return namedInTrans;
  });
  var newHead = fragmentState(nameInTranstions);

  newF = fragment(newHead, newF.tails);
  newF = frontWithState(namedEpsilonState('maybe_enter', null, l, 'in'), newF);
  newF = rearWithState(namedEpsilonState('maybe_exit', null, l, 'out'), newF);

  return newF;
};

build.O_OR_M = function(frag) {
  var l = 'O_OR_M';
  var loopTrans = fragmentTransition(namedEpsilonState('loop', null, l), frag.head);
  var breakTrans = fragmentTransition(epsilonState(), null);
  var state = fragmentState([loopTrans, breakTrans]);
  patch(frag.tails, state);

  var newF = fragment(frag.head, [breakTrans]);
  newF = frontWithState(namedEpsilonState('maybe_enter', null, l, 'in'), newF);
  newF = rearWithState(namedEpsilonState('maybe_exit', null, l, 'out'), newF);

  return newF;
};

build.Z_OR_O = function(frag) {
  var l = 'Z_OR_O';
  var matchTrans = fragmentTransition(namedEpsilonState('loop', null, l), frag.head);
  var skipTrans = fragmentTransition(epsilonState(), null);
  var head = fragmentState([matchTrans, skipTrans]);
  var tails = frag.tails.concat([skipTrans]);

  var newF = fragment(head, tails);
  newF = frontWithState(namedEpsilonState('maybe_single_enter', null, l), newF);
  newF = rearWithState(namedEpsilonState('maybe_single_exit', null, l), newF);

  return newF;
};

build.ROOT = function(frag) {
  var finalState = fragmentState(null, null);
  patch(frag.tails, finalState);
  return fragment(frag.head, []);
};

module.exports = build;
