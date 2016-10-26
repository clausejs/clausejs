function SpecRef({ ref, getFn, conformFn }) {
  this.get = getFn;
  this.conform = conformFn;
  this.ref = ref;
}

module.exports = SpecRef;
