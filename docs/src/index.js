import S from '../../src';
import docgen from '../../src/docgen';
import SpeckyNamespaceObj from '../../src/specs';

const finalDocStr = docgen.gen(SpeckyNamespaceObj);

document.getElementById('api').innerHTML = finalDocStr;
