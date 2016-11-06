var Problem = require('../models/Problem');
var isProblem = require('../utils/isProblem');

function andWalker(spec, walkFn) {
  var exprs = spec.exprs;

  return function andWalk(data, walkOpts) {

    var { conform, instrument, justValidate } = walkOpts;

    if(conform || instrument || justValidate) {
      var problems, results;
      if(!justValidate) {
        problems = [];
      }

      var r = data;

      for (var i = 0; i < exprs.length; i += 1) {
        r = walkFn(exprs[i], data, walkOpts);
        if(isProblem(r)) {
          if(justValidate) {
            return r;
          } else {
            problems.push(r);
          }
        }
      }

      if(problems.length === 0) {
        if (conform) {
          return r; //return last result TODO: is this correct?
        } else {
          return data;
        }
      } else {
        return new Problem(data, exprs, problems, 'One or more expressions failed AND test');
      }
    } else {
      throw 'no impl';
    }

  }
}

module.exports = andWalker;
