import React, { useState, useEffect, useMemo, useContext } from "react";
import ReactDOM from "react-dom";
import useFetch from "../../Hook/UseFetch";
import "./Tree.css";
import {
  ReactDropdownTreeSelectContainer,
  ReactDropdownTreeSelectMemoized,
} from "./dropdownTree.container";
import { ContextID } from "../../Helper/ContextID";
import axios from "axios";

function Tree() {
  const [ShowLive, setShowLive] = useState(true);
  const [dataFromServer, setDataFromServer] = useState();
  const [selectedValuesFromFormik, setSeletedValue] = useState([]);
  const [ValueCheckedRadio, setValueCheckedRadio] = useState("vehicul");
  const [timeSearch, settimeSearch] = useState();
  const [TimeFrominput, setTimeFrominput] = useState();
  const [RadioChange, SetsetRadioChange] = useState(false);
  const { lat_lng, Setlat_lng } = useContext(ContextID);
  const { ContextShowtTee, SetContextShowtTree } = useContext(ContextID);
  const { SelectedRadioValue, setSelectedRadioValue } = useContext(ContextID);
  const { SelectedRadioTree, setSelectedRadioTree } = useContext(ContextID);
  const {resultForpopup, setresultForpopup} = useContext(ContextID);


  const handlechangeRadio = (e) => {
    setValueCheckedRadio();
    setValueCheckedRadio(e.target.value);
    console.log(ValueCheckedRadio);

    SetsetRadioChange((prev) => !prev, RadioChange);
    console.log(RadioChange);
  };
  const [ShowTempreel, SetShowTempreel] = useState(false);
  const [ShowHISTORIQUE, SetShowHISTORIQUE] = useState(false);
  useEffect(() => {
    if (ContextShowtTee === "TEMPS REEL") {
      SetShowHISTORIQUE(false);
      SetShowTempreel(true);
      console.log(ShowTempreel);
    } else if (ContextShowtTee === "HISTORIQUE") {
      SetShowTempreel(false);
      SetShowHISTORIQUE(true);
    } else if ("close All") {
      SetShowTempreel(false);
      SetShowHISTORIQUE(false);
    }
  }, [ContextShowtTee]);

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
    if (ValueCheckedRadio == "vehicul") {
      setSelectedRadioValue("vehicul");
      if (vh != null) {
        setdisplayCheckBox(true);

        const nestedData = getNestedData(vh, null);
        setDataFromServer(nestedData);
      }
    }
    if (ValueCheckedRadio == "circuit") {
      setdisplayCheckBox(false);
      setSelectedRadioValue("circuit");
      if (ci != null) {
        const nestedData = getNestedData(ci, null);
        setDataFromServer(nestedData);
        console.log(nestedData);
      }
    }
    if (ValueCheckedRadio == "conducteur") {
      setSelectedRadioValue("conducteur");
      if (ci != null) {
        const nestedData = getNestedData(ci, null);
        console.log(nestedData);
        setDataFromServer(nestedData);
      }
    }
  }, [vh, ci, ValueCheckedRadio, RadioChange]);

  const [Allids, SetAllids] = useState([]);
  const [devicesP, setDevicesP] = useState([]);
  const [displayCheckBox, setdisplayCheckBox] = useState();
  useEffect(() => {
    axios
      .get("http://tanger.geodaki.com:3000/rpc/tempsreel?uid=71")
      .then((response) => {
        setDevicesP(response.data);
      });
  }, []);

  useEffect(() => {
    
    console.log("lat_lng from index", lat_lng);

    let Lat_lng = [];
    devicesP.map((x) => {
      let position = {
        lat: x.lat,
        lng: x.lon,
        name: x.name,
        typevehicule: x.typev,
        lastupdate: x.lastupdate,
        batterie: x.batterie,
        vehicule: x.typev,
        capteur: x.capteur,
        immatriculation: x.immatriculation,
        datems: x.datems,
        lastacc: x.lastacc,
        fonction: x.fonction,
      };
      Lat_lng.push(position);
      // console.log(Lat_lng)
      Setlat_lng(Lat_lng);
    });
  }, [ValueCheckedRadio]);


  const [test , settest] = useState(false)
  let id = [];
  let deviceid = [];
 
  const handleChange = useMemo(
    () => async (currentNode, selectedValues) => {
      Setlat_lng([]);
      id = [];
      deviceid = [];
      let Lat_lng = [];
      console.log("currentNode currentNode", currentNode);
      console.log("selectedValues", selectedValues);
      let currentNodeArrey = [currentNode];
  
      if (ValueCheckedRadio === "vehicul") {
        selectedValues.map((item) => {
          SetAllids((current) => [...current, item.value]);
          id.push(item.value);
        });
      }
      if (ValueCheckedRadio === "circuit") {
        currentNodeArrey.map((item) => {
          SetAllids((current) => [...current, item.value]);
          id.push(item.value);
        });
      }
  
      console.log("id", id);
  
      try {
        let res;
        res = await fetch(
          `http://tanger.geodaki.com:3000/rpc/circuit_by_id?idc={${id}}`,
          requestOptions
        );
        const result = await res.json();
        console.log("result from circuit_by_id", result);
        result.map((item) => {
          deviceid.push(item.deviceid);
        });
      } catch (error) {
        console.log("error", error);
      }
  
      console.log("deviceid", deviceid);
      console.log("idd", id);
  
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
  
      try {
      
          let response;
          Setlat_lng([]);
          Lat_lng = [];
      
          console.log("id inside the interval", id);
          if (ValueCheckedRadio === "vehicul") {
            response = await fetch(
              `http://tanger.geodaki.com:3000/rpc/tempsreel?ids={${id}}&uid=71`,
              requestOptions
            );
          }
          if (ValueCheckedRadio === "circuit") {
            response = await fetch(
              `http://tanger.geodaki.com:3000/rpc/tempsreel?ids={${deviceid}}&uid=71`,
              requestOptions
            );
          }
  
          const result = await response.json();
  
          console.log("result", result);
  
          setresultForpopup(result);
          result.map((x) => {
            let position = {
              lat: x.lat,
              lng: x.lon,
              id: id,
              name: x.name,
              typevehicule: x.typevehicule,
              lastupdate: x.lastupdate,
              batterie: x.batterie,
              vehicule: x.vehicule,
              capteur: x.capteur,
              immatriculation: x.immatriculation,
              datems: x.datems,
              lastacc: x.lastacc,
              fonction: x.fonction,
            };
            Lat_lng.push(position);
          });
  
          Setlat_lng(Lat_lng);
          setSelectedRadioTree(Lat_lng);
          console.log(  "SelectedRadioTreess",SelectedRadioTree)
          console.log("Setlat_lng after:", Lat_lng);
          console.log( "id.length", id.length)
       
      } catch (error) {
        console.log("error", error);
      }
    },

    [RadioChange, ValueCheckedRadio]
  );

  useEffect(() => 
  {
    setresultForpopup([])
    const fetchData = async () => {
      if (Array.isArray(id) && id.length !== 0) {
        let Lat_lng = [];
      
  
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };
        try {
          let response;
          Setlat_lng([]);
          Lat_lng = [];
       
          console.log("id inside the interval", id);
          if (ValueCheckedRadio === "vehicul") {
            response = await fetch(
              `http://tanger.geodaki.com:3000/rpc/tempsreel?ids={${id}}&uid=71`,
              requestOptions
            );
          }
          if (ValueCheckedRadio === "circuit") {
            response = await fetch(
              `http://tanger.geodaki.com:3000/rpc/tempsreel?ids={${deviceid}}&uid=71`,
              requestOptions
            );
          }
  
          const result = await response.json();
  
          console.log("resultddd", result);
  
          setresultForpopup(result);
          result.map((x) => {
            let position = {
              lat: x.lat,
              lng: x.lon,
              id: id,
              name: x.name,
              typevehicule: x.typevehicule,
              lastupdate: x.lastupdate,
              batterie: x.batterie,
              vehicule: x.vehicule,
              capteur: x.capteur,
              immatriculation: x.immatriculation,
              datems: x.datems,
              lastacc: x.lastacc,
              fonction: x.fonction,
            };
            Lat_lng.push(position);
          });
  
          Setlat_lng(Lat_lng);
          setSelectedRadioTree(Lat_lng);
          console.log(  "SelectedRadioTreess",SelectedRadioTree)
          console.log("Setlat_lng id:", id);
        } catch (error) {
          console.log("error", error);
        }
      }
    };
  
    const intervalCall = setInterval(fetchData, 5000);
  
    return () => {
      clearInterval(intervalCall);
    };
  }, [ValueCheckedRadio]);
  



 
  
  // useEffect(() => {
  //   const intervalCall = setInterval(() => {
  //     if (Array.isArray(id) && id.length !== 0) {
  //       console.log("ids", id);
  //     }
  //   }, 5000);
  
  //   return () => {
  //     // Clean up the interval when the component unmounts
  //     clearInterval(intervalCall);
  //   };
  // }, []);





  return (
    <>
 {/* <button onClick={handleChangeTEst}>test</button> */}
    
      {ShowTempreel && (
       
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
            {dataFromServer ? (
              <div>
                <ReactDropdownTreeSelectMemoized
                  data={dataFromServer}
                  onChange={handleChange}
                  inlineSearchInput
                  showDropdown="always"
                  className={
                    displayCheckBox ? "mdl-demo" : "mdl-demoDisplayedNone"
                  }
                />
              </div>
            ) : (
              "LOADING.."
            )}
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
