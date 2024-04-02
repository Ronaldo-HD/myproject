import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from './pages/Mainpage';

import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} ></Route>
      <Route path="/main" element={<Mainpage />} ></Route>
    </Routes>
  </BrowserRouter>


  );
}

export default App;
