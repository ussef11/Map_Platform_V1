import React, { useContext, useEffect, useRef, useState , useMemo } from "react";
import { Bar, getElementAtEvent, Line } from "react-chartjs-2";
import "chartjs-plugin-annotation";
import zoomPlugin from "chartjs-plugin-zoom";
import "./chart.css"
import {
  CategoryScale,
  BarElement,
  LinearScale,
  Legend,
  LineController,
  LineElement,
  PointElement,
  Title,
} from "chart.js";

import Chart from "chart.js/auto";
import useFetch from "../../Hook/UseFetch";
import { MaterialReactTable } from 'material-react-table';

import "chartjs-adapter-date-fns";
import { ContextID } from "../../Helper/ContextID";
import ResizePanel from "react-resize-panel";

function DisplayChart() {
  Chart.register(CategoryScale);
  Chart.register(zoomPlugin);
  Chart.register(LineController, LineElement, PointElement, LinearScale, Title);

  const { startDate, setStartDate} = useContext(ContextID);
  const { startTime, setStartTime} = useContext(ContextID);
  const { endDate, setEndDate} = useContext(ContextID);
  const { endTime, setEndTime} = useContext(ContextID);
  const {DeviceId , setDeviceId} = useContext(ContextID);
  const [SelctedButton , setSelctedButton] = useState(true)
const [GRAPH , setGRAPH] = useState(true)
const [DONNEES , setDONNEES] = useState(false)
const [SHIFTS , setSHIFTS] = useState(false)
const [BACS , setBACS] = useState(false)

useEffect(()=>{
  if(SelctedButton === "DONNEES"){
    setDONNEES(true)
    setGRAPH(false)
    setSHIFTS(false)
    setBACS(false)
  }
  if(SelctedButton === "SHIFTS"){
    setDONNEES(false)
    setGRAPH(false)
    setSHIFTS(true)
    setBACS(false)
  }
  if(SelctedButton === "BACS"){
    setDONNEES(false)
    setGRAPH(false)
    setSHIFTS(false)
    setBACS(true)
  }
  if(SelctedButton === "GRAPH"){
    setDONNEES(false)
    setGRAPH(true)
    setSHIFTS(false)
    setBACS(false)
  }

},[SelctedButton])

const dataas = [
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Joe',
      lastName: 'Doe',
    },
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Vandy',
    },
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    name: {
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    },
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
  },
];
// "date": "2023-07-03T12:26:53",
//         "lat": 35.755272,
//         "lon": -5.830626,
//         "vitesse": 0,
//         "distance": 0,
//         "acc": 0,
//         "odo": null,
//         "hr": null,
//         "gas": null,
//         "gas_total": null,
//         "temperateur": null,
//         "niv_eau": null,
//         "can10": null,
//         "adresse": null,
//         "capteur": null,
//         "can_capt": "VIDE",
//         "typevehicule": "CHARIOT",
//         "name": "ARTA9101"
const columns = useMemo(
  () => [
    {
      accessorKey: 'date', 
      header: 'DATE',
      size: 200,
    },
    {
      accessorKey: 'lat',
      header: 'LATITUDE',
      size: 200,
    },
    {
      accessorKey: 'lon', 
      header: 'LONGITUDE',
      size: 200,
    },
    {
      accessorKey: 'vitesse',
      header: 'VITESSE',
      size: 100,
    },
    {
      accessorKey: 'distance',
      header: 'DIST (KM)',
      size: 100,
    },
    {
      accessorKey: 'acc',
      header: 'ACC',
      size: 100,
    },
    {
      accessorKey: 'odo',
      header: 'ODO',
      size: 100,
    },
    {
      accessorKey: 'hr',
      header: 'HR',
      size: 100,
    },
    {
      accessorKey: 'gas',
      header: 'GAS',
      size: 100,
    },
    {
      accessorKey: 'gas_total',
      header: 'GAS TOT',
      size: 100,
    },
    {
      accessorKey: 'temperateur',
      header: 'TEMPERATEUR',
      size: 100,
    },
    {
      accessorKey: 'niv_eau',
      header: 'NIV EAU',
      size: 100,
    },
    {
      accessorKey: 'can10',
      header: 'CAN 10',
      size: 100,
    },
    {
      accessorKey: 'capteur',
      header: 'CAPT',
      size: 100,
    },
    {
      accessorKey: 'adresse',
      header: 'ADRESSE',
      size: 100,
    },
  ],
  [],
);


