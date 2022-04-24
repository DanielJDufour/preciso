const is_zero = require("./is_zero.js");
const sign_nonzero = require("./sign_nonzero.js");

module.exports = function (n) {
  return is_zero(n) ? "" : sign_nonzero(n);
};
