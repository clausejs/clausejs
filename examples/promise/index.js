var S = require('../../src');
var Q = require('q');

var PromiseSpec = S.props({
  req: {
    then: S.fspec({
      args: S.cat(S.fspec({
        args: S.cat('message', S.isStr),
        ret: S.isUndefined,
      })),
      ret: S('promiseTest.Promise'),
    }),
  },
});

S('promiseTest.Promise', PromiseSpec);

var GetPromiseSpec = S.fspec({
  ret: PromiseSpec,
});

var getPromise = GetPromiseSpec.instrument(__getPromise);

getPromise().then(function(m) {
  console.log(m);
});

function __getPromise() {
  var deferred = Q.defer();

  setTimeout(function() {
    deferred.resolve('hello');
  });

  return deferred.promise;
}
