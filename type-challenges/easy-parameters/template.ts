type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer P 
) => any
  ? P
  : never;

// 知识点
// 1. infer
// 参考资料
// https://github.com/Microsoft/TypeScript/pull/24897
