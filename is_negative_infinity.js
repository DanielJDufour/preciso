module.exports = function is_negative_infinity(n) {
  return !!n.match(/^-inf(inity)?$/i);
};
