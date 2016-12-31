const C = require( 'clausejs' );

function fromBaseClass( baseClass ) {
  class ClauseComponent extends baseClass {
    constructor() {
      super();
      const { propSpecs } = this.constructor;
      if ( propSpecs ) {
        const nullablePropSpecs = C.or( propSpecs, C.isUndefined, C.isNull );

        const currWillUpdateFn = this.componentWillUpdate;
        this.componentWillUpdate = ( nextShape ) => {
          C.enforce( nullablePropSpecs, nextShape );
          if ( currWillUpdateFn ) {
            return currWillUpdateFn.apply( this, arguments );
          }
          return undefined;
        };

        const currWillMountFn = this.componentWillMount;
        this.componentWillMount = () => {
          C.enforce( nullablePropSpecs, this.shape );
          if ( currWillMountFn ) {
            return currWillMountFn.apply( this, arguments );
          }
          return undefined;
        };
      }
    }
  }

  return ClauseComponent;
}

module.exports = fromBaseClass;
module.exports.default = fromBaseClass;
