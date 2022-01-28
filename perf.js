const test = require("flug");
const Big = require("big.js");
const preciso = require("./preciso.js");
const add = require("./add.js");
const divide = require("./divide.js");
const multiply = require("./multiply.js");
const remainder = require("./remainder.js");
const subtract = require("./subtract.js");
const expand = require("./expand.js");

// set decimal precision to 100
Big.DP = 100;

const NUM_PASSES = Number(process.env.PRECISO_TEST_SIZE || 10_000);

function flip_coin() {
  if (Math.random() < Math.random()) return "heads";
  else return "tails";
}

function random(range) {
  if (range) {
    const [min, max] = range;
    return min + Math.random() * (max - min);
  } else {
    return Math.random();
  }
}

function randint(range = [0, 100]) {
  return Math.round(rand(range));
}

function get_random_number() {
  const digits = Math.round(random([1, 16]));
  const base = Number("9".repeat(digits));
  const num = random([-1 * base, base]);
  return num.toString();
}

const duration = {
  add: {
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
  // const anum = Number(astr);
  // const bnum = Number(bstr);

  // const sum_num = anum + bnum;
  // const sum_str = (sum_num).toString();

  // const diff_num = anum - bnum;
  // const diff_str = (diff_num).toString();

  let start;
  // test big.js
  start = performance.now();
  const add_result_big = Big(astr).add(bstr);
  duration.add.big += performance.now() - start;

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
}

Object.keys(duration).sort().forEach(k => {
  console.log(k, "%", duration[k].preciso / duration[k].big);
});
