describe("泛型工具", () => {
  it("Partial", () => {
    // 此工具的作用就是将泛型中全部属性变为可选的。

    type Dog = {
      name: string;
      age: number;
    };

    // 实现的方式就是遍历 T 类型，keyof T 得到 T 类型的 key，然后用 in 来遍历，给增加一个 ? 表示是可选的
    // value 就是之前的类型 T[key] -> 获取之前的类型
    type Partial<T> = {
      [key in keyof T]?: T[key];
    };

    // 用 Partial 包裹后，Dog 里面所有的 key 都变成可选的了
    const dog: Partial<Dog> = {};
  });

  it("Record", () => {
    // 此工具的作用是将 K 中所有属性值转化为 T 类型，我们常用它来申明一个普通 object 对象
    // 这里特别说明一下，keyof any对应的类型为 number | string | symbol，也就是可以做对象键(专业说法叫索引 index)的类型集合。
    // K 必须是 number | string| symbol
    type Record<K extends keyof any, T> = {
      [key in K]: T;
    };

    const obj: Record<string, number> = {
      a: 1,
      b: "2", // 报错 这里规定了 value 的类型必须是 number 类型
    };

    const objA: Record<string, string> = {
      a: "1",
      b: "2",
      c: 3, // 报错， 这里规定了 value 的类型必须是 string 类型
    };
  });

  it("Pick", () => {
    // 此工具的作用是将 T 类型中的 K 键列表提取出来，生成新的子键值对类型。

    // 1. K 必须是满足于 T 的 key 的
    // 2. 遍历所有的 K，type 的话就是通过 T[P] 来获取到
    type Pick<T, K extends keyof T> = {
      [P in K]: T[P];
    };

    type Animal = {
      name: string;
      age: number;
      gender: string;
    };

    const bird: Pick<Animal, "name" | "age"> = {
      name: "xiaohei",
      age: 1,
      gender: "boy", // 报错 这里的 bird 只会有2个类型，就是 name 和 age
    };

    it("Exclude", () => {
      // 此工具是在 T 类型中，去除 T 类型和 U 类型的交集，返回剩余的部分。
      // T -> {name  age}
      // U -> {name gender}
      // result -> age?
      //   注意这里的 extends 返回的 T 是原来的 T 中和 U 无交集的属性，而任何属性联合 never 都是自身，
      // 使用的时候 第一个泛型参数就是多的，第二个泛型参数就是少的
      type Exclude<T, U> = T extends U ? never : T;

      type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
      type T2 = Exclude<string | number | (() => void), Function>; // string | number
    });
  });
});
