import React, { useState, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";


import "./Tree.css";
import { initialData } from "./Data";
import { adaptData } from "./data.adapter";
import {
  ReactDropdownTreeSelectContainer,
  ReactDropdownTreeSelectMemoized
} from "./dropdownTree.container";

function Tree() {
  const [dataFromServer, setDataFromServer] = useState();
  const [selectedValuesFromFormik, setSeletedValue] = useState([]);






  useEffect(() => {
    const timeout = setTimeout(() => {
      setDataFromServer(initialData);
    }, 10);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // Memoize costly data to get
  const adaptedData = useMemo(() => {
    if (!dataFromServer) return null;
    return adaptData(dataFromServer, selectedValuesFromFormik);
    // Explicitly don't update data when field are value is updated.
  }, [dataFromServer]);

  const [id , setID] = useState()
  const handleChange = useMemo(
    () => (_, selectedValues) => {
      setSeletedValue(selectedValues.map(val => val.label));
      setID(5555)

    },
    []
  );

  if (!dataFromServer || !adaptedData) {
    return "loading...";
  }

  return (
    <>
      Class Container strategy:
      <ReactDropdownTreeSelectContainer
        data={adaptedData}
        onChange={handleChange}
        mode="hierarchical"
      />
      <br />

      {id}
      <br />
      {/* React Hook container:
      <ReactDropdownTreeSelectMemoized
        data={adaptedData}
        onChange={handleChange}
        mode="hierarchical"
      /> */}
    </>
  );
}

export default Tree
