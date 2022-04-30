type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U];

// 利用 ... 在做一些其他的事情
// 1. 获取数组的第一个元素
type first<T extends unknown[]> = T extends [infer F, ...infer rest]
  ? F
  : never;

type t1 = first<["a", "b", "c"]>;

type tail<T extends unknown[]> = T extends [...infer rest, infer tail]
  ? tail
  : never;

type t2 = tail<["a", "b", "c"]>;
