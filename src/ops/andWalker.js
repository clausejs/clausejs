var Problem = require('../models/Problem');
var isProblem = require('../utils/isProblem');

function andWalker(spec, walkFn) {
  var exprs = spec.exprs;

  return function andWalk(data, walkOpts) {

    var { conform, instrument, justValidate } = walkOpts;

    if(conform || instrument || justValidate) {
      var problems;
      if(!justValidate) {
        problems = [];
      }

      for (var i = 0; i < exprs.length; i += 1) {
        var r = walkFn(exprs[i], data, walkOpts);
        if(isProblem(r)) {
          if(justValidate) {
            return r;
          } else {
            problems.push(r);
          }
        }
      }

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
