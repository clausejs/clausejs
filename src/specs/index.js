import S from '../';
const registry = {};
// const S = Specky.withRegistry(nsObj);

S('Specky', S.fspec({
  args: S.or('retrieve', S.cat('namespace-path', S.isStr))
}));

export default S.getRegistry();
