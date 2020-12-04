import { describe } from ".";

describe("接口", () => {
  describe("对对象的形状进行描述", () => {
    // 接口命名规范
    // 首字母大写
    // 或者增加 I 作为前缀
    interface Shape {
      width: number;
      height: number;
    }
    const rect: Shape = {
      width: 100,
      height: 200,
      // 如果给接口不存在的属性就会报错
      name: "123",
    };
  });

  describe("可选属性", () => {
    // 使用 ? 可以设置为可选属性
    interface Shape {
      width: number;
      height: number;
      name?: string;
    }

    const rect: Shape = {
      width: 100,
      height: 200,
      // 不会报错
      name: "123",
    };

    const circle: Shape = {
      width: 100,
      height: 200,
      // 不写 name 也不会报错
    };
  });

  describe("任意属性,希望一个接口允许有任意的属性", () => {
    describe("只能定义一个任意属性", () => {
      interface Shape {
        name: string;
        [propName: string]: string;
        // 只能定义一个任意属性
        [propName2: string]: string;
      }
    });

    describe("如果定义的是 string 的话，别的属性是 number 的话，那么报错", () => {
      interface Shape {
        name: string;
        height?: number;
        // 如果定义的是 string 的话，别的属性是 number 的话，那么报错
        [propName: string]: string;
      }
    });

    describe("可以使用联合类型", () => {
      interface Shape {
        name: string;
        height?: number;
        // 任意类型只能有一个
        // 如果定义的是 string 的话，别的属性是 number 的话，那么报错
        [propName: string]: string | number;
      }
    });
  });

  describe("可读属性", () => {
    describe("通过 readonly 关键字来定义可读属性", () => {
      interface Shape {
        readonly name: string;
        height: number;
        width: number;
      }

      const rect: Shape = {
        name: "rect",
        height: 100,
        width: 50,
      };

      // 在给rect.name 赋值会报错
      rect.name = "heihei";
    });

    describe("必须在定义对象的时候就赋值，而不是在给可读属性的时候赋值", () => {
      interface Shape {
        readonly name: string;
        height: number;
        width: number;
      }

      // 必须在这里定义对象的时候就给可读属性 name 赋值
      const rect: Shape = {
        height: 100,
        width: 50,
      };

      // 在给rect.name 赋值会报错
      rect.name = "heihei";
    });
  });
});
