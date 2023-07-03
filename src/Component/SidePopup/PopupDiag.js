import React, { useContext, useRef, useState } from "react";
import "./Popup.css";
import { ContextID } from "../../Helper/ContextID";
import useFetch from "../../Hook/UseFetch";
import { useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";

const AccordionItem = (props) => {
  const contentEl = useRef(null);
  const { handleToggle, active, faq } = props;
  const { displaybacs, setdisplaybacs } = useContext(ContextID);
  const { IdMark, setIdMark } = useContext(ContextID);
  const { SelectedRadioValue, setSelectedRadioValue } = useContext(ContextID);
  const {Pourcentage , setPourcentage} = useContext(ContextID)
  const {Speed , setSpeed} = useContext(ContextID)
  const [showAllbacs, setshowAllbacs] = useState("");
  const { deleteAllbaks, setdeleteAllbaks } = useState("");

  const { ActionPlay, setActionPlay } = useContext(ContextID);
  const {ActionDiag , setActionDiag} =  useContext(ContextID);

  const {
    name,
    id,
    vehicule,
    fonction,
    lastupdate,
    batterie,
    capteur,
    immatriculation,
    datems,
    typevehicule,
    lastacc,
    marque,
    kilometrage,
    heures,
    consomation_total,
    temp_refroi,
    last_capteurs,
    can_capteurs,
    nombre_bac,
    fin_rfid,
    debut_rfid,
    rpm,
    epa,
    epf,
  } = faq;

  const { Data } = useFetch("http://tanger.geodaki.com:3000/rpc/position_capt");

  const [listCan, setListCan] = useState([]);
  const [listCap, setListCap] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setListCap([]);
      if (Data) {
        if (typevehicule != "CHARIOT" && can_capteurs != "VIDE") {
          const [binaryCan, binaryCap] = can_capteurs.split("_");

          const newListCan = [];
          for (let i = 0; i < binaryCan.length; i++) {
            const charlastCap = last_capteurs.charAt(i);

            const char = binaryCan.charAt(i);
            const position = i + 1;

            const item = Data.find((obj) => obj.code === String(position));

            if (item && char === "1") {
              newListCan.push({
                intitule: item.intitule,
                active: charlastCap === "1" ? "ON" : "OFF",
                color: charlastCap === "1" ? "green" : "red",
              });
            }
          }
          setListCan(newListCan);

          const newListCap = [];
          for (let i = 0; i < binaryCap.length; i++) {
            const char = binaryCap.charAt(i);
            const position = i + 1;

            const item = Data.find((obj) => obj.code === String(position));

            if (item && char === "1") {
              newListCap.push(item.intitule);
            }
          }
          setListCap(binaryCap);
        }
      }
    };
    fetchData();
  }, [Data, lastupdate]);

  const { startDate, setStartDate } = useContext(ContextID);
  const { startTime, setStartTime } = useContext(ContextID);
  const { endDate, setEndDate } = useContext(ContextID);
  const { endTime, setEndTime } = useContext(ContextID);

  const [showRIFDinfo, setshowRIFDinfo] = useState(false);
  const [showAllinfo, setshowAllinfo] = useState(true);
  const handleDispalyInfo = () => {
    if (showAllinfo === false) {
      setshowRIFDinfo(false);
      setshowAllinfo(true);
    }
  };
  const handleDispalyRifdInfo = () => {
    if (showRIFDinfo === false) {
      setshowRIFDinfo(true);
      setshowAllinfo(false);
      console.log("mytagdata", tagdata);
    }
  };

  const handleclickShowBacs = () => {
    setshowAllbacs("show");
  };
  const handleclickhideBacs = () => {
    setshowAllbacs("hide");
  };

  const [tagdata, settagdata] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (active != null) {
        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };
        try {
          const response = await fetch(
            `http://tanger.geodaki.com:3000/rpc/last_tag?uid=71&devid=${active}`,
            requestOptions
          );
          const result = await response.json();
          settagdata(result);
          console.log("activetag", tagdata);
        } catch (error) {
          console.log("error", error);
        }
      }
    };

    fetchData();
  }, [active, lastupdate]);
  const [Infovh, setInfovh] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (active) {
          const requestOptions = {
            method: "GET",
            redirect: "follow",
          };

          const res = await fetch(
            `http://tanger.geodaki.com:3000/rpc/data2?dt=15/06/2023&deviceid=${active}`,
            requestOptions
          );
          const result = await res.json();
          setInfovh(result);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [active]);

  const [refreshKey, setRefreshKey] = useState(0);
  useEffect(() => {
    setRefreshKey((prevKey) => prevKey + 1);
  }, [active]);

  useEffect(() => {
    if (active == null) {
      setdisplaybacs(false);
      setshowAllbacs("hide");
    } else {
      setIdMark(active);
    }
    console.log("active", active);
  }, [active]);

  useEffect(() => {
    if (showAllbacs == "show") {
      setdisplaybacs(true);
    } else {
      setdisplaybacs(false);
    }
  }, [showAllbacs]);

  const[NumSpeed , setNumSpeed] = useState(1)

  const handleSpeed = ()=>{
    setNumSpeed((current)=> current+0.25)
    if(NumSpeed === 2){
      setNumSpeed(1)
    }
  }
  useEffect(()=>{
    if(NumSpeed === 1 ){
      setSpeed(1000)
    }
    if(NumSpeed === 1.25 ){
      setSpeed(700)
    }
    if(NumSpeed === 1.5 ){
      setSpeed(400)
    }
    if(NumSpeed === 1.75 ){
      setSpeed(200)
    }
    if(NumSpeed === 2 ){
      setSpeed(100)
    }

  },[NumSpeed])

  
 const [ifplay , setifplay] = useState(false)
 const { DeviceId, setDeviceId } = useContext(ContextID);
