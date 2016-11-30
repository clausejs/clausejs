const PAREN_PAIRS = '❰❮❬❨❪﹙₍₎﹚❫❩❭❯❱';

function Problem(val, failsPredicate, subproblems, msg) {
  this.isProblem = true;

  if(arguments.length !== 4) {
    throw 'Problem arg len err';
  }

  this.val = val;
  this.name = 'Problem';
  this.failsPredicate = failsPredicate;
  // this.stack = (new Error()).stack;
  this.rawMsg = msg;
  this.subproblems = subproblems;

  this.constructMessage = function constructMessage(lvl) {
    if(Array.isArray(subproblems)) {
      if (subproblems.length === 0) {
        return `${msg}; val: ${JSON.stringify(val)}`;
      } else {
        var reasons = subproblems.map(function(r) {
          return `${_open(lvl)}${r.constructMessage(lvl + 1)}${_close(lvl)}`;
        });
        return `${msg}, because ${reasons.join(', ')}`;
      }
    } else if (typeof subproblems === 'object') {
      var reasons = [];
      for (var name in subproblems) {
        reasons.push(`${_open(lvl)}${name}: ${subproblems[name].constructMessage(lvl + 1)}${_close(lvl)}`);
      }
      return `${msg}, because ${reasons.join(', ')}`;
    }
  };

  this.message = this.constructMessage(0);
};

function _open(lvl) {
  return PAREN_PAIRS[lvl];
}

function _close(lvl) {
  return PAREN_PAIRS[PAREN_PAIRS.length - lvl - 1];
}

Problem.prototype = new Error;

module.exports = Problem;
