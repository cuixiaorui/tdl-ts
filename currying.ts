// 实现 currying
// 文章来自 https://medium.com/free-code-camp/typescript-curry-ramda-types-f747e99744ab

// 在类型约束里面是不可以用 infer 这些东西的
// 所以在 < > 括号里面的点就只是限制

type Params<F extends (...args: any[]) => any> = F extends (
  ...args: infer A
) => any
  ? A
  : never;

//   interface User{
// 	  name: stirng
//   }

// const setName = (name:string, user:User) => {};

// type setNameFnParems = Params<typeof setName>;

// 1. < > 先约束一下T 必须是一个数组 （但是空数组也是ok的）
// 2. 看看是不是空数组 ，如果是空数组的话，那么就返回一个 never  不然的话就返回第一个元素
// 3. 而判断是不是空数组的方法就是， T extends [any, ...any[]] 这里应该是 如果 T 是一个空数组的话，那么就解构不出来第一个 any 了
//    还有一种方案是通过 length 来判断  T["length"] extends 0
// T extends [any, ...any[]] 就是为了保证数组是有值的
// type Head<T extends any[]> = T extends [any, ...any[]] ? T[0] : never;
type Head<T extends any[]> = T[0];

type type8 = Head<[]>;

type framework = ["vue", "react"];

type frameworkVal1 = framework[number];

type Point = {
  x: number;
  y: number;
};

type PointName = Point & {
  name: string;
};

type PointOrName =
  | Point
  | {
      name: string;
    };

const pointOrName: PointOrName = {
  // 这里写的话，必须得符合其中的一个类型 要不就是 x y  要不就是 name
  y: 1
};

// 这个就是合并进来
const pointName: PointName = {
  name: "123",
  x: 1,
  y: 1,
};

type Name = {
  name: string;
};

// 把这两个 shape 给合并起来
type NamedPoint = Name & Point;

// function superPlot(point: NamedPoint) {
//   console.log(point.name); // Okay.
//   console.log(point.x); // Okay.
//   console.log(point.sing); // Error!!!
// }

type NameOrPoint = Name | Point;

const nameA: NameOrPoint = {
  name: "123",
  x: 1,
};
