// 在 TS 中，void 和 undefined 功能高度类似，可以在逻辑上避免不小心使用了空指针导致的错误

// void 和 undefined 类型最大的区别是，你可以理解为 undefined 是 void 的一个子集，
// 当你对函数返回值并不在意时，使用 void 而不是 undefined
describe("void", () => {
  it("函数返回值", () => {
    // 这里的void表示逻辑上不关注具体的返回值类型
    // 这里需要使用 void ，不要使用具体的类型 number、string、undefined
    const foo = () => void;
  });
});
