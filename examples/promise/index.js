var S = require('../../src');
var Q = require('q');

var PromiseSpec = S.props({
  req: {
    then: S.fspec({
      args: S.cat(
        S.or(
          S.isNull, S.isUndefined,
          S.fspec({
            args: S.cat('message', S.isStr),
            ret: S.isUndefined,
          })
        ),
        S.zeroOrOne(
          S.or(
            S.isNull, S.isUndefined,
            S.fspec({
              args: S.cat('rejError', S.any),
            }))
          )
        ),
      ret: S.delayed(() => PromiseSpec), //recursive
    }),
  },
});

var GetHelloSpec = S.fspec({
  args: S.cat(),
  ret: PromiseSpec,
});

var getHello = GetHelloSpec.instrument(__getHello);

getHello().then(function(m) {
  console.log(m);
});

var getHelloBad = GetHelloSpec.instrument(__getHelloBad);

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
