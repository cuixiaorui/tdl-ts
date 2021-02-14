import { describe } from ".";

//如果对一个类型名定义了泛型，那么使用此类型名的时候一定要把泛型类型也写上去。
// 语法格式
// 类型名<泛型列表> 具体类型定义
describe("泛型", () => {
  describe("类型约束", () => {
    interface Lengthwise {
      length: number;
    }

    function loggingIdentity<T extends Lengthwise>(arg: T): T {
      console.log(arg.length);
      return arg;
    }

    interface heihei {
      name: string;
    }
    const hei: heihei = {
      name: "hei",
    };
    loggingIdentity<heihei>(hei);
  });

  describe("基本使用", () => {
    it("普通类型定义", () => {
      type Dog<T> = { name: string; type: T };

      const dog: Dog<number> = {
        name: "heihei",
        type: 123, // type 是 number 类型
      };
    });

    it("类定义", () => {
      class Cat<T> {
        private type: T;
        constructor(type: T) {
          this.type = type;
        }
      }

      const cat: Cat<string> = new Cat<string>("cat");
      // 简写
      // const cat = new Cat("cat");
    });

    it("函数定义", () => {
      function swipe<T, U>(value: [T, U]): [U, T] {
        return [value[1], value[0]];
      }

      // a -> string
      // b -> number
      const [a, b] = swipe<number, string>([1, "1"]);
    });
  });

  describe("泛型推导与默认值", () => {
    // 我们可以简化对泛型类型定义的书写，因为TS会自动根据变量定义时的类型推导出变量类型，
    // 这一般是发生在函数调用的场合的。
    it("函数类型推导", () => {
      type Dog<T> = { name: string; type: T };

      function adopt<T>(dog: Dog<T>) {
        return dog;
      }

      const dog = { name: "ww", type: "hsq" };
      // ts 会自动推导出来 type 的类型为 string
      adopt(dog);
    });

    it("非函数泛型推导时,我们若需要定义变量类型则必须指定泛型类型", () => {
      type Dog<T> = { name: string; type: T };
      // 必须指定 string ，这个好比是一个函数的参数，
      const dog: Dog<string> = {
        name: "nihao",
        type: "heihei",
      };
    });

    it("泛型的默认值", () => {
      // 泛型默认值的语法格式
      // 泛型名 = 默认类型
      type Dog<T = any> = { name: string; type: T };
      // 因为给 T 指定了默认值 any ，所以调用 dog 时可以不指定 T 的类型
      const dog: Dog = {
        name: "xiaohei",
        type: "aa",
      };

      // 但是这里的 type 的类型是 any
      // 这是不安全的
      console.log(dog.type);
    });

    describe("泛型约束", () => {
      // 泛型名 extends 类型
      // extends 的语法格式
      it("限定泛型的类型", () => {
        function sum<T extends number>(value: T[]): number {
          let count = 0;
          value.forEach((v) => (count += v));
          return count;
        }

        // 这里其实就是约束了类型 T 必须扩展自 number 类型
        // 其实相等于就是 number 类型了
        sum([1, 2, 3]);
        sum(["1", "2", "3"]);

        type Dog = { name: string; age: number };

        function test<T extends Dog>(value: T) {}

        type BlackDog = {
          name: string;
          age: number;
          color: string;
        };
        const blackDog: BlackDog = {
          name: "xiaohei",
          age: 20,
          color: "black",
        };
        // blackDog 是 ok 的，它满足了所有的 Dog 的shape
        test(blackDog);
        // 这里不行，必须都满足 Dog 的 shape
        // 这里缺了 age
        test({
          name: "hei",
        });
      });

      it("支持多个泛型参数", () => {
        // 这里的意思是限制了 U 一定是 T 的 key 类型中的子集
        function pick<T, U extends keyof T>() {}

        // 比如 这里的 T 是Dog
        // U 就必须要满足 name | age

        type Dog = { name: string; age: number };

        pick<Dog, "name">();
      });
    });

    describe("泛型条件", () => {
      // 格式
      // 泛型名A extends 类型B ? 类型C: 类型D
      it("extends 也可以当做一个三元运算符来使用", () => {
        // 这里便不限制 T 一定要是 U 的子类型，如果是 U 子类型，则将 T 定义为 X 类型，否则定义为 Y 类型。
        // T extends U? X: Y
        type Dog = { name: string; age: number };

        function test<T, U>(value: T extends U ? string : number) {}

        type BlackDog = {
          name: string;
          age: number;
        };
        // 因为 BlackDog 是满足 extends Dog 类型的
        // 推导出来 value 是 string
        test<BlackDog, Dog>("123");

        type Animal = {
          name: string;
        };

        // 因为 Animal 是不满足 extends Dog 类型的
        // 推导出来 value 是 number
        test<Animal, Dog>(123);
      });
    });

    describe("泛型推断 infer", () => {
      // infer 的中文是“推断”的意思，一般是搭配上面的泛型条件语句使用的，
      // 所谓推断，就是你不用预先指定在泛型列表中，在运行时会自动判断，不过你得先预定义好整体的结构。
      // infer 大白话就是给类型起个别名,然后在编译阶段在确定其真正的类型
      // 这个就叫做类型推断
      // 使用场景
      // infer用来对满足的泛型类型进行子类型的抽取，有很多高级的泛型工具也巧妙的使用了这个方法。
      it("demo", () => {
        type Foo<T> = T extends { t: infer Test } ? Test : string;

        type One = Foo<number>; // string，因为number不是一个包含t的对象类型
        type Two = Foo<{ t: boolean }>; // boolean，因为泛型参数匹配上了，使用了infer对应的type
        type Three = Foo<{ a: number; t: () => void }>; // () => void，泛型定义是参数的子集，同样适配
      });
    });
  });
});
