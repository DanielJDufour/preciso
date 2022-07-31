import test from "flug";

import preciso from "./preciso";
import { divide } from "./preciso";

test("import preciso", ({ eq }) => {
  eq(preciso.add("1", "2"), "3");
});

test("import { divide } from ", ({ eq }) => {
  eq(divide("1", "2"), "0.5");
});
