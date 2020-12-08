import { describe } from ".";
import { expectError, expectType } from "tsd";

// 总结
// 联合类型可以被断言为其中一个类型
// 父类可以被断言为子类
// 任何类型都可以被断言为 any
// any 可以被断言为任何类型
// 要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可(这里的兼容可以理解为，a 里面的属性和方法在 b 里面存在，b 里面的属性和方法在 a 里面存在)

// 可以手动指定一个值的类型
describe("类型断言", () => {
  describe("value as type", () => {
    // 推荐使用 as
    const num: any = 1;
    // 强制改成 string 类型
    expectType<string>(num as string);
  });

  describe("<类型>值", () => {
    // 不推荐使用
    // 如果在 tsx 中 <> 这种会和声明一个元素从语法表达上重复
    const num: any = 1;
    // 强制改成 string 类型
    expectType<string>(<string>num);
  });

  describe("用途", () => {
    describe("将一个联合类型断言为其中一个类型", () => {
      interface Cat {
        name: string;
        run(): void;
      }
      interface Fish {
        name: string;
        swim(): void;
      }

      // 如果是联合类型的话，我们只能访问其公共的属性
      function getName(animal: Cat | Fish) {
        return animal.name;
      }

      // 因为 swim 不是公共的属性，所以会报错
      function isFish(animal: Cat | Fish) {
        // 报错版本
        // if (typeof animal.swim === "function") {
        //   return true;
        // }

        // 用类型断言解决
        if (typeof (animal as Fish).swim === "function") {
          return true;
        }
        return false;
      }
    });

    describe("类型断言只能欺骗编译器，无法避免运行时的错误", () => {
      interface Cat {
        name: string;
        run(): void;
      }
      interface Fish {
        name: string;
        swim(): void;
      }

      function swim(animal: Cat | Fish) {
        // 强制转换成 Fish 类型
        // 但是这里传入的其实是个 Cat 类型
        // 所以在运行时会报错
        (animal as Fish).swim();
      }

      const tom: Cat = {
        name: "Tom",
        run() {
          console.log("run");
        },
      };
      swim(tom);
      // Uncaught TypeError: animal.swim is not a function`
    });

    describe("将一个父类断言为更加具体的子类§", () => {
      class ApiError extends Error {
        code: number = 0;
      }
      class HttpError extends Error {
        code: number = 200;
      }

      function isApiError(error: Error) {
        // Error 为父类
        // 这里断言为更具体的子类 ApiError
        // 这里用 instanceof 更合适
        // 但是有可能 ApiError 和 HttpError 是 interface
        // 如果是 interface 的话，编译后会被删除掉的
        return (error as ApiError).code === 0;
      }
    });

    describe("将任何一个类型断言为 any", () => {
      // 我们明确知道这段代码不会出错
      window.foo = 1;
      // 就可以断言一下
      // 在 any 类型下，访问什么类型都是允许的
      (window as any).foo = 1;
      // 一方面不能滥用 as any，另一方面也不要完全否定它的作用，我们需要在类型的严格性和开发的便利性之间掌握平衡
    });

    describe("将 any 断言为一个具体的类型", () => {
      // 一般模糊的类型都是由第三方提供的没有明确的类型
      // 将模糊的类型转化成精确的类型
      function getCacheData(key: string): any {
        return (window as any).cache[key];
      }

      interface Cat {
        name: string;
        run(): void;
      }

      // 转换成精确的类型 Cat
      // 来避免一些问题
      const tom = getCacheData("tom") as Cat;
      tom.run();
    });
  });

  describe("类型断言的限制", () => {
    describe("若 A 兼容 B，那么 A 能够被断言为 B，B 也能被断言为 A。", () => {
      //要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可，
      //我们知道，TypeScript 是结构类型系统，类型之间的对比只会比较它们最终的结构，而会忽略它们定义时的关系。

      // 在下面的例子中，Cat 包含了 Animal 中的所有属性，除此之外，它还有一个额外的方法 run。
      // TypeScript 并不关心 Cat 和 Animal 之间定义时是什么关系，而只会看它们最终的结构有什么关系
      // ——所以它与 Cat extends Animal 是等价的：
      interface Animal {
        name: string;
      }
      interface Cat extends Animal {
        name: string;
        run(): void;
      }

      let tom: Cat = {
        name: "Tom",
        run: () => {
          console.log("run");
        },
      };
      let animal: Animal = tom;

      function testAnimal(animal: Animal) {
        // 是可以转换的
        // 父类可以被断言为子类
        return animal as Cat;
      }
      function testCat(cat: Cat) {
        // 是可以转换的
        // 允许 cat as Animal 是因为既然子类拥有父类的属性和方法，那么被断言为父类，获取父类的属性、调用父类的方法，就不会有任何问题，故「子类可以被断言为父类」
        return cat as Animal;
      }
    });
  });

  describe("双重断言", () => {
    // 基于任何类型都可以被断言为 any ,而any 可以被断言为任何类型
    // 我们就可以绕过断言的限制
    interface Cat {
      run(): void;
    }
    interface Fish {
      swim(): void;
    }

    function testCat(cat: Cat) {
      // 这个是错误的
      //   return cat as Fish;
      // 这个是可以的
      return (cat as any) as Fish;
    }

    // 但是，万不得已不要用
  });

  describe("类型断言 vs 类型转换", () => {
    describe("类型断言", () => {
      // 类型断言在编译后，是会被删除掉的
      // 编译前
      function toBoolean(something: any): boolean {
        return something as boolean;
      }

      toBoolean(1);

      // 编译后
      function toBoolean(something) {
        return something;
      }

      toBoolean(1);
    });

    describe("类型转换", () => {
      function toBoolean(something: any): boolean {
        return Boolean(something);
      }

      toBoolean(1);
      // 返回值为 true
    });
  });

  describe("类型断言 vs 类型声明", () => {
    describe("使用类型断言", () => {
      function getCacheData(key: string): any {
        return (window as any).cache[key];
      }

      interface Cat {
        name: string;
        run(): void;
      }

      const tom = getCacheData("tom") as Cat;
      tom.run();
    });

    describe("使用类型声明", () => {
      // 类型声明要比类型断言更加严谨
      // 推荐使用类型声明
      // 具体原因可查看：https://ts.xcatliu.com/basics/type-assertion.html#%E7%B1%BB%E5%9E%8B%E6%96%AD%E8%A8%80-vs-%E7%B1%BB%E5%9E%8B%E5%A3%B0%E6%98%8E
      function getCacheData(key: string): any {
        return (window as any).cache[key];
      }

      interface Cat {
        name: string;
        run(): void;
      }

      const tom: Cat = getCacheData("tom");
      tom.run();
    });
  });

  describe("类型断言 vs 泛型", () => {
    describe("类型断言", () => {
      function getCacheData(key: string): any {
        return (window as any).cache[key];
      }

      interface Cat {
        name: string;
        run(): void;
      }

      const tom = getCacheData("tom") as Cat;
      tom.run();
    });

    describe("泛型", () => {
      // 目前来讲这是最优的解决方案
      function getCacheData<T>(key: string): T {
        return (window as any).cache[key];
      }

      interface Cat {
        name: string;
        run(): void;
      }

      const tom = getCacheData<Cat>("tom");
      tom.run();
    });
  });
});
