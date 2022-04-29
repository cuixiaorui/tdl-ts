type If<C extends boolean, T, F> = C extends true ? T : F;

// js
function If(C: any, T: any, F: any) {
  return C ? T : F;
}

// 知识点
// 类型兼容性 | 分配规则
// null 严格模式和非严格模式的区别
// 1. https://www.typescriptlang.org/docs/handbook/type-compatibility.html
