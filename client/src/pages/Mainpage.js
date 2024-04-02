import React, { useState } from "react";
import '../styles/main.css'
import Projects from "./Projects";
import Dashboard from "./Dashboard";
import Header from '../components/Header';
import Avatars from "../components/Avatars";

function Mainpage() {
    const [component, setComponent] = useState(<Dashboard />); // Setting Dashboard as default component

    const handleHeaderButtonClick = (parameter) => {
        if (parameter === "Projects") {
            setComponent(<Projects />); // Set Projects component to the state
        } else if (parameter === "Dashboard") {
            setComponent(<Dashboard />);
        }
    };

    return (
        <div className="main">
            <Header onHeaderButtonClick={handleHeaderButtonClick} />
            <div className="mainPageBody">

                <div style={{display:'flex' , justifyContent:'space-between'}} >

                    <div>
                      <h3>Welcome Back, Ronaldo</h3>
                      <p>Your progress this week is awesome. Let's keep it up and get a lot of points reward!</p>
                    </div>

                    <div>
                     
                        <p style={{paddingBottom:'10px'}} >Team Members</p>
                   
                        <Avatars/>
                    </div>
                </div>
                <br></br>
                
                <div className="components">
                    {component}
                </div>
            </div>
        </div>
    );
}

export default Mainpage;
