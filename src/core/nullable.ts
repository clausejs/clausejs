import { or } from './regex';
import isNull from '../preds/isNull';

export default function nullable( clause ) {
  return or( isNull, clause );
}
