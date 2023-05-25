import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./Home/Home"
import NavBAr from "./NavBAR/NavBar"
function App() {
  return (
    <div className="App">
   
    <BrowserRouter>
    {/* <NavBAr/> */}
        <Routes>
          <Route path="/Home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
