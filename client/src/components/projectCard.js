import React from "react";
import '../styles/projectCard.css'
import profile from '../images/profile.png'
import Badge from 'react-bootstrap/Badge';
import Avatars from './Avatars'

function ProjectCard(){
    return(
        <div className="ProjectCard" >

        {/* First Section */}
       <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}} >

        <div style={{display:'flex',alignItems:'center',gap:'10px'}} >
                <img style={{borderRadius:'50px',height:'35px'}} src="https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/icons/brands/vue-label.png" />
              <div>
                <span>Social Banners</span>
                <p><span>Client: </span>Christian Ramirez</p>
              </div>
                
            </div>

            <button>s</button>

           </div>
           <br></br>
         {/* Second Section */}

         <div style={{display:'flex',justifyContent:'space-between'}} > 
         <p><span>Budget: </span>2500$</p>
         <p><span>Deadline: </span>28/2/2023</p>
         </div>
         <br></br>
         {/* third Section */}

         <div style={{borderTop:'1px solid white',paddingTop:'15px'}} >
         

            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'10px'}} >
                <span>Status:</span>

                <Badge pill bg="success">
                 Done
                </Badge>

            </div>
        
           
           <div style={{display:'flex',justifyContent:'space-between'}} >
                <span>Team:</span>

            <Avatars/>

           </div>
        
        
         </div>


        </div>
    )
}

export default ProjectCard;