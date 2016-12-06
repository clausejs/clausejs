import S from '../';
import { isNamespacePath, NamespaceFnSpec } from './namespace-types';

S( '/Specky', NamespaceFnSpec );
S( 'specky.types/NamespacePath', isNamespacePath );
