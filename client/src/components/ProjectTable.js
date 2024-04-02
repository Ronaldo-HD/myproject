import React, { useEffect, useState } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import Chip from '@mui/material/Chip';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Avatar } from '@mui/material';
import AvatarGroup from '@mui/material/AvatarGroup';


function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div style={{background:'var(--light)' , display:'flex' , flexDirection:'column' , padding:'20px'}} >
        <h1>Add New Task</h1>
        <label>Task Name</label>
        <input placeholder='Task Name' />
        <br></br>

        <label>Project</label>
        <select type='select' placeholder='Task Name' >
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>

        <br></br>
        <label>Due Date</label>
        <input placeholder='Task Name' optio />
        <br></br>
        <button>Add</button>
      </div>
    </Modal>
  );
}


function ProjectTable() {
  const user = sessionStorage.getItem('FNP_userId')
  const [tasks, setTasks] = useState([]);
  const [assigned , setassigned] = useState();
  const [assignedImage , setassignedImage] = useState();
  const [modalShow, setModalShow] = React.useState(false);


  const formatDateDistance = (dueDate) => {
    const now = new Date();
    const diffDays = Math.floor((now - dueDate) / (1000 * 60 * 60 * 24));
  
    if (diffDays === 0) {
      return 'today';
    } else if (diffDays === 1) {
      return 'yesterday';
    } else {
      return `${diffDays} days ago`;
    }
  };


function getuserimage(x){
  fetch(`http://localhost:3003/userImageForTask?assigned=${x}`)
        .then(response=>response.json())
        .then(res=>{
         
          setassigned(res[0].Username)
          setassignedImage(res[0].ProfilePicture)
          console.log('user : ',assigned , "Image : ",res[0].ProfilePicture)
        })
}


  useEffect(() => {
    fetch(`http://localhost:3003/tasks?user=${user}`)
      .then(response => response.json())
      .then(data => {
        setTasks(data);

        for(let i=0 ; i<=data.length ; i++){
          getuserimage(data[i].AssigneeUser);
        }
       
      })
      
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });

   
  }, []);

  return (
    <div className='projectCard element'>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Chip label="All Tasks" color="success" variant="outlined" />
          <Chip label="In Progress" color="secondary" variant="outlined" />
          <Chip label="In Review" color="success" variant="outlined" />
          <Chip label="Done" color="success" variant="outlined" />
        </div>
        <input placeholder='Search for a task' />
      </div>

      <div>
        <div className='tasks-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid grey', padding: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
              <g id="SVGRepo_bgCarrier" stroke-width="0" />
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
              <g id="SVGRepo_iconCarrier"> <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#6b6b6b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </g>
            </svg>
            <h5>My Tasks</h5>
          </div>
          <Button variant="primary" onClick={() => setModalShow(true)}>
         + add task
      </Button>

        </div>

        <div className='tasks-Body'>
          {tasks.map((task, index) => {
            const dueDate = parseISO(task.DueDate);
            const formattedDate = formatDateDistance(dueDate);

            
            return (
              <div key={index} className='singleTask' style={{ display: 'flex', justifyContent: 'space-between',
               alignItems: 'center', padding: '10px', borderBottom: '1px solid grey'}}>
                <p  style={{width:'32%'}} >{task.TaskName}</p>
                {task.Status === 'Done' ? (
                    <Chip style={{ width: '20%' }} label={task.Status} color="success" variant="outlined" />
                  ) : task.Status === 'In Progress' ? (
                    <Chip style={{ width: '20%' }} label={task.Status} color="success" variant="outlined" />
                  ) : (
                    <Chip style={{ width: '20%' }} label={task.Status} color="default" variant="outlined" />
                  )}
                  <AvatarGroup >
                    <Avatar alt={`${assigned}`} src='../userimages/profile.png' />
                  </AvatarGroup>
                <span style={{width:'32%' , textAlign:'right'}} >{formattedDate}</span>
              </div>
            );
          })}
       
        </div>
      </div>


      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default ProjectTable;
