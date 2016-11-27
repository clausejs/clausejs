const S = require('specky');
import React from 'react';

function enforce(spec, x) {
  const r = spec.conform(x);
  if (S.isProblem(r)) {
    throw r;
  }
}

class SpeckyComponent extends React.Component {
  constructor() {
    super();
    const { propSpecs } = this.constructor;
    if (propSpecs) {
      const nullablePropSpecs = S.or(propSpecs, S.isUndefined, S.isNull);

      const currWillUpdateFn = this.componentWillUpdate;
      this.componentWillUpdate = (nextProps) => {
        enforce(nullablePropSpecs, nextProps);
        if (currWillUpdateFn) {
          return currWillUpdateFn.apply(this, arguments);
        }
        return undefined;
      };

      const currWillMountFn = this.componentWillMount;
      this.componentWillMount = () => {
        enforce(nullablePropSpecs, this.props);
        if (currWillMountFn) {
          return currWillMountFn.apply(this, arguments);
        }
        return undefined;
      };
    }
  }
}

export default SpeckyComponent;
