import React, { useRef, useEffect, useState, useContext } from "react";
import truck from "../../media/garbage-truck.svg";
import {
  Marker,
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  Autocomplete,
  DirectionsRenderer,
  Polygon,
  Polyline,
  InfoWindow,
} from "@react-google-maps/api";
import { ContextID } from "../../Helper/ContextID";
import useFetch from "../../Hook/UseFetch";
import "./map.css";
import CHARIOT from '../../media/bacmetal_vert.png'
import moto from '../../media/motoGreen.png'




const Map = () => {
  const { lat_lng, Setlat_lng } = useContext(ContextID);
  const { ContextShowtTee, SetContextShowtTree } = useContext(ContextID);
  const { SelectedRadioTree, setSelectedRadioTree } = useContext(ContextID);
  const center = {
    lat: 35.759465,
    lng: -5.833954,
  };


  
//  const [dtest , setdtest] = useState(false)
//   useEffect(() => { 
// if(lat_lng){
//   console.log("Updated lat_lng:", lat_lng);
// }else{
//   console.log("none")
// }
//   }, [dtest]);
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setdtest((prevTest) => {
//         const updatedTest = !prevTest;
//         console.log(updatedTest);
//         return updatedTest;
//       });
//     }, 5000);
//     return () => clearInterval(intervalId); // Cleanup the interval on component unmount
//   }, [])


  const [currnetposition, setcurrnetposition] = useState();
  const [hascurrnetposition, sethascurrnetposition] = useState(false);
  const [markers, setmarkers] = useState([]);
  const [DirectionsResponse, setDirectionsResponse] = useState();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDYnXGg1sTZkCxqhO6Kf0eU64OqnyEVpMM",
    libraries: ["places"],
    region: "MA",
  });

  const [poly, setpoly] = useState(false);
  const [ShowPloyLine, setShowPloyLine] = useState(false);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [triangleCoords1, setTriangleCoords1] = useState();
  const [zoomy, setzoomy] = useState(7);
  const { SelectedRadioValue, setSelectedRadioValue } = useContext(ContextID);



  const {
    Data: tangerPolygon,
    ispending,
    errormsg,
    counter,
  } = useFetch("http://tanger.geodaki.com:3000/rpc/polygons");
  const { Data: DevicePolyLine } = useFetch(
    "http://tanger.geodaki.com:3000/rpc/polygons"
  );
  const polyLine = [];
  const [polyLines, setPolyLine] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);





  const handleActiveMarker = (id) => {
    if (id === activeMarker) {
      return;
    }
    setActiveMarker(id);
  };
  let coordinatesArray
  async function showPolyLine(idDevice) {
    let response;
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    if (tangerPolygon) {
      try {
        response = await fetch(
          `http://tanger.geodaki.com:3000/rpc/circuit_by_id?idc={${idDevice}}`,
          requestOptions
        );

        const result = await response.json();
        // console.log("resultresultresult" ,result)

        result.forEach((polygon) => {
          const coordinates = polygon.geom
            .replace("MULTILINESTRING((", "")
            .replace("))", "");
            // coordinates.split("),(")
            // console.log("coordinates" ,coordinates )
          const pairs = coordinates.split("),(");
          const pairss = coordinates.split("),(");

           coordinatesArray = pairss.map((pair) => {
            const coordinates = pair.replace("(", "").replace(")", "").split(",");
            return coordinates.map((coord) => {
              const [lng, lat] = coord.trim().split(" ");
              return { lat: parseFloat(lat), lng: parseFloat(lng) };
            });
          });
        
          setPolyLine(coordinatesArray);
           console.log("coordinatesArray" ,coordinatesArray )






          pairs.forEach((pair) => {
          
            const [lng, lat] = pair.trim().split(" ");
            const parsedLat = parseFloat(lat);
            const parsedLng = parseFloat(lng);
            polyLine.push({ lat: parsedLat, lng: parsedLng });
            // setPolyLine([...polyLine]);
          });
        });
        console.log(polyLine)

      } catch (error) {
        console.log("error", error);
      }
    }
  }


  const [errMsg , SeterrMsg] = useState();
  const [showerrMsg , setshowerrMsg] = useState(false)
  useEffect(() => {
    setPolyLine([])
    if (SelectedRadioValue == "circuit") {
      if (SelectedRadioTree) {
        try{
          console.log(  "SelectedRadioTreeSelectedRadioTree",SelectedRadioTree);
          const id = SelectedRadioTree[0].id[0];
          setShowPloyLine(true);
          showPolyLine(id);
          setshowerrMsg(false)
        }catch(error){
          console.log(error)
          SeterrMsg("Sorry, Not Found !")
          setshowerrMsg(true)
         
        }
       
      }
    }setActiveMarker(null)
  }, [SelectedRadioTree]);

  useEffect(() => {
    setPolyLine();
    polyLine.push();
    setShowPloyLine(false);
  }, [SelectedRadioValue]);

  const polygonCoords1 = [];
  const polygonCoords2 = [];
  useEffect(() => {
    console.log(zoomy);
    console.log("ContextShowtTee", ContextShowtTee);
    if (tangerPolygon) {
      tangerPolygon.forEach((polygon) => {
        const coordinates = polygon.geom
          .replace("MULTIPOLYGON(((", "")
          .replace(")))", "");
        const rings = coordinates.split("), (");

        rings.forEach((ring) => {
          const pairs = ring.split(",");
          const coords = [];

          pairs.forEach((pair) => {
            const [lng, lat] = pair.trim().split(" ");
            const parsedLat = parseFloat(lat);
            const parsedLng = parseFloat(lng);

            coords.push({ lat: parsedLat, lng: parsedLng });
          });

          if (polygon === tangerPolygon[0]) {
            polygonCoords1.push(coords);
          } else if (polygon === tangerPolygon[1]) {
            polygonCoords2.push(coords);
          }
          
        });
      });

      setTriangleCoords1([polygonCoords1, polygonCoords2]);
      setpoly(true);
    }
  }, [ContextShowtTee]);

  useEffect(() => {
    console.log("Updated Polygon 3:", triangleCoords1);
  }, [triangleCoords1]);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);

    map.fitBounds(bounds);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

