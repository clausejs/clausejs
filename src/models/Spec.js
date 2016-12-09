function Spec( { type, exprs, opts, fragments, conformFn, generateFn } ) {

  this.type = type;

  if ( opts ) {
    this.opts = opts;
  }

  if ( conformFn ) {
    this.conform = conformFn;
  }

  if ( generateFn ) {
    this.generate = generateFn;
  }

  if ( !exprs || !fragments ) {
    throw new Error( 'Expressions and fragments are required when constructing a spec.' );
  }

  this.exprs = exprs;
  this.fragments = fragments;
}


module.exports = Spec;
