/* global define */
const absolute = require("./absolute.js");
const add = require("./add.js");
const binomial_coefficient = require("./binomial_coefficient.js");
const ceil = require("./ceil.js");
const clean = require("./clean.js");
const compare = require("./compare.js");
const compare_positive = require("./compare_positive.js");
const constants = require("./constants/index.js");
const count_decimal_digits = require("./count_decimal_digits.js");
const count_integer_digits = require("./count_integer_digits.js");
const cube_root = require("./cube_root.js");
const divide = require("./divide.js");
const eulers_number = require("./eulers_number.js");
const exp = require("./exp.js");
const expand = require("./expand.js");
const factorial = require("./factorial.js");
const floor = require("./floor.js");
const fraction = require("./fraction.js");
// const gregory_leibniz = require("./gregory_leibniz.js");
const is_factorial = require("./is_factorial.js");
const is_infinity = require("./is_infinity.js");
const is_integer = require("./is_integer.js");
const is_negative_infinity = require("./is_negative_infinity.js");
const is_positive_infinity = require("./is_positive_infinity.js");
const is_zero = require("./is_zero.js");
const long_addition = require("./long_addition.js");
const long_division = require("./long_division.js");
const long_multiplication = require("./long_multiplication.js");
const long_subtraction = require("./long_subtraction.js");
const max = require("./max.js");
const mean = require("./mean.js");
const min = require("./min.js");
const multiply = require("./multiply.js");
const multiply_range = require("./multiply_range.js");
const nilakantha = require("./nilakantha.js");
const pow = require("./pow.js");
const pow_positive = require("./pow_positive.js");
const primes = require("./primes.js");
const remainder = require("./remainder.js");
const root = require("./root.js");
const root_integer_digits = require("./root_integer_digits.js");
const round = require("./round.js");
const round_last_decimal = require("./round_last_decimal.js");
const sign = require("./sign.js");
const sign_nonzero = require("./sign_nonzero.js");
const simplify_fraction = require("./simplify_fraction.js");
const softmax = require("./softmax.js");
const sort = require("./sort.js");
const square_root = require("./square_root.js");
const subtract = require("./subtract.js");
const sum = require("./sum.js");
const truncate = require("./truncate.js");

const module_exports = {
  absolute,
  add,
  binomial_coefficient,
  ceil,
  clean,
  compare,
  compare_positive,
  constants,
  count_decimal_digits,
  count_integer_digits,
  cube_root,
  divide,
  eulers_number,
  exp,
  expand,
  factorial,
  floor,
  fraction,
  // gregory_leibniz,
  is_infinity,
  is_integer,
  is_factorial,
  is_negative_infinity,
  is_positive_infinity,
  is_zero,
  long_addition,
  long_division,
  long_multiplication,
  long_subtraction,
  mean,
  max,
  min,
  multiply,
  multiply_range,
  nilakantha,
  pow,
  pow_positive,
  primes,
  remainder,
  root,
  root_integer_digits,
  round,
  round_last_decimal,
  sign,
  sign_nonzero,
  simplify_fraction,
  softmax,
  sort,
  square_root,
  subtract,
  sum,
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
