### Delayed & Namespaced Clauses

Delayed & namespaced clauses are useful when composing recursively defined clauses. 

For example, suppose we want to write clause for binary trees. A binary tree node contains a left node and a right node, which in turn is also a binary tree node. 

There are two ways to represent such structure with Clause. 

##### Delayed Clause

```js
var BinaryTreeClause = C.maybe( C.wall(
  C.cat(
    'nodeName', C.isStr, 
    'leftNode', C.delayed( () => BinaryTreeClause ),
    'rightNode', C.delayed( () => BinaryTreeClause )
  )
) );

C.isValid(
  BinaryTreeClause, 
  ['john', ['bob', ['alice', null, null], null], ['sam', null, ['jane', null, null]]]
);
```

##### Namespaced Clause

Alternatively, you may also use a namespaced clause to achieve the same effect by giving the tree node a global name in the registry:

```js
C('myapp/BinaryTreeNode', C.maybe( C.wall(
  C.cat(
    'nodeName', C.isStr, 
    'leftNode', C( 'myapp/BinaryTreeNode' ),
    'rightNode', C( 'myapp/BinaryTreeNode' )
) ) ) );

C.isValid(
  C( 'myapp/BinaryTreeNode' ), 
  ['john', ['bob', ['alice', null, null], null], ['sam', null, ['jane', null, null]]]
);
```

Another added benefit for the second approach is that `C( 'myapp/BinaryTreeNode' )` will be exposed as a global reference which you can use anywhere in your app.