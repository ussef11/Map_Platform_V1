import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import {
  EyeOutlined,
  HistoryOutlined,
  BugOutlined,
  BarcodeOutlined,
  MenuOutlined,
  VideoCameraOutlined,
  ScheduleOutlined,
  SettingOutlined,
  DeleteOutlined,
  BellOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import axios from "axios";
import "./Menu.css";
import ReactDOM from "react-dom";
import Geodaki from "../../media/images/icon_mainmenu.png";
import insight_removebg from "../../media/images/insight-removebg-preview.png";
import Logo1 from "../../media/images/logo1.png";
import { ContextID } from "../../Helper/ContextID";
const MENU_ITEM_ICONS = {
  "TEMPS REEL": <EyeOutlined />,
  HISTORIQUE: <HistoryOutlined />,
  DIAGNOSTIQUE: <BugOutlined />,
  "IDENTIFICATION RFID": <BarcodeOutlined />,
  "ANALYSE THEMATIQUE": <MenuOutlined />,
  "ACCES VIDEO": <VideoCameraOutlined />,
  PLANIFICATION: <ScheduleOutlined />,
  PARAMETRAGE: <SettingOutlined />,
  "TAUX DE REMPLISSAGE": <DeleteOutlined />,
  "ALERTES ET NOTIFICATIONS": <BellOutlined />,
  ETATS: <ApartmentOutlined />,
};



function transformDataToMenuItems(data) {
  // Find items with no parent and type 'interface'
  const topLevelItems = data.filter(
    (item) => item.parent === null && item.type === "interface"
  );

  // Transform each top level item into a menu item
  const menuItems = topLevelItems.map((item) => {
    const subItems = data.filter(
      (subItem) => subItem.parent === item.id && subItem.type === "interface"
    );

    // Transform each sub item into a menu item
    const subMenuItems = subItems.map((subItem) => ({
      label: subItem.name,
      icon: MENU_ITEM_ICONS[subItem.name],
    }));

    return {
      label: item.name,
      icon: MENU_ITEM_ICONS[item.name.toUpperCase()],
      subMenuItems,
    };
  });

  return menuItems;
}

function MenuSide({ handleMenuClick }) {
  const { ContextShowtTee, SetContextShowtTree } = useContext(ContextID);
  const { lat_lng, Setlat_lng } = useContext(ContextID);
  const [data, setData] = useState([]);
  const [devicesP, setDevicesP] = useState([]);




  const [HideMenuSide, SetHideMenuSide] = useState(true);

  useEffect(() => {
    if (ContextShowtTee === "TEMPS REEL") {
      SetHideMenuSide(false)
      console.log("iwant to close the menu")
    } else if (ContextShowtTee === "HISTORIQUE") {
      SetHideMenuSide(false)
      console.log("HISTORIQUE")
    } 
    else if (ContextShowtTee === "DIAGNOSTIQUE") {
      SetHideMenuSide(false)
      console.log("DIAGNOSTIQUE")
    } 
    
    
    else if ("close All") {
      SetHideMenuSide(true)
          console.log("iwant to open the menu")
  
    }
  }, [ContextShowtTee]);





  useEffect(() => {
    axios
      .get("http://tanger.geodaki.com:3000/rpc/interfaces?uid=71")
      .then((response) => {
        setData(response.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://tanger.geodaki.com:3000/rpc/tempsreel?uid=71")
      .then((response) => {
        setDevicesP(response.data);
      });
  }, []);
  const menuItems = transformDataToMenuItems(data);
  const [markers, setMarkers] = useState([]);
  const addMarker = (newMarker) => {
    setMarkers([...markers, newMarker]);
  };
  // menu listener
  function handleMenuClick(item) {
  
    console.log(`you clicked on ${item.label}`);
    if (item.label === "DIAGNOSTIQUE") {
     
      SetContextShowtTree("");
      SetContextShowtTree(item.label);
    } else if (item.label === "TEMPS REEL") {
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

      SetContextShowtTree("");
      SetContextShowtTree(item.label);
    } else {
      console.log("ssssss ", item.label);
      SetContextShowtTree("");
      SetContextShowtTree(item.label);
    }
  }

  return (
    <>
  { HideMenuSide && <div id="MenuParent" style={{ height: `calc(100vh - 70px)` }}>
    <div
      style={{
        backgroundColor: "rgb(14, 88, 144)",
        color: "white",
        height: "44px",
      }}
    >
      <table>
        <tr>
          <td>
            <img src={window.location.origin + '/images/icon_mainmenu.png'}  ></img>
          </td>
          <td className="marque" style={{ marginLeft: "200px" }}>
            {" "}
            <marquee>Geodaki <span> insight solutions</span> </marquee>{" "}
          </td>
        </tr>
      </table>
    </div>
    <div
      style={{
        backgroundImage: `url(${Logo1})`,
        backgroundColor: "none",
        textAlign: "center",
        height: "130px",
      }}
    >
      <img
        src={insight_removebg}
        style={{
          backgroundColor: "white",
          height: "60%",
          position: "relative",
          top: "23px",
          backgroundImage: Logo1,
          borderRadius: "50%",
        }}
      ></img>
    </div>
    <Menu
      theme="dark"
      mode="inline"
      style={{
        height: `calc(100%-15px)`,
        overflowY: "auto",
        backgroundColor: "rgb(14, 88, 144)",
      }}
    >
      {menuItems.map((menuItem) =>
        menuItem.subMenuItems.length ? (
          <Menu.SubMenu
            key={menuItem.label}
            title={menuItem.label}
            icon={menuItem.icon}
            style={{ backgroundColor: "rgb(14, 88, 144)" }}
          >
            {menuItem.subMenuItems.map((subMenuItem) => (
              <Menu.Item
                style={{ backgroundColor: "rgb(14, 88, 144)" }}
                key={subMenuItem.label}
                icon={subMenuItem.icon}
                onClick={() => handleMenuClick(subMenuItem)}
              >
                {subMenuItem.label}
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ) : (
          <Menu.Item
            style={{ backgroundColor: "rgb(14, 88, 144)" }}
            key={menuItem.label}
            icon={menuItem.icon}
            onClick={() => handleMenuClick(menuItem)}
          >
            {menuItem.label}
          </Menu.Item>
        )
      )}
    </Menu>
  </div>} </>
  );
}

export default MenuSide;
