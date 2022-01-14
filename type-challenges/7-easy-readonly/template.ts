type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};



// js
function readonly(obj) {
  const result = {};

  for (const key in obj) {
    result["readonly" + key] = obj[key];
  }

  return result;
}

// 1. 返回一个对象
// 2. 遍历 obj （js 对象  ts 接口）  in  -> mapped keyof -> lookup 
// 3. 加上 readonly 关键字  新的知识点
// 4. 通过 key 来获取 obj(接口) 里面的值 indexed



// 涉及到的知识点
// 1. 返回一个对象
// 2. 遍历foreach 接口  mapped   
//    - keyof  lookup
//      - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types
//    - mapped
//      - https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
// 3. 加上 readonly 关键字  新的知识点
//    - https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype
// 4. todo[key] 取值 indexed
// - https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html
