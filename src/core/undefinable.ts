import { or } from './regex';
import isUndefined from '../preds/isUndefined';

export default function undefinable( clause ) {
  return or( isUndefined, clause );
}
