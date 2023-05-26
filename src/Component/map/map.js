import React, { useRef, useEffect, useState, useContext } from "react";
import truck from "../../media/garbage-truck.svg";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  Autocomplete,
  DirectionsRenderer,
  Polygon,
} from "@react-google-maps/api";
import { ContextID } from "../../Helper/ContextID";
import useFetch from "../../Hook/UseFetch";
import "./map.css";
const Map = () => {
  const { lat_lng, Setlat_lng } = useContext(ContextID);
  const { ContextShowtTee, SetContextShowtTree } = useContext(ContextID);
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

  const [poly, setpoly] = useState(false);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [triangleCoords1, setTriangleCoords1] = useState();
  const [zoomy ,setzoomy] = useState(7)
  const { SelectedRadioValue, setSelectedRadioValue } = useContext(ContextID);

  const ff = [
    { lat: 25.774, lng: -80.19 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 },
    { lat: 25.774, lng: -80.19 },
  ];


  const {
    Data: tangerPolygon,
    ispending,
    errormsg,
    counter,
  } = useFetch("http://tanger.geodaki.com:3000/rpc/polygons");
  const polygonCoords1 = [];
  const polygonCoords2 = [];

  useEffect(() => {
    console.log(zoomy)
    console.log("ContextShowtTee" ,ContextShowtTee)
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

  useEffect(() => {

    console.log("from map" ,SelectedRadioValue)
    setDirectionsResponse();
    // if(ContextShowtTee != undefined){
    //   setzoomy(15)
    //   console.log("5555555555555555555")
    // }
    setmarkers([]);
    if (isLoaded) {
      if (lat_lng) {
        console.log("lat_lng from map", lat_lng)
        for (let i = 0; i < lat_lng.length; i++) {
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
          });
          markers.push(marker);
          setmarkers((current) => [...current, marker]);
      
          // console.log("markers", markers);
        }
      }
    }
 
 
    console.log(zoomy)
   
  }, [lat_lng, ContextShowtTee ]);

  return (
    <>
      <div className="mapdiv">
        {isLoaded ? (
          <GoogleMap
            // zoom={11}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: true,
              streetViewControl: true,
              mapTypeControl: true,
              fullscreenControl: false,
              zoom: 12,
            }}
            // center={hascurrnetposition ? currnetposition : center}
            onUnmount={onUnmount}
            onLoad={onLoad}
          >
            {markers &&
              markers.map((x) => (
                <MarkerF position={x.position} icon={x.icon} />
              ))}

            {poly &&
              triangleCoords1.map((x, index) => (
                <Polygon
                key={index}
                paths={x}
                options={{ strokeOpacity: 0.8, strokeColor: "red", fillColor:"transparent"}}

              />
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
