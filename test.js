const test = require("flug");
const preciso = require("./preciso.js");

const {
  absolute,

  compare,
  expand,

  add,
  long_addition,

  divide,
  long_division,

  multiply,
  long_multiplication,

  round_last_decimal,

  subtract,
  long_subtraction
} = preciso;

test("round_decimal", ({ eq }) => {
  eq(round_last_decimal("0.4"), "0");
  eq(round_last_decimal("0.5"), "1");
  eq(round_last_decimal("0.545"), "0.55");
  eq(round_last_decimal("0.544"), "0.54");
  eq(round_last_decimal("0.49"), "0.5");
  eq(round_last_decimal("0.499"), "0.5");
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
  eq(divide("-0.2", "10", { max_decimal_digits: 3 }), "-0.02");
  eq(divide("-2", "-10"), "0.2");
  eq(divide("1", "-10"), "-0.1");
  eq(divide("10", "1"), "10");
  eq(divide("-3630", "15"), "-242");
  eq(divide("-111", "-10"), "11.1");
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
  eq(add("7.609890885355359", "-47020050888.60273"), "-47020050880.992839114644641");
  eq(add("-960.7970488209392", "-8822029530.999756"), "-8822030491.7968048209392");
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
