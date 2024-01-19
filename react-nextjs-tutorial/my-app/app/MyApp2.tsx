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

export function MyApp2() {
  return (
    <div>
      Name: {person1.name}, Age: {person1.age} <br />
      {'Name: ' + person2.name + ', Age: ' + person2.age} <br />
    </div>
  );
}