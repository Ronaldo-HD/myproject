import React , {useState , useEffect}from "react";
import ProjectCard from '../components/projectCard' 
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Projects(){



  const [modalShow, setModalShow] = useState(false);
  const [projects, setProjects] = useState([]);
  const [select , setSelect]=useState('')

  const isadmin = sessionStorage.getItem('role')

  function formatDate(dateString) {
    if (!dateString) return ''; 
  
    const dateObj = new Date(dateString); 
    const year = dateObj.getFullYear(); 
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); 
    const day = dateObj.getDate().toString().padStart(2, '0'); 
  
    return `${year}-${month}-${day}`; 
  }
  

 function getProjects(){
    fetch('http://localhost:3003/getProjectsList')
        .then(res => res.json())
        .then(response => {
          setProjects(response);
        });
  
   }



 useEffect(()=>{
  getProjects()

 },[])

  




  function MyVerticallyCenteredModal(props) {
    const selectedProject = projects.find(item => item.ProjectID === select);
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        key="tg"
      
      >
        <div style={{ background: 'var(--light)', padding: '20px' , borderRadius:'5px' }}>

         <div style={{ display:'flex', justifyContent: 'space-between' , alignItems: 'center'}} >

          <div>
          <h1>{selectedProject ? selectedProject.ProjectName : ''}</h1>
          <p>{selectedProject ? selectedProject.ProjectDescription : ''}</p>
          </div>

          <span className={`MyChip ${selectedProject ?  selectedProject.ProjectStatus : ''}`} >{selectedProject ?  selectedProject.ProjectStatus : ''}</span>
           {isadmin=="Admin" ? 
            <Button variant='danger' onClick={()=>deleteProject(selectedProject.ProjectID)} >
              <DeleteIcon />
              Delete
            </Button>
            : ''}
         </div>

          <br></br>

          <div style={{display:'flex' , gap:'50px'}} >
          <div style={{display:'flex' , alignItems:"center"}} >
            <img style={{height:'60px'}} src='https://www.svgrepo.com/show/502605/date-range.svg' />
            <div>
           <p>Deadline</p>
             {selectedProject ? formatDate(selectedProject.EndDate) : ''}
            </div>
          </div>
        

          <br></br>
            <br></br>

            <div style={{display:'flex' , alignItems:"center" , marginTop:'30px' , marginBottom:"25px"}} >
            <img 
            className='MyAvatar'
            src={selectedProject ? require(`../photos/${selectedProject.CreatorProfilePicture}`) : ''}
            alt={selectedProject ? selectedProject.CreatorProfilePicture : ''}
          />            
          <div  style={{marginLeft:'25px'}}>
           <p>Creator</p>
           {selectedProject ? selectedProject.CreatorUsername : ''}
            </div>
          </div>
          </div>

      
          {selectedProject && (selectedProject.Tasks == null || selectedProject.Tasks.length === 0) ? (
  <h5 style={{textAlign:'center' , margin:"60px"}} >No tasks for this project yet</h5>
) : (
  <table style={{ width: '100%' }}>
    <thead>
      <tr>
        <th>Task Name</th>
        <th>Due Date</th>
        <th>Status</th>
        <th>Assignee</th>
      </tr>
    </thead>
    <tbody>
      {selectedProject &&
        selectedProject.Tasks.map(task => (
          <tr key={task.TaskID}>
            <td>{task.TaskName}</td>
            <td>{task.DueDate}</td>
            <td><span className={`MyChip ${task.Status}`}>{task.Status}</span></td>
            <td>
              <img
                className="MyAvatar"
                src={require(`../photos/${task.AssigneeProfilePicture}`)}
                alt="Assignee Profile"
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              />
            </td>
          </tr>
        ))}
    </tbody>
  </table>
)}


        </div>
       
      </Modal>
    );
  }
  
  
  function deleteProject(projectid) {

   
      fetch(`http://localhost:3003/deleteproject?projectid=${projectid}`, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(response => {
          alert(response.message); 
          setModalShow(false)
          getProjects()
        })
        .catch(error => {
          console.error('Error deleting project:', error);
          alert('Error deleting project');
        });
  
  }
  


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  

  function addProject(){
    const projectName = document.getElementById('ProjectName').value;
    const description = document.getElementById('Description').value;
    const startDate = document.getElementById('StartDate').value;
    const endDate = document.getElementById('EndDate').value;
    const status = document.getElementById('Status').value;
    const CreatorID = sessionStorage.getItem('FNP_userId')

    const formData = {
        ProjectName: projectName,
        Description: description,
        StartDate: startDate,
        EndDate: endDate,
        Status: status,
        CreatorID: CreatorID,
      };
    
        fetch('http://localhost:3003/api/projects/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        })
        .then((res) => res.json())
        .then((response) => {
            alert(response.message); 
            handleClose();
            getProjects()
           
        })
        .catch((error) => {
            console.error('Error adding project:', error);
            // Handle errors if the request fails
        });

  }


    return(
        <div style={{width:'100%'}} >
            <div style={{display:'flex' , justifyContent:'space-between' }} >
                <h2>Projects</h2>
            <Button variant="primary" onClick={handleShow}>
            Add a new Project
            </Button>            
            </div>

            <div style={{display:'flex' , gap:'30px' , flexWrap:'wrap'}} >


            {/* <ProjectCard/> */}

  <>
      {projects && projects.length > 0 ? (
        projects.map((item, index) => (

       
          <Card
            key={index}
            style={{ background: 'var(--light)', color: 'white', width: '300px' }}
            onClick={() => {
              setModalShow(true) 
              setSelect(item.ProjectID)
            }}
          >
            <Card.Header>
              {item.ProjectName}
            
              </Card.Header>
            <Card.Body>
              <Card.Title>Project Description</Card.Title>
              <br />
              <div>
                <p>Start Date: {formatDate(item.StartDate)}</p>
                <p>End Date: {formatDate(item.EndDate)}</p>
              </div>
              <br />
              <div>
                {item.AssigneeProfilePicture && item.AssigneeProfilePicture.length > 0 ? (
                  item.AssigneeProfilePicture.map((profilePic, i) => (
                    <img key={i} className="MyAvatar" src={require(`../photos/${profilePic}`)} alt={`Profile ${i}`} />
                  ))
                ) : null}
              </div>
              <div style={{display:'flex' , alignItems:'center' , gap:'20px'}}>
              <p>Admin :</p>
              <img className='MyAvatar' src={require(`../photos/${item.CreatorProfilePicture}`)} />
              </div>
              <br />
              
              <Card.Text>

              {item.ProjectStatus === 'Done' ? (
                   <span className={`MyChip Done`}>{item.ProjectStatus}</span>
                ) : item.ProjectStatus === 'Pending' ? (
                   <span className={`MyChip Pending`}>{item.ProjectStatus}</span>
                ) : (
                  <span className={`MyChip InReview`}>{item.ProjectStatus}</span>
                )}
            </Card.Text>

            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No projects available</p>
      )}

      <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
    </>

            </div>



     <Modal show={show} onHide={handleClose}>
        <div style={{     background: 'var(--light)', display: 'flex', flexDirection: 'column', padding: '14px',gap: '22px' }} >
         <h1>hd</h1>
      
          <label htmlFor="ProjectName">Project Name</label>
          <input type="text" id="ProjectName" name="ProjectName" required />

          <label htmlFor="Description">Description</label>
          <textarea id="Description" name="Description" required />

          <label htmlFor="StartDate">Start Date</label>
          <input type="date" id="StartDate" name="StartDate" required />

          <label htmlFor="EndDate">End Date</label>
          <input type="date" id="EndDate" name="EndDate" required />

          <label htmlFor="Status">Status</label>
          <select id="Status" name="Status" required>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <Button onClick={()=>addProject()}>Add Project</Button>
          </div> 
          </Modal>
         
        </div>
       
    )
}