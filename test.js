"use strict";

const test = require("flug");
const preciso = require("./preciso.js");

const {
  absolute,
  add,
  binomial_coefficient,
  ceil,
  clean,
  compare,
  compare_positive,
  constants,
  cosine_radians,
  count_decimal_digits,
  count_integer_digits,
  cube,
  cube_root,
  divide,
  eulers_number,
  exp,
  factorial,
  fraction,
  floor,
  // gregory_leibniz,
  hypotenuse,
  is_factorial,
  is_infinity,
  is_positive_infinity,
  is_negative_infinity,
  is_integer,
  is_zero,
  mean,
  min,
  max,
  nilakantha,
  expand,
  long_addition,
  long_division,
  long_multiplication,
  long_subtraction,
  multiply,
  multiply_range,
  primes,
  pow,
  pow_positive,
  remainder,
  root,
  reciprocal,
  root_integer_digits,
  round,
  round_last_decimal,
  simplify_fraction,
  sign,
  sine_radians,
  softmax,
  sort,
  square,
  square_root,
  sum,
  subtract,
  truncate
} = preciso;

// const nthroot = (radicand, root) => Math.pow(radicand, 1 / root);

test("cosine_radians", ({ eq }) => {
  eq(cosine_radians("0.4014257", { steps: 10 }).startsWith("0.9205048643767727"), true);
  eq(cosine_radians("-0"), "0");
  eq(cosine_radians("0"), "0");
  eq(Number(cosine_radians("1", { max_decimal_digits: 200, steps: 10 })), 0.5403023058681398);
  eq(round(cosine_radians((2 * Math.PI).toString()), 10), "1");
});

test("sine", ({ eq }) => {
  eq(sine_radians("0.4014257", { steps: 10 }).startsWith("0.3907311027531584"), true);
  eq(sine_radians("-0"), "0");
  eq(sine_radians("0"), "0");
  eq(sine_radians("1").startsWith("0.8414709848078965"), true);
  eq(Number(sine_radians((Math.PI / 2).toString())), 1);
});

test("hypotenuse", ({ eq }) => {
  // some examples from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/hypot
  eq(hypotenuse(), "0");
  eq(hypotenuse("-3"), "3");
  eq(hypotenuse("3", "4"), "5");
  eq(hypotenuse("5", "12"), "13");
  eq(hypotenuse("3", "4", "5", { max_decimal_digits: 10 }), "7.0710678118");
  eq(hypotenuse("3i", "4i"), "5");
  eq(hypotenuse("3", "4i", "5", { max_decimal_digits: 10 }), "7.0710678118");
});

test("pow", ({ eq }) => {
  eq(pow("-7", "0.5", { max_decimal_digits: 20 }), "2.64575131106459059050i");
  eq(pow("8", "-1/3"), "0.5");
  // examples from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow
  eq(pow("7.2", "2", { max_decimal_digits: 0 }), "52");
  eq(pow("7", "2"), "49");
  eq(pow("7", "3"), "343");
  eq(pow("2", "10"), "1024");
  eq(pow("4", "0.5"), "2");
  eq(pow("8", "1/3"), "2");
  // max_decimal_digits might not be working
  eq(pow("2", "0.5").startsWith("1.414213562373095"), true);
  eq(pow("2", "1/3").startsWith("1.2599210498948731"), true);
  eq(
    pow("7", "-2", { ellipsis: true, max_decimal_digits: 100000 }),
    "0.020408163265306122448979591836734693877551020408163265306122448979591836734693877551020408163265306122448979591836734693877551..."
  );
  eq(pow("-7", "2"), "49");
  eq(pow("-7", "3"), "-343");
  eq(pow("7", "0.5", { max_decimal_digits: 20 }), "2.64575131106459059050");
  eq(pow("-7", "1/3", { max_decimal_digits: 20 }), "-1.9129311827723891012");
  eq(pow("7i", "2"), "49");
  eq(pow("7i", "3"), "343i");
});

test("reciprocal", ({ eq }) => {
  eq(reciprocal("3/4", { fraction: true }), "4/3");
  eq(reciprocal("0.1"), "10");
});

