import React, { useRef, useEffect, useState, useContext } from "react";
import truck from "../../media/garbage-truck.svg";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { ContextID } from "../../Helper/ContextID";
const Map = () => {
  const { lat_lng, Setlat_lng } = useContext(ContextID);

  const center = {
    lat: 35.759465,
    lng: -5.833954,
  };



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

 
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    map.setZoom(15)
  }, []);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);


  useEffect(()=>{

    setDirectionsResponse();


    if (isLoaded) {

        if(lat_lng){
            for(let i =0 ; i< lat_lng.length; i++){
                const icons = {
                    url: "https://cdn-icons-png.flaticon.com/512/3256/3256319.png",
                    strokeColor: "#00ff4cd5",
                    scaledSize: { width: 32, height: 32 },
                    // rotation: [locations[i].heading],
                    anchor: new window.google.maps.Point(0, 0),
          
                    // rotation: x.heading,
                  };
                  let position = {
                    lat: lat_lng[i].lat,
                    lng: lat_lng[i].lng
                  };
                  setcurrnetposition({
                    lat: lat_lng[i].lat,
                    lng: lat_lng[i].lng
                  })
                  sethascurrnetposition(true)
          
                  const marker = new window.google.maps.Marker({
                    position:position ,
                    icon: icons,
                  });
                  markers.push(marker)
                  setmarkers((current) => [...current, marker]);
          
                  console.log("markers",position)
              
            }
        }
        
     
         
    
      }

  },[lat_lng])


 

  return (
    <>
      <div className="mapdiv">
      {isLoaded ? (
        <GoogleMap
        //   azoom={11}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: true,
            streetViewControl: true,
            mapTypeControl: true,
            fullscreenControl: false,
          }}
          center={hascurrnetposition ? currnetposition : center}
          onUnmount={onUnmount}
          onLoad={onLoad}
        > 
           {markers &&
                markers.map((x) => (
                  <MarkerF position={x.position} icon={x.icon} />
                ))}
        
        
        </GoogleMap>
      ) : (
        <p>Please wait </p>
      )}
      </div>
    </>
  );
};

export default Map;
