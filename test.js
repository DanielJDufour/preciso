const test = require("flug");
const preciso = require("./preciso.js");

const {
  absolute,

  compare,
  expand,

  add,
  long_addition,

  multiply,
  long_multiplication,

  subtract,
  long_subtraction
} = preciso;

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

test("multiply", ({ eq }) => {
  eq(multiply("7147008", "5"), "35735040");
  eq(multiply("714700808", "5"), "3573504040");
  eq(multiply("8086", "5"), "40430");
  eq(multiply("700", "5"), "3500");
  eq(multiply("70002", "5"), "350010");
  eq(multiply("7008086", "5"), "35040430");

  //                                      3573540430663160
  eq(multiply("7147008086132632", "5"), "35735040430663160");
  eq(multiply("-714.7008086132632", "8135.725531"), "-5814609.6156612701214627592");
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

test("absolute", ({ eq }) => {
  eq(absolute("-10"), "10");
  eq(absolute("10"), "10");
});

test("expand", ({ eq }) => {
  eq(expand("4218072702803791.8004622727"), "4218072702803791.8004622727");
  eq(expand("1.2e2"), "120");
  eq(expand("4.25e7"), "42500000");
  eq(expand("4.25e-7"), "0.000000425");
  eq(expand("1.2345e2"), "123.45");
  eq(expand("1.23e+20"), "123000000000000000000");
  eq(expand("5.045423379090863e-7"), "0.0000005045423379090863");
});

test("compare", ({ eq }) => {
  eq(compare("1", "1"), "=");
  eq(compare("100", "10"), ">");
  eq(compare("10", "100"), "<");
  eq(compare("4", "8"), "<");
  eq(compare("1.234", "1.3"), "<");
  eq(compare("0.234", "1.3"), "<");
  eq(compare("0.200", "0.2"), "=");
  eq(compare("0.5827080957222082", "0.0000005045423379090863"), ">");
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

test("long_subtraction(100, 10) or 100 - 10", ({ eq }) => {
  eq(long_subtraction("100", "10"), "90");
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
  const a = "7.609890885355359";
  const b = "-47020050888.60273";
  const result = add(a, b);
  eq(result, "-47020050880.992839114644641");
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
