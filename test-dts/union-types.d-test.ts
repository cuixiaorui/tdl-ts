import { describe } from ".";

describe("联合类型", () => {
  describe("simple case", () => {
    let myFavoriteNumber: string | number;

    myFavoriteNumber = 7;
    myFavoriteNumber = "7";
    // 不可以赋值 boolean 
    myFavoriteNumber = false
  });
});
