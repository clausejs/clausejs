var C = require('../../src');
var Q = require('q');

var PromiseClause = C.shape({
  req: {
    then: C.fclause({
      args: C.cat(
        C.or(
          C.isNull, C.isUndefined,
          C.fclause({
            args: C.cat('message', C.isStr),
            ret: C.isUndefined,
          })
        ),
        C.zeroOrOne(
          C.or(
            C.isNull, C.isUndefined,
            C.fclause({
              args: C.cat('rejError', C.any),
            }))
          )
        ),
      ret: C.delayed(() => PromiseClause), //recursive
    }),
  },
});

var GetHelloClause = C.fclause({
  args: C.cat(),
  ret: PromiseClause,
});

var getHello = GetHelloClause.instrument(__getHello);

getHello().then(function(m) {
  console.log(m);
});

var getHelloBad = GetHelloClause.instrument(__getHelloBad);

// TODO: fix this
// this will throw an error
getHelloBad().then(function(m) {
  console.log(m);
}).catch(function (e) {
  console.error(e);
});

// // // // // // // // // //

function __getHello() {
  var deferred = Q.defer();

  setTimeout(function() {
    deferred.resolve('hello');
  });

  return deferred.promise;
}


function __getHelloBad() {
  var deferred = Q.defer();

  setTimeout(function() {
    deferred.resolve(123);
  });

  return deferred.promise;
}
