describe("获取类型", () => {
  it("捕获变量的类型", () => {
    let foo = 123;
    let bar: typeof foo;
    bar = "123"; // 报错  因为 typeof foo 的类型是 number
    bar = 444;
  });

  it("捕获类成员的类型", () => {
    class Foo {
      foo: number;
    }

    let _foo: Foo;
    let bar: typeof _foo.foo;

    bar = 123;
    bar = "123"; // 报错 因为已经是 number 类型了
  });

  it("捕获字符串类型", () => {
    const foo = "hello";
    let bar: typeof foo;
    bar = "11"; // bar 的类型是字面量类型 "hello"
    bar = "hello";

    // 如果用的是 const 的话，那么 typeof 之后就是 字面量，因为是不可以修改的
    // 如果用的是 let 的话，那么 typeof 之后就是 string
  });

  it("捕获键的名称", () => {
    const colors = {
      red: "red",
      blue: "blue",
    };

    // keyof 关键字:能让你捕获一个类型的键
    type Colors = keyof typeof colors;
    let color: Colors;
    color = "red";
    color = "blue";
    color = "yellow"; // 报错  因为只能是 red | blue
  });
});
