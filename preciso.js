const absolute = require("./absolute.js");
const compare = require("./compare.js");
const expand = require("./expand.js");

const add = require("./add.js");
const long_addition = require("./long_addition.js");

const divide = require("./divide.js");
const long_division = require("./long_division.js");

const remainder = require("./remainder.js");

const round_last_decimal = require("./round_last_decimal.js");

const subtract = require("./subtract.js");
const long_subtraction = require("./long_subtraction.js");

const multiply = require("./multiply.js");
const long_multiplication = require("./long_multiplication.js");

const truncate = require("./truncate.js");

module.exports = {
  absolute,
  compare,
  expand,
  add,
  long_addition,

  divide,
  long_division,

  multiply,
  long_multiplication,

  remainder,

  round_last_decimal,

  subtract,
  long_subtraction,

  truncate
};
