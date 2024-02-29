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
  return (
    <>
      <h3>Thinking In React - tutorial</h3>
      <VegTable type="Fruits" />
      <br />
      <br />
      <VegTable type="Vegetables" />
    </>
  );
}

// type is "Fruits" or "Vegetables"
function VegTable({type}) {
  let data = getData();
  let rows = [];
  for (let i=0 ; i<data.length ; i++) {
    let currentDataRow = data[i];
    if (currentDataRow.category === type) {
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