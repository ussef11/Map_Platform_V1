import React, { useContext, useRef, useState } from "react";
import "./Popup.css";
import { ContextID } from "../../Helper/ContextID";

const AccordionItem = (props) => {
  const contentEl = useRef(null);
  const { handleToggle, active, faq } = props;
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
  } = faq;

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
         { fonction == "BALAYAGE MANUEL" ? null : <div className="divInfoContent">
              <div>       
                <p> Contact :</p>
              </div>
              <div>    
                <p> ON</p>
              </div>
            </div>}
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
              <p> {fonction}</p>
            </div>
          </div>
        </div>
{

  fonction == "COLLECTE BACS" ?  
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
    
              <p> 20</p>
            </div>
          </div>
          <div className="divInfoContent">        
            <div> 
              <p> Nombre total d'heures travaillées :</p>
            </div>
            <div className="divtitleInfo">  
   
              <p> 20</p>
            </div>
          </div>
          <div className="divInfoContent">        
            <div> 
              <p>Carburant total consommé (Litres) :</p>
            </div>
            <div className="divtitleInfo">  
    
              <p> 20</p>
            </div>
          </div>
          <div className="divInfoContent">        
            <div> 
              <p>Température du liquide de refroidissement:</p>
            </div>
            <div className="divtitleInfo">  
   
              <p> 20</p>
            </div>
          </div>
          <div className="divInfoContent">        
            <div> 
              <p>RPM:</p>
            </div>
            <div className="divtitleInfo">  
   
              <p> 20</p>
            </div>
          </div>
          <div className="divInfoContent">        
            <div> 
              <p>Ecrasement de la pédale d'accélérateur:</p>
            </div>
          <div className="divtitleInfo">  
   
              <p> 20</p>
            </div>
          </div>
          <div className="divInfoContent">        
            <div> 
              <p>rasement de la pédale de frein:</p>
            </div>
            <div className="divtitleInfo">  

              <p> 20</p>
            </div>
          </div>
        </div>
   :   null  }
{

  fonction == "COLLECTE BACS" ?  
  <div>
          <div className="divone">
          <p> INFOS CAPTEURS:</p>
          </div>
          <div className="divInfoContent">        
            <div> 
              <p>Activation de la pompe :</p>
            </div>
            <div className="divtitleInfo">  
              <p> 20</p>
            </div>
          </div>
          <div className="divInfoContent">        
            <div> 
              <p>Cycle LC:</p>
            </div>
            <div className="divtitleInfo">  
    
              <p> 20</p>
            </div>
          </div>
        </div>
   :   null  }
{
  fonction == "COLLECTE BACS" ?  
  <div>
          <div className="divone">
          <p> INFOS CAPTEURS:</p>
          </div>
          <div className="divInfoContent">        
            <div> 
              <p>Début:</p>
            </div>
            <div className="divtitleInfo">  
              <p> 29/05/2023 02:17:35</p>
            </div>
          </div>
          <div className="divInfoContent">        
            <div> 
              <p>  Nombre de bacs relevés :</p>
            </div>
            <div className="divtitleInfo">  
    
              <p> 20</p>
            </div>
          </div>
          <div className="divInfoContent">        
            <div> 
              <p> Fin:</p>
            </div>
            <div className="divtitleInfo">  
    
              <p>29/05/2023 07:06:35</p>
            </div>
          </div>
        </div>
   :   null  }

        {/* <p>{name}</p>
        <p>{vehicule}</p>
        <p>{fonction}</p> */}
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
