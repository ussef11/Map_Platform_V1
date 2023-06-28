import React, { useState } from "react";
import { Marker } from "@react-google-maps/api";
import { v4 as uuidv4 } from "uuid";

export default function CustomMarker(props) {
  const { position, clusterer , icon } = props;

  return <Marker position={position} icon={icon} clusterer={clusterer}  draggable={true} />;
}
