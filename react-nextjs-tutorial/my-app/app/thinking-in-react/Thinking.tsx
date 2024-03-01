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
  const [stockCheckboxChecked, setStockCheckboxChecked] = useState(false);

  function onFilterChange() {
    let val = document.getElementById("input-filter").value;
    console.log("On filter change: " + val);
    setInputFilter(val);
  }

  function onStockCheckboxChange() {
    let checked = document.getElementById("only-stocked-checkbox").checked;
    console.log("On checkbox change. Checked: " + checked);
    setStockCheckboxChecked(checked);
  }

  return (
    <>
      <h3>Thinking In React - tutorial</h3>
      <table>
        <tbody>
        <tr>
          <InputFilter onFilterChangeHandler={() => onFilterChange()} />
        </tr>
        <tr>
          <StockFilterCheckbox onCheckboxChangeHandler={() => onStockCheckboxChange()} />
        </tr>
        </tbody>
      </table>
      <br />
      <br />
      <br />
      <VegTable type="Fruits" inputFilter={inputFilter} stockCheckboxChecked={stockCheckboxChecked} />
      <br />
      <VegTable type="Vegetables" inputFilter={inputFilter} stockCheckboxChecked={stockCheckboxChecked} />
    </>
  );
}

function InputFilter({onFilterChangeHandler}) {
  return (
    <>
      <td><b>Input filter: </b></td>
      <td><input type="text" id="input-filter" name="input-filter" onInput={onFilterChangeHandler} /></td>
    </>
  );
}

function StockFilterCheckbox({onCheckboxChangeHandler}) {
  return (
    <>
      <td><b>Only stocked: </b></td>
      <td><input type="checkbox" id="only-stocked-checkbox" name="only-stocked-checkbox" onChange={onCheckboxChangeHandler} /></td>
    </>
  );
}

// type is "Fruits" or "Vegetables"
function VegTable({type, inputFilter, stockCheckboxChecked}) {
  let data = getData();
  let rows = [];
  // This is re-rendered when the state is changed (so for instance when filter is changed)
  console.log("Re-render of the table with inputFilter: " + inputFilter + ", stockCheckbox: " + stockCheckboxChecked);
  for (let i=0 ; i<data.length ; i++) {
    let currentDataRow = data[i];
    // Starts with filtering
    if (currentDataRow.category === type
         && data[i].name.toLowerCase().startsWith(inputFilter.toLowerCase())
         && (!stockCheckboxChecked || data[i].stocked)
       ) {
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