test("primes", ({ eq }) => {
  const results1 = primes("0", "10");
  eq(results1, ["2", "3", "5", "7"]);

  const results2 = primes("0", "100");
  eq(results2, [
    "2",
    "3",
    "5",
    "7",
    "11",
    "13",
    "17",
    "19",
    "23",
    "29",
    "31",
    "37",
    "41",
    "43",
    "47",
    "53",
    "59",
    "61",
    "67",
    "71",
    "73",
    "79",
    "83",
    "89",
    "97"
  ]);

  const start = performance.now();
  const results3 = primes("0", "1000");
  const duration = performance.now() - start;
  eq(duration < 1000, true);
  eq(results3.length, 192);
});

test("simplify_fraction", ({ eq }) => {
  eq(simplify_fraction("10", "100"), ["1", "10"]);
  eq(simplify_fraction("4", "10"), ["2", "5"]);
  eq(simplify_fraction("11", "22"), ["1", "2"]);
  eq(simplify_fraction("1234", "22"), ["617", "11"]);
  eq(simplify_fraction("57142635", "4125"), ["346319", "25"]);
});

test("fraction", ({ eq }) => {
  eq(fraction(".1"), ["1", "10"]);
  eq(fraction("0.25"), ["25", "100"]);
  eq(fraction("0.12345678"), ["12345678", "100000000"]);
  eq(fraction("12345678.9"), ["123456789", "10"]);
});

test("softmax", ({ eq }) => {
  const actual = ["1", "2", "3", "4", "1", "2", "3"];
  const expected = ["0.02364054", "0.06426166", "0.1746813", "0.474833", "0.02364054", "0.06426166", "0.1746813"];
  eq(softmax(actual, { max_decimal_digits: 8 }), expected);
});

test("root_integer_digits", ({ eq }) => {
  eq(root_integer_digits("100", "2"), "2");
});

test("root", ({ eq }) => {
  eq(root("-9", "1"), "-9");
  eq(root("-0.25", "1"), "-0.25");
  eq(root("0.25", "1"), "0.25");
  eq(root("0.5", "3", { max_decimal_digits: 5 }), "0.79370");
  eq(root("1", "12345678"), "1");
  eq(root("4", "3", { max_decimal_digits: 4 }), "1.5874");
  eq(root("-343", "3"), "-7");
});

test("cube", ({ eq }) => {
  eq(cube("8"), "512");
  eq(cube("-343", { max_decimal_digits: 4 }), "-40353607");
});

test("cube_root", ({ eq }) => {
  eq(cube_root("8"), "2");
  eq(cube_root("-343", { max_decimal_digits: 4 }), "-7");
});

test("square", ({ eq }) => {
  eq(square("-9i"), "81");
  eq(square("-9"), "81");
  eq(square("-2", { max_decimal_digits: 4 }), "4");
  eq(square("-1"), "1");
  eq(square("-0.25"), "0.0625");
  eq(square("-0"), "0");
  eq(square("0"), "0");
  eq(square("1"), "1");
  eq(square("4"), "16");
  eq(square("9"), "81");
});

test("square_root", ({ eq }) => {
  eq(square_root("-9"), "3i");
  eq(square_root("-2", { max_decimal_digits: 4 }), "1.4142i");
  eq(square_root("-1"), "1i");
  eq(square_root("-0.25"), "0.5i");
  eq(square_root("-0"), "0");
  eq(square_root("0"), "0");
  eq(square_root("1"), "1");
  eq(square_root("4"), "2");
  eq(square_root("9"), "3");
});

test("count_integer_digits", ({ eq }) => {
  eq(count_integer_digits("-12.123"), "2");
  eq(count_integer_digits("0"), "1");
  eq(count_integer_digits("0.1"), "1");
  eq(count_integer_digits("123.456"), "3");
});

