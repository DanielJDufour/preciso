const absolute = require("./absolute.js");
const compare = require("./compare.js");
const long_multiplication = require("./long_multiplication.js");

module.exports = function multiply(a, b) {
  const apos = a[0] !== "-";
  const bpos = b[0] !== "-";

  const out_sign = apos !== bpos ? "-" : "";

  a = absolute(a);
  b = absolute(b);

  const comparison = compare(a, b);

  if (comparison === "<") {
    const aold = a;
    const bold = b;
    a = bold;
    b = aold;
  }

  return out_sign + long_multiplication(a, b);
};
