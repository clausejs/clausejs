require("babel-core/register");

var s = require('./');
console.log(s);

s('xyz.superapp.item', s.isObj);
var r = s('xyz.superapp.item');
console.log(r.conform({z:1}));

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
