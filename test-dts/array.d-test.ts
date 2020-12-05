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
});
