import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./Home/Home"
import NavBAr from "./NavBAR/NavBar"
import { ContextShowtTee } from './Helper/ContextShowtTee'
import Test from "./Test/test";
import Chart from "./Component/Chart/DisplayChart"
function App() {
  return (
    <div className="App">
   
    <BrowserRouter>
  
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Test" element={<Test />}></Route>
          <Route path="/Chart" element={<Chart />}></Route>
        
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
