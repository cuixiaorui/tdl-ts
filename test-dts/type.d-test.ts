import { describe } from ".";

describe("类型别名", () => {
  // 常用于联合类型
  type Name = string;
  type NameResolver = () => Name;
  type NameOrNameResolver = Name | NameResolver;

  function getName(n: NameOrNameResolver): Name {
    if (typeof n === "string") {
      return n;
    } else {
      return n();
    }
  }
});
