import { or } from  './regex' ;
import isNull from '../preds/isNull';
import isUndefined from '../preds/isUndefined';

export default function maybe( clause ) {
  return or( isNull, isUndefined, clause );
}
