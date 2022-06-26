module.exports = function is_infinity(n) {
  return !!n.match(/inf(inity)?$/i);
};
