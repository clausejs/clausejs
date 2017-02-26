export default function isDate( date ) {
  return date && date instanceof Date && !isNaN( date.valueOf() );
};
