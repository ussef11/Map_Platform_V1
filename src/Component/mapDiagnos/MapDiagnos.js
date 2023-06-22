import "./MapDiagnos.css"
import React, {
  useRef,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import truck from "../../media/images/garbage-truck.svg";
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
const MapDiagnos = () => {
  const {DeviceId , setDeviceId} = useContext(ContextID);

  const [poly, setpoly] = useState(false);
  const [triangleCoords1, setTriangleCoords1] = useState();
  const { ContextShowtTee, SetContextShowtTree } = useContext(ContextID);
  const { lat_lng, Setlat_lng } = useContext(ContextID);

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [libraries] = useState(["places"]);
  const [position, setPosition] = useState({
    lat: 35.759465,
    lng: -5.833954,
  });
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB-dn4yi8nZ8f8lMfQZNZ8AmEEVT07DEcE",
    libraries,
    region: "MA",
  });
  

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onLoad = useCallback(
    function callback(map) {

    },
    []
  );


  useEffect(()=>{
    console.log( "lDeviceId", DeviceId)
  },[DeviceId])

  const {
    Data: tangerPolygon,
    ispending,
    errormsg,
    counter,
  } = useFetch("http://tanger.geodaki.com:3000/rpc/polygons");

  const polygonCoords1 = [];
  const polygonCoords2 = [];
  useEffect(() => {
    // console.log("ContextShowtTee", ContextShowtTee);
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
  }, [ContextShowtTee ,tangerPolygon]);

  return (
    <>
    <div  className="mapdivdiag">
      
      {isLoaded ? (
        <GoogleMap 
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: true,
            streetViewControl: true,
            mapTypeControl: true,
            fullscreenControl: false,

            zoom:11   
          }}
          center={position}
          onUnmount={onUnmount}
          onLoad={onLoad}
        >
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
        </GoogleMap>
      ) : (
        <p> Please wait </p>
      )}
    </div>
  </>
  )
}

export default MapDiagnos