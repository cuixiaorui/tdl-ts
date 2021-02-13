// 键值获取 keyof
// 语法格式
// 类型 = keyof 类型
describe("keyof", () => {
  it("keyof 可以获取一个类型所有键值，返回一个联合类型", () => {
    type Person = {
      name: string;
      age: number;
    };
    // PersonKey得到的类型为 'name' | 'age'
    type PersonKey = keyof Person;
  });

  it("限制访问对象的 key 合法化", () => {
    type Person = {
      name: string;
      age: number;
    };
    function getValue(p: Person, k: keyof Person) {}

    const man: Person = {
      name: "xiaohei",
      age: 20,
    };
    getValue(man, "name");
    getValue(man, "age");
    getValue(man, "form"); // 报错 因为只能是 name | age
  });
});
