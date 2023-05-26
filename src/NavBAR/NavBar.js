import { useContext, useEffect, useState } from 'react';
import { MenuOutlined,AlertOutlined, CloseOutlined } from '@ant-design/icons';
import ReactDOM from 'react-dom/client';
import './Navbar.css'
import { ContextID } from '../Helper/ContextID';

function Navbar() {
  const [menuVisible, setMenuVisible] = useState(true);
  const { ContextShowtTee, SetContextShowtTree } = useContext(ContextID);

  const toggleMenu = () => {
    
    SetContextShowtTree("close All")

    console.log(menuVisible)
 

  };

  useEffect(()=>{
    if(ContextShowtTee != "close All"  ){
        setMenuVisible(true);
    }else{
        setMenuVisible(false);
    }
  } ,[ContextShowtTee] )

  

  return (
    <div style={{ width: '100%', height: 'auto', backgroundColor: 'rgb(14, 88, 144)', paddingTop:'10px', paddingBottom:'2px', height: '32px ', alignContent: 'center', alignItems: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'left', flexDirection:'row', width:'100%' }}>
          <div style={{width:'55px', textAlign:'left'}}>
            <button id='closeMenuButon'  onClick={toggleMenu} style={{background: 'none', border: 'none', color:"white", fontSize:'17pt', cursor:"pointer"}}>
           {menuVisible ?  <i class="fa-solid fa-xmark"></i>  :    <i class="fa-solid fa-bars"></i> }
            </button>
          </div>
          {/* <div style={{width:'calc(100% - 60px)', textAlign: 'right'}}>
            <button onClick={toggleMenu} style={{background: 'none', border: 'none', color:"white", fontSize:'17pt', cursor:"pointer"}}>
            <i class="fa-solid fa-bars"></i>
            </button>
          </div> */}

         
        </div>
      </div>
    </div>
  );
}

export default Navbar;