// 「混合」是一个函数：

// 传入一个构造函数；
// 创建一个带有新功能，并且扩展构造函数的新类；
// 返回这个新类。

// 这里可以学到的点是，class 竟然是昆虫匿名的
// extends 用于 泛型中，起到的是约束的作用

// 但是用类的话，感觉还是重了点，还是喜欢用函数
// 缺点和 vue 中的 mixin 一样

describe("混合", () => {
  it("组合扩展", () => {
    type Constructor<T = {}> = new (...args: any[]) => T;

    function TimesTamped<TBase extends Constructor>(Base: TBase) {
      return class extends Base {
        timestamp = Date.now();
      };
    }

    function Activatable<TBase extends Constructor>(Base: TBase) {
      return class extends Base {
        isActivated = false;

        activate() {
          this.isActivated = true;
        }

        deactivate() {
          this.isActivated = false;
        }
      };
    }

    class User {
      name: "";
    }

    // 添加 TimesTamped 的 User
    const TimestampedUser = TimesTamped(User);

    //  Tina TimesTamped 和 Activatable 的类
    const TimestampedActivatableUser = TimesTamped(Activatable(User));

    // 使用
    const timestampedUserExample = new TimestampedUser();
    // 扩展了 timestamp 属性
    console.log(timestampedUserExample.timestamp);

    const timestampedActivatableUserExample = new TimestampedActivatableUser();
    // 扩展了 timestamp 属性
    // 扩展了 isActivated 属性
    console.log(timestampedActivatableUserExample.timestamp);
    console.log(timestampedActivatableUserExample.isActivated);
  });
});
