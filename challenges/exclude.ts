/*
  43 - Exclude
  -------
  by Zheeeng (@zheeeng) #easy #built-in
  
  ### Question
  
  Implement the built-in Exclude<T, U>
  > Exclude from T those types that are assignable to U
  
  > View on GitHub: https://tsch.js.org/43
*/

/* _____________ Your Code Here _____________ */

// js 实现
function exclude(arrA, arrB) {
  const result = [];
  arrA.forEach((elementA) => {
    arrB.forEach((elementB) => {
      if (elementB !== elementA) {
        result.push(elementA);
      }
    });
  });

  return result;
}

// 1. 循环 联合类型 -> [key in keyof T]
// 提醒就是  不能完全用 js 的思想去做题
// 联合类型默认使用 extends 的时候就会遍历了 -> 这个点和js 里面是不一样的
type MyExclude<T, U> = T extends U ? never : T;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<MyExclude<"a" | "b" | "c", "a">, Exclude<"a" | "b" | "c", "a">>>,
  Expect<
    Equal<
      MyExclude<"a" | "b" | "c", "a" | "b">,
      Exclude<"a" | "b" | "c", "a" | "b">
    >
  >,
  Expect<
    Equal<
      MyExclude<string | number | (() => void), Function>,
      Exclude<string | number | (() => void), Function>
    >
  >
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/43/answer
  > View solutions: https://tsch.js.org/43/solutions
  > More Challenges: https://tsch.js.org
*/
