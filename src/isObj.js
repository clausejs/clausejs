'use strict';

function isObject(x) {
  return typeof x === "object" && x !== null;
};

module.exports = isObject;
