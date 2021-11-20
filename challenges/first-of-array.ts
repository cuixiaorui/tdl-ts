/*
  14 - First of Array
  -------
  by Anthony Fu (@antfu) #easy #array
  
  ### Question
  
  Implement a generic `First<T>` that takes an Array `T` and returns it's first element's type.
  
  For example
  
  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]
  
  type head1 = First<arr1> // expected to be 'a'
  type head2 = First<arr2> // expected to be 3
  ```
  
  > View on GitHub: https://tsch.js.org/14
*/

/* _____________ Your Code Here _____________ */

// js
function firstOfArray(array) {
  // any ? any : "never"
  return array[0] ? array[0] : "never";

  // length > 0
}

// 做题
// 问题： 如果 array[0] 没有值的话 那么得到的也是一个 any ，所以不可以基于 any 去判断
// 基于length 来看看数组是不是长度为0 的
// T["length"] 获取到的是字面量 0 (之前以为这个东西获取到的是 number)

type arr = [() => 123, { a: string }];

type resultArrLength = arr["length"];

type First<T extends any[]> = T["length"] extends 0 ? never : T[0];

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/14/answer
  > View solutions: https://tsch.js.org/14/solutions
  > More Challenges: https://tsch.js.org
*/
