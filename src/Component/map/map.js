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
import "./map.css";

const Map = () => {
  const { lat_lng, Setlat_lng } = useContext(ContextID);
  const { ContextShowtTee, SetContextShowtTree } = useContext(ContextID);
  const { SelectedRadioTree, setSelectedRadioTree } = useContext(ContextID);
  const { displaybacs, setdisplaybacs } = useContext(ContextID);
  const { SelectedValueTreeNointerval, setSelectedValueTreeNointerval } =
    useContext(ContextID);
  let center = {
    lat: 35.759465,
    lng: -5.833954,
  };
  const host = process.env.REACT_APP_HOST;
  const [currnetposition, setcurrnetposition] = useState();
  const [hascurrnetposition, sethascurrnetposition] = useState(false);
  const [markers, setmarkers] = useState([]);
  const [DirectionsResponse, setDirectionsResponse] = useState();
  const [libraries] = useState(["places"]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB-dn4yi8nZ8f8lMfQZNZ8AmEEVT07DEcE",
    libraries,
    region: "MA",
  });

  const [poly, setpoly] = useState(false);
  const [ShowPloyLine, setShowPloyLine] = useState(false);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [triangleCoords1, setTriangleCoords1] = useState();
  const [zoomy, setzoomy] = useState(12);
  const { SelectedRadioValue, setSelectedRadioValue } = useContext(ContextID);
  const { IdMark, setIdMark } = useContext(ContextID);

  const [mycenterlng, setmycenterlng] = useState(-5.833954);
  const [mycenterlat, setmycenterlat] = useState(35.759465);

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
  const [polyLinesBacs, setPolyLineBacs] = useState([]);
  const [polyLines, setPolyLine] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (id) => {
    if (id === activeMarker) {
      return;
    }
    setActiveMarker(id);
  };
  let coordinatesArray;
  async function showPolyLineBacs(url) {
    let response;
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      response = await fetch(url, requestOptions);

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

        setPolyLineBacs(coordinatesArray);
        // console.log("coordinatesArray", coordinatesArray);

        pairs.forEach((pair) => {
          const [lng, lat] = pair.trim().split(" ");
          const parsedLat = parseFloat(lat);
          const parsedLng = parseFloat(lng);
          polyLine.push({ lat: parsedLat, lng: parsedLng });
          // setPolyLine([...polyLine]);
        });
      });
      // console.log( "polyLine",polyLine);
    } catch (error) {
      console.log("error", error);
    }
  }

  async function showPolyLine(url) {
    let response;
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      response = await fetch(url, requestOptions);

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
        // console.log("coordinatesArray", coordinatesArray);

        pairs.forEach((pair) => {
          const [lng, lat] = pair.trim().split(" ");
          const parsedLat = parseFloat(lat);
          const parsedLng = parseFloat(lng);
          polyLine.push({ lat: parsedLat, lng: parsedLng });
          // setPolyLine([...polyLine]);
        });
      });
      // console.log( "polyLine",polyLine);
    } catch (error) {
      console.log("error", error);
    }
  }

  const [errMsg, SeterrMsg] = useState();
  const [showerrMsg, setshowerrMsg] = useState(false);
  useEffect(() => {
    setPolyLine([]);
    if (SelectedRadioValue == "circuit") {
      if (SelectedRadioTree) {
        try {
          // console.log("SelectedRadioTreeSelectedRadioTree", SelectedRadioTree);
          const id = SelectedRadioTree[0].id[0];
          setShowPloyLine(true);

          showPolyLine(
            `http://tanger.geodaki.com:3000/rpc/circuit_by_id?idc={${id}}`
          );

          setshowerrMsg(false);
        } catch (error) {
          console.log(error);
          SeterrMsg("Sorry, Not Found !");
          setshowerrMsg(true);
        }
      }
    }
    setActiveMarker(null);
  }, [SelectedRadioTree]);

  useEffect(() => {
    // setmycenterlng(-5.833954);
    // setmycenterlat(35.759465);
  }, [ContextShowtTee]);
  useEffect(() => {
    // console.log("SelectedRadioTree1", zoomy);
  }, [SelectedRadioTree]);

  useEffect(() => {
    setPolyLine();
    polyLine.push();
    setShowPloyLine(false);
    setshowerrMsg(false);
    setdefaultzoom(true)
  }, [SelectedRadioValue]);

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
  }, [ContextShowtTee]);

  useEffect(() => {
    // console.log("Updated Polygon 3:", triangleCoords1);
  }, [triangleCoords1]);

 

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const [test, settest] = useState(false);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  //Display Bacs
  const [currentTimeB, setCurrentTimeB] = useState(new Date());

  const [markersBacs, setmarkersBacs] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimeB(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    setPolyLineBacs([]);
    setmarkersBacs([]);
    if (isLoaded) {
      const fetchData = async () => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };
        try {
          let response = await fetch(
            `http://tanger.geodaki.com:3000/rpc/bacs?uid=71`,
            requestOptions
          );
          const result = await response.json();

          for (let i = 0; i < result.length; i++) {
            const targetDateTime = new Date(result[i].lastudate);
            const timeDiff = Math.abs(targetDateTime - currentTimeB);
            const minutesDiff = Math.floor(timeDiff / (1000 * 60));
            let status = "rouge";

            if (minutesDiff < 60 * 24) {
              status = "vert";
            } else {
              status = "rouge";
            }

            let position = {
              lat: result[i].latitude,
              lng: result[i].longitude,
            };
            const marker = new window.google.maps.Marker({
              position: position,
              icon:
                host +
                `/images/${result[i].typebac
                  .replaceAll(" ", "")
                  .toLowerCase()}_${status}.png`,
            });
            setmarkersBacs((current) => [...current, marker]);
          }
        } catch (error) {
          console.log("error", error);
        }
      };
      let id;
      if (lat_lng) {
        for (let i = 0; i < lat_lng.length; i++) {
          // console.log("idbacs", lat_lng[i].id)
          id = lat_lng[i].id;
        }
      }

      if (displaybacs) {
        showPolyLineBacs(
          `http://tanger.geodaki.com:3000/rpc/circuit_by_deviceid?ids={${id}}`
        );
        fetchData();
      } else {
        //setPolyLineBacs([])
        setmarkersBacs([]);
      }

      // const intervalCall = setInterval(fetchData, 5000);
      // return () => {
      //   clearInterval(intervalCall);
      // };
    }
    // console.log("drrrr", displaybacs);
  }, [displaybacs, SelectedValueTreeNointerval, IdMark]);

  const [defaultzoom, setdefaultzoom] = useState(true);

  useEffect(() => {
    setDirectionsResponse();

    setmarkers([]);
    if (isLoaded) {
      if (lat_lng) {
        // console.log("lat_lng Feom MAppp", lat_lng);
        for (let i = 0; i < lat_lng.length; i++) {
          const targetDateTime = new Date(lat_lng[i].lastupdate);
          const timeDiff = Math.abs(targetDateTime - currentTime);
          const minutesDiff = Math.floor(timeDiff / (1000 * 60));
          const secondsDiff = Math.floor((timeDiff % (1000 * 60)) / 1000);
          let status = "rouge";
          // console.log("timeDiff" , minutesDiff)
          if (minutesDiff < 60) {
            if (lat_lng[i].vehicule == "CHARIOT") status = "vert";
            else {
              if (lat_lng[i].lastacc == 1) status = "vert";
              else status = "orange";
            }
          } else if (minutesDiff > 60 && minutesDiff < 24 * 60) {
            status = "orange";
          } else {
            status = "rouge";
          }

          // console.log(
          //   "status",
          //   host +
          //     `/images/${lat_lng[i].typevehicule.replaceAll(" ","").toLowerCase()}-${status}.png`
          // );

          const icons = {
            url:
              host +
              `/images/${lat_lng[i].typevehicule
                .replaceAll(" ", "")
                .toLowerCase()}-${status}.png`,
            strokeColor: "#00ff4cd5",
            scaledSize: { width: 32, height: 32 },
            anchor: new window.google.maps.Point(0, 0),
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
            marque: lat_lng[i].marque,
            kilometrage: lat_lng[i].kilometrage,
            heures: lat_lng[i].heures,
            consomation_total: lat_lng[i].consomation_total,
            temp_refroi: lat_lng[i].temp_refroi,
            last_capteurs: lat_lng[i].last_capteurs,
            can_capteurs: lat_lng[i].can_capteurs,
            nombre_bac: lat_lng[i].nombre_bac,
            fin_rfid: lat_lng[i].fin_rfid,
            debut_rfid: lat_lng[i].debut_rfid,
            vitesse: lat_lng[i].vitesse,
          });
          setmarkers((current) => [...current, marker]);
        }
      }
    }
  }, [lat_lng, ContextShowtTee, IdMark]);
  const [position, setPosition] = useState({
    lat: 35.759465,
    lng: -5.833954,
  });
  useEffect(() => {
    setPosition()
    const fetchData = async () => {
      setPosition()
      if (IdMark != null) {
        try {
          const response = await fetch(
            `http://tanger.geodaki.com:3000/rpc/tempsreel?ids={${IdMark}}&uid=71`
          );
          const result = await response.json();

          if (result && result.length > 0) {
            const { lat, lon } = result[0];
            setmycenterlat(lat);
            setmycenterlng(lon);
            const center = {
              lat: lat,
              lng: lon,
            };
            setPosition({
              lat: lat,
              lng: lon,
            });
            // console.log("position", position);
            // console.log("mycenterlng", mycenterlng);
            setdefaultzoom(false);
          
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    console.log("IdMark"  ,IdMark)

    fetchData();

    // setInterval(() => {
    //   fetchData();
    // }, 5000);
  }, [lat_lng, ContextShowtTee, IdMark]);

  const onLoad = useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(position);
      bounds.extend(new window.google.maps.LatLng(position));
      map.fitBounds(bounds);

     
    },
    [IdMark]
  );

  useEffect(() => {
    console.log("ContextShowtTee", SelectedRadioValue);
  }, [SelectedRadioValue]);

  return (
    <>
      <div className="mapdiv">
        {showerrMsg && (
          <div className="errMsg">
            <p>{errMsg}</p>
          </div>
        )}
        {/* <button onClick={()=>{settest(!test)}}>Test</button> */}
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: true,
              streetViewControl: true,
              mapTypeControl: true,
              fullscreenControl: false,

              zoom:
              IdMark === null ? null :
              SelectedRadioValue === "circuit" ?
                     null
                       : defaultzoom
                           ? 12
                              : 18,

              center: new window.google.maps.LatLng(position),
              
            }}
            center={position}
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

            {markersBacs &&
              markersBacs.map((x, index) => (
                <Marker
                  position={x.position}
                  icon={x.icon}
                  key={index}
                  draggable={true}
                ></Marker>
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

            {polyLines &&
              polyLines.map((x, index) => (
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
              ))}
            {polyLinesBacs &&
              polyLinesBacs.map((x, index) => (
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
