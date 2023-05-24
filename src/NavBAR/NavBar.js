import { Link } from "react-router-dom";
import './Navbar.css'
 import useWindowDimensions from "../Hook/useWindowDimensions";
import { useEffect, useRef , useState } from "react";


const Navbar = () => {

    const {height , width} = useWindowDimensions();
    const [showopt , setShowopt] = useState(true);
    const [optmobile , setoptmobile] = useState(false);
    const [searchinput , setsearchinput] = useState("Srearch");
    const [showadminBoard , setShowAdminBoard] =  useState(false)
    const [currentUser , SetCurrentUser] = useState("");
   


    useEffect(()=>{
        if(width <= 600){
            setShowopt(false)
        }else{
            setShowopt(true)
        }    
       
    })
   
    const handleclick = ()=>{
        setoptmobile(true)      
    }

    const closeclick = ()=>{
        if(optmobile)
        {
            setoptmobile(false)   
        }    
    }


    const logoutSubmite = ()=>{
    
        sessionStorage.clear();
        window.location.reload();
    }





    
    return ( 
  <nav>
    <input type="checkbox" id="check" />
    <label for="check" class="checkbtn"><i class="fas fa-bars"></i></label>
    <label class="logo">Insight solution</label>
    <ul>
      <li><Link class="active" href="#">Home</Link></li>
      <li><Link href="#">About</Link></li>
      <li><Link href="#">Services</Link></li>
      <li><Link href="#">Contact</Link></li>
      <li><Link href="#">Feedback</Link></li>
    </ul>
  </nav>
  
  
  
     );
}
 
export default Navbar;