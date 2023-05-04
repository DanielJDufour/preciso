"use strict";

const is_imaginary = require("./is_imaginary.js");
const is_odd = require("./is_odd.js");
const is_zero = require("./is_zero.js");
const multiply_rational = require("./multiply_rational.js");

/**
 * @name multiply_array
 * @private
 * @description Multiply an array of numbers together
 * @param {Array.<String>} nums - array of numerical strings
 * @returns {String} product as a numerical string
 */
function multiply_array(nums, { max_decimal_digits } = {}) {
  if (nums.some(n => is_zero(n))) return "0";

  const imaginary = is_odd(nums.filter(n => is_imaginary(n)).length.toString());
  let product = multiply_rational(
    nums.map(n => n.replace(/i$/, "")),
    { max_decimal_digits }
  );
  if (imaginary) product += "i";
  return product;
}

module.exports = multiply_array;
module.exports.default = multiply_array;
