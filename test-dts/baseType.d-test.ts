import { expectType } from "tsd";
import { describe } from "./index";
import { num, str } from "../src/baseType";

describe("number", () => {
  expectType<number>(num);
});

describe("string", () => {
  expectType<string>(str);
});
