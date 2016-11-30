import S from '../';
import NsFn, { Namespace } from './ns';

const registry = {};
// const S = Specky.withRegistry(nsObj);

S('Specky.Namespace', Namespace);
S('Specky', NsFn);

export default S.getRegistry();
