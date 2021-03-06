const absolute = require("./absolute.js");
const ceil = require("./ceil.js");
const clean = require("./clean.js");
const compare = require("./compare.js");
const compare_positive = require("./compare_positive.js");
const constants = require("./constants.js");

const floor = require("./floor.js");

const is_infinity = require("./is_infinity.js");
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

const remainder = require("./remainder.js");

const round_last_decimal = require("./round_last_decimal.js");

const subtract = require("./subtract.js");
const long_subtraction = require("./long_subtraction.js");

const multiply = require("./multiply.js");
const long_multiplication = require("./long_multiplication.js");

const pow = require("./pow.js");
const pow_positive = require("./pow_positive.js");

const sign = require("./sign.js");
const sign_nonzero = require("./sign_nonzero.js");

const sort = require("./sort.js");

const sum = require("./sum.js");

const truncate = require("./truncate.js");

const module_exports = {
  absolute,
  ceil,
  clean,

  compare,
  compare_positive,

  constants,

  floor,

  is_infinity,
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

  multiply,
  long_multiplication,

  pow,
  pow_positive,

  remainder,

  round_last_decimal,

  sign,
  sign_nonzero,

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
if (typeof module === "object") module.exports = module_exports;
if (typeof window === "object") window.preciso = module_exports;
if (typeof self === "object") self.preciso = module_exports;
