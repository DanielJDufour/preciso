"use strict";

const Big = require("big.js");
const preciso = require("./preciso.js");
const add = require("./add.js");
const compare = require("./compare.js");
const divide = require("./divide.js");
const multiply = require("./multiply.js");
const remainder = require("./remainder.js");
const subtract = require("./subtract.js");
const expand = require("./expand.js");

// set decimal precision to 100
Big.DP = 100;

const NUM_PASSES = Number(process.env.PRECISO_TEST_SIZE || 10_000);

const range = n => new Array(n).fill(0).map((_, i) => i);

function flip_coin() {
  if (Math.random() < Math.random()) return "heads";
  else return "tails";
}

// random number between 0 and 9
const random_digit = () => Math.random().toString()[2];
const random = (min, max) => min + Math.random() * (max - min);
const randint = (min, max) => Math.round(random(min, max));

function get_random_number() {
  const digits = randint(1, process.env.PRECISO_MAX_DIGITS || 20);
  const idot = randint(0, digits);
  let result = "";
  for (let i = 0; i < digits; i++) {
    if (!process.env.PRECISO_ONLY_INT) {
      // only add decimal half of the time
      if (flip_coin() === "heads") {
        if (i === idot && i !== digits - 1) result += ".";
      }
    }
    result += random_digit();
  }
  return result;
}

const duration = {
  add: {
    preciso: 0,
    big: 0
  },
  compare: {
    preciso: 0,
    big: 0
  },
  divide: {
    preciso: 0,
    big: 0
  },
  multiply: {
    preciso: 0,
    big: 0
  },
  remainder: {
    preciso: 0,
    big: 0
  },
  subtract: {
    preciso: 0,
    big: 0
  }
};

const padd = preciso.add;
const psubtract = preciso.subtract;

for (let i = 0; i < NUM_PASSES; i++) {
  const astr = get_random_number();
  const bstr = get_random_number();
  try {
    // skip invalid division by zero
    if (bstr.match(/^[\.0]+$/)) continue;

    let start;
    // test big.js
    start = performance.now();
    const add_result_big = Big(astr).add(bstr);
    duration.add.big += performance.now() - start;

    start = performance.now();
    const compare_result_big = Big(astr).cmp(bstr);
    duration.compare.big += performance.now() - start;

    start = performance.now();
    const divide_result_big = Big(astr).div(bstr);
    duration.divide.big += performance.now() - start;

    start = performance.now();
    const multiply_result_big = Big(astr).times(bstr);
    duration.multiply.big += performance.now() - start;

    start = performance.now();
    const remainder_result_big = Big(astr).mod(bstr);
    duration.remainder.big += performance.now() - start;

    start = performance.now();
    const subtract_result_big = Big(astr).minus(bstr);
    duration.subtract.big += performance.now() - start;

    // test preciso

    start = performance.now();
    const add_result_preciso = add(astr, bstr);
    duration.add.preciso += performance.now() - start;

    start = performance.now();
    const compare_result_preciso = compare(astr, bstr);
    duration.compare.preciso += performance.now() - start;

    start = performance.now();
    const divide_result_preciso = divide(astr, bstr);
    duration.divide.preciso += performance.now() - start;

    start = performance.now();
    const multiply_result_preciso = multiply(astr, bstr);
    duration.multiply.preciso += performance.now() - start;

    start = performance.now();
    const remainder_result_preciso = remainder(astr, bstr);
    duration.remainder.preciso += performance.now() - start;

    start = performance.now();
    const subtract_result_preciso = subtract(astr, bstr);
    duration.subtract.preciso += performance.now() - start;

    if (expand(add_result_big.toString()) !== add_result_preciso) {
      throw new Error(`uh oh. add("${astr}", "${bstr}") returned \n"${add_result_preciso}", not \n"${expand(add_result_big.toString())}"`);
    }

    const normalized_compare_result_big = compare_result_big === 1 ? ">" : compare_result_big === -1 ? "<" : "=";
    if (normalized_compare_result_big !== compare_result_preciso) {
      throw new Error(`uh oh. compare("${astr}", "${bstr}") returned \n"${compare_result_preciso}", not \n"${normalized_compare_result_big}"`);
    }

    if (expand(divide_result_big.toString()) !== divide_result_preciso) {
      throw new Error(`uh oh. divide("${astr}", "${bstr}") returned \n"${divide_result_preciso}", not \n"${expand(divide_result_big.toString())}"`);
    }

    if (expand(multiply_result_big.toString()) !== multiply_result_preciso) {
      throw new Error(`uh oh. multiply("${astr}", "${bstr}") returned \n"${multiply_result_preciso}", not \n"${expand(multiply_result_big.toString())}"`);
    }

    if (expand(remainder_result_big.toString()) !== remainder_result_preciso) {
      throw new Error(`uh oh. remainder("${astr}", "${bstr}") returned \n"${remainder_result_preciso}", not \n"${expand(remainder_result_big.toString())}"`);
    }

    if (expand(subtract_result_big.toString()) !== subtract_result_preciso) {
      throw new Error(`uh oh. subtract("${astr}", "${bstr}") returned \n"${subtract_result_preciso}"\n, not \n"${expand(subtract_result_big.toString())}"`);
    }
  } catch (error) {
    console.log(`astr: "${astr}"`);
    console.log(`bstr: "${bstr}"`);
    throw error;
  }
}

Object.keys(duration)
  .sort()
  .forEach(k => {
    console.log(k, "%", duration[k].preciso / duration[k].big);
  });
