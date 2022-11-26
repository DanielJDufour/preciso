"use strict";

const multiply_array = require("./multiply_array.js");

function multiply() {
  const nums = Array.isArray(arguments[0]) ? arguments[0] : Array.from(arguments);
  return multiply_array(nums);
}

module.exports = multiply;
module.exports.default = multiply;