test("exp", ({ eq }) => {
  eq(exp("-Infinity"), "0");
  eq(exp("-1").substring(0, 18), "0.3678794411714423");
  eq(exp("0"), "1");
  eq(exp("1").substring(0, 17), "2.718281828459045");
  eq(exp("2").substring(0, 17), "7.389056098930650");
  eq(exp("10").substring(0, 17), "22026.46579480671");
  eq(exp("Infinity"), "Infinity");
});

test("multiply", ({ eq }) => {
  eq(multiply("2", "3", "4"), "24");
  eq(multiply(["2", "3", "4"]), "24");
  eq(multiply("0745148275059136", "05931602"), "4419922998637321215872");
  eq(multiply(".00", "24578404077715245"), "0");
  eq(multiply("955504.4475259942", "0"), "0");
  eq(multiply("0", "955504.4475259942"), "0");
  eq(multiply("+7147008", "+5"), "35735040");
  eq(multiply("+.20", ".200"), "0.04");
  eq(multiply("+.20", ".2"), "0.04");
  eq(multiply("+.2", ".2"), "0.04");
  eq(multiply("7147008", "5"), "35735040");
  eq(multiply("714700808", "5"), "3573504040");
  eq(multiply("8086", "5"), "40430");
  eq(multiply("700", "5"), "3500");
  eq(multiply("70002", "5"), "350010");
  eq(multiply("7008086", "5"), "35040430");

  //                                      3573540430663160
  eq(multiply("7147008086132632", "5"), "35735040430663160");
  eq(multiply("-714.7008086132632", "8135.725531"), "-5814609.6156612701214627592");
  eq(multiply("-714.7008086132632", "8135.725531", { max_decimal_digits: 0 }), "-5814610");
  eq(multiply("-714.7008086132632", "8135.725531", { max_decimal_digits: 7 }), "-5814609.6156613");
  //                                       46456025598621080
  eq(multiply("7147008086132632", "65"), "464555525598621080");

  //                                        689693303117989880
  eq(multiply("7147008086132632", "965"), "6896862803117989880");

  //                                          52148675504667493880
  eq(multiply("7147008086132632", "72965"), "521481445004667493880");

  //                                                     574138808602597364871508483493880
  eq(multiply("7147008086132632", "81357255313072965"), "581460961588089517849678483493880");

  // "-5741388.08602597364871508483493880"
  eq(multiply("-714.7008086132632", "8135.7255313072965"), "-5814609.6158808951784967848349388");
  eq(multiply("-21754.237655475372", "-699.4316097056533"), "15215601.4612884766884040073205276");
  eq(multiply("9", "-21754.237655475372"), "-195788.138899278348");
  eq(multiply("1286735.32", "-943722"), "-1214320429661.04");
  eq(multiply("-21754.237655475372", "9"), "-195788.138899278348");
  eq(multiply("-21754.237655475372", "999"), "-21732483.417819896628");
  eq(multiply("999", "-21754.237655475372"), "-21732483.417819896628");
  eq(multiply("-21754.237655475372", "-699.4316097056533"), "15215601.4612884766884040073205276");
  eq(multiply("-699.4316097056533", "-21754.237655475372"), "15215601.4612884766884040073205276");
});

// test("gregory_leibniz", ({ eq }) => {
//   eq(gregory_leibniz(1), "3");
//   eq(gregory_leibniz(2).substring(0, 12), "3.1666666666");
//   eq(gregory_leibniz(3).substring(0, 12), "3.1333333333");
//   eq(gregory_leibniz(4).substring(0, 12), "3.1452380952");

//   let start = performance.now();
//   eq(gregory_leibniz(1_000_000).substring(0, 12), "3.1415926535");
//   const duration = performance.now() - start;
//   console.log("d:", duration);
//   eq(duration < 2000, true);
// });

test("nilakantha", ({ eq }) => {
  eq(nilakantha(1), "3");
  eq(nilakantha(2).substring(0, 12), "3.1666666666");
  eq(nilakantha(3).substring(0, 12), "3.1333333333");
  eq(nilakantha(4).substring(0, 12), "3.1452380952");
  // Math.PI = 3.141592653589793
  // first 10 decimal digits of PI
  let start = performance.now();
  eq(nilakantha(3000).substring(0, 12), "3.1415926535");
  const duration = performance.now() - start;
  eq(duration < 2000, true);
});

