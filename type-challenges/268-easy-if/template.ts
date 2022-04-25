type If<C extends boolean, T, F> = C extends true ? T : F


// 知识点
// null 严格模式和非严格模式的区别
// 1. https://www.typescriptlang.org/docs/handbook/type-compatibility.html