import S from '../';
import NsFn, { Namespace } from './ns';

// const S = Specky.withRegistry(nsObj);

S( 'Specky.Namespace', Namespace );
S( 'Specky', NsFn );

export default S.getRegistry();
