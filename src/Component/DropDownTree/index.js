import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  useCallback,
} from "react";
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
  const { SelectedValueTreeNointerval, setSelectedValueTreeNointerval } =
    useContext(ContextID);
  const { resultForpopup, setresultForpopup } = useContext(ContextID);

  const keyDownHandler = (event) => {
    if (event.ctrlKey && event.key === "s") {
      console.log("You just pressed Control and K!");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

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
    } else if (ContextShowtTee === "close All") {
      SetShowTempreel(false);
      SetShowHISTORIQUE(false);
      Setlat_lng([]);
      setSelectedRadioValue([]);
      setSelectedRadioTree([]);
      setresultForpopup([]);
      setSelectedValueTreeNointerval([]);
    }
  }, [ContextShowtTee, SelectedRadioValue]);

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

  const red = String.fromCodePoint(0x1f534);
  const green = String.fromCodePoint(0x1f7e2);
  const yello = String.fromCodePoint(0x1f7e1);
  // const gCar = String.fromCodePoint(0x1f699);
  const gCar = String.fromCodePoint(0x1f17f);
  const RCar = String.fromCodePoint(0x1f697);

  const Light = String.fromCodePoint(0x1f4a1);
  const Lightning = String.fromCodePoint(0x26a1);
  const sos = String.fromCodePoint(0x1f198);
  const Warning = String.fromCodePoint(0x26a0, 0xfe0f);
  const Cross = String.fromCodePoint(0x274c);
  const parking = String.fromCodePoint(0x1f17f);

  //  console.log("currenttime",Math.abs(currenttime))
  const iconGreen = { symbol: green };
  const iconRed = { symbol: red };
  const iconyello = { symbol: yello };
  const greenCar = { symbol: gCar };
  const RedCar = { symbol: RCar };

  const Lighti = { symbol: Light };
  const Lightningi = { symbol: Lightning };
  const sosi = { symbol: sos };
  const Warningi = { symbol: Warning };
  const Crossi = { symbol: Cross };
  const parkingi = { symbol: parking };

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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

        const targetDateTime = new Date(item.lastu);

        const timeDiff = Math.abs(targetDateTime - currentTime);
        const minutesDiff = Math.floor(timeDiff / (1000 * 60));
        const secondsDiff = Math.floor((timeDiff % (1000 * 60)) / 1000);

        const newItem = {
          value: item.id,
          label:
            item.typeveh != "rien" && item.typeveh == "CHARIOT"
              ? ValueCheckedRadio === "vehicul"
                ? minutesDiff < 60
                  ? item.name + iconGreen.symbol
                  : minutesDiff > 24 * 60
                  ? item.name + iconRed.symbol
                  : item.name + iconyello.symbol
                : item.name
              : minutesDiff <= 60 && item.typeveh != "rien"
              ? Math.abs(item.lacc) == 1
                ? item.vitesse > 0
                  ? item.name + Lighti.symbol // endif vitesse>0
                  : item.name + Lightningi.symbol
                : Math.abs(item.lacc) === 0 // else if acc = 1
                ? item.name + Warningi.symbol
                : item.name
              : minutesDiff < 60 && item.typeveh != "rien"
              ? item.name + parkingi.symbol
              : item.typeveh != "rien"
              ? item.name + sosi.symbol
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
        const mydate = new Date(item.lastu);
        let LastUpdateMin = mydate.getMinutes();
        let currenttime = currentmin - LastUpdateMin;

        // console.log("currenttime", Math.abs(currenttime));
        const targetDateTime = new Date(item.lastu);

        const timeDiff = Math.abs(targetDateTime - currentTime);
        const minutesDiff = Math.floor(timeDiff / (1000 * 60));
        const secondsDiff = Math.floor((timeDiff % (1000 * 60)) / 1000);

        // console.log("item.typeveh", item.typeveh);
        if (item.typeveh == "CHARIOT") {
          const newItem = {
            value: item.id,
            label:
              ValueCheckedRadio === "vehicul"
                ? minutesDiff <= 60
                  ? item.name + iconGreen.symbol
                  : minutesDiff > 60 && minutesDiff <= 180
                  ? item.name + iconyello.symbol
                  : item.name + iconRed.symbol
                : "",
            lastu: item.lastu,
            // parent: item.parent,
            //  children: children.length > 0 ? children : null,
          };
          result.push(newItem);
        } else if (item.typeveh != "CHARIOT" && item.typeveh != "rien") {
          const newItem = {
            value: item.id,
            label:
              ValueCheckedRadio === "vehicul"
                ? minutesDiff <= 60
                  ? Math.abs(item.lacc) == 1
                    ? item.vitesse > 0
                      ? item.name + Lighti.symbol // endif vitesse>0
                      : item.name + Lightningi.symbol
                    : Math.abs(item.lacc) === 0 // else if acc = 1
                    ? item.name + Warningi.symbol
                    : item.name
                  : minutesDiff < 60
                  ? item.name + parkingi.symbol
                  : item.name + sosi.symbol
                : "",
            lastu: item.lastu,
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
        console.log(vh, "vh");
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

        marque: x.marque,
        kilometrage: x.kilometrage,
        heures: x.heures,
        consomation_total: x.consomation_total,
        temp_refroi: x.temp_refroi,
        last_capteurs: x.last_capteurs,
        can_capteurs: x.can_capteurs,
        nombre_bac: x.nombre_bac,
        fin_rfid: x.fin_rfid,
        debut_rfid: x.debut_rfid,
        vitesse: x.vitesse,
      };
      Lat_lng.push(position);
      // console.log(Lat_lng)
      Setlat_lng(Lat_lng);
    });
  }, [ValueCheckedRadio]);

  const [test, settest] = useState(false);
  let id = [];
  let deviceid = [];
  let idcenter = null;

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

          idcenter = item.value;
        });
      }
      if (ValueCheckedRadio === "circuit") {
        currentNodeArrey.map((item) => {
          SetAllids((current) => [...current, item.value]);
          id.push(item.value);
          idcenter = item.value;
        });
      }

      console.log("idff", idcenter);
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
            idcenter: idcenter,

            marque: x.marque,
            kilometrage: x.kilometrage,
            heures: x.heures,
            consomation_total: x.consomation_total,
            temp_refroi: x.temp_refroi,
            last_capteurs: x.last_capteurs,
            can_capteurs: x.can_capteurs,
            nombre_bac: x.nombre_bac,
            fin_rfid: x.fin_rfid,
            debut_rfid: x.debut_rfid,
            vitesse: x.vitesse,
          };
          Lat_lng.push(position);
        });

        Setlat_lng(Lat_lng);
        setSelectedRadioTree(Lat_lng);
        setSelectedValueTreeNointerval(Lat_lng);
        console.log("SelectedRadioTreess", SelectedRadioTree);
        console.log("Setlat_lng after:", Lat_lng);
        console.log("id.length", id.length);
      } catch (error) {
        console.log("error", error);
      }
    },

    [RadioChange, ValueCheckedRadio, ContextShowtTee]
  );

  useEffect(() => {
    setresultForpopup([]);
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
              idcenter: idcenter,
              marque: x.marque,
              kilometrage: x.kilometrage,
              heures: x.heures,
              consomation_total: x.consomation_total,
              temp_refroi: x.temp_refroi,
              last_capteurs: x.last_capteurs,
              can_capteurs: x.can_capteurs,
              nombre_bac: x.nombre_bac,
              fin_rfid: x.fin_rfid,
              debut_rfid: x.debut_rfid,
              vitesse: x.vitesse,
            };
            Lat_lng.push(position);
          });

          Setlat_lng(Lat_lng);
          setSelectedRadioTree(Lat_lng);
          console.log("SelectedRadioTreess", SelectedRadioTree);
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
  }, [ValueCheckedRadio, ContextShowtTee]);

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

            {/* <div className="searchContainer">
              <div style={{ marginLeft: "11px" }}>
                <input
                  value={timeSearch}
                  onChange={handleChangedate}
                  type="date"
                />
              </div>
            
            </div> */}
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