const [Data , setData] = useState()

  useEffect(()=>{
    console.log( startDate ,startTime ,endDate,endTime ,"deviceddID" ,DeviceId )

  },[startDate ,startTime,endDate,endTime ,DeviceId])

  useEffect(()=>{

  
    const fetchData = async()=>{
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      try {
        if(DeviceId){
            let res = await fetch(
              `http://tanger.geodaki.com:3000/rpc/data?idsdevice=${DeviceId}&dtb=${startDate}%20${startTime}:00&dtf=${endDate}%20${endTime}:00`,
              requestOptions
            );
            let result = await res.json();
            setData(result)
        }
       
      } catch (error) {
        console.log("error", error);
      }
    }
    
    fetchData()
    
  },[startDate ,startTime,endDate,endTime ,DeviceId])

  // const { Data } = useFetch(
  //   `http://tanger.geodaki.com:3000/rpc/data?idsdevice=${DeviceId}&dtb=${startDate}%20${startTime}:00&dtf=${endDate}%20${endTime}:00`
  // );


  const timeData = Data && Data.map((item) => item.date);
  const accData = Data && Data.map((item) => item.acc);
  const vitesse = Data && Data.map((item) => item.vitesse);
  const Nveau = Data && Data.map((item) => item.niv_eau);

  let newData = [];
  accData &&
    accData.map((data) => {
      data == 0
        ? newData.push({ acc: 1, color: "#ff0000" })
        : newData.push({ acc: 1, color: "#00ff00" });
    });
  const labels = timeData;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "ACC",
        data: newData.map((item) => item.acc),
        borderColor: newData.map((item) => item.color),
        backgroundColor: newData.map((item) => item.color),
        borderWidth: 5,
        barPercentage: 5,
        categoryPercentage: 2,
      },
    ],
  };
  const dataLine = {
    labels: labels,
    datasets: [
      {
        label: "vitesse",
        data: vitesse,
      },
    ],
  };
  const dataLineNveau = {
    labels: labels,
    datasets: [
      {
        label: "Niveau d'eau de la citerne (Litres)",
        data: Nveau,
      },
    ],
  };

  const chartrefbar = useRef();
  const chartref = useRef();

  const onClick = (event) => {
    if (getElementAtEvent(chartref.current, event).length > 0) {
      const datasetIndexNum = getElementAtEvent(chartref.current, event)[0]
        .datasetIndex;
      const datapoint = getElementAtEvent(chartref.current, event)[0].index;
      console.log("Labels:", Data[datapoint].date);
      console.log("Latitude:", Data[datapoint].lat);
      console.log("Longitude:", Data[datapoint].lon);
    }
  };

  const onClickb = (event) => {
    if (getElementAtEvent(chartrefbar.current, event).length > 0) {
      const datasetIndexNum = getElementAtEvent(chartrefbar.current, event)[0]
        .datasetIndex;
      const datapoint = getElementAtEvent(chartrefbar.current, event)[0].index;

      console.log("Labels:", Data[datapoint].date);
      console.log("Latitude:", Data[datapoint].lat);
      console.log("Longitude:", Data[datapoint].lon);
    }
  };

  const DATA_COUNT = 7;
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

  const codeData = [
    {
      intitule: "Brosse droite",
      code: "1",
    },
    {
      intitule: "Aspirateur droit",
      code: "2",
    },
    {
      intitule: "Brosse gauche",
      code: "3",
    },
    {
      intitule: "Aspirateur gauche",
      code: "4",
    },
    {
      intitule: "Brosse centrale",
      code: "5",
    },
    {
      intitule: "Aspirateur central",
      code: "6",
    },
    {
      intitule: "Porte arrière",
      code: "7",
    },
    {
      intitule: "Levée du caisson",
      code: "8",
    },
    {
      intitule: "Aspirateur manuel arrière",
      code: "9",
    },
    {
      intitule: "Activation de la pompe",
      code: "10",
    },
    {
      intitule: "Arroseur devant",
      code: "11",
    },
    {
      intitule: "Karcher arrière",
      code: "12",
    },
    {
      intitule: "Lavage bacs",
      code: "14",
    },
    {
      intitule: "Vidage d'eau sale.",
      code: "15",
    },
    {
      intitule: "Ouverture de la porte arrière",
      code: "16",
    },
    {
      intitule: "Cycle LC",
      code: "17",
    },
    {
      intitule: "Compaction",
      code: "18",
    },
    {
      intitule: "Poussée tablier",
      code: "19",
    },
    {
      intitule: "Ouverture de la vanne centrale",
      code: "24",
    },
    {
      intitule: "Ouverture de la trappe",
      code: "25",
    },
    {
      intitule: "Vidage d'eau sale",
      code: "28",
    },
    {
      intitule: "Karsher",
      code: "31",
    },
    {
      intitule: "Lavages des bacs",
      code: "32",
    },
    {
      intitule: "Jauge du niveau de carburant (%)",
      code: "34",
    },
    {
      intitule: "Kilométrage total parcouru (km)",
      code: "35",
    },
    {
      intitule: "Nombre total d'heures travaillées",
      code: "36",
    },
    {
      intitule: "Carburant total consommé (Litres)",
      code: "37",
    },
    {
      intitule: "Température du liquide de refroidissement",
      code: "38",
    },
    {
      intitule: "RPM",
      code: "39",
    },
    {
      intitule: "Ecrasement de la pédale de frein",
      code: "40",
    },
    {
      intitule: "Ecrasement de la pédale d'accélérateur",
      code: "41",
    },
    {
      intitule: "Niveau d'eau de la citerne (Litres)",
      code: "42",
    },
    {
      intitule: "POIDS",
      code: "43",
    },
  ];
  

  const [listComp, setListCom] = useState([]);
  const [CompleteData, setCompleteData] = useState(false);
  const [listcallcap, setlistcallcap] = useState([]);
  const [listcallcan, setlistcallcan] = useState([]);
  useEffect(() => {
    
      try {
        let mylist = [];
        let mylist2 = [];

        if (Data) {
          Data.map((canCaptData, index) => {
            const [binaryCan, binaryCap] = canCaptData.can_capt.split("_");
            const itemCap = [];
            const itemCan = [];

            for (let i = 0; i < binaryCan.length; i++) {
              const char = binaryCan.charAt(i);
              const position = i + 1;

              const item = codeData.find(
                (obj) => obj.code === String(position)
              );

              if (item && char === "1") {
                const correspondingCap = codeData.filter(
                  (cap) => cap.code === String(position)
                );
                itemCap.push(...correspondingCap);
              }
            }
            if (itemCap.length > 0) {
              setlistcallcap(itemCap);
            }

            for (let i = 0; i < binaryCap.length; i++) {
              const char = binaryCap.charAt(i);
              const position = i + 34;

              const item = codeData.find(
                (obj) => obj.code === String(position)
              );

              if (item && char === "1") {
                const correspondingCap = codeData.filter(
                  (cap) => cap.code === String(position)
                );
                itemCan.push(...correspondingCap);
              }
            }

            if (itemCan.length > 0) {
              setlistcallcan(itemCan);
            }
            

            canCaptData.capteur.split("").map((captValue, subIndex) => {
              const codeItem = codeData.find(
                (item) => item.code === String(subIndex + 1)
              );
              const date = canCaptData.date;
              const intitule = codeItem ? codeItem.intitule : "";
              const intitule1 = listcallcap.map((x) => x.intitule);

              const isActive = captValue === "1" ? "ON" : "OFF";
              const color = captValue === "1" ? "green" : "red";

              if (intitule1.includes(intitule)) {
                mylist.push({
                  intitule: intitule,
                  isActive: isActive,
                  color: color,
                  date: date,
                });
              }
            });
          });

          setListCom(mylist);
          setCompleteData(true)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    



    
  }, [Data ,CompleteData]);

  const labelss = Array.from(
    { length: DATA_COUNT },
    (_, index) => `Label ${index + 1}`
  );

  const DataCycleLC = {
    labels: labels,
    datasets: [
      // data: listComp .filter((x) => x.intitule === 'Compaction') .map((x) => x.isActive),
      {
        label: "Cycle LC",
        data: listComp
          .filter((x) => x.intitule === "Cycle LC")
          .map((x) => x.isActive),
        borderColor: "#ff0000",
        backgroundColor: "#ff0000",
        stepped: true,
        yAxisID: "y",
      },
    ],
  };
  const DataComp = {
    labels: labels,
    datasets: [
      // data: listComp .filter((x) => x.intitule === 'Compaction') .map((x) => x.isActive),
      {
        label: "Compaction",
        data: listComp
          .filter((x) => x.intitule === "Compaction")
          .map((x) => x.isActive),
        borderColor: "#0350ec",
        backgroundColor: "#0350ec",
        stepped: true,
        yAxisID: "y",
      },
    ],
  };
  const DataporteArr = {
    labels: labels,
    datasets: [
      // data: listComp .filter((x) => x.intitule === 'Compaction') .map((x) => x.isActive),
      {
        label: "Ouverture de la porte arrière",
        data: listComp
          .filter((x) => x.intitule === "Ouverture de la porte arrière")
          .map((x) => x.isActive),
        borderColor: "##01ff47",
        backgroundColor: "##01ff47",
        stepped: true,
        yAxisID: "y",
      },
    ],
  };

  const DataActivPomp = {
    labels: labels,
    datasets: [
      // data: listComp .filter((x) => x.intitule === 'Compaction') .map((x) => x.isActive),
      {
        label: "Activation de la pompe",
        data: listComp
          .filter((x) => x.intitule === "Activation de la pompe")
          .map((x) => x.isActive),
        borderColor: "#009688",
        backgroundColor: "#009688",
        stepped: true,
        yAxisID: "y",
      },
    ],
  };

  const DataLeveecaisson = {
    labels: labels,
    datasets: [
      // data: listComp .filter((x) => x.intitule === 'Compaction') .map((x) => x.isActive),
      {
        label: "Levée du caisson",
        data: listComp
          .filter((x) => x.intitule === "Levée du caisson")
          .map((x) => x.isActive),
        borderColor: "#00BCD4",
        backgroundColor: "#00BCD4",
        stepped: true,
        yAxisID: "y",
      },
    ],
  };
  const DataAspiraCentral = {
    labels: labels,
    datasets: [
      // data: listComp .filter((x) => x.intitule === 'Compaction') .map((x) => x.isActive),
      {
        label: "Aspirateur central",
        data: listComp
          .filter((x) => x.intitule === "Aspirateur central")
          .map((x) => x.isActive),
        borderColor: "#2196F3",
        backgroundColor: "#2196F3",
        stepped: true,
        yAxisID: "y",
      },
    ],
  };
  const DataBrossecentrale = {
    labels: labels,
    datasets: [
      // data: listComp .filter((x) => x.intitule === 'Compaction') .map((x) => x.isActive),
      {
        label: "Brosse centrale",
        data: listComp
          .filter((x) => x.intitule === "Brosse centrale")
          .map((x) => x.isActive),
        borderColor: "#3F51B5",
        backgroundColor: "#3F51B5",
        stepped: true,
        yAxisID: "y",
      },
    ],
  };

  // Karsher  Aspirateur gauche    Aspirateur droit    Aspirateur manuel arrière  Brosse gauche
  const DataKarsher = {
    labels: labels,
    datasets: [
      // data: listComp .filter((x) => x.intitule === 'Compaction') .map((x) => x.isActive),
      {
        label: "Karsher",
        data: listComp
          .filter((x) => x.intitule === "Karsher")
          .map((x) => x.isActive),
        borderColor: "#673AB7",
        backgroundColor: "#673AB7",
        stepped: true,
        yAxisID: "y",
      },
    ],
  };

  const DataAspirateurgauche = {
    labels: labels,
    datasets: [
      // data: listComp .filter((x) => x.intitule === 'Compaction') .map((x) => x.isActive),
      {
        label: "Aspirateur gauche",
        data: listComp
          .filter((x) => x.intitule === "Aspirateur gauche")
          .map((x) => x.isActive),
        borderColor: "#FF9800",
        backgroundColor: "#FF9800",
        stepped: true,
        yAxisID: "y",
      },
    ],
  };

  const DataAspirateurdroit = {
    labels: labels,
    datasets: [
      // data: listComp .filter((x) => x.intitule === 'Compaction') .map((x) => x.isActive),
      {
        label: "Aspirateur droit",
        data: listComp
          .filter((x) => x.intitule === "Aspirateur droit")
          .map((x) => x.isActive),
        borderColor: "#9C27B0",
        backgroundColor: "#9C27B0",
        stepped: true,
        yAxisID: "y",
      },
    ],
  };

  const DataAspirateurmanuelarr = {
    labels: labels,
    datasets: [
      // data: listComp .filter((x) => x.intitule === 'Compaction') .map((x) => x.isActive),
      {
        label: "Aspirateur manuel arrière",
        data: listComp
          .filter((x) => x.intitule === "Aspirateur manuel arrière")
          .map((x) => x.isActive),
        borderColor: "#00BCD4",
        backgroundColor: "#00BCD4",
        stepped: true,
        yAxisID: "y",
      },
    ],
  };

  const DataBrossegauche = {
    labels: labels,
    datasets: [
      // data: listComp .filter((x) => x.intitule === 'Compaction') .map((x) => x.isActive),
      {
        label: "Brosse gauche",
        data: listComp
          .filter((x) => x.intitule === "Brosse gauche")
          .map((x) => x.isActive),
        borderColor: "#F44336",
        backgroundColor: "#F44336",
        stepped: true,
        yAxisID: "y",
      },
    ],
  };

  const configKarsher = {
    type: "line",
    data: DataKarsher,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Stacked scales",
        },
      },      elements:{
            point:{
              radius:1,
              hoverRadius:2,
              borderWidth:1
            }
          },
      scales: {
        x: {
          parsing: false,
          type: "time",
          time: {
            unit: "minute",
            displayFormats: {
              minute: "HH:mm",
            },
          },
        },
        y: {
          type: "category",
          labels: ["ON", "OFF"],
          offset: true,
          position: "left",
          stack: "demo",
          stackWeight: 1,
          border: {
            color: "##ff00e4",
          },
        },
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: "x",
          },
          zoom: {
            animation: {
              duration: 0,
            },
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "x",
          },
        },
      },
    },
  };

  const configAspirateurdroit = {
    type: "line",
    data: DataAspirateurdroit,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Stacked scales",
        },
      },
      elements:{
        point:{
          radius:1,
          hoverRadius:2,
          borderWidth:1
        }
      },
      scales: {
        x: {
          parsing: false,
          type: "time",
          time: {
            unit: "minute",
            displayFormats: {
              minute: "HH:mm",
            },
          },
        },
        y: {
          type: "category",
          labels: ["ON", "OFF"],
          offset: true,
          position: "left",
          stack: "demo",
          stackWeight: 1,
          border: {
            color: "#F44336",
          },
        },
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: "x",
          },
          zoom: {
            animation: {
              duration: 0,
            },
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "x",
          },
        },
      },
    },
  };

  const configAspirateurgauche = {
    type: "line",
    data: DataAspirateurgauche,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Stacked scales",
        },
      },  elements:{
        point:{
          radius:1,
          hoverRadius:2,
          borderWidth:1
        }
      },
      scales: {
        x: {
          parsing: false,
          type: "time",
          time: {
            unit: "minute",
            displayFormats: {
              minute: "HH:mm",
            },
          },
        },
        y: {
          type: "category",
          labels: ["ON", "OFF"],
          offset: true,
          position: "left",
          stack: "demo",
          stackWeight: 1,
          border: {
            color: "#E91E63",
          },
        },
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: "x",
          },
          zoom: {
            animation: {
              duration: 0,
            },
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "x",
          },
        },
      },
    },
  };

  const configAspirateurmanuelarr = {
    type: "line",
    data: DataAspirateurmanuelarr,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Stacked scales",
        },
      },  elements:{
        point:{
          radius:1,
          hoverRadius:2,
          borderWidth:1
        }
      },
      scales: {
        x: {
          parsing: false,
          type: "time",
          time: {
            unit: "minute",
            displayFormats: {
              minute: "HH:mm",
            },
          },
        },
        y: {
          type: "category",
          labels: ["ON", "OFF"],
          offset: true,
          position: "left",
          stack: "demo",
          stackWeight: 1,
          border: {
            color: "#9C27B0",
          },
        },
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: "x",
          },
          zoom: {
            animation: {
              duration: 0,
            },
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "x",
          },
        },
      },
    },
  };

  const configBrossegauche = {
    type: "line",
    data: DataBrossegauche,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Stacked scales",
        },
      },  elements:{
        point:{
          radius:1,
          hoverRadius:2,
          borderWidth:1
        }
      },
      scales: {
        x: {
          parsing: false,
          type: "time",
          time: {
            unit: "minute",
            displayFormats: {
              minute: "HH:mm",
            },
          },
        },
        y: {
          type: "category",
          labels: ["ON", "OFF"],
          offset: true,
          position: "left",
          stack: "demo",
          stackWeight: 1,
          border: {
            color: "#673AB7",
          },
        },
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: "x",
          },
          zoom: {
            animation: {
              duration: 0,
            },
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "x",
          },
        },
      },
    },
  };

  const configCycleLC = {
    type: "line",
    data: DataCycleLC,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Stacked scales",
        },
      },  elements:{
        point:{
          radius:1,
          hoverRadius:2,
          borderWidth:1
        }
      },
      scales: {
        x: {
          parsing: false,
          type: "time",
          time: {
            unit: "minute",
            displayFormats: {
              minute: "HH:mm",
            },
          },
        },
        y: {
          type: "category",
          labels: ["ON", "OFF"],
          offset: true,
          position: "left",
          stack: "demo",
          stackWeight: 1,
          border: {
            color: "#673AB7",
          },
        },
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: "x",
          },
          zoom: {
            animation: {
              duration: 0,
            },
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "x",
          },
        },
      },
    },
  };
  const configComp = {
    type: "line",
    data: DataComp,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Stacked scales",
        },
      },  elements:{
        point:{
          radius:1,
          hoverRadius:2,
          borderWidth:1
        }
      },
      scales: {
        x: {
          parsing: false,
          type: "time",
          time: {
            unit: "minute",
            displayFormats: {
              minute: "HH:mm",
            },
          },
        },
        y: {
          type: "category",
          labels: ["ON", "OFF"],
          offset: true,
          position: "left",
          stack: "demo",
          stackWeight: 1,
          border: {
            color: "#00BCD4",
          },
        },
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: "x",
          },
          zoom: {
            animation: {
              duration: 0,
            },
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "x",
          },
        },
      },
    },
  };
  const configporteArr = {
    type: "line",
    data: DataporteArr,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Stacked scales",
        },
      },  elements:{
        point:{
          radius:1,
          hoverRadius:2,
          borderWidth:1
        }
      },
      scales: {
        x: {
          parsing: false,
          type: "time",
          time: {
            unit: "minute",
            displayFormats: {
              minute: "HH:mm",
            },
          },
        },
        y: {
          type: "category",
          labels: ["ON", "OFF"],
          offset: true,
          position: "left",
          stack: "demo",
          stackWeight: 1,
          border: {
            color: "#009688",
          },
        },
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: "x",
          },
          zoom: {
            animation: {
              duration: 0,
            },
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "x",
          },
        },
      },
    },
  };
  const configActivPomp = {
    type: "line",
    data: DataActivPomp,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Stacked scales",
        },
      },  elements:{
        point:{
          radius:1,
          hoverRadius:2,
          borderWidth:1
        }
      },
      scales: {
        x: {
          parsing: false,
          type: "time",
          time: {
            unit: "minute",
            displayFormats: {
              minute: "HH:mm",
            },
          },
        },
        y: {
          type: "category",
          labels: ["ON", "OFF"],
          offset: true,
          position: "left",
          stack: "demo",
          stackWeight: 1,
          border: {
            color: "#4CAF50",
          },
        },
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: "x",
          },
          zoom: {
            animation: {
              duration: 0,
            },
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "x",
          },
        },
      },
    },
  };

  const configBrossecentrale = {
    type: "line",
    data: DataBrossecentrale,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Stacked scales",
        },
      },  elements:{
        point:{
          radius:1,
          hoverRadius:2,
          borderWidth:1
        }
      },
      scales: {
        x: {
          parsing: false,
          type: "time",
          time: {
            unit: "minute",
            displayFormats: {
              minute: "HH:mm",
            },
          },
        },
        y: {
          type: "category",
          labels: ["ON", "OFF"],
          offset: true,
          position: "left",
          stack: "demo",
          stackWeight: 1,
          border: {
            color: "#FF9800",
          },
        },
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: "x",
          },
          zoom: {
            animation: {
              duration: 0,
            },
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "x",
          },
        },
      },
    },
  };
  const configAspiraCentral = {
    type: "line",
    data: DataAspiraCentral,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Stacked scales",
        },
      },  elements:{
        point:{
          radius:1,
          hoverRadius:2,
          borderWidth:1
        }
      },
      scales: {
        x: {
          parsing: false,
          type: "time",
          time: {
            unit: "minute",
            displayFormats: {
              minute: "HH:mm",
            },
          },
        },
        y: {
          type: "category",
          labels: ["ON", "OFF"],
          offset: true,
          position: "left",
          stack: "demo",
          stackWeight: 1,
          border: {
            color: "##ff00e4",
          },
        },
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: "x",
          },
          zoom: {
            animation: {
              duration: 0,
            },
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "x",
          },
        },
      },
    },
  };
  const configDataLeveecaisson = {
    type: "line",
    data: DataLeveecaisson,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Stacked scales",
        },
      },  elements:{
        point:{
          radius:1,
          hoverRadius:2,
          borderWidth:1
        }
      },
      scales: {
        x: {
          parsing: false,
          type: "time",
          time: {
            unit: "minute",
            displayFormats: {
              minute: "HH:mm",
            },
          },
        }, 
        y: {
        
          type: "category",
          labels: ["ON", "OFF"],
          offset: true,
          position: "left",
          stack: "demo",
          stackWeight: 1,
          border: {
            color: "##ff00e4",
          },
        },
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: "x",
          },
          zoom: {
            animation: {
              duration: 0,
            },
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "x",
          },
        },
      },
    },
  };


  const [size, setSize] = useState({ x: 400, y: 300 });

  const handler = (mouseDownEvent) => {
    const startSize = size;
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };
    
    function onMouseMove(mouseMoveEvent) {
      setSize(currentSize => ({ 
        // x: startSize.x + mouseMoveEvent.pageX - startPosition.x, 
        y: startSize.y - mouseMoveEvent.pageY + startPosition.y 
      }));
    }
    
    function onMouseUp() {
      document.body.removeEventListener("mousemove", onMouseMove);
    }
    
    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };

  useEffect(() => {
   console.log("dddfr" , DeviceId)
    setListCom([])
  }, [DeviceId]); 
  
  return ( 
    <>  
  {  DeviceId &&   <div className="charts" style={{height: size.y }}   >

   <button  className="buttondrag" onMouseDown={handler} style={{cursor:"grabbing"}} ><span  class="material-symbols-outlined">
drag_handle
</span> </button> 
<div className="navigbutton">  
  <button onClick={()=>{setSelctedButton('GRAPH')}}> GRAPH  </button>
  <button onClick={()=>{setSelctedButton('DONNEES')}}> DONNEES  </button>
  <button onClick={()=>{setSelctedButton('SHIFTS')}}> SHIFTS  </button>
  <button onClick={()=>{setSelctedButton('BACS')}}> BACS  </button>
  
   </div>
  { <div style={GRAPH === false ? {display:"none"} : {display:"grid"}}>   
      <div  className="chart">
        <Bar
          width={100}
          height={8}
          ref={chartrefbar}
          data={data}
          onClick={onClickb}
          options={{
            plugins: {
              annotation: {},
            },
            layout: {
              padding: 5,
            },
            scales: {
              x: {
                parsing: false,
                type: "time",
                time: {
                  unit: "minute",
                  displayFormats: {
                    minute: "HH:mm",
                  },
                },
              },
              y: {
                min: 0,
                max: 1,
                ticks: {
                  stepSize: 1,
                },
              },
            },
            title: {
              display: true,
              text: "Largest Cities in Massachusetts",
              fontSize: 25,
            },
            legend: {
              display: true,
              position: true,
              labels: {
                fontColor: "#000",
              },
            },
            plugins: {
              zoom: {
                pan: {
                  enabled: true,
                  mode: "x",
                },
                zoom: {
                  animation: {
                    duration: 0,
                  },
                  wheel: {
                    enabled: true,
                  },
                  pinch: {
                    enabled: true,
                  },
                  mode: "x",
                },
              },
            },
          }}
        />
      </div>

      <Line 
        width={100}
        height={8}
        ref={chartref}
        data={dataLine}
        onClick={onClick}
        options={{
          plugins: {
            annotation: {}, 
          },
          elements:{
            point:{
              radius:1,
              hoverRadius:2,
              borderWidth:1
            }
          },

          scales: {
            x: {
              parsing: false,
              type: "time",
              time: {
                unit: "minute",
                displayFormats: {
                  minute: "HH:mm",
                },
              },
            },

            y: {
              min: 0,
              ticks: {
                stepSize: 1,
              },
            },
          },
          title: {
            display: true,
            text: "Largest Cities in Massachusetts",
            fontSize: 25,
          },
          legend: {
            display: true,
            position: true,
            labels: {
              fontColor: "#000",
            },
          },
          plugins: {
            zoom: {
              pan: {
                enabled: true,
                mode: "x",
              },
              zoom: {
                animation: {
                  duration: 0,
                },
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: "x",
              },
            },
          },
        }}
      />

      {listcallcan.some(
        (item) => item.intitule === "Niveau d'eau de la citerne (Litres)"
      ) ? (
        <Line
          width={100}
          height={8}
          data={dataLineNveau}
          onClick={onClick}
          options={{
            plugins: {
              annotation: {},
            },
            elements:{
              point:{
                radius:1,
                hoverRadius:2,
                borderWidth:1
              }
            },
            scales: {
              x: {
                parsing: false,
                type: "time",
                time: {
                  unit: "minute",
                  displayFormats: {
                    minute: "HH:mm",
                  },
                },
              },
            },
            title: {
              display: true,
              text: "Niveau d'eau de la citerne (Litres)",
              fontSize: 25,
            },
            legend: {
              display: true,
              position: true,
              labels: {
                fontColor: "#000",
              },
            },
            plugins: {
              zoom: {
                pan: {
                  enabled: true,
                  mode: "x",
                },
                zoom: {
                  animation: {
                    duration: 0,
                  },
                  wheel: {
                    enabled: true,
                  },
                  pinch: {
                    enabled: true,
                  },
                  mode: "x",
                },
              },
            },
          }}
        />
      ) : null}

      {listComp.some((item) => item.intitule === "Compaction") ? (
        <Line
          width={100}
          height={8}
          data={configComp.data}
          options={configComp.options}
        />
          ) : null}

      {listComp.some((item) => item.intitule === "Cycle LC") ? (
        <Line
          width={100}
          height={8}
          data={configCycleLC.data}
          options={configCycleLC.options}
        />
      ) : null}

      {listComp.some(
        (item) => item.intitule === "Ouverture de la porte arrière"
      ) ? (
        <Line
          width={100}
          height={8}
          data={configporteArr.data}
          options={configporteArr.options}
        />
      ) : null}

      {listComp.some((item) => item.intitule === "Activation de la pompe") ? (
        <Line
          width={100}
          height={8}
          data={configActivPomp.data}
          options={configActivPomp.options}
        />
      ) : null}

      {listComp.some((item) => item.intitule === "Levée du caisson") ? (
        <Line
          width={100}
          height={8}
          data={configDataLeveecaisson.data}
          options={configDataLeveecaisson.options}
        />
      ) : null}

      {listComp.some((item) => item.intitule === "Aspirateur central") ? (
        <Line
          width={100}
          height={8}
          data={configAspiraCentral.data}
          options={configAspiraCentral.options}
        />
      ) : null}

      {listComp.some((item) => item.intitule === "Brosse centrale") ? (
        <Line
          width={100}
          height={8}
          data={configBrossecentrale.data}
          options={configBrossecentrale.options}
        />
      ) : null}

      {listComp.some((item) => item.intitule === "Karsher") ? (
        <Line
          width={100}
          height={8}
          data={configKarsher.data}
          options={configKarsher.options}
        />
      ) : null}

      {listComp.some((item) => item.intitule === "Aspirateur gauche") ? (
        <Line
          width={100}
          height={8}
          data={configAspirateurgauche.data}
          options={configAspirateurgauche.options}
        />
      ) : null}

      {listComp.some((item) => item.intitule === "Aspirateur droit") ? (
        <Line
          width={100}
          height={8}
          data={configAspirateurdroit.data}
          options={configAspirateurdroit.options}
        />
      ) : null}

      {listComp.some(
        (item) => item.intitule === "Aspirateur manuel arrière"
      ) ? (
        <Line
          width={100}
          height={8}
          data={configAspirateurmanuelarr.data}
          options={configAspirateurmanuelarr.options}
        />
      ) : null}

      {listComp.some((item) => item.intitule === "Brosse gauche") ? (
        <Line
          width={100}
          height={8}
          data={configBrossegauche.data}
          options={configBrossegauche.options}
        />
      ) : null}
</div>}

{DONNEES && <MaterialReactTable columns={columns} data={Data}  />}



</div>}
   
    </>
  );
}

export default DisplayChart;
