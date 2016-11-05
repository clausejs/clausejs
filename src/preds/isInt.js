function isInt(x) {
   if (typeof x !== 'number') {
     return false;
   } else {
     return (Math.floor(x) === x) && x !== Infinity;
   }
}

module.exports = isInt;
