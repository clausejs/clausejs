const gen = ( registry ) => {
  return `<pre>${ JSON.stringify( registry, null, 2 ) }</pre>`;
}

var fns = {
  gen,
};

module.exports = fns;
module.exports.default = fns;
