import React, { useContext, useRef, useState } from "react";
import "./Popup.css";
import { ContextID } from "../../Helper/ContextID";
import useFetch from "../../Hook/UseFetch";
import { useEffect } from "react";

const AccordionItem = (props) => {
  const contentEl = useRef(null);
  const { handleToggle, active, faq } = props;
  const { displaybacs, setdisplaybacs } = useContext(ContextID);

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

  const binaryString = "00000000010000011100000000000000_1111111100";

  const [listCan, setListCan] = useState([]);
  const [listCap, setListCap] = useState([]);

  useEffect(() => {
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
  }, [Data]);

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
    }
  };

  const handledisplaybacs = ()=>{
    if(displaybacs){
      setdisplaybacs(false)
    }else
    {
      setdisplaybacs(true)
    }
  }

  return (
    <div className="rc-accordion-card">
      <header
        className={active === id ? "active" : ""}
        onClick={() => handleToggle(id)}
      >
        <h2>{name}</h2>
        <span className="material-symbols-outlined">
          <i class="fa-solid fa-caret-down"></i>
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
        {showAllinfo && (
          <>
            <div>
              <div className="divone">
                <p>{lastupdate}</p>
              </div>
              <div className="divInfoContent">
                <div>
                  <p> Adresse :</p>
                </div>
                <div>
                  <p> Route de Tétouan</p>
                </div>
              </div>
              {capteur.includes("ACC") ? (
                <div className="divInfoContent">
                  <div>
                    <p> Contact :</p>
                  </div>
                  <div>
                    <p>
                      {" "}
                      {lastacc === 0 ? (
                        <span style={{ color: "red", fontWeight: 800 }}>
                          OFF
                        </span>
                      ) : (
                        <span style={{ color: "green", fontWeight: 800 }}>
                          ON
                        </span>
                      )}{" "}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
            <div>
              <div className="divone">
                <p>{name}</p>
              </div>
              <div className="divInfoContent">
                <div>
                  <p> Fonction :</p>
                </div>
                <div>
                  <p> {fonction} </p>
                </div>
              </div>
            </div>
            {capteur.includes("CAN") ? (
              <div>
                <div className="divone">
                  <p> INFOS CAN BUS :</p>
                </div>
                <div className="divInfoContent">
                  <div>
                    <p> Jauge du niveau de carburant (%) :</p>
                  </div>
                  <div className="divtitleInfo">
                    <p> 20</p>
                  </div>
                </div>
                <div className="divInfoContent">
                  <div>
                    <p> Kilométrage total parcouru (km) :</p>
                  </div>
                  <div className="divtitleInfo">
                    <p> {kilometrage} km</p>
                  </div>
                </div>
                <div className="divInfoContent">
                  <div>
                    <p> Nombre total d'heures travaillées :</p>
                  </div>
                  <div className="divtitleInfo">
                    <p> {heures}</p>
                  </div>
                </div>
                <div className="divInfoContent">
                  <div>
                    <p>Carburant total consommé (Litres) :</p>
                  </div>
                  <div className="divtitleInfo">
                    <p>{consomation_total === -1 ? "" : consomation_total}</p>
                  </div>
                </div>
                <div className="divInfoContent">
                  <div>
                    <p>Température du liquide de refroidissement:</p>
                  </div>
                  <div className="divtitleInfo">
                    <p> {temp_refroi === -1 ? "" : temp_refroi}</p>
                  </div>
                </div>
                <div className="divInfoContent">
                  <div>
                    <p>RPM:</p>
                  </div>
                  <div className="divtitleInfo">
                    <p> {rpm}</p>
                  </div>
                </div>
                <div className="divInfoContent">
                  <div>
                    <p>Ecrasement de la pédale d'accélérateur:</p>
                  </div>
                  <div className="divtitleInfo">
                    <p> {epa}</p>
                  </div>
                </div>
                <div className="divInfoContent">
                  <div>
                    <p>Ecrasement de la pédale de frein:</p>
                  </div>
                  <div className="divtitleInfo">
                    <p> {epf}</p>
                  </div>
                </div>
              </div>
            ) : null}
            {capteur.includes("CAP") ? (
              <div style={{ paddingBottom: "6px" }}>
                <div className="divone">
                  <p> INFOS CAPTEURS:</p>
                </div>
                <div>
                  {listCan.map((item, index) => (
                    <div className="divInfoContent" key={index}>
                      <div>
                        <p>{item.intitule} :</p>
                      </div>
                      <div className="divtitleInfo">
                        <p style={{ color: item.color }}>{item.active}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            
          </>
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

                <div style={{ marginTop: "32px" }}>
                  <button onClick={handledisplaybacs}   className="displayBackButton">
                    Afficher Les Bacs
                  </button>
                  <button className="displayBackButtonl">
                    {" "}
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                  <button className="displayBackButtonl">
                    <i class="fa-solid fa-clock"></i>
                  </button>
                  <button className="displayBackButtonl">
                    <i class="fa-solid fa-right-long"></i>
                  </button>
                </div>
                <div className="divInfotag">
                  <label>tagggggggggggggggggggggg</label>
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
      {resultForpopup &&
        resultForpopup.map((faq, index) => {
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
