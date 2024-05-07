import React, { useEffect, useState } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import Chip from '@mui/material/Chip';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Avatar, collapseClasses } from '@mui/material';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Dropdown from 'react-bootstrap/Dropdown';
import AlertDialog from '../components/EditTask'


function ProjectTable() {

  const [open, setOpen] = React.useState(false);
  const [clickOnTask , setClickOnTask] = useState('');
  const [project , setProject] = useState([]);
  const [projectsList , setProjectsList] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [Taskid , setTaskid] = useState('')
  const role = sessionStorage.getItem('role')

  const SelectUserModal =()=>{
    return(
      <div id='selectusers' style={{display:'flex' , flexDirection:'column'}}>
           <label>Assign To</label>
      <select type="select" placeholder="user" id="assignto" style={{background:'transparent', padding:'10px' , border:'1px solid grey' , borderRadius:'10px' , color:'grey'}}>
        {users.map((user)=>{
          return(
            <option value={user.UserID}> <img className='MyAvatar' src={(`../photos/12.jpg`)}/> {user.Username}</option>
          )
        })}
      </select>
        
      </div>
   

    )
  }

  // if(role=='Admin'){

  // }

  useEffect(()=>{
    fetch('http://localhost:3003/testusers')
    .then(response =>response.json())
    .then(users=>{
      setUsers(users)
    })
  },[])

  const toggleDrawer = (task,ID,newOpen) => () => {
     setOpen(newOpen);
     setClickOnTask(task)
     getSelectedProject(ID);
  };

  const toggleDrawerClose = (close) => () => {
    setOpen(close);
     document.getElementById('SideDr').innerHTML='';
  };

  function ChangeStatus(NewStatus, projectID) {
    fetch(`http://localhost:3003/changestatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        NewStatus: NewStatus,
        projectID: projectID
      })
    })
    .then(response => response.json())
    .then(res => {
      document.getElementById('alert').style.display = 'flex';
      document.getElementById('alert').style.opacity = 1;
      document.getElementById('alert').style.zIndex = 10  ;
      document.getElementById('alertmessage').innerText = res.message;
      getTasks()
      setTimeout(() => {
        document.getElementById('alert').style.display = 'flex';
          document.getElementById('alert').style.opacity = 0; // Fade out the alert
          setTimeout(() => {
              document.getElementById('alert').style.display = 'none'; // Hide the alert
          }, 500); 
      }, 3000); 
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error changing status');
    });
  }



  function DeleteTask(taskid){
    fetch(`http://localhost:3003/deletetask?taskid=${taskid}`, {
        method: 'DELETE',
      })
      .then(response=>response.json())
      .then(res=>{
     
        getTasks();
        
        setOpen(false);
        
        document.getElementById('alert').style.display = 'flex';
        document.getElementById('alert').style.opacity = 1;
        document.getElementById('alert').style.zIndex = 10  ;
        document.getElementById('alertmessage').innerText = res.message;
        setTimeout(() => {
          document.getElementById('alert').style.display = 'flex';
            document.getElementById('alert').style.opacity = 0; // Fade out the alert
            setTimeout(() => {
                document.getElementById('alert').style.display = 'none'; // Hide the alert
            }, 500); 
        }, 3000); 




      })
  }

  const DrawerList = (
    <Box id='SideDr' className='sideDrawer' sx={{ width: 450 , zIndex:3 }} anchor='right'  >
      <List  >
        <div>
        <h1>Task</h1>
        {/* <Button onClick={()=>alert(clickOnTask)}  >Edit</Button> */}
        {/* <AlertDialog prop={clickOnTask} /> */}
        </div>
       
       <br></br>
        <h5>Project Name : </h5>
        <h4 >{project.ProjectName}</h4>

        <br></br>

        <h5>Description</h5>
        <h4>{project.Description}</h4>

        <br> 
        </br>
        {tasks.map((task, index) => { // Corrected parameter order
          if (task.ProjectID === clickOnTask || task.TaskID===clickOnTask) {
           
            return (
              <div key={task.TaskID}> 
             <div>    
               <h5 style={{ width: '32%' }}>Task Name : {task.TaskName}</h5>
               <br></br>
              
              <div style={{display:'flex' ,gap:'30px' }} >
                <h5>Status : </h5>

                <Dropdown>
                {task.Status === 'Done' ? (
                   <Dropdown.Toggle variant="success" id="dropdown-basic">
                   {task.Status}
                 </Dropdown.Toggle>

                ) : task.Status === 'Pending' ? (
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {task.Status}
                </Dropdown.Toggle>

                ) : (
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {task.Status}
                 </Dropdown.Toggle>
                )}
                 <Dropdown.Menu>
                 <Dropdown.Item onClick={() => ChangeStatus('Done', task.TaskID)}>Done</Dropdown.Item>
                    <Dropdown.Item onClick={() => ChangeStatus('Pending', task.TaskID)}>Pending</Dropdown.Item>
                    <Dropdown.Item onClick={() => ChangeStatus('In Review', task.TaskID)}>In Review</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <br></br>
         
                  <div style={{display:'flex' , gap: '30px' , alignItems:'center'}} >
                    <h5>Assigned to : </h5>
                    <img className='MyAvatar' src={require(`../photos/${task.ProfilePicture}`)} />
                  </div>
              </div>    
              </div>
            );
          }         
        })}
      </List>
      <div style={{width:'100%' , position:'absolute' , bottom:'0' , right:'0' , 
      display:'flex' , flexDirection:'column' , gap:'10px' }}>
        <Button  style={{background:'red' , border:'none'}} onClick={()=>DeleteTask(clickOnTask)} >Delete Task</Button>
        <Button  onClick={toggleDrawerClose(false)} >Close</Button>
      </div>

    </Box>
  );



  const user = sessionStorage.getItem('FNP_userId');

  
  ////// Pop Up Modal /////////
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
       
    
      >
        <div style={{ background: 'var(--light)', display: 'flex', flexDirection: 'column', padding: '50px'  , borderRadius:'5px'}}>
          <h1>Add New Task</h1>
          <br></br>
          <label>Task Name</label>
          <input placeholder="Task Name" id="taskname" />
          <br></br>

          <label>Project</label>
          <select type="select" placeholder="Task Name" id="projectName" style={{background:'transparent', padding:'10px' , border:'1px solid grey' , borderRadius:'10px' , color:'grey'}}>
            {projectsList.map((project)=>{
              return(
                <option value={project.ProjectID}>{project.ProjectName}</option>
      
              )
            })}
        
          </select>
           {(role=="Admin")? <SelectUserModal/> : ""}

          <br></br>
          {/* <label>Assignee</label>
        <DropdownButton/> */}

          <br></br>

          <Button onClick={() => addToNewTask()}>Add Task</Button>
        </div>
      </Modal>
    );
  }

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


    function getTasks(){
      fetch(`http://localhost:3003/tasksTablesData?user=${user}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setTasks(data);
       
          
        })
        .catch((error) => {
          console.error('Error fetching tasks:', error);
        });
      }
      useEffect(()=>{
        getTasks();
      },[])
  

    useEffect(() => {
      fetch(`http://localhost:3003/getProjects`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setProjectsList(data);
          
      
        })
        .catch((error) => {
          console.error('Error fetching tasks:', error);
        });
    }, []);
  


  function addToNewTask() {
    const taskname = document.getElementById('taskname').value;
    const projectName = document.getElementById('projectName').innerText;
    const ProjectID = document.getElementById('projectName').value;
    let  AssignTo 

    if(role=='Admin'){
      AssignTo = document.getElementById('assignto').value;
    }else{
      AssignTo = user
    }

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month starts from 0
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    fetch('http://localhost:3003/addnewTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskname: taskname,
        assigned: AssignTo,
        assignee: user,
        projectName: projectName,
        date: formattedDate,
        ProjectID
      }),
    })
      .then((response) => {
        if (response.ok) {
          setModalShow(false);
          
          getTasks();
         
            // fetch(`http://localhost:3003/tasksTablesData?user=${user}`)
            //   .then((response) => {
            //     if (!response.ok) {
            //       throw new Error('Network response was not ok');
            //     }
            //     return response.json();
            //   })
            //   .then((data) => {
            //     setTasks(data);
             
            //   })
            //   .catch((error) => {
            //     console.error('Error fetching tasks:', error);
            //   });
      



        } else {
          alert('Error adding task.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


  function getSelectedProject(x){
 
      fetch(`http://localhost:3003/getSelectedProjects?projectid=${x}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          
          setProject(data[0])
          
        })
        .catch((error) => {
          console.error('Error fetching tasks:', error);
        });

  }

  function filter(type) {
     const filteredTasks = document.querySelectorAll(`.singleTask[data-status="${type}"]`);
    
    document.querySelectorAll('.singleTask').forEach(task => {
        task.style.display = 'none';
    });

    filteredTasks.forEach(task => {
        task.style.display = 'flex'; 
    });

    if(type==='All'){
      document.querySelectorAll('.singleTask').forEach(task => {
        task.style.display = 'flex';
    });
    }
}

  return (
    <div className="element">

        
         <Drawer open={open} style={{zIndex:2}} >
        {DrawerList}
      </Drawer>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <span onClick={()=>filter('All')}  className='MyChip' style={{background:'#0d6efd'}}>All Tasks</span>
          <span onClick={()=>filter('Done')}  className='MyChip Done' >Done</span>
          <span onClick={()=>filter('In Review')} className='MyChip InReview' >In Review</span>
          <span onClick={()=>filter('Pending')}  className='MyChip Pending' >Pending</span>
        </div>
        
      </div>

      <div>
        <div
          className="tasks-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid grey',
            padding: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
              <g id="SVGRepo_iconCarrier">
                {' '}
                <path
                  d="M4 12.6111L8.92308 17.5L20 6.5"
                  stroke="#6b6b6b"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{' '}
              </g>
            </svg>
            <h5>My Tasks</h5>
          </div>
          <Button variant="primary" onClick={() => setModalShow(true)}>
            + add task
          </Button>
        </div>

        <div className="tasks-Body">
          {tasks.map((task, index) => {
            const dueDate = parseISO(task.DueDate);
            const formattedDate = formatDateDistance(dueDate);

            return (
              <div
                key={task.TaskID}
                rowattribute = {task.TaskID}
                data-status={task.Status}
                className="singleTask"
                onClick={toggleDrawer(task.TaskID,task.ProjectID,true)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px',
                  borderBottom: '1px solid grey',
               
                
                }}
              >
                 
                <p style={{ width: '32%' }}>{task.TaskName}</p>
                {task.Status === 'Done' ? (
                  <span className='MyChip Done'>{task.Status}</span>
                ) : task.Status === 'Pending' ? (
                  <span className='MyChip Pending' >{task.Status}</span>
                ) : (
                  <span className='MyChip InReview' >{task.Status}</span>
                )}
                <AvatarGroup>
                  <Avatar alt={`${tasks.AssignedUserID}`} src={require(`../photos/${task.ProfilePicture}`)} />
                </AvatarGroup>
                <span style={{ width: '32%', textAlign: 'right' }}>{formattedDate}</span>
              </div>
            );
          })}
        </div>
      </div>

      <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default ProjectTable;
