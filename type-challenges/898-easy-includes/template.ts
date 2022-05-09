import { Equal } from "@type-challenges/utils";

export type Includes<T extends any[], U> = T extends [infer first, ...infer Rest]
  ? Equal<first, U> extends true
    ? true
    : Includes<Rest, U>
  : false;

// js

// function Includes(list, key) {
//   for (let i = 0; i < list.length; i++) {
//     const item = list[i];
//     if (item === key) {
//       return true;
//     }
//   }
//   return false;
// }

// 知识点
// 1. 如何遍历数组(一个值一个值的取出来)
// 2. ts 的模块规范  
//    - 如果有 export 的话，那么就是模块
//    - 没有的话，那么就是全局的 ，可以直接在别的模块引用