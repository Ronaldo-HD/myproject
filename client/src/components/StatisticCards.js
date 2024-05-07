import React, { useState,useEffect } from "react";

export default function StatisticCards() {

  const userid = sessionStorage.getItem('FNP_userId');

  const [loading, setLoading] = useState(true); // Initialize loading state
  const [TasksDone, setTasksDone] = useState(0);
  const [TasksPending, setTasksPending] = useState(0);
  const [TasksInProgress, setTasksInProgress] = useState(0);
  const [Total, setTotal] = useState(0);

 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3003/tasksTablesData?user=${userid}`);
      const data = await response.json();

      const tasksDoneCount = data.filter(item => item.Status === 'Done').length;
      const tasksPendingCount = data.filter(item => item.Status === 'Pending').length;
      const tasksInProgressCount = data.filter(item => item.Status === 'In Progress').length;

      setTasksDone(tasksDoneCount);
      setTasksPending(tasksPendingCount);
      setTasksInProgress(tasksInProgressCount);
      setTotal(data.length);

      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // Set loading to false even in case of error
    }
  };

  fetchData();
}, [userid]); // Include userid in the dependencies array to fetch data when userid changes




  const cardDiv = {
    display: 'flex',
    gap:'20px',
    marginBottom:'10px',
    width:'100%',


  };

  const card = {
    backgroundColor:'var(--light)',
    padding:'20px',
    borderRadius:'10px',
    display:'flex',
    width:'25%',
    alignItems: 'center',
    gap:'20px'
  };

  if (loading) 
    return <div>
      <h1>Loading ............</h1>
    </div>;
  else

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
        <h5>Total Tasks</h5>
        <h6>{Total}</h6>
       </div>
     </div>


     
     <div style={card}>
        <img style={{width:'30px'}} src="https://www.svgrepo.com/show/381974/completed-checkmark-done-complete.svg" />
        <div>
        <h5>Completed Tasks</h5>
        <h6>{TasksDone}</h6>
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
        <h6 style={{color:'#eeb844'}} >{TasksPending}</h6>
       </div>
     </div>



     <div style={card}>
        <img style={{width:'30px'}} src="https://www.svgrepo.com/show/381974/completed-checkmark-done-complete.svg" />
        <div>
        <h5>In Progress Tasks</h5>
        <h6>{TasksInProgress}</h6>
       </div>
     </div>



    </div>
  );
}
