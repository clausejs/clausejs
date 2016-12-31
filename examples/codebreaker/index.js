// Tutorial derived from http://blog.cognitect.com/blog/2016/10/5/interactive-development-with-clojureclause

/*

Problem

We want a function that accepts a secret code and a guess, and returns a score
for that guess. Codes are made of 4 to 6 colored pegs, selected from six colors:
[r]ed, [y]ellow, [g]reen, [c]yan, [b]lack, and [w]hite. The score is based on
the number of pegs in the guess that match the secret code. A peg in the guess
that matches the color of the peg in the same position in the secret code is
considered an exact match, and a peg that matches a peg in a different position
in the secret code is considered a loose match.

For example, if the secret code is ['r', 'y', 'g', 'c'] and the guess is
['c', 'y', 'g'. 'b'], the score would be { exactMatches: 2, looseMatches: 1 }
because 'y' and 'g' appear in the same positions and 'c' appears in a different
position.

*/

var s = require('../../src');
var _ = require('lodash');

var isPeg = function(x) {
  return ['r', 'y', 'c', 'g'].indexOf(x) >= 0;
}

var CodeClause = s.collOf(isPeg, { minCount: 4, maxCount: 6 });
var ScoreFnClause = s.fclause({
  args: s.cat('secret', CodeClause, 'guess', CodeClause),
});

// TODO: implement
// ScoreFnClause.args.exercise()

ScoreFnClause = s.fclause({
  args: s.and(
    s.cat('secret', CodeClause, 'guess', CodeClause),
    ({secret, guess}) => secret.length === guess.length
  )
});

// ScoreFnClause.args.exercise()

ScoreFnClause = s.fclause({
  args: s.and(
    s.cat('secret', CodeClause, 'guess', CodeClause),
    ({secret, guess}) => secret.length === guess.length
  ),
  ret: s.shape({
    req: {
      exactMatches: s.isNatInt,
      looseMatches: s.isNatInt,
    }
  }),
});

// ScoreFnClause.ret.exercise()

ScoreFnClause = s.fclause({
  args: s.and(
    s.cat('secret', CodeClause, 'guess', CodeClause),
    ({secret, guess}) => secret.length === guess.length
  ),
  ret: s.shape({
    req: {
      exactMatches: s.isNatInt,
      looseMatches: s.isNatInt,
    }
  }),
  fn: ({args: {secret}, ret}) => {
    var sums = _.sum(_.values(ret));
    var secretCounts = secret.length;
    return secretCounts >= sums && sums >= 0;
  }
});