// useEffect(()=>{
//   if(ActionPlay === "play"){
    
//   }

// },[ActionPlay])
 useEffect(()=>{
  setifplay(false)
  setActionPlay("stop")
 },[DeviceId])
  return (
    <div className="rc-accordion-card">
      <header
        className={active === id ? "active" : ""}
        onClick={() => handleToggle(id)}
      >
        <h2>{name}</h2>
        <span className="material-symbols-outlined">
          <i className="fa-solid fa-caret-down"></i>
        </span>
      </header>
      <div
        ref={contentEl}
        className={`collapse ${active === id ? "show" : ""}`}
        style={
          active === id
            ? {
                height:
                  (contentEl &&
                    contentEl.current &&
                    contentEl.current.scrollHeight) ||
                  "0px",
              }
            : { height: "0px" }
        }
      >
        <div className="divInfocercuit">
          <button onClick={()=>{setActionDiag("Displaypoint") }}>
            
            <span class="material-symbols-outlined">my_location</span>
          </button>
          <button  onClick={()=>{setActionDiag("showbacs")}}>
            
            <span class="material-symbols-outlined">delete</span>
          </button>
          <button  onClick={()=>{setActionDiag("circuitth")}}>
            
            <span class="material-symbols-outlined">add_road</span>
          </button>
          <button  onClick={()=>{setActionDiag("cancel")}}>
            
            <span class="material-symbols-outlined">cancel</span>
          </button>
        </div>
        <div className="divButtoninfo">
          <button
            style={
              showAllinfo
                ? { backgroundColor: "#ff4b4b" }
                : { backgroundColor: "transparent" }
            }
            onClick={handleDispalyInfo}
          >
            Info
          </button>
          {capteur.includes("RFID") ? (
            <button
              style={
                showRIFDinfo
                  ? { backgroundColor: "#ff4b4b" }
                  : { backgroundColor: "transparent" }
              }
              onClick={handleDispalyRifdInfo}
            >
              RIFD
            </button>
          ) : null}
        </div>


        <div className="divInfocercuittow">

          <button onClick={()=>{setActionPlay("play");setifplay(true)}}>
            
          <span class="material-symbols-outlined">play_arrow</span>
          </button>
          <button  onClick={()=>{setActionPlay("pause")}}>
            
          <span class="material-symbols-outlined">pause</span>
          </button>
          <button  style={{backgroundColor:"red"}} onClick={()=>{setActionPlay("stop")}}>
            
          <span class="material-symbols-outlined">stop_circle</span>
          </button>

      

{ ifplay  && <div className="probar"> 
 <button  className="buttonspeed" onClick={handleSpeed}> 
        <p className="numSpeed"> {NumSpeed} </p><span class="material-symbols-outlined">close</span> 
        {/* <span class="material-symbols-outlined">close</span>  */}
          </button>

 <ProgressBar  labelClassName="lblBar" borderRadius="14px" height="22px" bgColor="#0060ff" completed={Pourcentage} maxCompleted={100} />
 <label className="labelBar">{Pourcentage}% </label>


   </div>}
          
          
        </div>


        {showAllinfo && (
          <div key={refreshKey}>
            {Infovh.length > 0 ? (
              Infovh.map((x, index) => (
                <div key={index}>
                  <div className="divone">
                    <p>
                      {x.vehicule} {vehicule}
                    </p>
                    <p style={{ fontSize: "14px", color: "#7c7c7c" }}>
                      Du : {startDate} -
                      {startTime} AU :{endDate} -
                      {endTime}
                    </p>
                  </div>
                  <div className="divInfoContent">
                    <table className="tablenfo">
                      <tbody>
                        <tr>
                          <th>
                            <strong>Véhicule</strong>
                          </th>
                          <th>
                            <strong>DIST (KM)</strong>
                          </th>
                          <th>
                            <strong>VIT MOY</strong>
                          </th>
                          <th>
                            <strong>DATE</strong>
                          </th>
                        </tr>
                        <tr>
                          <td>{x.vehicule}</td>
                          <td>{x.distance}</td>
                          <td>{x.vitissemax}</td>
                          <td>{x.dataj}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ height: "212px" }}>No data available</p>
            )}

            <div>
              {/* <div className="divone">
                <p>{lastupdate}</p>
              </div>
              <div className="divInfoContent">
                <div>
                  <p> Adresse :</p>
                </div>
                <div>
                  <p> Route de Tétouan</p>
                </div>
              </div> */}
            </div>
          </div>
        )}

        

        {capteur.includes("RFID")
          ? showRIFDinfo && (
              <div>
                <div>
                  <div className="divone">
                    <p> INFOS RFID:</p>
                  </div>
                  <div className="divInfoContent">
                    <div>
                      <p>Début:</p>
                    </div>
                    <div className="divtitleInfo">
                      <p> {debut_rfid}</p>
                    </div>
                  </div>
                  <div className="divInfoContent">
                    <div>
                      <p> Nombre de bacs relevés :</p>
                    </div>
                    <div className="divtitleInfo">
                      <p> {nombre_bac}</p>
                    </div>
                  </div>
                  <div className="divInfoContent">
                    <div>
                      <p> Fin:</p>
                    </div>
                    <div className="divtitleInfo">
                      <p>{fin_rfid}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          : null}
      </div>
    </div>
  );
};

