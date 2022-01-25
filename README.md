# preciso
> Precise Mathematical Functions

features:
- no floating point arithmetic errors
- relatively fast
- functional programming (no class methods to learn)
- simple input and output (simple numerical strings)

## string format
In order to increase speed and ease maintainability, inputs and outputs must adhere to a format.
- no "+" at the front of positive numbers. `"10" not "+10"`
- no exponential notation: `"0.0000001000" not "1e-7"`
- zero in front of decimals: `"0.123" not ".123"`
- no extra zeros at the end: `"0.1" not "0.10"`

## basic usage
### add
```js
// imports only the add function
import add from "preciso/add.js";

add("0.1", "0.2"); // 0.1 + 0.2
// "0.3"
```

### subtract
```js
// imports only the add function
import subtract from "preciso/subtract.js";

subtract("10", "2.14"); // 10 - 2.14
// "7.86"
```

### absolute number
```js
import abs from "preciso/absolute.js";

abs("-10");
"10" // same as "-10".substring(1)

abs("10");
"10" // same as input
```

### multiplication
```js
import multiply from "preciso/multiply.js"

multiply("-714.7008086132632", "8135.725531");
"-5814609.6156612701214627592"
``` 

### division
```js
import division from "preciso/multiply.js"

division("-714.7008086132632", "8135.725531");
"-5814609.6156612701214627592"
```

## advanced usage
The `add` and `subtract` functions use long_addition or long_subtraction depending on
whether the inputs are positive or negative and which has a large absolute value.  For example,
subtracting a negative number from a positive number is essentially adding the two numbers together.

### long_addition
If you know both numbers are positive, you can call long_addition for a performance boost:
```js
import long_addition from "preciso/long_addition.js";

long_addition("123000", "456");
123456
```

### long subtraction
If you are subtracting a positive number from another positive number of greater value,
you can directly use long_subtraction for a performance boost.
```js
import long_subtraction from "preciso/long_subtraction.js";

long_subtraction("9", "2");
7
```