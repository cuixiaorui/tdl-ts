// 遍历属性 in
// 语法格式
// [ 自定义变量名 in 枚举类型 ]: 类型
describe("in", () => {
  it("in 只能用在类型的定义中，可以对枚举类型进行遍历", () => {
    // keyof返回泛型 T 的所有键枚举类型，
    // key是自定义的任何变量名，
    // 中间用in链接，
    // 外围用[]包裹起来(这个是固定搭配)，
    // 冒号右侧number将所有的key定义为number类型。
    type TypeToNumber<T> = {
      [key in keyof T]: number;
    };

    type Person = {
      name: string;
      age: number;
    };

    let man: TypeToNumber<Person> = {
      name: "123", // 报错 必须是 number 类型
    };
  });
});
