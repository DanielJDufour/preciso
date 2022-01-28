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

## basic usage
The following functions are supported:
- [absolute](#absolute)
- [add](#add)
- [multiply](#multiply)
- [remainder](#remainder)
- [subtract](#subtract)
- [truncate](#truncate)

### absolute
```js
import abs from "preciso/absolute.js";

abs("-10");
"10"

abs("4");
"4"
```

### add
```js
import add from "preciso/add.js";

add("0.1", "0.2"); // 0.1 + 0.2
"0.3"
```

### multiply
```js
import multiply from "preciso/multiply.js";

multiply("-714.7008086132632", "8135.725531"); // -714.7008086132632 * 8135.725531
"-5814609.6156612701214627592"
``` 

### divide
```js
import divide from "preciso/divide.js";

divide("-714.7008086132632", "8135.725531"); // -714.7008086132632 / 8135.725531
// default is 100 decimal places of precision
'-0.0878472123832102762218908980055167989417759034280282678823325216230183564682007707223868489179001533'
```

#### remainder
remainder does the same thing as JavaScript's [Remainder Operator %](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder#remainder_with_negative_dividend) except it only accepts real numbers and it supports numbers of unlimited length.
```js
import remainder from "preciso/truncate.js";

remainder("10", "3"); // 10 % 3
"1"

remainder("-0.5", "2"); // -0.5 % 2
"-0.5"
```

### subtract
```js
import subtract from "preciso/subtract.js";

subtract("10", "2.14"); // 10 - 2.14
"7.86"
```

### truncate
truncate does the same thing as JavaScript's [Math.trunc()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc) except it only accepts real numbers and it supports numbers of unlimited length.
It basically removes the decimal place and anything to the right of it.
```js
import truncate from "preciso/truncate.js";

truncate("-714.7008086132632");
"-714"
```
