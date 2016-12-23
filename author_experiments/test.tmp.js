require( 'babel-core/register' );

var s = require( '../src/core/regex' );
// var S = require( '../src' );
//
// var NumOrStr = S.or( S.isNum, S.isStr, S.isObj, S.isDate, S.isNatInt );
// var r = NumOrStr.conform( 's' );
// console.log( NumOrStr );

// S( 'xyz.superapp.item/title', s.isStr );

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

// var NamedGroupedSpec = S.cat(
//   ['z', 'it\'s a fuuuunction', S.isFn],
//   ['b', S.isObj],
//   ['c', 'another fuuuunction', S.isFn],
//   ['a', S.isObj]
// );
//
// var conformed = NamedGroupedSpec.conform(conformist);

// function startWithOo(key) {
//   return key.indexOf('oo') === 0;
// }
//
// var ObjSpec = S.shape({
//   req: {
//     'title': s.isStr,
//     'userId': s.isNum,
//   },
//   opt: {
//     'content': s.isStr,
//     'ooShape': [startWithOo, S.shape({
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

// var SpecObj = S.keys({req: fnList});
// var InsaneSpecObj = S.keys({req: fnList.concat(['voodooooooooo'])});
// console.log(S.isValid(SpecObj, S));
// console.log(S.isValid(InsaneSpecObj, S));

// var NamedGroupedSpec = S.cat(
//   ['z', 'it\'s a fuuuunction', S.isFn],
//   ['b', S.isObj],
//   ['c', 'another fuuuunction', S.isFn],
//   ['a', S.isObj]
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


// var sheepCounterSpec = S.fspec({
//   args: S.cat(S.isNum),
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
// // var UnnamedSpec = S.cat(S.isFn, S.isObj,S.isFn, S.isObj);
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
