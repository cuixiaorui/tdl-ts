import { describe } from ".";

describe("联合类型", () => {
  describe("simple case", () => {
    let myFavoriteNumber: string | number;

    myFavoriteNumber = 7;
    myFavoriteNumber = "7";
    // 不可以赋值 boolean
    myFavoriteNumber = false;
  });

  describe("只能访问共同的属性,访问 length 将会报错", () => {
    let something: string | number;
    describe("访问 length 会报错", () => {
      // number 上是获取不到 length 属性的,因为直邮 string 有
      something.length;
    });

    describe("可以访问 .toString ", () => {
      // 因为是 string 和 number 共同的属性
      something.toString();
    });
  });

  describe("会根据类型推论出一个类型", () => {
    let myFavoriteNumber: string | number;
    myFavoriteNumber = "seven";
    console.log(myFavoriteNumber.length)
    myFavoriteNumber = 7;
    // 被推论成 number 类型了
    // 所有访问 length 会报错
    console.log(myFavoriteNumber.length)
  });
});
