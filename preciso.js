const absolute = require("./absolute.js");
const binomial_coefficient = require("./binomial_coefficient.js");
const ceil = require("./ceil.js");
const clean = require("./clean.js");
const compare = require("./compare.js");
const compare_positive = require("./compare_positive.js");
const constants = require("./constants/index.js");
const count_decimal_digits = require("./count_decimal_digits.js");
const count_integer_digits = require("./count_integer_digits.js");
const cube_root = require("./cube_root.js");

const eulers_number = require("./eulers_number.js");

const factorial = require("./factorial.js");
const floor = require("./floor.js");

const is_infinity = require("./is_infinity.js");
const is_factorial = require("./is_factorial.js");
const is_positive_infinity = require("./is_positive_infinity.js");
const is_negative_infinity = require("./is_negative_infinity.js");
const is_integer = require("./is_integer.js");
const is_zero = require("./is_zero.js");

const mean = require("./mean.js");
const min = require("./min.js");
const max = require("./max.js");
const expand = require("./expand.js");

const add = require("./add.js");
const long_addition = require("./long_addition.js");

const divide = require("./divide.js");
const long_division = require("./long_division.js");

const exp = require("./exp.js");

// pi
const nilakantha = require("./nilakantha.js");
// const gregory_leibniz = require("./gregory_leibniz.js");

const remainder = require("./remainder.js");

const root = require("./root.js");
const root_integer_digits = require("./root_integer_digits.js");
const round_last_decimal = require("./round_last_decimal.js");

const softmax = require("./softmax.js");

const square_root = require("./square_root.js");
const subtract = require("./subtract.js");
const long_subtraction = require("./long_subtraction.js");

const multiply = require("./multiply.js");
const long_multiplication = require("./long_multiplication.js");
const multiply_range = require("./multiply_range.js");

const pow = require("./pow.js");
const pow_positive = require("./pow_positive.js");

const round = require("./round.js");

const sign = require("./sign.js");
const sign_nonzero = require("./sign_nonzero.js");

const sort = require("./sort.js");

const sum = require("./sum.js");

const truncate = require("./truncate.js");

const module_exports = {
  absolute,
  binomial_coefficient,
  ceil,
  clean,

  compare,
  compare_positive,

  constants,
  count_decimal_digits,
  count_integer_digits,

  exp,

  factorial,
  floor,

  // gregory_leibniz,

  is_infinity,
  is_factorial,
  is_positive_infinity,
  is_negative_infinity,
  is_integer,
  is_zero,

  mean,
  min,
  max,

  expand,
  add,
  long_addition,

  divide,
  long_division,

  eulers_number,

  multiply,
  multiply_range,
  long_multiplication,

  nilakantha,

  pow,
  pow_positive,

  remainder,

  root,
  root_integer_digits,
  cube_root,
  square_root,

  round,
  round_last_decimal,

  sign,
  sign_nonzero,

  softmax,
  sort,

  sum,

  subtract,
  long_subtraction,

  truncate
};

if (typeof define === "function" && define.amd)
  define(function () {
    return module_exports;
  });
if (typeof module === "object") {
  module.exports = module_exports;
  module.exports.default = module_exports;
}
if (typeof window === "object") window.preciso = module_exports;
if (typeof self === "object") self.preciso = module_exports;
