"use strict";
// Tutorial based on https://www.w3schools.com/typescript/index.php
let firstName = "Dylan";
console.log("firstName: " + firstName + ", type: " + typeof firstName);
let u = true;
console.log("u: " + typeof u);
u = "sss";
// Type examples
let u2 = {
    func1: () => {
        console.log("Hello from func1");
    },
    func2: (x) => {
        console.log("Hello from func2: " + x);
    }
};
u2.func1();
u2.func2(10);
console.log("typeof u2: " + typeof u2);
let u3 = u2;
console.log("typeof u3: " + typeof u3);
// Destructuring arrays (Chapter about tuples)
function foo() {
    return ["johann", 23];
}
const [personName, personAge] = foo();
console.log("Person name is " + personName + ". Person age is " + personAge + ".");
const names = ["Dylan"];
names.push("Jack");
console.log(names[0]);
const graph = [22, 43];
// Does not work
// graph.push(55);
console.log("graph: " + graph);
const car = {
    type: "Toyota"
};
car.mileage = 2000;
console.log(car);
// console.log("CarType: " + CarType); // I CANNOT DO THIS. AS IT WILL SHOW ME A MESSAGE: 'CarType' only refers to a type, but is being used as a value here
const car2 = {
    type: "Hyundai",
    mileage: 20
    //  something: 30 // THIS DOES NOT WORK. I CANNOT ADD TYPE, WHICH DOES NOT EXISTS
};
console.log("car2 type: " + typeof car2 + ", car2: " + car2);
// Used when I don't know exactly the keys to be used (index strings)
const nameAgeMap = {};
nameAgeMap.Jack = 25; // no error
nameAgeMap.Mark = 50; // Error: Type 'string' is not assignable to type 'number'.
console.log(nameAgeMap);
// Initialized enums
var StatusCodes;
(function (StatusCodes) {
    StatusCodes[StatusCodes["NotFound"] = 404] = "NotFound";
    StatusCodes[StatusCodes["Success"] = 200] = "Success";
    StatusCodes[StatusCodes["Accepted"] = 202] = "Accepted";
    StatusCodes[StatusCodes["BadRequest"] = 400] = "BadRequest";
})(StatusCodes || (StatusCodes = {}));
// logs 404
console.log(StatusCodes.NotFound);
// logs 200
console.log(StatusCodes.Success);
var GenderType;
(function (GenderType) {
    GenderType["man"] = "man";
    GenderType["woman"] = "woman";
})(GenderType || (GenderType = {}));
const john = {
    name: "John",
    age: 45,
    gender: GenderType.man
};
console.log(john);
// FUNCTIONS
function counter(a, b, c) {
    return a + b + (c || 0);
}
console.log("counter 1+2: " + counter(1, 2));
console.log("counter 1+2+3: " + counter(1, 2, 3));
function counter2(a, b, ...others) {
    return a + b + others.reduce((total, n) => total + n, 0);
}
console.log("counter2 1+2+3+4: " + counter2(1, 2, 3, 4));
const subtractorImpl = (a, b) => a - b;
console.log("subtractor: " + subtractorImpl(10, 4));
// Casting
let a = 4;
let b = a;
console.log(typeof a + " : " + typeof b);
class PersonaImpl {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getName() {
        return this.name;
    }
    getAge() {
        return this.age;
    }
    prefixAdder(myVar) {
        return this.name + ": " + myVar;
    }
    compute(a, b, operation) {
        return operation(a, b);
    }
}
// Note I cannot use "let personn: Persona = ..." due the fact that it won't allow me to call "getAge()" as that method is not available on interface Persona
let personn = new PersonaImpl("joe", 10);
console.log(personn.getName() + ": " + personn.getAge());
console.log(personn.prefixAdder("foo"));
console.log("add: " + personn.compute(10, 20, (a, b) => a + b));
console.log("sub: " + personn.compute(20, 5, (a, b) => a - b));
const add = (a, b) => a + b; // define "add" for re-use
console.log("add (as operation): " + personn.compute(1, 2, add));
// override
class PersonaImpl2 extends PersonaImpl {
    prefixAdder(myVar) {
        return this.getName() + ": " + super.getAge() + ": " + myVar;
    }
}
let personn2 = new PersonaImpl2("james", 20);
console.log(personn2.prefixAdder("foo"));
// GENERICS
class Wrapper {
    constructor(arg) {
        this.var = arg;
    }
    getVar() {
        return this.var;
    }
}
let wrapped = new Wrapper(10);
console.log("Wrapped: " + wrapped.getVar());
// UTILITY
const myMap = {
    1: "john",
    2: "bar"
};
console.log(myMap[1] + ", " + myMap[2]);
const addr1 = { street: "bourbon", zipCode: 123 };
const addr2 = { street: "foo" }; // Note that `zipCode` cannot be used as it was omitted
class Person4 {
    constructor(name) {
        this.name = name;
    }
    setNumber(toSet) {
        let numberr = { x: toSet };
        this.numberr = numberr;
    }
    getNumber() {
        var _a;
        return ((_a = this.numberr) === null || _a === void 0 ? void 0 : _a.x) || 10;
    }
}
let person41 = new Person4("john41");
let person42 = new Person4("john42");
person42.setNumber(15);
console.log("person41: " + person41.getNumber() + ", person42: " + person42.getNumber());
