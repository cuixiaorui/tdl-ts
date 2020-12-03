import { describe } from "./index";
describe("任意值", () => {

    describe('可以被赋值为任意类型', () => {
        let myFavoriteNumber: any = 'seven';
        myFavoriteNumber = 7;
    });

    describe('可以访问任何属性', () => {
        let anyThing:any = "hello"
        console.log(anyThing.a)
        console.log(anyThing.b)
    });

    describe('可以访问任何方法', () => {
        let anyThing:any = "hello"
        anyThing.setName("123")
        anyThing.setAge(12)
    });

    describe('变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型', () => {
        let something;
        something = "seven"
        something = 7
        something.do()
    });

    


});
