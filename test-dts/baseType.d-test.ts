import { expectError, expectType } from "tsd";
import { describe } from "./index";

describe("基础类型", () => {
  describe("boolean", () => {
    const boo = true;
    expectType<boolean>(boo);
  });

  describe("number", () => {
    const num = 1;
    expectType<number>(num);
  });

  describe("string", () => {
    const str = "123";
    expectType<string>(str);
  });

  describe("void", () => {
    describe("函数没有返回值的时候，将返回一个 void 类型", () => {
      const getVal = () => {};
      expectType<void>(getVal());
    });

    describe("void 只能赋值 undefined", () => {
      expectType<void>(undefined);
      expectError<void>(null);
    });
  });

  describe("null", () => {
    const nullVal: null = null;
    expectType<null>(nullVal);
    expectError<undefined>(undefinedVal);
  });

  describe("undefined", () => {
    const undefinedVal: undefined = undefined;
    expectType<undefined>(undefinedVal);
    expectError<null>(undefinedVal);
  });
});
