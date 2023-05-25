import React, { useState } from 'react'
import Tree from "../Component/DropDownTree/index"
import Map from "../Component/map/map"
import { ContextID } from '../Helper/ContextID'
import "./Home.css"
const Home = () => {
  const [lat_lng , Setlat_lng] =useState()
  return (
    <div  className='Container'> 
      
      <ContextID.Provider  value={{lat_lng ,Setlat_lng}}> 
      <Tree/>
      <Map/>
      </ContextID.Provider>
    </div>
  
  )
}

export default Home