test("eulers_number", ({ eq }) => {
  eq(eulers_number({ steps: 1 }), "1");
  eq(eulers_number({ steps: 2 }), "2");
  eq(eulers_number({ steps: 3 }), "2.5");
  eq(eulers_number({ max_decimal_digits: 10, steps: 4 }).split(".")[1].length, 10);
  eq(eulers_number({ max_decimal_digits: 10, steps: 10 }), "2.7182815256");
  eq(Number(eulers_number(10_000).substring(0, 17)), Math.E);
});

test("count_decimal_digits", ({ eq }) => {
  eq(count_decimal_digits("-0.123"), "3");
  eq(count_decimal_digits("0"), "0");
  eq(count_decimal_digits("0.1"), "1");
  eq(count_decimal_digits("0.123"), "3");
});

test("round_decimal", ({ eq }) => {
  eq(round_last_decimal("0.99"), "1");
  eq(round_last_decimal("+0.4"), "0");
  eq(round_last_decimal("0.4"), "0");
  eq(round_last_decimal("0.5"), "1");
  eq(round_last_decimal("0.545"), "0.55");
  eq(round_last_decimal("0.544"), "0.54");
  eq(round_last_decimal("0.49"), "0.5");
  eq(round_last_decimal("0.499"), "0.5");
  eq(round_last_decimal("0.88"), "0.9");
  eq(round_last_decimal("0.89"), "0.9");
  eq(round_last_decimal("0.89"), "0.9");
  eq(round_last_decimal("0.9"), "1");
});

test("round", ({ eq }) => {
  eq(round("0.12345"), "0");
  eq(round("0"), "0");
  eq(round("-0"), "0");
  eq(round("-.99"), "-1");
  eq(round(".99"), "1");
  eq(round("0.99"), "1");
  eq(round("213.123123123"), "213");
  eq(round("-13.123123123"), "-13");
  eq(round("0.12345", { digits: 2 }), "0.12");
  eq(round("0.123456"), "0");
  eq(round("0.123456", { digits: 3 }), "0.123");
  eq(round("0.123456", { digits: 4 }), "0.1235");
  eq(round("0.987654", { digits: 100 }), "0.987654");
  eq(round("0.987654", { digits: 4 }), "0.9877");
});

test("binomial_coefficient", ({ eq }) => {
  eq(binomial_coefficient("2", "1"), "2");
  eq(binomial_coefficient("3", "0"), "1");
  eq(binomial_coefficient("3", "1"), "3");
  eq(binomial_coefficient("3", "2"), "3");
  eq(binomial_coefficient("3", "3"), "1");
  eq(binomial_coefficient("6", "4"), "15");
  eq(binomial_coefficient("7", "2"), "21");
  eq(binomial_coefficient("7", "3"), "35");
  eq(binomial_coefficient("8", "5"), "56");
  eq(binomial_coefficient("50", "3"), "19600");
});

test("multiply_range", ({ eq }) => {
  eq(multiply_range("0", "1"), "0");
  eq(multiply_range("1", "1"), "1");
  eq(multiply_range("1", "2"), "2");
  eq(multiply_range("1", "3"), "6");
  eq(multiply_range("1", "3", "0.5"), "22.5"); // 1 * 1.5 * 2 * 2.5 * 3
});

test("is_factorial", ({ eq }) => {
  eq(is_factorial("1"), false);
  eq(is_factorial("1!"), true);
  eq(is_factorial("0.1"), false);
});

test("factorial", ({ eq }) => {
  eq(factorial("1"), "1");
  eq(factorial("2"), "2");
  eq(factorial("2"), "2");
  eq(factorial("3"), "6");
  eq(factorial("4"), "24");
  eq(factorial("10"), "3628800");
});

