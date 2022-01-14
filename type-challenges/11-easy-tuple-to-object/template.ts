type TupleToObject<T extends readonly any[]> = {
  [P in keyof T]: P;
};

type aa = typeof tuple[number];

type value = TupleToObject<typeof tuple>;

const tuple = ["tesla", "model 3", "model X", "model Y"] as const;
type r = typeof tuple;

// 知识点
// 遍历数组（tuple）
// typeof