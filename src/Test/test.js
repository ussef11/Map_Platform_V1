import React, { useRef, useState } from 'react';
import "./test.css";

const dd = [
    {
        "id": 1773,
        "name": "ARTA9101",
        "lat": 35.756084,
        "lon": -5.830924,
        "lastupdate": "2023-05-29 10:41:56",
        "batterie": null,
        "vehicule": "CHARIOT",
        "capteur": "GPS",
        "immatriculation": null,
        "datems": "2022-01-01",
        "typevehicule": "CHARIOT",
        "lastacc": 0,
        "fonction": "BALAYAGE MANUEL"
    },
    {
        "id": 52,
        "name": "ARTA9104",
        "lat": 35.754318,
        "lon": -5.83041,
        "lastupdate": "2023-05-29 10:42:01",
        "batterie": null,
        "vehicule": "CHARIOT",
        "capteur": "GPS",
        "immatriculation": null,
        "datems": "2022-01-01",
        "typevehicule": "CHARIOT",
        "lastacc": 0,
        "fonction": "BALAYAGE MANUEL"
    },
    {
        "id": 11,
        "name": "ARTA9103",
        "lat": 35.748901,
        "lon": -5.82477,
        "lastupdate": "2023-05-29 10:40:50",
        "batterie": null,
        "vehicule": "CHARIOT",
        "capteur": "GPS",
        "immatriculation": null,
        "datems": "2022-01-01",
        "typevehicule": "CHARIOT",
        "lastacc": 0,
        "fonction": "BALAYAGE MANUEL"
    },
    {
        "id": 44,
        "name": "ARTA9102",
        "lat": 35.758282,
        "lon": -5.824392,
        "lastupdate": "2023-05-29 10:43:04",
        "batterie": null,
        "vehicule": "CHARIOT",
        "capteur": "GPS",
        "immatriculation": null,
        "datems": "2022-01-01",
        "typevehicule": "CHARIOT",
        "lastacc": 0,
        "fonction": "BALAYAGE MANUEL"
    }
]

const faqs = [
  {
    id: 1,
    header: "What is Lorem Ipsum?",
    text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
  },
  {
    id: 2,
    header: "Where does it come from?",
    text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
  },
  {
    id: 3,
    header: "Why do we use it?",
    text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
  },
  {
    id: 4,
    header: "Where can I get some?",
    text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
  },
];

const AccordionItem = (props) => {
  const contentEl = useRef(null);
  const { handleToggle, active, faq } = props;
  const { name, id, vehicule  ,fonction } = faq;

  return (
    <div className="rc-accordion-card">
      <header
        className={active === id ? "active" : ""}
        onClick={() => handleToggle(id)}
      >
        <h2>{name}</h2>
        <span className="material-symbols-outlined">expand_more</span>
      </header>
      <div
        ref={contentEl}
        className={`collapse ${active === id ? "show" : ""}`}
        style={
          active === id
            ? { height: contentEl && contentEl.current && contentEl.current.scrollHeight || "0px" }
            : { height: "0px" }
        }
      >
        <p>{name}</p>
        <p>{vehicule}</p>
        <p>{fonction}</p>
      </div>
    </div>
  );
};

const Test = () => {
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
      {dd.map((faq, index) => {
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

export default Test;