test("sort", ({ eq }) => {
  eq(sort(["1", "2", "3"]), ["1", "2", "3"]);
  eq(sort(["1", "2", "3"], { direction: "descending" }), ["3", "2", "1"]);
  const nums = ["0", "-10", "-10.213", "12e34", "-1e-424", "3123761254357621"];
  eq(sort(nums), ["-10.213", "-10", "-1e-424", "0", "3123761254357621", "12e34"]);
  eq(sort(nums, { direction: "descending" }), ["12e34", "3123761254357621", "0", "-1e-424", "-10", "-10.213"]);
});

test("sum", ({ eq }) => {
  eq(sum(["1", "2", "3"]), "6");
  eq(sum(["1", "2", "8"]), "11");
});

test("mean", ({ eq }) => {
  eq(mean(["1", "10", "4"]), "5");
  eq(mean(["-1", "2", "8"], { ellipsis: true }), "3");
  eq(mean(["1", "2", "8"], { max_decimal_digits: 3 }), "3.667");
  eq(mean(["1", "2", "8"], { ellipsis: true }), "3.666...");
});

test("is_negative_infinity", ({ eq }) => {
  eq(is_negative_infinity("-inf"), true);
  eq(is_negative_infinity("inf"), false);
  eq(is_negative_infinity("Infinity"), false);
  eq(is_negative_infinity("infinity"), false);
  eq(is_negative_infinity("+Infinity"), false);
  eq(is_negative_infinity("-Infinity"), true);
});

test("is_positive_infinity", ({ eq }) => {
  eq(is_positive_infinity("-inf"), false);
  eq(is_positive_infinity("inf"), true);
  eq(is_positive_infinity("Infinity"), true);
  eq(is_positive_infinity("infinity"), true);
  eq(is_positive_infinity("+Infinity"), true);
  eq(is_positive_infinity("-Infinity"), false);
});

test("is_infinity", ({ eq }) => {
  eq(is_infinity("-inf"), true);
  eq(is_infinity("inf"), true);
  eq(is_infinity("Infinity"), true);
  eq(is_infinity("infinity"), true);
  eq(is_infinity("+Infinity"), true);
  eq(is_infinity("-Infinity"), true);
});

test("is_integer", ({ eq }) => {
  eq(is_integer("0"), true);
  eq(is_integer("-0.213123"), false);
  eq(is_integer("+12386123"), true);
  eq(is_integer("Infinity"), false);
  eq(is_integer("0.5e123"), true);
});

test("pow_positive", ({ eq }) => {
  eq(pow_positive("7", "2"), "49");
  eq(pow_positive("7", "3"), "343");
});

test("ceil", ({ eq }) => {
  eq(ceil("-1.5"), "-1");
  eq(ceil("0.00"), "0");
  eq(ceil("-0.5"), "0");
  eq(ceil("0.05"), "1");
  eq(ceil("2"), "2");
});

test("floor", ({ eq }) => {
  eq(floor("-1.5"), "-2");
  eq(floor("0.00"), "0");
  eq(floor("-0.5"), "-1");
  eq(floor("0.05"), "0");
  eq(floor("2"), "2");
});

test("is_zero", ({ eq }) => {
  eq(is_zero("0"), true);
  eq(is_zero("-0"), true);
  eq(is_zero("+0"), true);
  eq(is_zero("-0.1"), false);
  eq(is_zero("0.00"), true);
  eq(is_zero("0e123"), true);
  eq(is_zero("10e123"), false);
});

test("sign", ({ eq }) => {
  eq(sign("0"), "");
  eq(sign("-0"), "");
  eq(sign("+0"), "");
  eq(sign("0.1"), "+");
  eq(sign("-23.2"), "-");
  eq(sign(".00"), "+");
});

test("compare", ({ eq }) => {
  eq(compare("0.1", "0.2"), "<");
  eq(compare("0.1", "-0.2"), ">");
  eq(compare("0.1", "+.1"), "=");
  eq(compare("-1", "02"), "<");
  eq(compare("1", "+1"), "=");
  eq(compare("1", "1"), "=");
  eq(compare("100", "10"), ">");
  eq(compare("10", "100"), "<");
  eq(compare("4", "8"), "<");
  eq(compare("1.234", "1.3"), "<");
  eq(compare("0.234", "1.3"), "<");
  eq(compare("0.200", "0.2"), "=");
  eq(compare("0.5827080957222082", "0.0000005045423379090863"), ">");
  eq(compare("-5340.364298370885", "-7218.188720429374"), ">");
});

