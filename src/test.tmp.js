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

// s('xyz.superapp.item', s.and(s.isObj, s.props({req: ['title', 'content']})));
// s('xyz.superapp.item.title', s.isStr);
// var r = s('xyz.superapp.item').conform({ title: 'a', content: 'b' });
// console.log(r);

s('todoapp',
  s('headline', s.and(s.isStr, s.notEmpty)),
  {
    'list': s.props({
      req: {
        'title': s('todoapp.headline'),
        'items': s.zeroOrMore(s('todoapp.item')),
      },
    }),
    'item': [
      s.props({
        req: {
          title: s('./title'),
          content: s('./content'),
          isDone: s('./isDone'),
          reminder: s('./reminder'),
        },
        opt: {
          reminder: s.isDate,
        },
      }),
      s('title', s('todoapp.headline')),
      s('content', s.and(s.isStr, s.notEmpty)),
      s('date', s.isDate),
      s('isDone', s.isBool),
      s('reminder', s.isDate)],
});


var ListSpec = s('todoapp.list');
// var ItemSpec = s('todoapp.item');
// var contentSpec = s('todoapp.item.content');
//
var r = ListSpec.conform({ title: 'hello', items: [] });
console.log(r);
