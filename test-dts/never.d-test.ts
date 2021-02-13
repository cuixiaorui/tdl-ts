// 与 void 的差异
// 一旦有人告诉你，never 表示一个从来不会优雅的返回的函数时，你可能马上就会想到与此类似的 void，然而实际上，
// void 表示没有任何类型，never 表示永远不存在的值的类型。
// 当一个函数返回空值时，它的返回值为 void 类型，
// 但是，当一个函数永不返回时（或者总是抛出错误），
// 它的返回值为 never 类型。void 类型可以被赋值（在 strictNullChecking 为 false 时），
// 但是除了 never 本身以外，其他任何类型不能赋值给 never。

describe("never", () => {
  it("number 类型不能赋值给 never 类型", () => {
    let foo: never;

    // 不能赋值 number 类型
    foo = 123;
  });

  it("一个从来不会有返回值的函数", () => {
    const fn: never = () => {
      while (true) {
        console.log("111");
      }
    };
    console.log(fn);
  });
  it("一个总是会抛出错误的函数", () => {
    function foo(): never {
      throw new Error("Not Implemented");
    }
  });
  it("永远没有相交的类型：", () => {
    // human 是个 never 类型
    type human = "boy" & "girl";
  });
});

