const pow = require("./pow.js");

/**
 *
 * @param {String} base - numerical string
 * @returns {String} square as a numerical string
 */
function square(base) {
  return pow(base, "2");
}

module.exports = square;
module.exports.default = square;