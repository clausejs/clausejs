### Regex-like Operations on Iterables

Both array and string are treated as iterables in Clause, which means both types can be the subject of regex-like operations.

For example, both of the following spec definitions are valid:

```js
var ArraySpec = C.cat('foos', C.oneOrMore(C.equal('foo')),
                    'bars', C.oneOrMore(C.equal('bar')));

C.conform(ArraySpec, ['foo', 'foo', 'foo', 'bar', 'bar']);
// returns { foos: ['foo', 'foo', 'foo'], bars: ['bar', 'bar'] };

var StrSpec = C.cat('foos', C.oneOrMore(C.sEqual('foo')),
                    'bars', C.oneOrMore(C.sEqual('bar')));

C.conform(StrSpec, 'foofoofoobarbar');
// returns { foos: 'foofoofoo', bars: 'barbarbar' };
```
Notice that in the first spec, we use C.equals() to treat the string as a single entity, whereas in the second, we use C.sEqual() to suggest that each character in the string is part of a collection that we run regex ops on.
