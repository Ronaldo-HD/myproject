import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from './pages/Mainpage';


import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
       <div id='alert'>
        <img style={{height:'40px'}} src='https://cdn-icons-png.flaticon.com/128/14090/14090371.png'/>
        <p style={{color:'white'}} id='alertmessage' ></p>
       </div>
    
    <Routes>
      <Route path="/" element={<Login />} ></Route>
      <Route path="/main" element={<Mainpage />} ></Route>
    </Routes>
  </BrowserRouter>


  );
}

export default App;