const Popup = () => {
  const { resultForpopup, setresultForpopup } = useContext(ContextID);
  const { DeviceId, setDeviceId } = useContext(ContextID);
  const [DataForDiagpopup, setDataForDiagpopup] = useState();
  const { ContextShowtTee, SetContextShowtTree } = useContext(ContextID);
  const { SelectedRadioValue, setSelectedRadioValue } = useContext(ContextID);
  useEffect(() => {
    setActive(null);
    setDeviceId(null);
    setresultForpopup(null);
  }, [SelectedRadioValue, ContextShowtTee]);

  useEffect(() => {
    if (ContextShowtTee == "close All") {
      setSelectedRadioValue("vehicul");
      setActive(null);
      setDeviceId(null);
      setresultForpopup(null);
      setDataForDiagpopup()
    }
    setDataForDiagpopup()
    console.log("ssssss", SelectedRadioValue);
  }, [ContextShowtTee, SelectedRadioValue]);

  useEffect(() => {
    let result;
    result = null;
    const fetchData = async () => {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      try {
        if (DeviceId) {
          if (ContextShowtTee === "DIAGNOSTIQUE") {
            let res;
            res = await fetch(
              `http://tanger.geodaki.com:3000/rpc/tempsreel?ids={${DeviceId}}&uid=71`,
              requestOptions
            );
            result = await res.json();
            setDataForDiagpopup(result);
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [DeviceId, ContextShowtTee, SelectedRadioValue]);

  useEffect(() => {
    console.log("vvvv", ContextShowtTee);
  }, [ContextShowtTee]);

  console.log("resultForpopup From PopUp", resultForpopup);
  const [active, setActive] = useState(null);

  const handleToggle = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

  return (
    <article>
      {DataForDiagpopup &&
        DataForDiagpopup.map((faq, index) => {
          return (
            <AccordionItem
              key={index}
              active={active}
              handleToggle={handleToggle}
              faq={faq}
            />
          );
        })}
    </article>
  );
};

export default Popup;
