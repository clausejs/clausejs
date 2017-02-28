import React from "react";
import C from "clausejs";

export default function fromBaseClass( baseClass: React.Component ) {
  class ClauseComponent extends baseClass {
    constructor() {
      super();
      const { propClauses = null } = ClauseComponent;
      if ( propClauses ) {
        const nullablePropClauses = C.or( propClauses, C.isUndefined, C.isNull );

        const currWillUpdateFn = super.componentWillUpdate;
        this.componentWillUpdate = function ( nextShape ) {
          C.enforce( nullablePropClauses, nextShape );
          if ( currWillUpdateFn ) {
            return currWillUpdateFn.apply( this, arguments );
          }
          return undefined;
        };

        const currWillMountFn = super.componentWillMount;
        this.componentWillMount = function () {
          C.enforce( nullablePropClauses, this.shape );
          if ( currWillMountFn ) {
            return currWillMountFn.apply( this, arguments );
          }
          return undefined;
        };
      }
    };
    componentWillUpdate: Function;
    componentWillMount: Function;
    shape: any;
    static propClauses: any
  }

  return ClauseComponent;
}
