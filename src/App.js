import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./Home/Home"
import NavBAr from "./NavBAR/NavBar"
import { ContextShowtTee } from './Helper/ContextShowtTee'
import Test from "./Test/test";
import Chart from "./Component/Chart/DisplayChart"
import Login from "./Component/Login/login";
import AuthService from "./services/auth.service";
import AuthVerify from './common/auth-verify';

function App() {


  const logOut = ()=>{
    AuthService.logout()
  }
  return (
    <div className="App">
   
    <BrowserRouter>
  
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Test" element={<Test />}></Route>
          <Route path="/Chart" element={<Chart />}></Route>
          <Route path="/login" element={<Login />}></Route>
        
        </Routes>
        <AuthVerify logOut={logOut}/>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
