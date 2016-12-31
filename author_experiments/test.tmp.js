require( 'babel-core/register' );

// var s = require( '../src/core/regex' );
var C = require( '../src' );

var myClause = C.cat( 'a', C.isStr, {} );


// var PropagatedAndClause = C.and(
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
// console.log( PropagatedAndClause.conform( conformed1 ) );


// var NumOrStr = C.or( C.isNum, C.isStr, C.isObj, C.isDate, C.isNatInt );
// var r = NumOrStr.conform( 's' );
// console.log( NumOrStr );

// C( 'xyz.superapp.item/title', s.isStr );

// console.log( s );

// var AdderFnClause = s.fclause({
//   args: s.cat('x', s.isNum),
//   ret: s.fclause({
//     args: s.cat('y', s.isNum),
//     ret: s.isNum
//   }),
// });
//
// var adderFn = AdderFnClause.instrument(function (x) {
//   return function (y) {
//     console.log(x, y);
//     return x + y;
//   };
// });
// var brokenAdderFn = AdderFnClause.instrument(() => (y) => 'z');
// console.log(adderFn(1)(2))

// var NamedGroupedClause = C.cat(
//   ['z', 'it\'s a fuuuunction', C.isFn],
//   ['b', C.isObj],
//   ['c', 'another fuuuunction', C.isFn],
//   ['a', C.isObj]
// );
//
// var conformed = NamedGroupedClause.conform(conformist);

// function startWithOo(key) {
//   return key.indexOf('oo') === 0;
// }
//
// var ObjClause = C.shape({
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
// ObjClause.conform(conformed1);
// ObjClause.conform(unconformed1);
// console.log(ObjClause.conform(conformed2));
//
// ObjClause.conform(unconformed2);
// ObjClause.conform(unconformed3);
// ObjClause.conform(unconformed4);

// var fnList = ['shape', 'isValid', 'conform', 'fclause', 'isObj', 'isFn'];

// var ClauseObj = C.keys({req: fnList});
// var InsaneClauseObj = C.keys({req: fnList.concat(['voodooooooooo'])});
// console.log(C.isValid(ClauseObj, S));
// console.log(C.isValid(InsaneClauseObj, S));

// var NamedGroupedClause = C.cat(
//   ['z', 'it\'s a fuuuunction', C.isFn],
//   ['b', C.isObj],
//   ['c', 'another fuuuunction', C.isFn],
//   ['a', C.isObj]
// );
//
// var conformist = [function(){}, {}, function() {}, {}];
//
// var conformed = NamedGroupedClause.conform(conformist);
//
// console.log(conformed);

// var Clause = s.cat('a', s.isNum, 'b', s.isStr);

// var Clause = s.or(
//   // s.zeroOrMore(s.cat(s.isStr, s.isNum)),
//   s.collOf(s.cat(s.isStr, s.isNum))
// );

// var r = Clause.conform([1, '2']);

// console.log(r);

//
// var AdderFnClause = s.fclause({
//   args: s.cat('x', s.isNum),
//   ret: s.fclause({
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
// var adderFn = AdderFnClause.instrument(adderFn);
// var brokenAdderFn = AdderFnClause.instrument((x) => (y) => 'z');
// var r = brokenAdderFn(1)(3);
// console.log(r);


// var sheepCounterClause = C.fclause({
//   args: C.cat(C.isNum),
//   ret: s.isStr,
// });
//
// var sheepCounter = sheepCounterClause.instrument(function(c) {
//   return c + ' sheep and counting.';
// });
//
// var r = sheepCounter('hello');
// console.log(r);

// var ss = s.cat(s.isNum);
// var r = ss.conform([2]);
// console.log(r);



// var NamedClause = s.cat('z', s.isFn, 'b', s.isObj, 'c', s.isFn, 'a', s.isObj);
// // var UnnamedClause = C.cat(C.isFn, C.isObj,C.isFn, C.isObj);
//
// var EmptyClause = s.cat();
//
// var conformed = EmptyClause.conform([]);
// var unconformed = EmptyClause.conform([1]);

// console.log('c', conformed, unconformed);
// expect(conformed).to.deep.equal({ z: fn, b: {}, c: fn, a: { a: 1 } });
// var nonconformed = NamedClause.conform(nonconformist);

// var AmpliferClause = s.fclause({
//   args: s.cat(s.isNum),
//   ret: s.isNum,
// });
//
// var AdderFnClause = s.fclause({
//   args: s.cat('amplifier', AmpliferClause, 'x', s.isNum),
//   ret: s.fclause({
//     args: s.cat('y', s.isNum),
//     ret: s.isNum,
//   }),
// });
// var adderFn = AdderFnClause.instrument((amp, x) => (y) => amp(x) + y);
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
// var ListClause = s('todoapp.list');
// // var ItemClause = s('todoapp.item');
// // var contentClause = s('todoapp.item.content');
// //
// var r = ListClause.conform({ title: 'hello', items: [] });
// console.log(r);
