var C = require('../../src');
var Q = require('q');

var PromiseSpec = C.shape({
  req: {
    then: C.fspec({
      args: C.cat(
        C.or(
          C.isNull, C.isUndefined,
          C.fspec({
            args: C.cat('message', C.isStr),
            ret: C.isUndefined,
          })
        ),
        C.zeroOrOne(
          C.or(
            C.isNull, C.isUndefined,
            C.fspec({
              args: C.cat('rejError', C.any),
            }))
          )
        ),
      ret: C.delayed(() => PromiseSpec), //recursive
    }),
  },
});

var GetHelloSpec = C.fspec({
  args: C.cat(),
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
