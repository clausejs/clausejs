function Spec( { type, exprs, opts, fragmenter, conformFn, generateFn } ) {

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

  if ( exprs ) {
    this.exprs = exprs;
  }
}


module.exports = Spec;
