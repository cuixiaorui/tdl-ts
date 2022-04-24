type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

type ExpandRecursive<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursive<O[K]> }
    : never
  : T;

// 什么情况下不显示
// 1. keyof
type obj = {
  name: string;
  age: "number";
};
// name | age
type keyofTest = keyof obj;

type r1 = Expand<keyofTest>;

// 2. 类型别名
type CxrObject = {
  age: number;
};

type CxrUnion = boolean | number;

// 2.1 union
type unionCase = CxrObject | string;

type r2 = Expand<unionCase>;

// 2.2嵌套
type Obj1 = {
  c: CxrObject;
  //     c: CxrUnion;
  name: string;
};

type r3 = ExpandRecursive<Obj1>;

// 3. 泛型函数
type Expected = {
  readonly x: {
    readonly a: 1;
    readonly b: "hi";
  };
  readonly y: "hey";
};

type De = {
  x: {
    a: 1;
    b: "hi";
  };
  y: "hey";
};
type Todo = DeepReadonly<De>; // should be same as `Expected`

type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

type r4 = ExpandRecursive<Todo>
