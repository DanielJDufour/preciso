const compare = require("./compare.js");
const long_addition = require("./long_addition.js");
const long_subtraction = require("./long_subtraction.js");

module.exports = function add(a, b) {
  const apos = a[0] !== "-";
  const bpos = b[0] !== "-";

  if (apos && bpos) {
    return long_addition(a, b);
  } else if (!apos && !bpos) {
    return "-" + long_addition(a.substring(1), b.substring(1));
  } else if (!apos && bpos) {
    a = a.substring(1);
    switch (compare(a, b)) {
      case "=":
        return "0";
      case "<":
        return long_subtraction(b, a);
      case ">":
        return "-" + long_subtraction(a, b);
    }
  } else if (apos && !bpos) {
    b = b.substring(1);
    switch (compare(a, b)) {
      case "=":
        return "0";
      case "<":
        return "-" + long_subtraction(b, a);
      case ">":
        return long_subtraction(a, b);
    }
  }
}
