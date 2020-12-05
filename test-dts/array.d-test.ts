import { describe } from ".";

describe("数组", () => {
  describe("类型 + 方括号 表示法", () => {
    let items: string[] = ["a", "b", "c"];
  });

  describe("不可以出现其他的类型", () => {
    // 1 会报错
    let items: string[] = [1, "b", "c"];
  });

  describe("push 的时候也不可以", () => {
    let items: string[] = ["a", "b", "c"];
    // 报错, 因为必须是 string 类型
    items.push(1);
  });

  describe("泛型表示法", () => {
    let items: Array<string> = ["a", "b", "c"];
  });

  describe("用接口表示", () => {
    interface items {
      [index: number]: number;
    }

    const items: items = [1, 2, 3];
  });

  describe("用接口表示类数组", () => {
    describe("类数组不能用普通的数组类型来约束", () => {
      function sum() {
        // 报错，因为 arguments 是类数组
        let args: number[] = arguments;
      }
    });

    describe("接口表示类数组", () => {
      function sum() {
        // 报错，因为 arguments 是类数组
        let args: {
          [index: number]: number;
          length: number;
          callee: Function;
        } = arguments;
      }
    });

    describe("用原生提供的类数组类型", () => {
      function sum() {
        // 这里的 IArguments 其实和我们上面写的那个一样
        let args: IArguments = arguments;
      }
    });
  });

  describe("any[] 表示任意类型的数组", () => {
    const items: any[] = [1, 2, "3", "4", true];
  });
});
