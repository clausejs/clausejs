const S = require('specky');

function fromBaseClass(baseClass) {
  class SpeckyComponent extends baseClass {
    constructor() {
      super();
      const { propSpecs } = this.constructor;
      if (propSpecs) {
        const nullablePropSpecs = S.or(propSpecs, S.isUndefined, S.isNull);

        const currWillUpdateFn = this.componentWillUpdate;
        this.componentWillUpdate = (nextProps) => {
          S.enforce(nullablePropSpecs, nextProps);
          if (currWillUpdateFn) {
            return currWillUpdateFn.apply(this, arguments);
          }
          return undefined;
        };

        const currWillMountFn = this.componentWillMount;
        this.componentWillMount = () => {
          S.enforce(nullablePropSpecs, this.props);
          if (currWillMountFn) {
            return currWillMountFn.apply(this, arguments);
          }
          return undefined;
        };
      }
    }
  }

  return SpeckyComponent;
}

module.exports = fromBaseClass;
module.exports.default = fromBaseClass;
