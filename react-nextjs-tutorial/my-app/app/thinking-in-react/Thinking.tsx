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

export function ThinkingInReact() {

  const [inputFilter, setInputFilter] = useState("");
  const [stockCheckboxChecked, setStockCheckboxChecked] = useState(false);

  function getFilteredData(category) {
    console.log("Calling getFilteredData: " + category);
    let filteredData = [];
    for (let i=0 ; i<dataFull.length ; i++) {
      let currentDataRow = dataFull[i];
      if (currentDataRow.category === category
            && currentDataRow.name.toLowerCase().startsWith(inputFilter.toLowerCase())
            && (!stockCheckboxChecked || currentDataRow.stocked)
         ) {
        filteredData.push(currentDataRow);
      }
    }
    return filteredData;
  }

  return (
    <>
      <h3>Thinking In React - tutorial</h3>
      <FilterArea onFilterChangeHandler={(inputFilter) => setInputFilter(inputFilter)} onCheckboxChangeHandler={(checked) => setStockCheckboxChecked(checked)} />
      <br />
      <br />
      <br />
      <VegTable type="Fruits" filteredDataProvider={() => getFilteredData("Fruits")} />
      <br />
      <VegTable type="Vegetables" filteredDataProvider={() => getFilteredData("Vegetables")} />
    </>
  );
}

function FilterArea({onFilterChangeHandler, onCheckboxChangeHandler}) {

  function onFilterChange() {
    let inputFilter = document.getElementById("input-filter").value;
    console.log("Input filter changed: " + inputFilter);
    onFilterChangeHandler(inputFilter);
  }

  function onCheckboxChange() {
    let checked = document.getElementById("only-stocked-checkbox").checked;
    console.log("On checkbox change. Checked: " + checked);
    onCheckboxChangeHandler(checked);
  }

  return (
      <table>
        <tbody>
        <tr>
          <td><b>Input filter: </b></td>
          <td><input type="text" id="input-filter" name="input-filter" onInput={onFilterChange} /></td>
        </tr>
        <tr>
          <td><b>Only stocked: </b></td>
          <td><input type="checkbox" id="only-stocked-checkbox" name="only-stocked-checkbox" onChange={onCheckboxChange} /></td>
        </tr>
        </tbody>
      </table>
  );
}

// type is "Fruits" or "Vegetables"
function VegTable({type, filteredDataProvider}) {
  let data = filteredDataProvider();
  let rows = [];
  // This is re-rendered when the state is changed (so for instance when filter is changed)
  console.log("Re-render of the table for type: " + type);
  for (let i=0 ; i<data.length ; i++) {
    rows.push((
      <Row key={i} rowData={data[i]} />
    ));
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