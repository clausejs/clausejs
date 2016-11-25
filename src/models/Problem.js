function Problem(val, failsPredicate, subproblems, msg) {
  this.isProblem = true;

  if(arguments.length !== 4) {
    throw 'Problem arg len err';
  }

  this.val = val;
  this.name = 'Problem';
  this.failsPredicate = failsPredicate;
  // this.stack = (new Error()).stack;
  this.message = _constructMsg(msg, val, subproblems);
  this.subproblems = subproblems;
};

function _constructMsg(msg, val, subproblems) {
  if(Array.isArray(subproblems)) {
    if (subproblems.length === 0) {
      return `${msg}; val: ${JSON.stringify(val)}`;
    } else {
      var reasons = subproblems.map(function(r) {
        return `(${r.message})`;
      });
      return `${msg}, because ${reasons.join(', ')}`;
    }
  } else if (typeof subproblems === 'object') {
    var reasons = [];
    for (var name in subproblems) {
      reasons.push(`(${name}: ${reasons.message})`);
    }
    return `${msg}, because ${reasons.join(', ')}`;
  }
}

// Problem.prototype = new Error;

module.exports = Problem;
