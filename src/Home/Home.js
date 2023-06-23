import React, { useState } from "react";
import Tree from "../Component/DropDownTree/index";
import Map from "../Component/map/map";
import Menu from "../Component/SideMenu/Menu";
import { ContextID } from "../Helper/ContextID";
import { ContextShowtTee } from "../Helper/ContextShowtTee";
import Navbar from "../NavBAR/NavBar";
import Popup from "../Component/SidePopup/Popup";

import MapDiagnos from "../Component/mapDiagnos/MapDiagnos";
import DisplayChart from "../Component/Chart/DisplayChart"
import ResizePanel from "react-resize-panel";
import "./Home.css";
const Home = () => {
  const [lat_lng, Setlat_lng] = useState();
  const [ContextShowtTee, SetContextShowtTree] = useState();
  const [SelectedRadioValue, setSelectedRadioValue] = useState();
  const [SelectedRadioTree, setSelectedRadioTree] = useState();
  const [SelectedValueTreeNointerval, setSelectedValueTreeNointerval] = useState();
  const [resultForpopup, setresultForpopup] = useState();
  const [displaybacs, setdisplaybacs] = useState(false);
  const [IdMark, setIdMark] = useState();


  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState("00:00");
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [endTime, setEndTime] = useState("23:59");

  const [hidden, show] = useState('flex');
  const [drawer_hidden, drawer_show] = useState('1');
  const [pannel_hidden, pannel_show] = useState('4');
  const [pannel_height, setpannel_height] = useState('400px');
  
  const drawer_hide = () => {
    let on = hidden;

    if(on === "flex"){
      pannel_show("1");
      show("none");
      drawer_show("0");
      setpannel_height("590px");

    
    }else {pannel_show("4");
    setpannel_height("400px");
      show("flex");
      drawer_show("1");
      
    }
  }



  const [DeviceId , setDeviceId] = useState()
  return (
    <ContextID.Provider
      value={{
        lat_lng,
        Setlat_lng,
        ContextShowtTee,
        SetContextShowtTree,
        SelectedRadioValue,
        setSelectedRadioValue,
        SelectedRadioTree,
        setSelectedRadioTree,
        resultForpopup,
        setresultForpopup,
        displaybacs,
        setdisplaybacs,
        SelectedValueTreeNointerval,
        setSelectedValueTreeNointerval,
        IdMark,
        setIdMark,

        startDate,
        setStartDate,
        startTime,
        setStartTime,
        endDate,
        setEndDate,
        endTime,
        setEndTime,

        DeviceId,
        setDeviceId,



        


      }}>
      <>
        
        <Navbar />
        <div className="Container">
          <Menu />
          <Tree />
          <div style={ContextShowtTee === "DIAGNOSTIQUE" ?{
       
          height: "500px",
          border: "1px solid black",
          display: "flex",
          flexDirection: "column"
        }
         : {display:"flex"}} className="mapPopupContainer">
          {  ContextShowtTee === "TEMPS REEL" ? <Map /> :


             ContextShowtTee === "DIAGNOSTIQUE" ?
           
             <MapDiagnos/>  :
             
             <Map />
} 
            <Popup />
            { ContextShowtTee === "DIAGNOSTIQUE" ? <DisplayChart/> : null}
          </div>
        </div>
      </>
    </ContextID.Provider>
  );
};

export default Home;
