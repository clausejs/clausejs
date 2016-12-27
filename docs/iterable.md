#### Regex-like Operations on Iterables
          
Both array and string are treated as iterables in Specky, which means both types can be the subject of regex-like operations.
          
For example, both of the following spec definitions are valid:

```js
var ArraySpec = S.cat('foos', S.oneOrMore(S.equal('foo')),
                    'bars', S.oneOrMore(S.equal('bar')));

S.conform(ArraySpec, ['foo', 'foo', 'foo', 'bar', 'bar']);
// returns { foos: ['foo', 'foo', 'foo'], bars: ['bar', 'bar'] };

var StrSpec = S.cat('foos', S.oneOrMore(S.sEqual('foo')),
                    'bars', S.oneOrMore(S.sEqual('bar')));

S.conform(StrSpec, 'foofoofoobarbar');
// returns { foos: 'foofoofoo', bars: 'barbarbar' };
```
Notice that in the first spec, we use S.equals() to treat the string as a single entity, whereas in the second, we use S.sEqual() to suggest that each character in the string is part of a collection that we run regex ops on.