const start = performance.now();
console.log("[preciso] building Euler's Number");

const fs = require("node:fs");
const e = require("./eulers_number.js");

const str = e({ steps: 1000, max_decimal_digits: 1000 });

fs.writeFileSync("./constants/e.js", `module.exports = { E: "${str}" };\n`);

console.log("[preciso] building Euler's Number took " + Math.round((performance.now() - start) / 1000) + " seconds");
