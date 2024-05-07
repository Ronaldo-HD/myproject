import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';


export default function AlertDialog({ prop }) {

  const [open, setOpen] = React.useState(false);
  const [task , setTask] = React.useState([])


  const handleClickOpen = () => {
    setOpen(true);
    console.log(task.Status)
  };

  const handleClose = () => {
    setOpen(false);
  };

  function getTask(prop){
    fetch(`http://localhost:3003/getsingletask?taskid=${prop}`)
    .then(response => response.json())
    .then(res =>{
        setTask(res[0])
        console.log("task" , task)
    
    })
  }

  React.useEffect(()=>{
    getTask(prop)
  },[])
  

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
        
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       <div >
        <h1>JJ</h1>
        <div style={{ background: 'var(--light)', display: 'flex', 
        flexDirection: 'column', padding: '50px'  , borderRadius:'5px'}}>
          <h1>Add New Task</h1>
          <br></br>
          <label>Task Name</label>
          <input placeholder={task.TaskName} id="taskname" />
          <br></br>

          <label>Project</label>
          <input placeholder={task.Project} id="taskname" />
           

          <br></br>
          {/* <label>Assignee</label>
        <DropdownButton/> */}

          <br></br>

          <Button>Add Task</Button>
        </div>
       </div>
      </Dialog>
    </React.Fragment>
  );
}