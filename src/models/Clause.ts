export default class Clause {
  constructor( { type, exprs, opts, conformFn, generateFn } ) {

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

    if ( !exprs ) {
      throw new Error( "Expressions are required when constructing a clause." );
    }

    this.exprs = exprs;
  }
  opts: any;
  type: String;
  generate: Function;
  conform: Function;
  exprs: any
}
