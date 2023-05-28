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
const Map = () => {
  const { lat_lng, Setlat_lng } = useContext(ContextID);
  const { ContextShowtTee, SetContextShowtTree } = useContext(ContextID);
  const { SelectedRadioTree, setSelectedRadioTree } = useContext(ContextID);
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
  const [ShowPloyLine, setShowPloyLine] = useState(false);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [triangleCoords1, setTriangleCoords1] = useState();
  const [zoomy, setzoomy] = useState(7);
  const { SelectedRadioValue, setSelectedRadioValue } = useContext(ContextID);

  const flightPlanCoordinates = [
    {
      lat: 35.7502616070876,
      lng: -5.82970094873974,
    },
    {
      lat: 35.7502390377015,
      lng: -5.82991832387148,
    },
    {
      lat: 35.7501934807445,
      lng: -5.83008038530147,
    },
    {
      lat: 35.7503334566237,
      lng: -5.83012011015489,
    },
    {
      lat: 35.7505541268715,
      lng: -5.83003617822698,
    },
    {
      lat: 35.7505584661004,
      lng: -5.83007751286686,
    },
    {
      lat: 35.7503075561489,
      lng: -5.83017040923693,
    },
    {
      lat: 35.7503077788953,
      lng: -5.83017259004864,
    },
    {
      lat: 35.7503099564394,
      lng: -5.83019390942133,
    },
    {
      lat: 35.7503176582334,
      lng: -5.83025151819294,
    },
    {
      lat: 35.7503627583346,
      lng: -5.8303899184599,
    },
    {
      lat: 35.7505209122104,
      lng: -5.83091034983272,
    },
    {
      lat: 35.7505943967141,
      lng: -5.83115934692626,
    },
    {
      lat: 35.7509622302228,
      lng: -5.83099892136306,
    },
    {
      lat: 35.7509693465581,
      lng: -5.83104073624094,
    },
    {
      lat: 35.7509488266315,
      lng: -5.83104986310563,
    },
    {
      lat: 35.7506069593438,
      lng: -5.83120191903328,
    },
    {
      lat: 35.7508233704022,
      lng: -5.83189079072736,
    },
    {
      lat: 35.7509450576683,
      lng: -5.83226681795924,
    },
    {
      lat: 35.7509456678814,
      lng: -5.83227014240025,
    },
    {
      lat: 35.7510728216535,
      lng: -5.83296287613575,
    },
    {
      lat: 35.7508413550445,
      lng: -5.83312486382135,
    },
    {
      lat: 35.7508069146075,
      lng: -5.83295283520511,
    },
    {
      lat: 35.7507934166829,
      lng: -5.83287631818746,
    },
    {
      lat: 35.7507676996697,
      lng: -5.83272608104375,
    },
    {
      lat: 35.7507498380769,
      lng: -5.83262520880571,
    },
    {
      lat: 35.7507132906859,
      lng: -5.83241880968029,
    },
    {
      lat: 35.7506957566039,
      lng: -5.83232146346472,
    },
    {
      lat: 35.7506645762092,
      lng: -5.83215826888897,
    },
    {
      lat: 35.7506615562858,
      lng: -5.83214246510266,
    },
    {
      lat: 35.7506280304593,
      lng: -5.8320301721547,
    },
    {
      lat: 35.7506190687151,
      lng: -5.8320344556256,
    },
    {
      lat: 35.7506523049599,
      lng: -5.83214426104877,
    },
    {
      lat: 35.750654399481,
      lng: -5.83215918170083,
    },
    {
      lat: 35.750688172621,
      lng: -5.83232161455084,
    },
    {
      lat: 35.7507035771084,
      lng: -5.83241817296027,
    },
    {
      lat: 35.7507857245144,
      lng: -5.83289461185723,
    },
    {
      lat: 35.7507919121171,
      lng: -5.83293049874345,
    },
    {
      lat: 35.7504693837551,
      lng: -5.83270489391566,
    },
    {
      lat: 35.7504440075849,
      lng: -5.83260792181807,
    },
    {
      lat: 35.7504329225414,
      lng: -5.83248805028325,
    },
    {
      lat: 35.750430212884,
      lng: -5.83245874587436,
    },
    {
      lat: 35.7503951663039,
      lng: -5.83231921156232,
    },
    {
      lat: 35.7504110959953,
      lng: -5.83225020208511,
    },
    {
      lat: 35.7504324333103,
      lng: -5.8321577688659,
    },
    {
      lat: 35.7504472064734,
      lng: -5.83209377220976,
    },
    {
      lat: 35.7504915763252,
      lng: -5.83201622816637,
    },
    {
      lat: 35.7504631541512,
      lng: -5.83199309940198,
    },
    {
      lat: 35.7503651010686,
      lng: -5.83187974975061,
    },
    {
      lat: 35.75025680292,
      lng: -5.83175703755194,
    },
    {
      lat: 35.7501556831383,
      lng: -5.83164245913213,
    },
    {
      lat: 35.7500525452888,
      lng: -5.83211789832228,
    },
    {
      lat: 35.750188877115,
      lng: -5.83219610696472,
    },
    {
      lat: 35.750095000484,
      lng: -5.83242704747022,
    },
    {
      lat: 35.7500903635794,
      lng: -5.83242372807257,
    },
    {
      lat: 35.7501817230081,
      lng: -5.83220016740376,
    },
    {
      lat: 35.750043975649,
      lng: -5.83212425383118,
    },
    {
      lat: 35.7500466223539,
      lng: -5.83211001216728,
    },
    {
      lat: 35.7500516050766,
      lng: -5.83208035340278,
    },
    {
      lat: 35.750083704999,
      lng: -5.83188928436294,
    },
    {
      lat: 35.7498176297798,
      lng: -5.83177518467699,
    },
    {
      lat: 35.7497237792291,
      lng: -5.83196844089076,
    },
    {
      lat: 35.7498099297845,
      lng: -5.83201441962973,
    },
    {
      lat: 35.7497663297524,
      lng: -5.83225551977637,
    },
    {
      lat: 35.7497616613716,
      lng: -5.83225428950379,
    },
    {
      lat: 35.7498053621278,
      lng: -5.8320176994572,
    },
    {
      lat: 35.749710829891,
      lng: -5.83197421993424,
    },
    {
      lat: 35.7497571504169,
      lng: -5.83188043372933,
    },
    {
      lat: 35.7499027542087,
      lng: -5.83158562647543,
    },
    {
      lat: 35.7497973122962,
      lng: -5.83157851373738,
    },
    {
      lat: 35.7497315457743,
      lng: -5.8315737949946,
    },
    {
      lat: 35.7496145035065,
      lng: -5.83156822909046,
    },
    {
      lat: 35.749619405711,
      lng: -5.83155615928928,
    },
    {
      lat: 35.7497144109913,
      lng: -5.83156337455006,
    },
    {
      lat: 35.7499067957621,
      lng: -5.83157744354412,
    },
    {
      lat: 35.7500200033206,
      lng: -5.83158476222695,
    },
    {
      lat: 35.7500796571505,
      lng: -5.83158977774599,
    },
    {
      lat: 35.7501171777656,
      lng: -5.83159986724002,
    },
    {
      lat: 35.7501519761328,
      lng: -5.83162996664959,
    },
    {
      lat: 35.7502284589763,
      lng: -5.83170770404723,
    },
    {
      lat: 35.7503676524553,
      lng: -5.83186334656705,
    },
    {
      lat: 35.7503715375165,
      lng: -5.83186769074126,
    },
    {
      lat: 35.7504735772938,
      lng: -5.83198266726623,
    },
    {
      lat: 35.7505064061458,
      lng: -5.83200871792792,
    },
    {
      lat: 35.7505748760297,
      lng: -5.83204036776868,
    },
    {
      lat: 35.7506251427362,
      lng: -5.83202054041556,
    },
    {
      lat: 35.7504895564479,
      lng: -5.83160466422385,
    },
    {
      lat: 35.7502811237996,
      lng: -5.83090872720062,
    },
    {
      lat: 35.7502730914301,
      lng: -5.83088190787367,
    },
    {
      lat: 35.7502262205637,
      lng: -5.83073070845541,
    },
    {
      lat: 35.7502215791626,
      lng: -5.83073145938931,
    },
    {
      lat: 35.7502699734805,
      lng: -5.83088156073541,
    },
    {
      lat: 35.7501865523675,
      lng: -5.83087226354411,
    },
    {
      lat: 35.7496194299928,
      lng: -5.83081781948675,
    },
    {
      lat: 35.7496198598687,
      lng: -5.83080563906896,
    },
    {
      lat: 35.7499064980865,
      lng: -5.83082993785132,
    },
    {
      lat: 35.7499270727117,
      lng: -5.83063843726153,
    },
    {
      lat: 35.7499292230552,
      lng: -5.830618422702,
    },
    {
      lat: 35.7496692443402,
      lng: -5.83031890169593,
    },
    {
      lat: 35.7496764901779,
      lng: -5.83031256507275,
    },
    {
      lat: 35.7498164300842,
      lng: -5.83046983671352,
    },
    {
      lat: 35.750061057372,
      lng: -5.8307506536197,
    },
    {
      lat: 35.7502253877914,
      lng: -5.83072807793837,
    },
    {
      lat: 35.7501946570578,
      lng: -5.83063106627066,
    },
    {
      lat: 35.7501619559096,
      lng: -5.83054956521022,
    },
    {
      lat: 35.7501233048467,
      lng: -5.83049243577722,
    },
    {
      lat: 35.7501794640566,
      lng: -5.83046839230628,
    },
    {
      lat: 35.7503290166708,
      lng: -5.83040436426995,
    },
    {
      lat: 35.7503225640352,
      lng: -5.83037964550419,
    },
    {
      lat: 35.7500831060506,
      lng: -5.83048554517171,
    },
    {
      lat: 35.7498767242315,
      lng: -5.83035774611307,
    },
    {
      lat: 35.7498106798191,
      lng: -5.83032249089018,
    },
    {
      lat: 35.7497878793072,
      lng: -5.8302865926521,
    },
    {
      lat: 35.7497842784218,
      lng: -5.83023099026792,
    },
    {
      lat: 35.7497978042253,
      lng: -5.8301365452653,
    },
    {
      lat: 35.7498259781864,
      lng: -5.82997609182314,
    },
    {
      lat: 35.7501749286301,
      lng: -5.83007512067024,
    },
    {
      lat: 35.7501768714546,
      lng: -5.8300674986598,
    },
    {
      lat: 35.7501816231834,
      lng: -5.83004885686921,
    },
    {
      lat: 35.7498329794085,
      lng: -5.82993427694527,
    },
    {
      lat: 35.7498972782369,
      lng: -5.8295878904687,
    },
    {
      lat: 35.7501038057461,
      lng: -5.82967091767864,
    },
    {
      lat: 35.7502453050768,
      lng: -5.82969784607866,
    },
    {
      lat: 35.7502448581138,
      lng: -5.82967203014005,
    },
    {
      lat: 35.7501066997644,
      lng: -5.82964794359765,
    },
    {
      lat: 35.7499003817973,
      lng: -5.82956708825049,
    },
    {
      lat: 35.749900686626,
      lng: -5.82956510087632,
    },
    {
      lat: 35.7499678012731,
      lng: -5.8291275374059,
    },
    {
      lat: 35.7499533033023,
      lng: -5.82912209021225,
    },
    {
      lat: 35.7498868245173,
      lng: -5.82954818090377,
    },
    {
      lat: 35.7497271247071,
      lng: -5.82951279437992,
    },
    {
      lat: 35.7497777862159,
      lng: -5.82909990483671,
    },
    {
      lat: 35.7497617683909,
      lng: -5.82909422741659,
    },
    {
      lat: 35.7497606865969,
      lng: -5.82910302382283,
    },
    {
      lat: 35.7497107390594,
      lng: -5.82950916291747,
    },
    {
      lat: 35.7495434579643,
      lng: -5.82947209646005,
    },
    {
      lat: 35.7495868079848,
      lng: -5.8290236144482,
    },
    {
      lat: 35.7495661010947,
      lng: -5.82901956570038,
    },
    {
      lat: 35.7495241158684,
      lng: -5.82946019125912,
    },
    {
      lat: 35.7495234048813,
      lng: -5.82946765290978,
    },
    {
      lat: 35.7493571292282,
      lng: -5.82943080948422,
    },
    {
      lat: 35.74935761756,
      lng: -5.82975110662824,
    },
    {
      lat: 35.7494796204881,
      lng: -5.82977335135905,
    },
    {
      lat: 35.7497354110604,
      lng: -5.82981999020035,
    },
    {
      lat: 35.7498341737082,
      lng: -5.82983799732568,
    },
    {
      lat: 35.7497848225116,
      lng: -5.83013399119068,
    },
    {
      lat: 35.7495765772107,
      lng: -5.83009302904046,
    },
    {
      lat: 35.74957636146,
      lng: -5.83009298660198,
    },
    {
      lat: 35.7493781769613,
      lng: -5.83005219874991,
    },
    {
      lat: 35.7493858310913,
      lng: -5.83007421685159,
    },
    {
      lat: 35.7495754918156,
      lng: -5.83011331847484,
    },
    {
      lat: 35.749563929232,
      lng: -5.83038361870899,
    },
    {
      lat: 35.7495577580842,
      lng: -5.83043150760795,
    },
    {
      lat: 35.7495799191779,
      lng: -5.83043906730904,
    },
    {
      lat: 35.7495935987656,
      lng: -5.83044644534715,
    },
    {
      lat: 35.7496063637427,
      lng: -5.83046003230459,
    },
    {
      lat: 35.7496205964134,
      lng: -5.83048020409808,
    },
    {
      lat: 35.7496291786437,
      lng: -5.83049742341728,
    },
    {
      lat: 35.7496326383356,
      lng: -5.83053179280796,
    },
    {
      lat: 35.749624588504,
      lng: -5.83053149153506,
    },
    {
      lat: 35.7496202888452,
      lng: -5.8304995925821,
    },
    {
      lat: 35.7496128892235,
      lng: -5.83048419169205,
    },
    {
      lat: 35.7496006881213,
      lng: -5.83046739235624,
    },
    {
      lat: 35.7495867873005,
      lng: -5.83045499250386,
    },
    {
      lat: 35.7495766879139,
      lng: -5.83044729160918,
    },
    {
      lat: 35.7495565871668,
      lng: -5.83044059165991,
    },
    {
      lat: 35.7493099265119,
      lng: -5.83042001607083,
    },
    {
      lat: 35.7490692728548,
      lng: -5.83039195487523,
    },
    {
      lat: 35.7490328894563,
      lng: -5.83038771242292,
    },
    {
      lat: 35.7490725297735,
      lng: -5.82935201987976,
    },
    {
      lat: 35.7493330381892,
      lng: -5.8293162754257,
    },
    {
      lat: 35.7493244757439,
      lng: -5.82928198157816,
    },
    {
      lat: 35.7492033127383,
      lng: -5.82930565117921,
    },
    {
      lat: 35.748979079421,
      lng: -5.82934945591262,
    },
    {
      lat: 35.7489503298939,
      lng: -5.82896771978437,
    },
    {
      lat: 35.7489301248254,
      lng: -5.82896570800096,
    },
    {
      lat: 35.7489563175801,
      lng: -5.82937184183697,
    },
    {
      lat: 35.7487409173595,
      lng: -5.82939985032277,
    },
    {
      lat: 35.7487325299243,
      lng: -5.82916095283299,
    },
    {
      lat: 35.7487265012271,
      lng: -5.82898923876229,
    },
    {
      lat: 35.748700929904,
      lng: -5.82900001983501,
    },
    {
      lat: 35.7487176294151,
      lng: -5.82940292060823,
    },
    {
      lat: 35.7485789296739,
      lng: -5.82940782011474,
    },
    {
      lat: 35.7485536299461,
      lng: -5.82942872035909,
    },
    {
      lat: 35.7485427301629,
      lng: -5.82947841959333,
    },
    {
      lat: 35.748493062405,
      lng: -5.82941966148815,
    },
    {
      lat: 35.7484614602283,
      lng: -5.82924847283869,
    },
    {
      lat: 35.7484409610816,
      lng: -5.82900592928019,
    },
    {
      lat: 35.7484223244308,
      lng: -5.82900444270081,
    },
    {
      lat: 35.7484353301847,
      lng: -5.82916030756692,
    },
    {
      lat: 35.7484429467846,
      lng: -5.82925158719092,
    },
    {
      lat: 35.7484757216773,
      lng: -5.82942862682961,
    },
    {
      lat: 35.7485408236001,
      lng: -5.82950015350923,
    },
    {
      lat: 35.7485315300061,
      lng: -5.8296061206259,
    },
    {
      lat: 35.7482164300442,
      lng: -5.82968191998458,
    },
    {
      lat: 35.7480319296299,
      lng: -5.82974162057928,
    },
    {
      lat: 35.7480972303029,
      lng: -5.8300058198127,
    },
    {
      lat: 35.7482393303808,
      lng: -5.82995751992354,
    },
    {
      lat: 35.7482327180215,
      lng: -5.82987794224049,
    },
    {
      lat: 35.7482180452267,
      lng: -5.82970135972994,
    },
    {
      lat: 35.7482400480399,
      lng: -5.82969845042311,
    },
    {
      lat: 35.7482620742354,
      lng: -5.82995290999872,
    },
    {
      lat: 35.7482300655651,
      lng: -5.83011588154267,
    },
    {
      lat: 35.7481938255846,
      lng: -5.83026129112562,
    },
    {
      lat: 35.7481741735992,
      lng: -5.8303099516429,
    },
    {
      lat: 35.7484611418682,
      lng: -5.83033449144358,
    },
    {
      lat: 35.7484670540114,
      lng: -5.83024797666275,
    },
    {
      lat: 35.7484858525401,
      lng: -5.83009729795191,
    },
    {
      lat: 35.7485038073289,
      lng: -5.82995338085146,
    },
    {
      lat: 35.7485087303936,
      lng: -5.82991391989145,
    },
    {
      lat: 35.7485242427996,
      lng: -5.82970449566591,
    },
    {
      lat: 35.7485417022379,
      lng: -5.82960393437401,
    },
    {
      lat: 35.7485520570319,
      lng: -5.82950137029195,
    },
    {
      lat: 35.7485542639682,
      lng: -5.82948296296831,
    },
    {
      lat: 35.748562267035,
      lng: -5.82944178121318,
    },
    {
      lat: 35.7485794953475,
      lng: -5.8294216957546,
    },
    {
      lat: 35.7487153748148,
      lng: -5.82941448768838,
    },
    {
      lat: 35.7487608346448,
      lng: -5.82940943349848,
    },
    {
      lat: 35.7487501084308,
      lng: -5.82988920382365,
    },
    {
      lat: 35.7487304776134,
      lng: -5.8301798014382,
    },
    {
      lat: 35.7487185970857,
      lng: -5.83035567047779,
    },
    {
      lat: 35.7488124961998,
      lng: -5.83036462053076,
    },
    {
      lat: 35.7490155487287,
      lng: -5.8303858553229,
    },
    {
      lat: 35.74897746244,
      lng: -5.8311430557074,
    },
    {
      lat: 35.7487170057122,
      lng: -5.83111542803193,
    },
    {
      lat: 35.7486886082927,
      lng: -5.83111241580531,
    },
    {
      lat: 35.7487170610435,
      lng: -5.83039050661654,
    },
    {
      lat: 35.748717693267,
      lng: -5.83037278727426,
    },
    {
      lat: 35.7484604044242,
      lng: -5.83035295632385,
    },
    {
      lat: 35.7484417244823,
      lng: -5.83082060435772,
    },
    {
      lat: 35.7484310730356,
      lng: -5.83108726086834,
    },
    {
      lat: 35.7481538417264,
      lng: -5.83106592805007,
    },
    {
      lat: 35.7481736591871,
      lng: -5.83032906583367,
    },
    {
      lat: 35.7479609101679,
      lng: -5.83033277014118,
    },
  ];

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
            .replace("MULTIPOLYGON(((", "")
            .replace(")))", "");
          const pairs = coordinates.split(",");

          pairs.forEach((pair) => {
            const [lng, lat] = pair.trim().split(" ");
            const parsedLat = parseFloat(lat);
            const parsedLng = parseFloat(lng);

            if (isNaN(parsedLng)) {
              return;
            }
            polyLine.push({ lat: parsedLat, lng: parsedLng });
            setPolyLine([...polyLine]);
          });
        });
      } catch (error) {
        console.log("error", error);
      }
    }
    console.log("polyLine", polyLines);
  }

  useEffect(() => {
    if (SelectedRadioValue == "circuit") {
      if (SelectedRadioTree) {
        console.log(SelectedRadioTree);
        const id = SelectedRadioTree[0].id[0];
        setShowPloyLine(true);
        showPolyLine(id);
      }
    }
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

  useEffect(() => {
    setDirectionsResponse();
    // if(ContextShowtTee != undefined){
    //   setzoomy(15)
    //   console.log("5555555555555555555")
    // }
    setmarkers([]);
    if (isLoaded) {
      if (lat_lng) {
        console.log("lat_lng Feom MAppp", lat_lng);
        for (let i = 0; i < lat_lng.length; i++) {
          const icons = {
            url: "https://cdn-icons-png.flaticon.com/512/3256/3256319.png",
            strokeColor: "#00ff4cd5",
            scaledSize: { width: 32, height: 32 },
            // rotation: [locations[i].heading],
            anchor: new window.google.maps.Point(0, 0),

            // rotation: x.heading,
          };
          console.log("dddddddddddddddddd", lat_lng);
          let name = lat_lng[i].name;
          console.log(name);
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
          markers.push(marker);
          setmarkers((current) => [...current, marker]);

          // console.log("markers", markers);
        }
      }
    }

    console.log(zoomy);
  }, [lat_lng, ContextShowtTee]);

  return (
    <>
      <div className="mapdiv">
        {/* <button onClick={()=>{setShowPloyLine(true)}}>Test</button> */}
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

            {ShowPloyLine && (
              <Polyline
                path={polyLines}
                geodesic={true}
                options={{
                  strokeColor: "blue",
                  strokeOpacity: 1.0,
                  strokeWeight: 2,
                }}
              />
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
