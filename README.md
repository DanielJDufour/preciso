# preciso
> Precise Mathematical Functions

### features:
- no floating point arithmetic errors
- relatively fast
- functional programming (no class methods to learn)
- simple input and output (simple numerical strings)
- import only what you need
- tested on ten thousand random numbers
- supports scientific exponential notation
- supports CJS and ESM
- supports TypeScript

## basic usage
The following functions are supported:
- [absolute](#absolute)
- [add](#add)
- [ceil](#ceil)
- [compare](#compare)
- [divide](#divide)
- [floor](#floor)
- [max](#max)
- [mean](#mean)
- [min](#min)
- [multiply](#multiply)
- [pow](#pow)
- [remainder](#remainder)
- [sign](#sign)
- [sort](#sort)
- [subtract](#subtract)
- [sum](#sum)
- [truncate](#truncate)

## install
You typically want to install preciso using the [NPM CLI](https://docs.npmjs.com/cli/v8), [pnpm](https://pnpm.io/), [yarn](https://yarnpkg.com/), or something similar.
```bash
npm install preciso
```
If you don't have access to a bundler, you can "install" preciso using an HTML script tag,
which will set a global preciso variable.
```html
<script src="https://unpkg.com/preciso"></script>
<script>
  console.log(preciso.abs("-10"));
  // "10"
</script>
```

### limitations
- no support for `Infinity`, `-Infinity`, or `NaN`

### absolute
```js
import abs from "preciso/absolute.js";

abs("-10");
"10"
```

### add
Add two numbers together.
```js
import add from "preciso/add.js";

add("0.1", "0.2"); // 0.1 + 0.2
"0.3"
```

### compare
```js
import compare from "preciso/compare.js";

compare("0.1", "0.2");
"<"

compare("0.1", "-0.2");
">"

compare("0.1", "+.1");
"="
```

### ceil
```js
import ceil from "preciso/ceil.js";

ceil(46);
"46"

ceil(-7.000000000000000000000000000000000000004);
"-7"
```


### divide
```js
import divide from "preciso/divide.js";

divide("-714.7008086132632", "8135.725531"); // -714.7008086132632 / 8135.725531
// default is 100 decimal places of precision
'-0.0878472123832102762218908980055167989417759034280282678823325216230183564682007707223868489179001533'
```

### floor
```js
import floor from "preciso/floor.js";

floor("45.9523663245126542371265437612538671523854172437561258367152356412734512");
"45"
floor("-45.95126753876125376512437641236512473654126345126534712653476152437651243");
"-46"
```

### mean
```js
import mean from "preciso/mean.js";

mean(["1", "10", "4"])
"5"

mean(["1", "2", "8"], { max_decimal_digits: 3 })
"3.667"

mean(["1", "2", "8"], { ellipsis: true })
"3.666..."
```

### max
```js
import max from "preciso/min.js";

max("0.1", "0.2"); // or max(["0.1", "0.2"]);
"0.2"
```

### min
```js
import min from "preciso/min.js";

min("0.1", "0.2"); // or min(["0.1", "0.2"]);
"0.1"
```

### multiply
```js
import multiply from "preciso/multiply.js";

multiply("-714.7008086132632", "8135.725531"); // -714.7008086132632 * 8135.725531
"-5814609.6156612701214627592"
``` 

### pow (power)
note: currently doesn't support non-integer exponents
```js
import pow from "preciso/pow.js";

pow("2", "3")
"8"

pow("-2", "-3")
"-0.125"

// set zero to the power of zero
pow("0", "0", { zero_to_the_power_of_zero: undefined })
undefined
```

### remainder
```js
import remainder from "preciso/truncate.js";

remainder("10", "3"); // 10 % 3
"1"

remainder("-0.5", "2"); // -0.5 % 2
"-0.5"
```

### sign
```js
import sign from "preciso/subtract.js";

sign("13e451");
"+"

sign("-0.123");
"-"

sign("-0.00");
""
```

### sort
```js
import sort from "preciso/sort.js"

// default is sorting in ascending order (smallest to greatest)
sort(["1", "2", "3"])
["1", "2", "3"]

// sort in descending order from greatest to smallest
sort(["1", "2", "3"], { direction: "descending" })
["3", "2", "1"]
```

### subtract
```js
import subtract from "preciso/subtract.js";

subtract("10", "2.14"); // 10 - 2.14
"7.86"
```

### sum
Similar to add, but can take an array of more than two numbers.
```js
import sum from "preciso/sum.js";

sum(["1", "2", "3"])
"6"
```

### truncate
```js
import truncate from "preciso/truncate.js";

truncate("-714.7008086132632"); // equivalent to Math.trunc(-714.7008086132632)
"-714"
```