test("clean", ({ eq }) => {
  eq(clean(".00"), "0");
  eq(clean("706584.00"), "706584");
  eq(clean("-3.4028234663852886e+038"), "-340282346638528860000000000000000000000");
});

test("min/max", ({ eq }) => {
  const nums = ["-1", "02", "2387456152754", "42.1276315263412312312", "-1263.312"];
  eq(min(nums), "-1263.312");
  eq(max(nums), "2387456152754");
  eq(min("-20015109.354", "943784.9626061671818"), "-20015109.354");
});

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc#using_math.trunc
test("truncate", ({ eq }) => {
  eq(truncate("13.37"), "13");
  eq(truncate("42.84"), "42");
  eq(truncate("0.123"), "0");
  eq(truncate("-0.123"), "-0");
  eq(truncate("-1.123"), "-1");
});

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder#remainder_with_positive_dividend
test("remainder with positive dividend", ({ eq }) => {
  eq(remainder("706584.00", "8290389568953.324"), "706584");
  eq(remainder("13", "5"), "3");
  eq(remainder("1", "-2"), "1");
  eq(remainder("1", "2"), "1");
  eq(remainder("2", "3"), "2");
  eq(remainder("5.5", "2"), "1.5");
  eq(remainder(".11", "85.49520108642433"), "0.11");
  eq(remainder("79065.7357630", "3900634200.57024"), "79065.735763");
  eq(remainder("525950.950", "5"), "0.95");
});

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder#remainder_with_negative_dividend
test("remainder with negative dividend", ({ eq }) => {
  eq(remainder("-13", "5"), "-3");
  eq(remainder("-1", "2"), "-1");
  eq(remainder("-4", "2"), "-0");
});

test("long_division", ({ eq }) => {
  eq(long_division("2", "20.5", { max_decimal_digits: 3 }), "0.098");
  eq(long_division("24", "20.4", { max_decimal_digits: 3 }), "1.176");
  eq(long_division("24", "204", { max_decimal_digits: 4 }), "0.1176");
  eq(long_division("1", "200", { max_decimal_digits: 10 }), "0.005");
  eq(long_division("7811318914817906", "733134704312198", { max_decimal_digits: 2 }), "10.65");
  eq(long_division("7811318914817906", "733134704312198", { max_decimal_digits: 20 }), "10.65468442412123875145");
  eq(
    long_division("7811318914817906", "733134704312198"),
    "10.6546844241212387514507804615870008541478913639542244503490575929003149707829237705155924042746898564"
  );
  eq(long_division("3640", "15", { ellipsis: true, max_decimal_digits: 5 }), "242.666...");
  eq(long_division("1", "100"), "0.01");
  eq(long_division("1", "1000"), "0.001");
  eq(long_division("1", "3", { ellipsis: false, max_decimal_digits: 3 }), "0." + "3".repeat(3));
  eq(long_division("59", "1.2", { max_decimal_digits: 2 }), "49.17");
  eq(long_division("59", "1.2", { max_decimal_digits: 3 }), "49.167");
  eq(long_division("1", "3", { ellipsis: true }), "0.333...");
  eq(long_division(".2", "10", { max_decimal_digits: 3 }), "0.02");
  eq(long_division("0.2", "10", { max_decimal_digits: 3 }), "0.02");
  eq(long_division("2", "10"), "0.2");
  eq(long_division("1", "10"), "0.1");
  eq(long_division("10", "1"), "10");
  eq(long_division("3630", "15"), "242");
  eq(long_division("111", "10"), "11.1");
  eq(long_division("22", "2"), "11");
  eq(long_division("222", "2"), "111");
  eq(long_division("3640", "15", { max_decimal_digits: 3 }), "242.667");
  eq(long_division("3640", "15", { ellipsis: true }), "242.666...");
  eq(long_division("487", "32"), "15.21875");
  eq(long_division("32", "16"), "2");
  eq(long_division("10", "2"), "5");
  eq(long_division("12", "32"), "0.375");
  eq(long_division("1", "10"), "0.1");
  eq(long_division("716.12", "85985618.58"), "0.0000083283694625483265320250487869433200279246045984542360665075766673632040759344386634288722005958");
});

