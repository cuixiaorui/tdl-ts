import { describe } from ".";
import { expectType, expectError } from "tsd";

describe("函数", () => {
  describe("函数声明", () => {
    function add(a: number, b: number) {
      return a + b;
    }

    // 自动推论成 number 类型
    const result: number = add(1, 1);
    expectType<number>(result);
  });

  describe("函数表达式", () => {
    // add 其实是推论出来的
    const add = (a: number, b: number) => {
      return a + b;
    };

    // 自动推论成 number 类型
    const result: number = add(1, 1);
    expectType<number>(result);
  });

  describe("手动给 add 设置函数类型", () => {
    const add: (a: number, b: number) => number = (a, b) => {
      return a + b;
    };

    // 自动推论成 number 类型
    const result: number = add(1, 1);
    expectType<number>(result);
  });

  describe("用接口定义函数的形状", () => {
    interface IAdd {
      (a: number, b: number): number;
    }

    const add: IAdd = (a: number, b: number) => {
      return a + b;
    };

    const result = add(1, 1);
    expectType<number>(result);
  });

  describe("可选参数", () => {
    // 可选参数必须要在必须参数的后面
    // c 是可选参数
    function add(a: number, b: number, c?: number) {
      return a + b;
    }

    // 可以写c 也可以不写
    add(1, 1);
    add(1, 1, 1);
  });

  describe("参数默认值", () => {
    // 如果有了默认值的话，那么就不在受限于"可选参数必须要在必须参数后面"这条限制了
    function add(a: number = 1, b: number = 2) {
      return a + b;
    }

    // 有默认值后，其实这个参数就变成了可选参数
    // result 应该等于 3
    add();
    // 可以写，也可以不写
    add(1);
  });

  describe("剩余参数", () => {
    // rest 其实是个数组
    // rest 只能是最后一个参数
    function push(array, ...items: any[]) {
      items.forEach(function (item) {
        array.push(item);
      });
    }

    let a = [];
    push(a, 1, 1, 2, 2, 3, 3);
  });

  describe("重载", () => {
    describe("反例", () => {
      function reverse(x: number | string): number | string {
        if (typeof x === "number") {
          return Number(x.toString().split("").reverse().join(""));
        } else if (typeof x === "string") {
          return x.split("").reverse().join("");
        }
      }

      // 返回的 result 又是 string 又是 number  不够精确
      const result = reverse("hei");
      expectType<number | string>(result);
    });

    describe("利用重载", () => {
      //注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。
      function reverse(x: number): number;
      function reverse(x: string): string;
      function reverse(x: number | string): number | string {
        if (typeof x === "number") {
          return Number(x.toString().split("").reverse().join(""));
        } else if (typeof x === "string") {
          return x.split("").reverse().join("");
        }
      }

      const result = reverse("hei");
      expectType<string>(result);
      expectError<number>(result);
    });
  });
});
