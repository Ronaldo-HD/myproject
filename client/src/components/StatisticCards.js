import React from "react";

export default function StatisticCards() {
  const cardDiv = {
    display: 'flex',
    gap:'20px',
    marginBottom:'10px'

  };

  const card = {
    backgroundColor:'var(--light)',
    padding:'20px',
    borderRadius:'10px',
    display:'flex'
  };

  return (
    <div style={cardDiv}>

      <div style={card}>
<div>
<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 1024 1024" className="icon" version="1.1" fill="#000000">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
        <g id="SVGRepo_iconCarrier">
        <path d="M511.9 183.1c-181.8 0-329.1 147.4-329.1 329.1 0 181.8 147.4 329.1 329.1 329.1C693.6 841.3 841 694 841 512.2S693.6 183.1 511.9 183.1z m0 585.1c-141.2 0-256-114.8-256-256s114.8-256 256-256 256 114.8 256 256-114.9 256-256 256z" fill="#276cec"/>
        <path d="M487.4 556.8l-97.8-87.6-48.8 54.4 153.1 137.2 192.2-221.2-55.2-48z" fill="#276cec"/>
        </g>
      </svg>
</div>
    

        <div>
        <h5>Completed Tasks</h5>
        <h6>10</h6>
       </div>
     </div>

     <div style={card}>

     <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
      <g id="SVGRepo_iconCarrier"> <path d="M12 7V12H9M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#eeb844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> </g>
      </svg>

        <div>
        <h5>Pending Tasks</h5>
        <h6 style={{color:'#eeb844'}} >10</h6>
       </div>
     </div>


     <div style={card}>
        <img style={{width:'30px'}} src="https://www.svgrepo.com/show/381974/completed-checkmark-done-complete.svg" />
        <div>
        <h5>Completed Tasks</h5>
        <h6>10</h6>
       </div>
     </div>


    </div>
  );
}
