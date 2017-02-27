import C from "clausejs";

export default function fromBaseClass( baseClass ) {
  class ClauseComponent extends baseClass {
    constructor() {
      super();
      const { propClauses } = this.constructor;
      if ( propClauses ) {
        const nullablePropClauses = C.or( propClauses, C.isUndefined, C.isNull );

        const currWillUpdateFn = this.componentWillUpdate;
        this.componentWillUpdate = ( nextShape ) => {
          C.enforce( nullablePropClauses, nextShape );
          if ( currWillUpdateFn ) {
            return currWillUpdateFn.apply( this, arguments );
          }
          return undefined;
        };

        const currWillMountFn = this.componentWillMount;
        this.componentWillMount = () => {
          C.enforce( nullablePropClauses, this.shape );
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