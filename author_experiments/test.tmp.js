require( 'babel-core/register' );

// var s = require( '../src/core/regex' );
var C = require( '../src' );

var mySpec = C.cat( 'a', C.isStr, {} );


// var PropagatedAndSpec = C.and(
//   C.isArray,
//   C.cat(
//     'firstPart', C.oneOrMore( C.isNum ),
//     'secondPart', C.isBool,
//     'thirdPart', C.oneOrMore( C.isNum ) ),
//   function firstThirdPartEqualLen( cargs ) {
//     const { firstPart, thirdPart } = cargs;
//     console.log( cargs );
//     return firstPart.length === thirdPart.length;
//   }
// );
//
// var conformed1 = [ 1, 2, 3, 4, true, 5, 6, 7, 8 ];
// console.log( PropagatedAndSpec.conform( conformed1 ) );


// var NumOrStr = C.or( C.isNum, C.isStr, C.isObj, C.isDate, C.isNatInt );
// var r = NumOrStr.conform( 's' );
// console.log( NumOrStr );

// C( 'xyz.superapp.item/title', s.isStr );

// console.log( s );

// var AdderFnSpec = s.fspec({
//   args: s.cat('x', s.isNum),
//   ret: s.fspec({
//     args: s.cat('y', s.isNum),
//     ret: s.isNum
//   }),
// });
//
// var adderFn = AdderFnSpec.instrument(function (x) {
//   return function (y) {
//     console.log(x, y);
//     return x + y;
//   };
// });
// var brokenAdderFn = AdderFnSpec.instrument(() => (y) => 'z');
// console.log(adderFn(1)(2))

// var NamedGroupedSpec = C.cat(
//   ['z', 'it\'s a fuuuunction', C.isFn],
//   ['b', C.isObj],
//   ['c', 'another fuuuunction', C.isFn],
//   ['a', C.isObj]
// );
//
// var conformed = NamedGroupedSpec.conform(conformist);

// function startWithOo(key) {
//   return key.indexOf('oo') === 0;
// }
//
// var ObjSpec = C.shape({
//   req: {
//     'title': s.isStr,
//     'userId': s.isNum,
//   },
//   opt: {
//     'content': s.isStr,
//     'ooShape': [startWithOo, C.shape({
//       req: {
//         'val': s.isNum,
//       },
//     })],
//   },
// });
//
// var conformed1 = { title: 'Do it', content: 'blah', userId: 2 };
// var conformed2 = { title: 'Do it', content: 'blah', userId: 2, ooA: {val: 1}, ooB: {val: 2}, ooC: {val: 3} };
// var unconformed1 = { content: false, userId: 2 };
// var unconformed2 = { title: 'Do it', content: false, userId: 'wrong' };
// var unconformed3 = { title:  1234, content: null, userId: 2 };
// var unconformed4 = { title: 'Do it', content: false, userId: 'wrong', unknownField: 2 };
//
// ObjSpec.conform(conformed1);
// ObjSpec.conform(unconformed1);
// console.log(ObjSpec.conform(conformed2));
//
// ObjSpec.conform(unconformed2);
// ObjSpec.conform(unconformed3);
// ObjSpec.conform(unconformed4);

// var fnList = ['shape', 'isValid', 'conform', 'fspec', 'isObj', 'isFn'];

// var SpecObj = C.keys({req: fnList});
// var InsaneSpecObj = C.keys({req: fnList.concat(['voodooooooooo'])});
// console.log(C.isValid(SpecObj, S));
// console.log(C.isValid(InsaneSpecObj, S));

// var NamedGroupedSpec = C.cat(
//   ['z', 'it\'s a fuuuunction', C.isFn],
//   ['b', C.isObj],
//   ['c', 'another fuuuunction', C.isFn],
//   ['a', C.isObj]
// );
//
// var conformist = [function(){}, {}, function() {}, {}];
//
// var conformed = NamedGroupedSpec.conform(conformist);
//
// console.log(conformed);

// var Spec = s.cat('a', s.isNum, 'b', s.isStr);

