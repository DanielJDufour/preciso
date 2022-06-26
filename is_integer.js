const clean = require("./clean.js");
const is_infinity = require("./is_infinity.js");

module.exports = function is_integer(n) {
  if (is_infinity(n)) return false;
  n = clean(n);
  return !n.includes(".");
};
