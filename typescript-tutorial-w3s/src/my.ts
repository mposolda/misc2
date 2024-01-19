// Tutorial based on https://www.w3schools.com/typescript/index.php

let firstName: string = "Dylan";
console.log("firstName: " + firstName + ", type: " + typeof firstName);

let u: any = true;
console.log("u: " + typeof u);
u = "sss";

// Type examples
let u2: unknown = {
  func1: () => {
    console.log("Hello from func1");
  },

  func2: (x: number) => {
    console.log("Hello from func2: " + x);
  }
};
(u2 as { func1: Function }).func1();
(u2 as { func2: Function }).func2(10);

console.log("typeof u2: " + typeof u2);
let u3: { func1: Function} = u2 as { func1: Function };
console.log("typeof u3: " + typeof u3);


// Destructuring arrays (Chapter about tuples)
function foo() {
  return ["johann", 23];
}
const [ personName, personAge ] = foo();
console.log("Person name is " + personName + ". Person age is " + personAge + ".");

const names: string[] = ["Dylan"];
names.push("Jack");
console.log(names[0]);

const graph: readonly [x: number, y: number] = [22, 43];
// Does not work
// graph.push(55);
console.log("graph: " + graph);

const car: { type: string, mileage?: number } = {
  type: "Toyota"
};
car.mileage = 2000;
console.log(car);

// The same as type
type CarType = { type: string, mileage?: number };
// console.log("CarType: " + CarType); // I CANNOT DO THIS. AS IT WILL SHOW ME A MESSAGE: 'CarType' only refers to a type, but is being used as a value here

const car2: CarType = {
  type: "Hyundai",
  mileage: 20
//  something: 30 // THIS DOES NOT WORK. I CANNOT ADD TYPE, WHICH DOES NOT EXISTS
}
console.log("car2 type: " + typeof car2 + ", car2: " + car2);

// Used when I don't know exactly the keys to be used (index strings)
const nameAgeMap: { [index: string]: number } = {};
nameAgeMap.Jack = 25; // no error
nameAgeMap.Mark = 50; // Error: Type 'string' is not assignable to type 'number'.
console.log(nameAgeMap);


// Initialized enums
enum StatusCodes {
  NotFound = 404,
  Success = 200,
  Accepted = 202,
  BadRequest = 400
}
// logs 404
console.log(StatusCodes.NotFound);
// logs 200
console.log(StatusCodes.Success);

interface Person {
  name: String,
  age: number
}
enum GenderType {
  man="man",
  woman="woman"
}
interface GenderablePerson extends Person {
  gender: GenderType
}
const john: GenderablePerson = {
  name: "John",
  age: 45,
  gender: GenderType.man
}
console.log(john);

// FUNCTIONS
function counter(a: number, b: number, c?: number): number {
  return a + b + (c || 0);
}
console.log("counter 1+2: " + counter(1, 2));
console.log("counter 1+2+3: " + counter(1, 2, 3));

function counter2(a: number, b: number, ...others: number[]): number {
  return a + b + others.reduce((total, n) => total + n, 0);
}
console.log("counter2 1+2+3+4: " + counter2(1, 2, 3, 4));

type subtractor = (a: number, b: number) => number;
const subtractorImpl: subtractor = (a, b) => a - b;
console.log("subtractor: " + subtractorImpl(10, 4));

// Casting
let a: unknown = 4;
let b: number = a as number;
console.log(typeof a + " : " + typeof b);

// CLASSES
type MathOperation = (a: number, b: number) => number;

interface Persona {
  getName(): string;
  prefixAdder(myVar: string): string;
  compute(a: number, b: number, operation: MathOperation): number;
}
class PersonaImpl implements Persona {

  private readonly name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public getName(): string {
    return this.name;
  }

  public getAge(): number {
    return this.age;
  }

  public prefixAdder(myVar: string): string {
    return this.name + ": " + myVar;
  }

  public compute(a: number, b: number, operation: MathOperation): number {
    return operation(a, b);
  }
}
// Note I cannot use "let personn: Persona = ..." due the fact that it won't allow me to call "getAge()" as that method is not available on interface Persona
let personn = new PersonaImpl("joe", 10);
console.log(personn.getName() + ": " + personn.getAge());
console.log(personn.prefixAdder("foo"));

console.log("add: " + personn.compute(10, 20, (a, b) => a + b));
console.log("sub: " + personn.compute(20, 5, (a, b) => a - b));

const add: MathOperation = (a, b) => a + b; // define "add" for re-use
console.log("add (as operation): " + personn.compute(1, 2, add));

// override
class PersonaImpl2 extends PersonaImpl {
  public override prefixAdder(myVar: string): string {
    return this.getName() + ": " + super.getAge() + ": " + myVar;
  }
}
let personn2: Persona = new PersonaImpl2("james", 20);
console.log(personn2.prefixAdder("foo"));


// GENERICS
class Wrapper<T> {
  private readonly var: T;

  constructor(arg: T) {
    this.var = arg;
  }

  public getVar(): T {
    return this.var;
  }
}
let wrapped: Wrapper<number> = new Wrapper<number>(10);
console.log("Wrapped: " + wrapped.getVar());

// UTILITY
const myMap: Record<number, string> = {
  1: "john",
  2: "bar"
}
console.log(myMap[1] + ", " + myMap[2]);

type Address = {
  street: string;
  zipCode: number;
}
type ZiplessAddress = Omit<Address, 'zipCode'>;
const addr1: Address = { street: "bourbon", zipCode: 123 };
const addr2: ZiplessAddress = { street: "foo" }; // Note that `zipCode` cannot be used as it was omitted


// OPTIONAL CHAINING (See https://www.w3schools.com/typescript/typescript_null.php)
type PersonalNumber = {
  x: number;
}
class Person4 {
  private name: string;
  private numberr?: PersonalNumber;

  constructor(name: string) {
    this.name = name;
  }

  public setNumber(toSet: number) {
    let numberr: PersonalNumber = { x: toSet }
    this.numberr = numberr;
  }

  public getNumber() {
    return this.numberr?.x || 10;
  }
}
let person41: Person4 = new Person4("john41");
let person42: Person4 = new Person4("john42");
person42.setNumber(15);
console.log("person41: " + person41.getNumber() + ", person42: " + person42.getNumber());


