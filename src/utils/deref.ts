export default function deref( clause ) {
  let result = clause;
  while ( result.get ) {
    result = result.get();
  }

  return result;
};
