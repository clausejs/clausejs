import S from '../';

export const Namespace = S.isObj;

export default S.fspec( {
  args: S.or(
    'retrieve', S.cat(
      'namespacePath', Namespace ),
    'register', S.cat(
      'namespacePath', Namespace,
      'expr', S.isObj )
    )
} );
