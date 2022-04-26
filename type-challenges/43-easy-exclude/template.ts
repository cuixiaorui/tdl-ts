type MyExclude<T, U> = T extends U ? never : T;

interface IResponse {
  index: number;
  num: number;
  title: string;
  list: {
    name: string;
    age: number;
  }[];
}

type extractKey<T, K extends keyof T> = T[K] extends (infer A)[] ? A : T[K];
type t1 = extractKey<IResponse, "list">;
type t2 = extractKey<IResponse, "index">;

// js
function MyExclude(T, U: any[]) {
  const result = [];
  for (let i = 0; i < T.length; i++) {
    const t = T[i];

    //     let boo = false;
    //     for (let j = 0; j < U.length; j++) {
    //       const u = U[j];

    //       if (t === u) {
    //         boo = true;
    //       }
    //     }

    //     if (!boo) {
    //       result.push(t);
    //     }
    if (!U.includes(t)) {
      result.push(t);
    }
  }

  return result;
}
