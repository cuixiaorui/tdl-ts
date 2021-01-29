describe("索引签名", () => {
  it("所有成员都必须符合字符串的索引签名", () => {
    interface Foo {
      [index: string]: number;
    }

    const foo: Foo = {
      "1": 1,
      "2": "2", // 必须是 number 类型
    };
  });

  it("使用一组有限的字符串字面量", () => {
    type Index = "a" | "b" | "c";
    type FromIndex = { [k in Index]?: number };

    const good: FromIndex = {
      a: 1,
      b: 2,
      c: 3,
      d: 4, // 报错 没有这个类型
    };
  });

  it("同时拥有 string 和 number 类型的索引签名 ", async () => {
    interface ArrStr {
      [key: string]: string | number; // 这里必须要写成 string | number 不然 ts 报错, 这是因为 string 类型的索引签名比 number 类型的索引签名更严格。这是故意设计
      [index: number]: string;
    }

    const num = 1;
    const arr: ArrStr = {
      a: 1,
      num: 1,
    };
  });
});