test("divide", ({ eq }) => {
  eq(divide(".00", "6"), "0");
  eq(divide("0", "705681262278.03753950"), "0");
  eq(divide("100", "10"), "10");
  eq(divide("100", "10.0"), "10");
  eq(divide("100.0", "10.0"), "10");
  eq(divide("+1e7", "+1e6", { max_decimal_digits: 3 }), "10");
  eq(divide("+24", "+20.4", { max_decimal_digits: 3 }), "1.176");
  eq(
    divide("-9006455032.11562", "22.869243126448367"),
    "-393823922.4760184723811307399012471171864132436880578315806968247728994696230966722857123126610496303798446557"
  );
  eq(divide("24", "20.4", { max_decimal_digits: 3 }), "1.176");
  eq(divide("1", "234567").startsWith("0.00000426"), true);
  eq(divide("-781131.8914817906", "-733.134704312198", { max_decimal_digits: 0 }), "1065");
  eq(
    divide("-781131.8914817906", "-733.134704312198", { max_decimal_digits: 100 }),
    "1065.4684424121238751450780461587000854147891363954224450349057592900314970782923770515592404274689856409"
  );
  eq(
    divide("9338085.909340393", "-9286303586.268997"),
    "-0.0010055762039858316578900205730924892611948083759542060841788902534350260319495803206108599799654063"
  );
  eq(divide("3640", "15", { ellipsis: true, max_decimal_digits: 5 }), "242.666...");
  eq(divide("3640", "-15", { ellipsis: true, max_decimal_digits: 5 }), "-242.666...");
  eq(divide("-.2", "10", { max_decimal_digits: 3 }), "-0.02");
  eq(divide("-0.2", "10", { max_decimal_digits: 3 }), "-0.02");
  eq(divide("-2", "-10"), "0.2");
  eq(divide("1", "-10"), "-0.1");
  eq(divide("10", "1"), "10");
  eq(divide("-3630", "15"), "-242");
  eq(divide("-111", "-10"), "11.1");
  eq(
    divide("1", "49", { max_decimal_digits: Infinity, ellipsis: true }),
    "0.020408163265306122448979591836734693877551020408163265306122448979591836734693877551020408163265306122448979591836734693877551..."
  );

  // Generally, 1/(10ⁿ-1)² gives all of n-digit numbers 0 to 10²ⁿ-1, except for 10²ⁿ-2.
  // const result = divide("1", "998,001");
});

test("divide by zero throws exception", ({ eq }) => {
  let msg;
  try {
    divide("1231232", "0");
  } catch (error) {
    msg = error.message;
  }
  eq(msg.length > 10, true);
});

test("long_multiplication", ({ eq }) => {
  eq(long_multiplication("0.4", "0.2"), "0.08");
  eq(long_multiplication("4444", "333"), "1479852");
  eq(long_multiplication("4444", "3"), "13332");
  eq(long_multiplication("1", "1"), "1");
  eq(long_multiplication("123456789.123456789", "5678"), "700987648642.987647942");
  eq(long_multiplication("21754.237655475372", "56533"), "1229832317.376989205276");
  eq(long_multiplication("21754.237655475372", "7056533"), "153509495905.704593205276");
  eq(long_multiplication("21754.237655475372", "97056533"), "2111390884898.488073205276");
  eq(long_multiplication("21754.237655475372", "6994316097056533"), "152156014612884766884.040073205276");
});

test("absolute", ({ eq }) => {
  eq(absolute("-10"), "10");
  eq(absolute("10"), "10");
});

