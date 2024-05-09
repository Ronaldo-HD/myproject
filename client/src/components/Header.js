

// Header.js
import React from "react";
import '../styles/header.css'
import Button from 'react-bootstrap/Button';
import profile from '../images/profile.png'
import Setting from '../images/setting.png'
import Check from '../images/check-mark.png'
import Home from '../images/home.png'
import Chat from '../images/chat.png'
import Files from '../images/folder.png'

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Header({ onHeaderButtonClick }) {
    
    const image = sessionStorage.getItem('image')
    const handleClick = (parameter) => {
        onHeaderButtonClick(parameter);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClickk = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function logout(){
     
        sessionStorage.removeItem('FNP_userid')
        handleClose();
        window.location.href='/'
    }
    

    return (
        <div className="header">

            <div className="headerTop">

                <div className="headerLogo">
                    <h1>TaskFLow</h1>

                    <div className="headerBottom">
                        <Button className="buttons" variant="primary" onClick={() => handleClick('Dashboard')}>
                            <img style={{width:'20px' ,marginRight:'8px'}} src={Home} />
                             Dashboard</Button>

                        <Button className="buttons" variant="primary" onClick={() => handleClick('Projects')}>
                        <img style={{width:'20px', marginRight:'8px' }} src={Check} /> 
                            Projects</Button>

                        <Button className="buttons" variant="primary" onClick={() => handleClick('Chat')}>
                        <img style={{width:'20px' , marginRight:'8px'}} src={Chat} />
                            Chat</Button>

                        <Button className="buttons" variant="primary" onClick={() => handleClick('files')}>
                        <img style={{width:'25px', marginRight:'8px' }} src={Files} /> 
                            Files</Button>{' '}
                      
                    </div>
                </div>

                <div className="headerNotification">
                    
                <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        style={{background:"transparent" , border:'none'}}
        onClick={handleClickk}
      >
        <img style={{width:'30px'}} src={Setting}/>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={()=>logout}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>

                    <div className="profileSection">
                        <img className="profileimage" src={require(`../photos/${image}`)} alt="profile" />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Header;
