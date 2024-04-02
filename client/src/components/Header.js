

// Header.js
import React from "react";
import '../styles/header.css'
import Button from 'react-bootstrap/Button';
import alert from '../images/bell.jpeg'
import profile from '../images/profile.png'

function Header({ onHeaderButtonClick }) {
    
    const handleClick = (parameter) => {
        onHeaderButtonClick(parameter);
    };

    return (
        <div className="header">

            <div className="headerTop">

                <div className="headerLogo">
                    <img style={{ width: "35px" }} alt="logo" />
                    <h1>Project</h1>

                    <div className="headerBottom">
                        <Button className="buttons" variant="primary" onClick={() => handleClick('Dashboard')}>Dashboard</Button>{' '}
                        <Button className="buttons" variant="primary" onClick={() => handleClick('Projects')}>Projects</Button>{' '}
                        <Button className="buttons" variant="primary" onClick={() => handleClick('Chat')}>Chat</Button>{' '}
                        <Button className="buttons" variant="primary" onClick={() => handleClick('Primary')}>Primary</Button>{' '}
                        <Button className="buttons" variant="primary" onClick={() => handleClick('Primary')}>Primary</Button>{' '}
                    </div>
                </div>

                <div className="headerNotification">
                    <Button className="notification" variant="primary">
                        <img className="miniImage" src={alert} alt="alert" />
                        <span className="visually-hidden">unread messages</span>
                    </Button>

                    <div className="profileSection">
                        <img className="profileimage" src={profile} alt="profile" />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Header;
