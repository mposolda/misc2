interface Person {
  name: string,
  age: number,
}

const persons: Person[] = [
  {
    name: "John",
    age:10
  },
  {
    name: "John2",
    age: 20
  }
]

// This will log into the next.js server console (not JS console inside browser)
console.log("Hello from heree");

export function MyApp3() {
  return (
    <div>{
      persons.map(person => {
        console.log("Hello");
        return (<h4>Name: {person.name}: Age: {person.age}</h4>)
      })
    }
    </div>
  );
}

