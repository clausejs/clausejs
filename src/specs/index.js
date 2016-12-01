import S from '../';
import { NamespaceFnSpec, isNamespacePath } from './ns';

// const S = Specky.withRegistry(nsObj);

S( 'Specky.types.NamespacePath', isNamespacePath );
S( 'Specky', NamespaceFnSpec );

export default S.getRegistry();
