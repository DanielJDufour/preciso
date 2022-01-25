const CHUNK_SIZE = 15;

/**
 *
 * @param {String} a - numerical string larger or equal to b
 * @param {String} b - numerical string smaller or equal to a
 * @returns {String} product - result of multiplying a with b
 */

module.exports = function long_multiplication(a, b) {
  const top_index_of_dot = a.indexOf(".");
  const bottom_index_of_dot = b.indexOf(".");

  const a_num_decimal_places = top_index_of_dot === -1 ? 0 : a.length - 1 - top_index_of_dot;
  const b_num_decimal_places = bottom_index_of_dot === -1 ? 0 : b.length - 1 - bottom_index_of_dot;

  const out_num_decimal_places = a_num_decimal_places + b_num_decimal_places;

  // remove decimals
  a = a.replace(".", "");
  b = b.replace(".", "");

  const alen = a.length;
  const blen = b.length;

  // initialize grid and then do grid math???
  const grid = new Uint8Array(alen * blen);

  /*
  1000
    10
      
  */

  const chunks = [];
  let i = alen;
  while (i >= 0) {
    const end = i;
    const start = (i -= CHUNK_SIZE);
    const str = a.substring(start, end);
    chunks.push([Number(str), str.length]);
  }

  const partial_products = [];
  const partials = [];

  // for each number in multiplier
  for (let i = 0, ireverse = blen - 1; ireverse >= 0; ireverse--, i++) {
    const bstr = b[ireverse];

    const bnum = Number(bstr);
    // if (isNaN(bnum)) throw new Error("bnum is nan from" + bstr);

    let carried = 0;
    let partial = "";
    const ichunklast = chunks.length - 1;
    chunks.forEach(([chunk, chunklen], c) => {
      const subpartial = carried + bnum * chunk;
      let subpartstr = subpartial.toString();
      const subpartcharlen = subpartstr.length;
      if (subpartcharlen > chunklen && c !== ichunklast) {
        const islice = -1 * chunklen;
        partial = subpartstr.slice(islice) + partial;
        carried = Number(subpartstr.slice(0, islice));
      } else {
        const imax = chunklen - subpartcharlen;
        for (let i = 0; i < imax; i++) {
          subpartstr = "0" + subpartstr;
        }
        carried = 0;
        partial = subpartstr + partial;
      }
    });

    // add number of zeros at end
    partial += "0".repeat(i);

    partial_products.push(partial);

    partials.push([Array.from(partial).map(char => Number(char)), partial.length]);

    // if (partial.startsWith("N")) throw new Error("nan in partial");
  }
  // console.log({ partial_products, partials });

  // back to front, iterate through columns
  // and add partial products together
  const num_partials = partial_products.length;

  const number_of_columns = partials[partials.length - 1][1] + num_partials;

  let result = "";
  let carried = 0;
  for (let icol = 0; icol < number_of_columns; icol++) {
    let sum = carried;
    const pmax = Math.min(icol, num_partials - 1);
    for (let p = 0; p <= pmax; p++) {
      const [pnums, plen] = partials[p];
      const i = plen - 1 - icol;
      if (i >= 0) {
        sum += pnums[i];
      }
    }
    // if (isNaN(sum)) throw Error("sum is NaN");
    if (sum >= 10) {
      sum = sum.toString();
      result = sum[sum.length - 1] + result;
      carried = Number(sum.slice(0, -1));
    } else {
      result = sum + result;
      carried = 0;
    }
    // if (result.startsWith("94")) throw new Error("UHOH");
  }

  // add decimal back in
  if (out_num_decimal_places === 0) {
    // integer
    // remove extra zeros
    result = result.replace(/^0+/, "");
  } else {
    // decimal number
    const idot = result.length - out_num_decimal_places;

    result = result.substring(0, idot) + "." + result.substring(idot);

    // remove zeros from front
    result = result.replace(/^0+/, "");

    // remove extra zeros from the end
    result = result.replace(/\.?0+$/, "");

    if (result[0] === ".") result = "0" + result;
  }

  return result;
}