// var Spec = s.or(
//   // s.zeroOrMore(s.cat(s.isStr, s.isNum)),
//   s.collOf(s.cat(s.isStr, s.isNum))
// );

// var r = Spec.conform([1, '2']);

// console.log(r);

//
// var AdderFnSpec = s.fspec({
//   args: s.cat('x', s.isNum),
//   ret: s.fspec({
//     args: s.cat('y', s.isNum),
//     ret: s.isNum,
//   }),
// });
//
// var adderFn = function(x) {
//   return function(y) {
//     return x + y;
//   }
// };
// var adderFn = AdderFnSpec.instrument(adderFn);
// var brokenAdderFn = AdderFnSpec.instrument((x) => (y) => 'z');
// var r = brokenAdderFn(1)(3);
// console.log(r);


// var sheepCounterSpec = C.fspec({
//   args: C.cat(C.isNum),
//   ret: s.isStr,
// });
//
// var sheepCounter = sheepCounterSpec.instrument(function(c) {
//   return c + ' sheep and counting.';
// });
//
// var r = sheepCounter('hello');
// console.log(r);

// var ss = s.cat(s.isNum);
// var r = ss.conform([2]);
// console.log(r);



// var NamedSpec = s.cat('z', s.isFn, 'b', s.isObj, 'c', s.isFn, 'a', s.isObj);
// // var UnnamedSpec = C.cat(C.isFn, C.isObj,C.isFn, C.isObj);
//
// var EmptySpec = s.cat();
//
// var conformed = EmptySpec.conform([]);
// var unconformed = EmptySpec.conform([1]);

// console.log('c', conformed, unconformed);
// expect(conformed).to.deep.equal({ z: fn, b: {}, c: fn, a: { a: 1 } });
// var nonconformed = NamedSpec.conform(nonconformist);

// var AmpliferSpec = s.fspec({
//   args: s.cat(s.isNum),
//   ret: s.isNum,
// });
//
// var AdderFnSpec = s.fspec({
//   args: s.cat('amplifier', AmpliferSpec, 'x', s.isNum),
//   ret: s.fspec({
//     args: s.cat('y', s.isNum),
//     ret: s.isNum,
//   }),
// });
// var adderFn = AdderFnSpec.instrument((amp, x) => (y) => amp(x) + y);
// var r = adderFn((x) => x * 2, 1)(2);

// var SS = s.or('a', s.shape({
//   req: {
//     normalKeys: [s.isStr, s.isNum],
//   },
// }), 'b', s.isNum);
//
// var r = SS.conform({ key1: 2 });


// s('xyz.superapp.item', s.isObj);
// var r = s('xyz.superapp.item');
// console.log(r.conform({z:1}));

// s('xyz.superapp.item', s.and(s.isObj, s.shape({req: ['title', 'content']})));
// s('xyz.superapp.item.title', s.isStr);
// var r = s('xyz.superapp.item').conform({ title: 'a', content: 'b' });
// console.log(r);
//
// s('todoapp',
//   s('headline', s.and(s.isStr, s.notEmpty)),
//   {
//     'list': s.shape({
//       req: {
//         'title': s('todoapp.headline'),
//         'items': s.zeroOrMore(s('todoapp.item')),
//       },
//     }),
//     'item': [
//       s.shape({
//         req: {
//           title: s('./title'),
//           content: s('./content'),
//           isDone: s('./isDone'),
//           reminder: s('./reminder'),
//         },
//         opt: {
//           reminder: s.isDate,
//         },
//       }),
//       s('title', s('todoapp.headline')),
//       s('content', s.and(s.isStr, s.notEmpty)),
//       s('date', s.isDate),
//       s('isDone', s.isBool),
//       s('reminder', s.isDate)],
// });
//
// s('todoapp', () => {
//   s('list', s.isObj)
// });
//
//
// var ListSpec = s('todoapp.list');
// // var ItemSpec = s('todoapp.item');
// // var contentSpec = s('todoapp.item.content');
// //
// var r = ListSpec.conform({ title: 'hello', items: [] });
// console.log(r);
