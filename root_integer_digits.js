"use strict";

const ceil = require("./ceil.js");
const count_integer_digits = require("./count_integer_digits");
const divide = require("./divide.js");

function root_integer_digits(radicand, index) {
  const digits = count_integer_digits(radicand);
  if (digits === "0") return "0";
  return ceil(divide(digits, index, { max_decimal_digits: 1 }));
}

module.exports = root_integer_digits;
module.exports.default = root_integer_digits;
