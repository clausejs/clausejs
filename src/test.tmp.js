require("babel-core/register");

var s = require('./');
console.log(s);

// var SS = s.or('a', s.props({
//   req: {
//     normalKeys: [s.isStr, s.isNum],
//   },
// }), 'b', s.isNum);
//
// var r = SS.conform({ key1: 2 });


// s('xyz.superapp.item', s.isObj);
// var r = s('xyz.superapp.item');
// console.log(r.conform({z:1}));

s('xyz.superapp.item', s.and(s.isObj));
// s('xyz.superapp.item.title', s.isStr);

// s('todoapp', {
//   'headline': s.isStr,
//   'list': {
//     'title': s('../headline'),
//     'items': s.zeroOrMore(s('../item')),
//   },
//   'item': [
//   s.props({
//     req: [s('title'), s('content'), s('date'), s('isDone')],
//     opt: [s('reminder')],
//   }),
//   s('title', s('../headline')),
//   s('content', s.and(s.isStr, s.notEmpty)),
//   s('date', s.isDate),
//   s('isDone', s.isBool),
//   s('reminder', s.isDate)],
// });

// var ListSpec = s('todoapp.list');
// var ItemSpec = s('todoapp.item');
// var contentSpec = s('todoapp.item.content');
//
// console.log(ListSpec);
