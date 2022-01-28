const absolute = require("./absolute.js");
const long_division = require("./long_division.js");

module.exports = function (dividend, divisor, options) {
  const dividend_is_positive = dividend[0] !== "-";
  const divisor_is_positive = divisor[0] !== "-";

  const out_sign = dividend_is_positive !== divisor_is_positive ? "-" : "";

  if (!dividend_is_positive) dividend = absolute(dividend);
  if (!divisor_is_positive) divisor = absolute(divisor);

  return out_sign + long_division(dividend, divisor, options);
};
