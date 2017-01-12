### Regex-like Operations on Iterables

Both array and string are treated as iterables in Clause, which means both types can be the subject of regex-like operations.

For example, both of the following clause definitions are valid:

#### Array

```
var ArrayClause = C.cat('foos', C.oneOrMore(C.equal('foo')),
                        'bars', C.oneOrMore(C.equal('bar')));

C.conform(ArrayClause, ['foo', 'foo', 'foo', 'bar', 'bar']);
```

#### String

```js
var StrClause = C.cat('foos', C.oneOrMore(C.sCat('foo')),
                      'bars', C.oneOrMore(C.sCat('bar')));

C.conform(StrClause, 'foofoofoobarbar');
```
Notice that in the first clause, we use `C.equals()` to treat
 the string as a single entity, whereas in the second, we use
 `C.sCat()` to indicate that each character in the string is 
 part of the collection that we run regex ops on.
