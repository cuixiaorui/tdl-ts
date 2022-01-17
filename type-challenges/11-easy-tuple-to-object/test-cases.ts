import { Equal, Expect } from "@type-challenges/utils";

const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

// number string symbol
type cases = [
  Expect<
    Equal<
      TupleToObject<typeof tuple>,
      {
        tesla: "tesla";
        "model 3": "model 3";
        "model X": "model X";
        "model Y": "model Y";
      }
    >
  >
];

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>;

// const  let  js 世界
// type interface type 世界

// 1. typeof
// 2. 字面量类型
// 3. @ts-expect-error 注释
