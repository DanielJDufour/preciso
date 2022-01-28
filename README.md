# preciso
> Precise Mathematical Functions

### features:
- no floating point arithmetic errors
- relatively fast
- functional programming (no class methods to learn)
- simple input and output (simple numerical strings)
- import only what you need
- tested on ten thousand random numbers

## basic usage
### add
```js
import add from "preciso/add.js";

add("0.1", "0.2"); // 0.1 + 0.2
"0.3"
```

### subtract
```js
import subtract from "preciso/subtract.js";

subtract("10", "2.14"); // 10 - 2.14
"7.86"
```

### absolute number
```js
import abs from "preciso/absolute.js";

abs("-10");
"10"

abs("10");
"10"
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
