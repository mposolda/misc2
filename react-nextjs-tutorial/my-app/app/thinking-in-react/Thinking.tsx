'use client'

import { useState } from 'react';
import "./styles.css";

const dataFull = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]

function getData() {
  return dataFull.slice();
}

export function ThinkingInReact() {

  const [inputFilter, setInputFilter] = useState("");

  function onFilterChange() {
    let val = document.getElementById("input-filter").value;
    console.log("On filter change: " + val);
    setInputFilter(val);
  }

  return (
    <>
      <h3>Thinking In React - tutorial</h3>
      <InputFilter newValue={inputFilter} onFilterChangeHandler={() => onFilterChange()} />
      <br />
      <br />
      <VegTable type="Fruits" inputFilter={inputFilter} />
      <br />
      <VegTable type="Vegetables" inputFilter={inputFilter} />
    </>
  );
}

function InputFilter({newValue, onFilterChangeHandler}) {
  return (
    <>
      <b>Input filter: </b><input type="text" id="input-filter" name="input-filter" onInput={onFilterChangeHandler} />
    </>
  );
}

// type is "Fruits" or "Vegetables"
function VegTable({type, inputFilter}) {
  let data = getData();
  let rows = [];
  // This is re-rendered when the state is changed (so for instance when filter is changed)
  console.log("Re-render of the table with inputFilter: " + inputFilter);
  for (let i=0 ; i<data.length ; i++) {
    let currentDataRow = data[i];
    // Starts with filtering
    if (currentDataRow.category === type && data[i].name.toLowerCase().startsWith(inputFilter.toLowerCase())) {
      rows.push((
        <Row key={i} rowData={data[i]} />
      ));
    }
  }
  return (
    <>
      <b>{type}</b>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </>
  )
}

function Row({rowData}) {

  function getCssClass() {
      return rowData.stocked ? "available" : "unavailable";
  }

  return (
    <tr className={getCssClass()}>
      <td>{rowData.name}</td>
      <td>{rowData.price}</td>
    </tr>
  );
}