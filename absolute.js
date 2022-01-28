module.exports = function absolute(n) {
  if (n[0] === "-") return n.substring(1);
  else return n;
};
