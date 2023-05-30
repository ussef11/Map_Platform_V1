import React, { useState } from "react";
import Tree from "../Component/DropDownTree/index";
import Map from "../Component/map/map";
import Menu from "../Component/SideMenu/Menu";
import { ContextID } from "../Helper/ContextID";
import { ContextShowtTee } from "../Helper/ContextShowtTee";
import Navbar from "../NavBAR/NavBar";
import Popup from "../Component/SidePopup/Popup";

import "./Home.css";
const Home = () => {
  const [lat_lng, Setlat_lng] = useState();
  const [ContextShowtTee, SetContextShowtTree] = useState();
  const [SelectedRadioValue, setSelectedRadioValue] = useState();
  const [SelectedRadioTree, setSelectedRadioTree] = useState();
  const [resultForpopup, setresultForpopup] = useState();
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
        setresultForpopup
      }}
    >
      <>
        {" "}
        <Navbar />
        <div className="Container">
          <Menu />
          <Tree />
          <div className="mapPopupContainer">      <Map />
      <Popup/></div>
      
        </div>
      </>
    </ContextID.Provider>
  );
};

export default Home;
