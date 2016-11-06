var Problem = require('../models/Problem');
var isProblem = require('../utils/isProblem');

function andWalker(spec, walkFn) {
  var exprs = spec.exprs;

  return function andWalk(data, walkOpts) {

    // for (var i = 0; i < exprs.length; i += 1) {
    //   var r = walkFn()
    // }

    var results = exprs.map(function(e) {
      return walkFn(e, data, walkOpts);
    });

    var { conform, instrument, justValidate } = walkOpts;

    if(conform || instrument) {
      var problems = results.filter(isProblem);

      if(problems.length === 0) {
        return data;
      } else {
        return new Problem(data, exprs, problems, 'One or more expressions failed AND test');
      }
    } else {
      throw 'no impl';
    }

  }
}

module.exports = andWalker;
