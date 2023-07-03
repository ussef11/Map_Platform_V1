import React, { useState } from "react";
import Tree from "../Component/DropDownTree/index";
import Map from "../Component/map/map";
import Menu from "../Component/SideMenu/Menu";
import { ContextID } from "../Helper/ContextID";
import { ContextShowtTee } from "../Helper/ContextShowtTee";
import Navbar from "../NavBAR/NavBar";
import Popup from "../Component/SidePopup/Popup";

import MapDiagnos from "../Component/mapDiagnos/MapDiagnos";
import DisplayChart from "../Component/Chart/DisplayChart";
import PopupDiag from "../Component/SidePopup/PopupDiag";
import "./Home.css";
const Home = () => {
  const [lat_lng, Setlat_lng] = useState();
  const [ContextShowtTee, SetContextShowtTree] = useState();
  const [SelectedRadioValue, setSelectedRadioValue] = useState();
  const [SelectedRadioTree, setSelectedRadioTree] = useState();
  const [SelectedValueTreeNointerval, setSelectedValueTreeNointerval] =
    useState();
  const [resultForpopup, setresultForpopup] = useState();
  const [displaybacs, setdisplaybacs] = useState(false);
  const [IdMark, setIdMark] = useState();

  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [startTime, setStartTime] = useState("08:00");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endTime, setEndTime] = useState("14:59");


  const [ActionDiag , setActionDiag] = useState("");
  const [ActionPlay , setActionPlay] = useState('')
  


  const [DeviceId, setDeviceId] = useState();
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

        ActionDiag,
        setActionDiag,

        ActionPlay,
        setActionPlay,
     
      }}
    ><>
    <Navbar />
    <div className="Container">
      <Menu />
      <Tree />
  
      <div className="mapPopupContainer">
        {ContextShowtTee === "TEMPS REEL" ? (
          <Map />
        ) : ContextShowtTee === "DIAGNOSTIQUE" ? (
          <MapDiagnos />
        ) : (
          <Map />
        )}
{ 
ContextShowtTee === "TEMPS REEL" ? 
        <Popup /> : <PopupDiag/>}
  
        {/* {ContextShowtTee === "DIAGNOSTIQUE" ? (
          
            <DisplayChart />
         
        ) : null} */}
      </div>
    </div>
  </>
  
      {/* <>
        <Navbar />
        <div className="Container">
          <div>  
          <Menu />
          <Tree />

          <div className="mapPopupContainer">
            {ContextShowtTee === "TEMPS REEL" ? (
              <Map />
            ) : ContextShowtTee === "DIAGNOSTIQUE" ? (
              <MapDiagnos />
            ) : (
              <Map />
            )}
            <Popup />

        
              
              {ContextShowtTee === "DIAGNOSTIQUE" ? (
                <ResizePanel direction="n">     <DisplayChart /> </ResizePanel>
              ) : null}
            
          </div>
          </div>
        </div>
      </> */}
    </ContextID.Provider>
  );
};

export default Home;