test("expand", ({ eq }) => {
  eq(expand("-8822030491.7968048209392"), "-8822030491.7968048209392");
  eq(expand("4218072702803791.8004622727"), "4218072702803791.8004622727");
  eq(expand("1.2e2"), "120");
  eq(expand("4.25e7"), "42500000");
  eq(expand("4.25e-7"), "0.000000425");
  eq(expand("1.2345e2"), "123.45");
  eq(expand("1.23e+20"), "123000000000000000000");
  eq(expand("5.045423379090863e-7"), "0.0000005045423379090863");
  eq(
    expand("-7.0957785648399024755535458291091456514990305749706184102834950392700045391509013462894856975e-9"),
    "-0.0000000070957785648399024755535458291091456514990305749706184102834950392700045391509013462894856975"
  );
  eq(expand("41.3861"), "41.3861");
  eq(expand("34.4282"), "34.4282");
  eq(expand("4.4296"), "4.4296");
  eq(expand("-4.2367"), "-4.2367");
  eq(expand("-7.081154551613622e-10"), "-0.0000000007081154551613622");
});

test("simple", ({ eq }) => {
  const a = "0.12345";
  const b = "12345.0";
  const result = long_addition(a, b);
  eq(result, "12345.12345");
});

test(`positive decimal + positive integer`, ({ eq }) => {
  const n1 = "12345.6789";
  const n2 = "357910";
  const result = long_addition(n1, n2);
  eq(result, "370255.6789");
});

test("-5 + -10", ({ eq }) => {
  const n1 = "-5";
  const n2 = "-10";
  const result = add(n1, n2);
  eq(result, "-15");
});

test("-1 - 5", ({ eq }) => {
  const n1 = "-1";
  const n2 = "5";
  const result = subtract(n1, n2);
  eq(result, "-6");
});

test("subtract", ({ eq }) => {
  eq(subtract("525950", "525950.95"), "-0.95");
});

test("long_subtraction", ({ eq }) => {
  eq(long_subtraction("525950.95", "525950"), "0.95");
  eq(long_subtraction("100", "10"), "90");
  eq(long_subtraction("0.351562500000000006", "0"), "0.351562500000000006");
});

test("-10 + 20.5", ({ eq }) => {
  const n1 = "-10";
  const n2 = "20.5";
  const result = add(n1, n2);
  eq(result, "10.5");
});

test("0.1 + 0.2", ({ eq }) => {
  eq(add("0.1", "0.2"), "0.3");
});

test("add", ({ eq }) => {
  eq(add(".252387", "9823118903435"), "9823118903435.252387");
  eq(add("3243.851", "1343"), "4586.851");
  eq(add("4", "56520.7471155"), "56524.7471155");
  eq(add("7.609890885355359", "-47020050888.60273"), "-47020050880.992839114644641");
  eq(add("-960.7970488209392", "-8822029530.999756"), "-8822030491.7968048209392");
  eq(add("7.609890885355359", "-47020050888.60273", "-960.7970488209392"), "-47020050880.992839114644641");
  eq(add(".13058", ".533167144426"), "0.663747144426");
});

test("83534564031027.53 + 54503799876882.016", ({ eq }) => {
  const a = "83534564031027.53";
  const b = "54503799876882.016";
  const result = long_addition(a, b);
  eq(result, "138038363907909.546");
});

test("-83534564031027.53 + -54503799876882.016", ({ eq }) => {
  const a = "-83534564031027.53";
  const b = "-54503799876882.016";
  const result = add(a, b);
  // same as -1 * (a + b)
  eq(result, "-138038363907909.546");
});

test("compare_positive", ({ eq }) => {
  eq(compare_positive("525950", "525950.95"), "<");
  eq(compare_positive("0.351562500000000006", "0"), ">");
});

// test random numbers
test("check random numbers", ({ eq }) => {
  for (let i = 0; i < 100_000; i++) {
    const a = Math.random();
    const b = Math.random();
    const apos = Math.abs(a);
    const bpos = Math.abs(b);
    const expected = apos > bpos ? ">" : apos < bpos ? "<" : "=";
    const apos_str = expand(apos.toString());
    const bpos_str = expand(bpos.toString());
    try {
      eq(compare(apos_str, bpos_str), expected);
    } catch (error) {
      console.log({ a, b });
      throw error;
    }
  }
});
