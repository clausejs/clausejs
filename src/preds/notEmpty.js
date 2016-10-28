
module.exports = function notEmpty(x) {
  if(!x) {
    return false;
  } else if (x.length === 0) {
    return false;
  } else {
    return true;
  }
}
