import React, { useState } from "react";
import Tree from "../Component/DropDownTree/index";
import Map from "../Component/map/map";
import Menu from "../Component/SideMenu/Menu";
import { ContextID } from "../Helper/ContextID";
import { ContextShowtTee } from "../Helper/ContextShowtTee";
import Navbar from "../NavBAR/NavBar";
import "./Home.css";
const Home = () => {
  const [lat_lng, Setlat_lng] = useState();
  const [ContextShowtTee, SetContextShowtTree] = useState();
  const [SelectedRadioValue, setSelectedRadioValue] = useState();
  const [SelectedRadioTree, setSelectedRadioTree] = useState();
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
        setSelectedRadioTree
      }}
    >
      <>
        {" "}
        <Navbar />
        <div className="Container">
          <Menu />
          <Tree />
          <Map />
        </div>
      </>
    </ContextID.Provider>
  );
};

export default Home;
