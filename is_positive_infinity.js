module.exports = function is_positive_infinity(n) {
  return !!n.match(/^\+?inf(inity)?$/i);
};
