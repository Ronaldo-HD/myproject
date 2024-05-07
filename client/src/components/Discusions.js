import React, { useEffect, useState } from "react";
import '../App.css'

export default function Discusions(){

    const [messages , setMessaged] = useState([])

    const id = sessionStorage.getItem('FNP_userId');
        
    function getMessages(){
        fetch(`http://localhost:3003/api/discussion`)
        .then(res => res.json())
        .then(response=>{
            
            setMessaged(response.messages)
            console.log("messages : ",messages)
        })
        .catch((error) => {
          console.error('Error fetching Messages:', error);
        });
    }

    useEffect(()=>{
        getMessages();
    },[])
  


    function SendDiscussion() {
        const inputMessage = document.getElementById('inputmessage').value;
      
        if(inputMessage===''){
            alert('please fill the input')
        }else{

            fetch(`http://localhost:3003/api/senddiscussion`, { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              sender_id: id,
              message: inputMessage 
            })
          })
            .then(res => res.json())
            .then(response => {
              document.getElementById('alert').style.display = 'flex';
              document.getElementById('alert').style.opacity = 1;
              document.getElementById('alertmessage').innerText = response.message;
            
              getMessages(); 
              setTimeout(() => {
                document.getElementById('alert').style.opacity = 0;
                setTimeout(() => {
                  document.getElementById('alert').style.display = 'none'; 
                }, 500);
              }, 3000);
            })
            .catch((error) => {
              console.error('Error fetching Messages:', error);
            });

        }
       
      
       
      }
      

    




    return(
        <div className="element" style={{width:'49%' , backgroundColor:'var(--light' , borderRadius:'10px'}} >

            <div style={{display:"flex" ,justifyContent:'space-between' , alignItems:'center' , padding:'20px' , borderBottom:'0.5px solid grey'}} >
                <div style={{display:"flex" , alignItems:'center' , gap:'5px'}} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                    <g id="SVGRepo_iconCarrier"> <g id="Communication / Chat_Conversation"> <path id="Vector" d="M16 8H20C20.5523 8 21 8.44772 21 9V20L17.667 17.231C17.4875 17.0818 17.2608 17 17.0273 17H9C8.44771 17 8 16.5523 8 16V13M16 8V5C16 4.44772 15.5523 4 15 4H4C3.44772 4 3 4.44772 3 5V16.0003L6.33301 13.2308C6.51255 13.0817 6.73924 13 6.97266 13H8M16 8V12C16 12.5523 15.5523 13 15 13H8" stroke="#676d83" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> </g> </g>
                    </svg>  
                    <h5>Discusions</h5>
                </div>
               
            </div>

            <div className="discusionsBody" style={{padding:'10px'}} >

                {messages.map((message,index) => (
                   message.UserID == id ? ( 
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px',
                     padding: '10px' , textAlign: 'end',   flexDirection: 'row-reverse' ,
                      background:'#56565640' , borderRadius:'15px' , marginTop:'20px'}}>

                    <img style={{ height: '55px', borderRadius: '15px' }} src={require(`../photos/${message.ProfilePicture}`)} alt={message.Username} />
                        <div>
                        <h5>{message.Username}</h5>
                        <p style={{ color: 'white' }}>{message.Message}</p>
                        </div>
                    </div>
                   ):(
                    <div  style={{ display: 'flex', alignItems: 'center', gap: '10px', 
                    padding: '10px' , background:'#56565640' ,borderRadius:'15px' , marginTop:'20px'  }}>

                    <img style={{ height: '55px', borderRadius: '15px' }} src={require(`../photos/${message.ProfilePicture}`)} alt={message.Username} />
                        <div>
                        <h5>{message.Username}</h5>
                        <p style={{ color: 'white' }}>{message.Message}</p>
                        </div>
                    </div>
                   )
                ))}


     

                

         
            </div>

            <div style={{display:'flex',gap:'10px',alignItems:'center',justifyContent:'space-between',position: 'relative', width: '100%', top: '130px', borderRadius:'10px' , border:'1px solid grey' , padding:'5px 10px 5px 10px'}} >
                <input id="inputmessage"  className="messageInput"  placeholder="Write a message ..." ></input>
                <img style={{height:'25px',cursor:'pointer'}} src={require(`../images/attach-file.png`)} />
                <img  onClick={()=>SendDiscussion()} style={{height:'25px',cursor:'pointer'}} src={require(`../images/send.png`)} />
            </div>
        </div>
    )
}