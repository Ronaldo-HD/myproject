import React from "react";

export default function Files(){
    return(

        <div className="element" style={{width:'49%' , backgroundColor:'var(--light' , borderRadius:'10px'}} >

        <div style={{display:"flex" ,justifyContent:'space-between' , alignItems:'center' , padding:'20px' , borderBottom:'0.5px solid grey'}} >
            <div style={{display:"flex" , alignItems:'center' , gap:'5px'}} >
                <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                    <g id="SVGRepo_iconCarrier"> <path d="M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H12M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V12M17 19H21M19 17V21" stroke="#636363" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g>
                </svg> 
                <h5>Files</h5>
            </div>
            <span>+ expand</span>
        </div>

        <div>
            <h1>ds</h1>
        </div>
    </div>
    )
}