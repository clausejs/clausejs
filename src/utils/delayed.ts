import DelayedClause from '../models/DelayedClause';

export default function delayed( getFn ) {
  return new DelayedClause( { getFn } );
}
