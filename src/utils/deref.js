module.exports = function deref( spec ) {
  let result = spec;
  while ( result.get ) {
    result = result.get();
  }

  return result;
};
