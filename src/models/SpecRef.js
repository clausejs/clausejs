function SpecRef({ ref, getFn, conformFn }) {
  this.type = 'SpecRef';
  this.get = getFn;
  this.conform = conformFn;
  this.ref = ref;
}

module.exports = SpecRef;
