describe("readonly", () => {
  it("function args", () => {
    function foo(config: { readonly bar: number; readonly bas: number }) {
      // 不可以修改
      config.bar = 2;
    }

    const config = {
      bar: 1,
      bas: 2,
    };

    foo(config);
  });

  it("interface & type", () => {
    type Foo = {
      readonly bar: number;
      readonly bas: number;
    };

    const foo: Foo = { bar: 1, bas: 2 };

    // 不可以修改
    foo.bar = 2;
  });

  it("class", () => {
    class Foo {
      readonly bar: number = 1;
      readonly baz: string;
      constructor() {
        // 可以赋值
        this.bar = 2;
        this.baz = "3";
      }
    }

    const foo = new Foo();
    // 实例属性是只读的，不可以修改
    foo.bar = 2;
  });

  it("ReadOnly 映射类型", () => {
    type Foo = {
      bar: number;
      bas: number;
    };

    // 把 Foo 里面所有的 key 都变成 readonly
    type FooReadOnly = Readonly<Foo>;

    const foo: FooReadOnly = {
      bar: 1,
      bas: 2,
    };

    // 不可以被修改了
    foo.bar = 2;
  });

  it("索引签名标记为只读", () => {
    interface Foo {
      readonly [x: number]: number;
    }

    const foo: Foo = {
      0: 123,
      1: 456,
    };

    // 报错 不允许修改
    foo[0] = 2222;
  });

  it("ReadonlyArray", () => {
    let foo: ReadonlyArray<number> = [1, 2, 3];

    // 整个数组全部是 readonly
    foo[0] = 22;

    // 不可以 push，因为会改变数组
    foo.push(1223);

    // 可以，因为是返回了一个新的数组，没有修改之前的
    foo = foo.concat(123);
  });

  describe("与 cost 的不同", () => {
    // 与 const 的不同
    //
    // const
    // 用于变量；
    // 变量不能重新赋值给其他任何事物。
    //
    // readonly
    // 用于属性；
    // 用于别名，可以修改属性；
  });
});
