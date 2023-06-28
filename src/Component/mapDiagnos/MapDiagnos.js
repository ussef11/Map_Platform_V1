import "./MapDiagnos.css";
import React, {
  useRef,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import truck from "../../media/images/garbage-truck.svg";
import {
  MarkerClusterer,
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
// import { MarkerClusterer } from "@googlemaps/markerclusterer";
import CustomMarker from "./CustomMarker";
import { ContextID } from "../../Helper/ContextID";
import useFetch from "../../Hook/UseFetch";
import { v4 as uuidv4 } from "uuid";

const MapDiagnos = () => {
  const { DeviceId, setDeviceId } = useContext(ContextID);

  const [poly, setpoly] = useState(false);
  const [triangleCoords1, setTriangleCoords1] = useState();
  const { ContextShowtTee, SetContextShowtTree } = useContext(ContextID);
  const { lat_lng, Setlat_lng } = useContext(ContextID);
  const [ShowPloyLine, setShowPloyLine] = useState(false);
  const { startDate, setStartDate } = useContext(ContextID);
  const { startTime, setStartTime } = useContext(ContextID);
  const { endDate, setEndDate } = useContext(ContextID);
  const { endTime, setEndTime } = useContext(ContextID);
  const { ActionDiag, setActionDiag } = useContext(ContextID);
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

  const [crth, setCrth] = useState(false);
  const [point, setpoint] = useState(false);
  // const [cancel , setcancel] = useState(false);
  const [showbacs, sethowbacs] = useState(false);
  const [crEncour, setcrEncour] = useState(true);
  

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onLoad = useCallback(function callback(map) {

    setMap(map)

  }, []);

  useEffect(() => {
    console.log("lDeviceId", DeviceId);
  }, [DeviceId]);

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
  }, [ContextShowtTee, tangerPolygon]);

  const [showCercuitTeorique, setshowCercuitTeorique] = useState();

  const [polyLines, setPolyLine] = useState([]);

  async function showPolyLine(url) {
    setPolyLine([]);
    try {
      const response = await fetch(url);
      const result = await response.json();
      //  let res1 = [result[0]]
      result.forEach((polygon) => {
        const coordinates = polygon.geom
          .replace("MULTILINESTRING((", "")
          .replace("))", "");
        const pairs = coordinates.split("),(");

        const coordinatesArray = pairs.map((pair) => {
          const coordinates = pair.replace("(", "").replace(")", "").split(",");
          return coordinates.map((coord) => {
            const [lng, lat] = coord.trim().split(" ");
            return { lat: parseFloat(lat), lng: parseFloat(lng) };
          });
        });

        setPolyLine((current) => [...current, coordinatesArray]);
        console.log("coordinatesArray", polyLines);
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    if (crth) {
      showPolyLine(
        `http://tanger.geodaki.com:3000/rpc/circuit_by_deviceid?ids={${DeviceId}}`
      );
    }
  }, [DeviceId, ActionDiag, crth]);

  const host = process.env.REACT_APP_HOST;

  const [Markers, setmarkers] = useState([]);
  const [Data, setData] = useState();
  const [Databacs, setDatabacs] = useState([]);
  const [CurrentPos , setCurrentPos] = useState([])


  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (id) => {
    if (id === activeMarker) {
      return;
    }
    setActiveMarker(id);
  };

  useEffect(() => {
    setDatabacs([])
    setData([])
    setmarkers([])
    setCurrentPos([])
    const fetchData = async () => {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      try {
        if (DeviceId) {
          let res = await fetch(
            `http://tanger.geodaki.com:3000/rpc/data?idsdevice=${DeviceId}&dtb=${startDate}%20${startTime}:00&dtf=${endDate}%20${endTime}:00`,
            requestOptions
          );
          let result = await res.json();
          if (crEncour) {
            setData(result.map((x) => ({ lat: x.lat, lng: x.lon })));
          }

          let resbacs = await fetch(
            `http://tanger.geodaki.com:3000/rpc/Bacs?dd=${startDate}%20${startTime}&df=${endDate}%20${endTime}:00&deviceid=${DeviceId}`
          )
          let resultbacs = await resbacs.json()


          let resCurrentpos =  await fetch(`http://tanger.geodaki.com:3000/rpc/tempsreel?ids={${DeviceId}}&uid=71`)
          let resultCurrentpos = await resCurrentpos.json()
       
          const icons = result.map((x) =>
            x.vitesse > 0 ? host + "/images/pt.svg" : host + "/images/ptr.svg"
          );

          if (point) {
            setDatabacs([])
            const markers = result.map((item, index) => {
              return new window.google.maps.Marker({
                position: { lat: item.lat, lng: item.lon },
                icon: {
                  url: icons[index],
                  scaledSize: { width: 30, height: 30 },
                  anchor: new window.google.maps.Point(0, 0),
                },
                key: index,
              });
            });

            setmarkers((current) => [...current, ...markers]);
          }
          if (showbacs) {
            setDatabacs([])
            const markers = resultbacs.map((item, index) => {
              return new window.google.maps.Marker({
                position: { lat: item.latitude, lng: item.longitude },
                icon: {
                  url: host + "/images/bacmetal_vert.png",
                  scaledSize: { width: 30, height: 30 },
                  anchor: new window.google.maps.Point(0, 0),
                },
                key: index,
              });
            });
            console.log(markers);
            setDatabacs((current) => [...current, ...markers]);
          }



          for (let i = 0; i < resultCurrentpos.length; i++) {
           console.log("ddeeee" , resultCurrentpos.length)
            let status = "vert";
            const icons = {
              url:
                host +
                `/images/${resultCurrentpos[i].typevehicule
                  .replaceAll(" ", "")
                  .toLowerCase()}-${status}.png`,
              strokeColor: "#00ff4cd5",
              scaledSize: { width: 32, height: 32 },
              anchor: new window.google.maps.Point(0, 0),
            };
  
            let position = {
              lat: resultCurrentpos[i].lat,
              lng: resultCurrentpos[i].lon,
            };   
            console.log("ddeeee" , position )    
            const marker = new window.google.maps.Marker({
              position: position,
              icon: icons,
              name: resultCurrentpos[i].name,
              id: resultCurrentpos[i].id,
              typevehicule: resultCurrentpos[i].typevehicule,
              lastupdate: resultCurrentpos[i].lastupdate,
              batterie: resultCurrentpos[i].batterie,
              vehicule: resultCurrentpos[i].vehicule,
              capteur: resultCurrentpos[i].capteur,
              immatriculation: resultCurrentpos[i].immatriculation,
              datems: resultCurrentpos[i].datems,
              lastacc: resultCurrentpos[i].lastacc,
              fonction: resultCurrentpos[i].fonction,
              marque: resultCurrentpos[i].marque,
              kilometrage: resultCurrentpos[i].kilometrage,
              heures: resultCurrentpos[i].heures,
              consomation_total: resultCurrentpos[i].consomation_total,
              temp_refroi: resultCurrentpos[i].temp_refroi,
              last_capteurs: resultCurrentpos[i].last_capteurs,
              can_capteurs: resultCurrentpos[i].can_capteurs,
              nombre_bac: resultCurrentpos[i].nombre_bac,
              fin_rfid: resultCurrentpos[i].fin_rfid,
              debut_rfid: resultCurrentpos[i].debut_rfid,
              vitesse: resultCurrentpos[i].vitesse,
            });
            setCurrentPos((current) => [...current, marker]);
          }



        }
      } catch (error) {
        console.log("error", error);
      }



    };

    fetchData();
  }, [
    startDate,
    startTime,
    endDate,
    endTime,
    DeviceId,
    ActionDiag,
    point,
    crEncour,
    showbacs
  ]);

  
  useEffect(() => {
    if (ActionDiag === "cancel") {
      setmarkers([]);
      setPolyLine([]);
      setData([]);
      setCrth(false);
      setpoint(false);
      sethowbacs(false);
      setcrEncour(false);
    } else if (ActionDiag === "Displaypoint") {
      setpoint(true);
    } else if (ActionDiag === "showbacs") {
      
      sethowbacs(true);
    } else if (ActionDiag === "circuitth") {
      setCrth(true);
    }

    console.log(ActionDiag, "ActionDiag");
  }, [ActionDiag]);

  const colors = ["#8200ff", "#835600", "green", "yellow"];







  
  // const [toggle, setToggle] = useState(false);

  // React.useEffect(() => {
  //   if (map) {
  //     // map.panTo(...)
  //     mapFitBounds();
  //   }
  // }, [map]);

  // function mapFitBounds() {
  //   // console.log("mapFitBounds:map> ", map);
  //   if (!map) return;

  //   const bounds = new window.google.maps.LatLngBounds();
  //   Databacs.map((x) => {
  //     bounds.extend(new window.google.maps.LatLng(x.position));
  //   });

  //   map.fitBounds(bounds);
  // }

  return (
    <>
      <div className="mapdivdiag">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: true,
              streetViewControl: true,
              mapTypeControl: true,
              fullscreenControl: false,
              zoom: 11,
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

            {crth &&
              polyLines.map((array, index) => (
                <React.Fragment key={index}>
                  {array.map((x, subIndex) => (
                    <Polyline
                      key={`${index}-${subIndex}`}
                      path={x}
                      geodesic={true}
                      options={{
                        strokeColor: colors[index % colors.length],

                        strokeOpacity: 2.0,
                        strokeWeight: 4,
                      }}
                    />
                  ))}
                </React.Fragment>
              ))}

            {crEncour && (
              <Polyline
                path={Data}
                geodesic={true}
                options={{
                  strokeColor: "green",
                  strokeOpacity: 2.0,
                  strokeWeight: 4,
                }}
              />
            )}

            {point &&
              Markers &&
              Markers.map((x, index) => (
                <Marker
                  position={x.position}
                  icon={x.icon}
                  key={index}
                 
                ></Marker>
              ))}

{showbacs && Databacs && (
<MarkerClusterer  options={{ minimumClusterSize: 5 }}>
          {clusterer =>
            Databacs.map( (x , index) => (
              <CustomMarker
                position={x.position}
                icon={x.icon}
                key={index}
                clusterer={clusterer}
                draggable={true}
              />
            ))
          }
        </MarkerClusterer>
 )}

{CurrentPos &&
              CurrentPos.map((x, index) => (
                <Marker
                  position={x.position}
                  icon={x.icon}
                  key={index}
                  onClick={() => {
                    handleActiveMarker(index);
                  }}
                >
                  {activeMarker === index ? (
                    <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                      <div>
                        <div style={{ textAlign: "left" }} className="labelDiv">
                          <div>
                            <span>N° Parc : </span>
                            {x.name}
                          </div>
                          <div>
                            <span>Type : </span>
                            {x.typevehicule}
                          </div>
                          <div>
                            <span>ID : </span>
                            {x.id}
                          </div>
                          <div>
                            <span>Conducteur : </span>
                          </div>
                          <div>
                            <span>DATE : </span>
                            {x.datems}
                          </div>
                          <div>
                            <span>BATTERIE : </span>
                            {x.batterie}
                          </div>
                          {x.marque && (
                            <div>
                              <span>Marque : </span>
                              {x.marque}
                            </div>
                          )}

                          {x.kilometrage && (
                            <div>
                              <span>kilométrage : </span>
                              {x.kilometrage}
                            </div>
                          )}

                          {x.heures && (
                            <div>
                              <span>Nombre Heure : </span>
                              {x.heures}
                            </div>
                          )}

                          {
                            <div>
                              <span>Vitesse : </span>
                              {x.vitesse}
                            </div>
                          }
                          {x.datems && (
                            <div>
                              <span>Date mise en services : </span>
                              {x.datems}
                            </div>
                          )}
                        </div>
                        <div className="borderDiv"></div>
                      </div>
                    </InfoWindow>
                  ) : null}
                </Marker>
              ))}
              
          </GoogleMap>
        ) : (
          <p> Please wait </p>
        )}
      </div>
    </>
  );
};

export default MapDiagnos;
