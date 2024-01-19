const person1 = {
  name: "Heidi Lamar",
  age: 25
}

// Same with interface
interface Person {
  name: string,
  age: number,
}
const person2: Person = {
  name: "John",
  age: 45
}

const a: boolean = true;

export function MyApp2() {
  return (
    <div>
      Name: {person1.name}, Age: {person1.age} <br />
      {'Name: ' + person2.name + ', Age: ' + person2.age} <br />
      { a ? (<h3>Variable a is true</h3>) : (<h3>Variable a is false</h3>) } <br />
    </div>
  );
}