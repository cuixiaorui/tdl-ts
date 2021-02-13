describe("运算符", () => {
  describe("非空断言运算符 !", () => {
    it("强调对应的元素是非 null|undefined 的", () => {
      function onClick(callback?: () => void) {
        callback!(); // 参数是可选入参，加了这个感叹号!之后，TS编译不报错
      }
    });
  });

  describe("可选链运算符 ?.", () => {
    //?.用来判断左侧的表达式是否是 null | undefined，如果是则会停止表达式运行，可以减少我们大量的&&运算。
    it("obj?.prop", () => {
      const obj = {
        a: "a",
      };

      console.log(obj?.a);
    });

    it("obj?.[index]", () => {
      const arr = [0, 1, 2];
      console.log(arr?.[1]);
    });

    it("func?.()", () => {
      const func = () => {
        return;
      };

      func?.();
    });
  });

  describe("空值合并运算符 ??", () => {
    // ??与||的功能是相似的，区别在于 ??在左侧表达式结果为 null 或者 undefined 时，才会返回右侧表达式 。
    // 而 || 表达式，大家知道的，则对 false、''、NaN、0 等逻辑空值也会生效，不适于我们做对参数的合并。
    it("demo", () => {
      const a = undefined;
      let b = a ?? 10;
      console.log(b); // b 的值是 10
    });
  });

  describe("数字分隔符_", () => {
    // _可以用来对长数字做任意的分隔，主要设计是为了便于数字的阅读，编译出来的代码是没有下划线的，请放心食用。
    it("demo", () => {
      let num: number = 1_2_345.6_78_9;
    });
  });
});
