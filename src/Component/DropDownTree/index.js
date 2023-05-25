import React, { useState, useEffect, useMemo, useContext } from "react";
import ReactDOM from "react-dom";
import useFetch from "../../Hook/UseFetch";
import "./Tree.css";
import {
  ReactDropdownTreeSelectContainer,
  ReactDropdownTreeSelectMemoized,
} from "./dropdownTree.container";
import { ContextID } from "../../Helper/ContextID";

function Tree() {
  const [ShowLive, setShowLive] = useState(true);
  const [dataFromServer, setDataFromServer] = useState();
  const [selectedValuesFromFormik, setSeletedValue] = useState([]);
  const [ValueCheckedRadio, setValueCheckedRadio] = useState("vehicul");
  const [timeSearch, settimeSearch] = useState();
  const [TimeFrominput, setTimeFrominput] = useState();
 const [RadioChange , SetsetRadioChange] =  useState(false)
  const { lat_lng, Setlat_lng } = useContext(ContextID);

  const handlechangeRadio = (e) => {
    setValueCheckedRadio()
    setValueCheckedRadio(e.target.value);
    console.log(ValueCheckedRadio);
    
    SetsetRadioChange((prev)=>!prev ,RadioChange  )
    console.log(RadioChange);
  };

  const {
    Data: vh,
    ispending,
    errormsg,
    counter,
  } = useFetch("http://tanger.geodaki.com:3000/rpc/groups?uid=71");

  const {
    Data: ci,
    ispending1,
    errormsg1,
    counter1,
  } = useFetch("http://tanger.geodaki.com:3000/rpc/groups_par_cir?uid=71");

  function getNestedData2(data, parentId) {
    const result = [];
    data.forEach((item) => {
      if (item.parent === parentId) {
        const children = null;

        let newDate = new Date();
        let date = newDate.getDate();
        let day = newDate.getDay();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let hours = newDate.getHours() + 1;
        let currentmin = newDate.getMinutes();
        let sec = newDate.getSeconds();

        // "2023-05-15T15:33:04"
        // let time = `${year}-${month<10?`0${month}`:`${month}`}-${date}T:${hours <10?`0${hours}`:`${hours}` }-${min <10?`0${min}`:`${min}` }-${sec <10?`0${sec}`:`${sec}` }`
        // String.fromCodePoint(parseInt(2699,16))
        const mydate = new Date(item.lastu);
        let LastUpdateMin = mydate.getMinutes();
        let currenttime = currentmin - LastUpdateMin;

        const red = String.fromCodePoint(0x1f534);
        const green = String.fromCodePoint(0x1f7e2);
        const gCar = String.fromCodePoint(0x1f17f);
        const RCar = String.fromCodePoint(0x1f697);

        //  console.log("currenttime",Math.abs(currenttime))
        const iconGreen = { symbol: green };
        const iconRed = { symbol: red };
        const greenCar = { symbol: gCar };
        const RedCar = { symbol: RCar };

        const newItem = {
          value: item.id,
          label:
            item.typeveh != "rien"
              ? ValueCheckedRadio === "vehicul"
                ? Math.abs(currenttime) > 60
                  ? item.name + iconRed.symbol
                  : item.name + iconGreen.symbol
                : item.name
              : item.name,
          lastu: item.lastu,
          // parent: item.parent,
          //  children: children.length > 0 ? children : null,
        };
        if (item.type === "group")
          newItem.children = getNestedData(data, item.id);
        result.push(newItem);
      }
    });
    return result;
  }

  function getNestedData(data, parentId) {
    const result = [];
    data.forEach((item) => {
      if (item.parent === parentId) {
        const children = getNestedData2(data, item.id);

        let newDate = new Date();
        let date = newDate.getDate();
        let day = newDate.getDay();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let hours = newDate.getHours() + 1;
        let currentmin = newDate.getMinutes();
        let sec = newDate.getSeconds();

        // "2023-05-15T15:33:04"
        // let time = `${year}-${month<10?`0${month}`:`${month}`}-${date}T:${hours <10?`0${hours}`:`${hours}` }-${min <10?`0${min}`:`${min}` }-${sec <10?`0${sec}`:`${sec}` }`
        // String.fromCodePoint(parseInt(2699,16))
        const mydate = new Date(item.lastu);
        let LastUpdateMin = mydate.getMinutes();
        let currenttime = currentmin - LastUpdateMin;

        const red = String.fromCodePoint(0x1f534);
        const green = String.fromCodePoint(0x1f7e2);
        // const gCar = String.fromCodePoint(0x1f699);
        const gCar = String.fromCodePoint(0x1f17f);
        const RCar = String.fromCodePoint(0x1f697);

        //  console.log("currenttime",Math.abs(currenttime))
        const iconGreen = { symbol: green };
        const iconRed = { symbol: red };
        const greenCar = { symbol: gCar };
        const RedCar = { symbol: RCar };

        if (item.type == "vehicule" && item.typeveh == "CHARIOT") {
          const newItem = {
            value: item.id,
            label:
              ValueCheckedRadio === "vehicul"
                ? Math.abs(currenttime) > 60
                  ? item.name + iconRed.symbol
                  : item.name + iconGreen.symbol
                : item.name,
            lastu: item.lastu,
            // parent: item.parent,
            //  children: children.length > 0 ? children : null,
          };
          result.push(newItem);
        } else if (item.type == "vehicule" && item.type != "CHARIOT") {
          const newItem = {
            value: item.id,
            label:
              ValueCheckedRadio === "vehicul"
                ? Math.abs(currenttime) > 60
                  ? item.name + RedCar.symbol
                  : item.name + greenCar.symbol
                : item.name,
            lastu: item.lastu,
            // parent: item.parent,
            //  children: children.length > 0 ? children : null,
          };
          result.push(newItem);
        } else {
          const newItem = {
            value: item.id,
            label: item.name,
            lastu: item.lastu,
            // parent: item.parent,
            children: children.length > 0 ? children : null,
          };
          result.push(newItem);
        }
      }
    });
    return result;
  }

  const handleChangedate = (e) => {
    e.preventDefault();
    setTimeFrominput(e.target.value);
    return false;
  };

  useEffect(() => {
    if(ValueCheckedRadio == "vehicul"){
        
        if (vh != null) {
            console.log('vvvvvvvv')
        
            const nestedData = getNestedData(vh, null);
            setDataFromServer(nestedData);
          }
    }
    if(ValueCheckedRadio == "circuit"){
        
        if (ci != null) {
           
            const nestedData = getNestedData(ci, null);
            setDataFromServer(nestedData);
            console.log(nestedData)
          }
    }
    if(ValueCheckedRadio == "conducteur"){
        
        if (ci != null) {
            
            const nestedData = getNestedData(ci, null);
            console.log(nestedData)
            setDataFromServer(nestedData);
          }
    }
   
  },  [vh , ci ,ValueCheckedRadio ,RadioChange]);

  const [Allids, SetAllids] = useState([]);

  const handleChange =  useMemo(
     () => async (_, selectedValues) => {
      //   setSeletedValue(selectedValues.map((val) => val.label));
      //   SetID(selectedValues.map((val) => val.value));

      console.log(selectedValues);
      let id = [];
      let Lat_lng =[]

      selectedValues.map((item) => {
        SetAllids((current) => [...current, item.value]);
        id.push(item.value);
      });
      console.log(id);

      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      try {
        const response = await fetch(`http://tanger.geodaki.com:3000/rpc/tempsreel?ids={${id}}&uid=71`, requestOptions);
        const result = await response.json();
    
        result.map((x) => {
          let position = {
            lat: x.lat,
            lng: x.lon,
          };
          Lat_lng.push(position)
          console.log(Lat_lng)
          Setlat_lng(Lat_lng);
             });
      } catch (error) {
        console.log('error', error);
      }
    },
    []
  );

  // useEffect(() => {
  //   if (vh != null) {
  //     const nestedData = getNestedData(vh, null);
  //     setDataFromServer(nestedData);
  //   }
  // }, [vh]);

  // if (!dataFromServer) {
  //   return "loading...";
  // }

  return (
    <>
      {ShowLive && (
        <div className="theTreediv">
          <div className="dddd">
            <div className="Radiocontainer" onChange={handlechangeRadio}>
              <div className="radioDivVh">
                <div className="vhinput">
                  {" "}
                  <input
                    defaultChecked
                    type="radio"
                    name="par"
                    value="vehicul"
                  />{" "}
                </div>

                <div className="vhlabel">
                  {" "}
                  <label>Par Véhicul</label>{" "}
                </div>
              </div>

              <div className="radioDivVh">
                <div className="vhinput">
                  {" "}
                  <input type="radio" name="par" value="circuit" />{" "}
                </div>

                <div className="vhlabel">
                  {" "}
                  <label>Par Circuit</label>{" "}
                </div>
              </div>

              <div className="radioDivVh">
                <div className="vhinput">
                  {" "}
                  <input type="radio" name="par" value="conducteur" />{" "}
                </div>

                <div className="vhlabel">
                  {" "}
                  <label>Par Conducteur</label>{" "}
                </div>
              </div>
            </div>

            <div className="searchContainer">
              <div style={{ marginLeft: "11px" }}>
                <input
                  value={timeSearch}
                  onChange={handleChangedate}
                  type="date"
                />
              </div>
              {/* <button onClick={handleSearch}> Search </button> */}
            </div>
            { dataFromServer ? <div>
              <ReactDropdownTreeSelectMemoized
                data={dataFromServer}
                onChange={handleChange}
                inlineSearchInput
                showDropdown="always"
                className="mdl-demo"
              />
            </div> : "LOADING.."}
           
          </div>
        </div>
      )}
      <br />
    

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

export default Tree;
