// type First<T extends any[]> = T extends [] ? never : T[0];
// type First<T extends any[]> = T["length"] extends 0 ? never : T[0];
// type First<T extends any[]> = T[0] extends T[number] ? T[0] : never
type First<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First
  : never;

// T[number]

// type ages = []
// union
// type t1 = ages[number]

//看看 某个值是不是在 union 里面
// type t2 = T[0] extends ages[number] ? "true":"false"


type Tail<T extends any[]> = T extends [infer First, ...infer Rest]
  ? Rest
  : never;


type t4 = Tail<[]>


// T === []
// js
const first = (arr) => {
  // arr 是不是一个空数组 如果是的话 那么返回 never

  const [first, ...rest] = arr;
  return first ? first : "never";
};

// 知识点
// 1. extends 类型条件判断
// 2. 获取 tuple 的 length 属性  indexed
// 3. extends union  判断的规则
// 4. inter 的使用(推断)
