import { expectType } from "tsd";
import { num, add } from "../src/index";


// num is number type
expectType<number>(num);

// add 
expectType<number>(add<number>(1))
expectType<string>(add<string>("string"))


