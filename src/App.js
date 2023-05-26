import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./Home/Home"
import NavBAr from "./NavBAR/NavBar"
import { ContextShowtTee } from './Helper/ContextShowtTee'
function App() {
  return (
    <div className="App">
   
    <BrowserRouter>
  
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
