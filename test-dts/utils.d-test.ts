type Animal = {
  name: string;
  age: number;
};

type Dog = {
  name: string;
  hei: string;
};

type Test<T, U> = T extends U ? string : number;

const t: Test<Animal, Dog>;
// const t: Test<Dog, Animal>;

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
      type Exclude<T, U> = T extends U ? never : T;

      type T1 = Exclude<"a" | "b" | "c", "a" | "b" | "d">; // "c"
      type T2 = Exclude<string | number | (() => void), Function>; // string | number

      // 这里有个特别有意思的点，
      // 向下面的联合类型是会依次对比的
      // 对比步骤： "a"<-> "a" 对比，看看 a extends a ？ 然后得到的是 string
      //          "b"<-> "b" 对比，看看 b extends b ？ 然后得到的是 string
      //          "c"<-> "d" 对比，看看 c extends d ？ 然后得到的是 number
      // 所以 T1Test 的 type 是 string | number
      type ExcludeTest<T, U> = T extends U ? string : number;
      type T1Test = ExcludeTest<"a" | "b" | "c", "a" | "b" | "d">; // "c"
    });

    it("Omit", () => {
      // 此工具可认为是适用于键值对对象的 Exclude，它会去除类型 T 中包含 K 的键值对。
      type Omit = Pick<T, Exclude<keyof T, K>>;

      // 在定义中，第一步先从 T 的 key 中去掉与 K 重叠的 key，接着使用 Pick 把 T 类型和剩余的 key 组合起来即可。
      // Exclude 的逻辑是去除 T 中所有的 K，
      // 最后在和 Pick 一结合就是我们想要的这个逻辑了

      // 可以发现，Omit 与 Pick 得到的结果完全相反，一个是取非结果，一个取交结果。
      type Obj = {
        name: string;
        age: number;
      };

      // Omit 的话取非   Omit<Obj, "name"> -> 得到的就是 age
      // Pick 的话取交   Pick<Obj, "name"> -> 得到的就是 name
    });

    it("ReturnType<T>", () => {
      // 此工具就是获取 T 类型(函数)对应的返回值类型：
      type ReturnType<T extends (...args: any) => any> = T extends (
        ...args: any
      ) => infer R
        ? R
        : any;

      // 1. 首先是入参的时候我们就限定了 T 必须是一个函数
      // 2. 在定义返回值的时候我们判断 T 如何是一个函数的话那么就返回 infer R （也就是 T 这个函数的返回值）
      // 所以我们利用这个规则，做到了返回一个函数的返回类型的

      type fn = () => string;

      // 我们得到的是 string 类型
      const fnType: ReturnType<fn> = "nihao";
    });

    it("Required", () => {
      // 此工具可以将类型 T 中所有的属性变为必选项。
      type Required<T> = {
        [P in keyof T]-?: T[P];
      };

      // 这里有一个很有意思的语法-?，可以理解为就是 TS 中把?可选属性减去的意思。
      type Dog = {
        name: string;
        age?: number;
      };

      // 这里必须要写 age
      // 因为 age 已经不在是可选的了
      const RequiredDog: Required<Dog> = {
        name: "string",
      };
    });
  });
});