const [test , settest] = useState(false)



  useEffect(() => {
    setDirectionsResponse();

    setmarkers([]);
    if (isLoaded) {
      if (lat_lng) {
        // console.log("lat_lng Feom MAppp", lat_lng);
        for (let i = 0; i < lat_lng.length; i++) {

            // console.log( "lat_lng from map" ,lat_lng)
            const icons = {
            url: lat_lng[i].vehicule === "CHARIOT"
            ? "https://cdn-icons-png.flaticon.com/512/3264/3264042.png"
            : lat_lng[i].vehicule === "MOTO"
            ? moto
            : lat_lng[i].vehicule === "CAMION"
            ? "https://cdn-icons-png.flaticon.com/512/3256/3256319.png"
            : lat_lng[i].vehicule === "VOITURE" ? "https://cdn-icons-png.flaticon.com/512/575/575703.png"
            : null,
            strokeColor: "#00ff4cd5",
            scaledSize: { width: 32, height: 32 },     
            anchor: new window.google.maps.Point(0, 0)
          };
      
          let position = {
            lat: lat_lng[i].lat,
            lng: lat_lng[i].lng,
          };
          setcurrnetposition({
            lat: lat_lng[i].lat,
            lng: lat_lng[i].lng,
          });
          sethascurrnetposition(true);

          const marker = new window.google.maps.Marker({
            position: position,
            icon: icons,
            name: lat_lng[i].name,
            id: lat_lng[i].id,
            typevehicule: lat_lng[i].typevehicule,
            lastupdate: lat_lng[i].lastupdate,
            batterie: lat_lng[i].batterie,
            vehicule: lat_lng[i].vehicule,
            capteur: lat_lng[i].capteur,
            immatriculation: lat_lng[i].immatriculation,
            datems: lat_lng[i].datems,
            lastacc: lat_lng[i].lastacc,
            fonction: lat_lng[i].fonction,
          });
      
          setmarkers((current) => [...current, marker]);
        }  
      }
    }
    console.log("markers", markers);
  }, [lat_lng, ContextShowtTee ]);



  return (
    <>
      <div className="mapdiv">
        { showerrMsg && <div className="errMsg">
        <p>{errMsg}</p>  
        </div>}
        {/* <button onClick={()=>{settest(!test)}}>Test</button> */}
        {isLoaded ? (
          <GoogleMap
            // zoom={11}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: true,
              streetViewControl: true,
              mapTypeControl: true,
              fullscreenControl: false,
              //  zoom: 12,
            }}
            // center={hascurrnetposition ? currnetposition : center}
            onUnmount={onUnmount}
            onLoad={onLoad}
          >
            {markers &&
              markers.map((x, index) => (
                <Marker
                  position={x.position}
                  icon={x.icon}
                  key={index}
                  onClick={() => {
                    handleActiveMarker(index);
                  }}
                >
                  { activeMarker === index ? (
                    <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                      <div>
                        <div className="labelDiv">
                          <div>
                            
                            <span>N° Parc : </span>
                            {x.name}
                          </div>
                          <div>
                            
                            <span>Type :  </span>{x.typevehicule}
                          </div>
                          <div>
                            
                            <span>Conducteur : </span>
                          </div>
                        </div>
                        <div className="borderDiv">

                        </div>
                      </div>
                    </InfoWindow>
                  ) : null}
                </Marker>
              ))}

            {poly &&
              triangleCoords1.map((x, index) => (
                <Polygon
                  key={index}
                  paths={x}
                  options={{
                    strokeOpacity: 0.8,
                    strokeColor: "red",
                    fillColor: "transparent",
                  }}
                />
              ))}

            {
            
            polyLines && (
             polyLines.map((x , index)=>(       
              <Polyline
              key={index}
              path={x}
              geodesic={true}
              options={{
                strokeColor: "blue",
                strokeOpacity: 1.0,
                strokeWeight: 2,
              }}
            />
             ))
              
            
            
            )}
          </GoogleMap>
        ) : (
          <p>Please wait </p>
        )}
      </div>
    </>
  );
};

export default Map;
