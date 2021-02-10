// unknown 指的是不可预先定义的类型，在很多场景下，它可以替代 any 的功能同时保留静态检查的能力。
describe("unknown", () => {
  it("它可以替代 any 的功能同时保留静态检查的能力", () => {
    const num: number = 10;
    // 报错 因为 num 是 number 类型，没有 split 方法
    num.split("");

    // 强制转换为 string
    ((num as unknown) as string).split("");
  });

  it("unknown 不可以调用任何方法，但是 any 可以", () => {
    // 换句话说  unknown 会比 any 更安全
    const foo: unknown = {};

    foo.a(); // 报错 unknown 不可以调用任何方法

    const bar: any = {};

    bar.a(); // ok
  });

  it("避免使用 any 作为函数的参数类型而导致的静态类型检查 bug", () => {
    function test(input: unknown): number {
      if (Array.isArray(input)) {
        return input.length; // Pass: 这个代码块中，类型守卫已经将input识别为array类型
      }

      return input; // Error: 这里的input还是unknown类型，静态检查报错。如果入参是any，则会放弃检查直接成功，带来报错风险
    }
  });
});
