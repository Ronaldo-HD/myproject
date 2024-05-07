import React, { useEffect, useState } from "react";
import '../styles/main.css'
import Projects from "./Projects";
import Dashboard from "./Dashboard";
import Chat from "./Chat";
import Header from '../components/Header';
import Avatars from "../components/Avatars";
import FilesPage from "../pages/FilesPage";





function Mainpage() {

    const [component, setComponent] = useState(<Dashboard />); // Setting Dashboard as default component
    const [users , setUsers]=useState([])
    const handleHeaderButtonClick = (parameter) => {
        if (parameter === "Projects") {
            setComponent(<Projects />); // Set Projects component to the state
        } 
        if (parameter === "Dashboard") {
            setComponent(<Dashboard />);
        }
        if (parameter === "Chat") {
            document.getElementById('header').style.display='none'
            setComponent(<Chat/>);
        }
        if (parameter === "files") {
            setComponent(<FilesPage/>);
        }
         else{
            document.getElementById('header').style.display='flex'
        }
    };


    useEffect(()=>{
        fetch('http://localhost:3003/testusers')
        .then(res => res.json())
        .then(response =>{
            setUsers(response)
        })
    },[])

    const Username = sessionStorage.getItem('name')
    

    return (
        <div className="main">
            <Header onHeaderButtonClick={handleHeaderButtonClick} />
            <div className="mainPageBody">

                <div id="header" style={{display:'flex' , justifyContent:'space-between'}} >

                    <div>
                      <h3>Welcome Back, {Username}</h3>
                      <p>Your progress this week is awesome. Let's keep it up and get a lot of points reward!</p>
                    </div>

                    <div>
                     
                        <p style={{paddingBottom:'10px'}} >Team Members</p>
                   
                        {users.map((user)=>{
                            return(
                              <img  className="MyAvatar" src={require(`../photos/${user.ProfilePicture}`)} />
                            )
                        })}
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
