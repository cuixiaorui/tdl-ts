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

    describe("void 能赋值给 undefined 和 null", () => {
      expectType<void>(undefined);
      expectType<void>(null);
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

  describe("undefined 和 null 是所有类型的子类型", () => {
    expectType<number>(undefined);
    expectType<string>(undefined);
    expectType<boolean>(undefined);
    expectType<void>(undefined);

    expectType<number>(null);
    expectType<string>(null);
    expectType<boolean>(null);
    expectType<void>(null);
  });
});
