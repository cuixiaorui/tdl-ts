import { describe } from ".";
import { expectError } from "tsd";

describe("类型推论", () => {
  describe("如果没有指定类型，但是赋值了，ts会自动做类型推论", () => {
    const num = 7;
    // num 已经被推论成 number 类型了，所以在赋值一个 string 类型就会报错
    num = "7";
  });


  describe('如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：', () => {
      let obj;

      obj = "1"
      obj = 2
  })
});
