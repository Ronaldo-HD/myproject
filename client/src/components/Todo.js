import  React,{useState , useEffect} from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


import '../styles/todo.css'

export default function Todo(){

    const [todos , setTodos] = useState([])
    const userid = sessionStorage.getItem('FNP_userId') 
   

    function fetchdata(){
      
        fetch(`http://localhost:3003/getotodolist?userid=${userid}`)
        .then(response=>response.json())
        .then(res => {
            setTodos(res)
            console.log(todos)
           
        })
    }
        useEffect(()=>{
          fetchdata()
        },[])

 
    function addToDo() {
        const todo = document.getElementById('todoInput').value;

        if(todo==''){
            alert('Empty field')
        }else{

            fetch('http://localhost:3003/addtodolist', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  userid: sessionStorage.getItem('FNP_userId'),
                  description: todo,
                }),
              })
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  return response.json();
                })
                .then(data => {
                  console.log('Success:', data);
                  // Handle success response
                  fetchdata();
                })
                .catch(error => {
                  console.error('Error:', error);
                  // Handle error
                });

                document.getElementById('todoInput').value=''; 
        }
 
      
      }


      function deleteTodo(item){        
        fetch(`http://localhost:3003/deletetodolist?todoid=${item}`,{
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              todoid: item,
    
            }),
          })
          .then(res=>res.json())
          .then(response =>{
            if(response){
                fetchdata()
            }else{
                alert("Error Removing")
            }
             
          })


          
      }


    return(
        <div className='todoDiv element' >

            
            <p id='loader'  style={{display:'none'}}>Loading....</p>
            <h3>Todo List</h3>
            <div className='todoInputs' >

            <input id='todoInput' placeholder='add some tasks ...' style={{width:'100%'}}/>
            <button onClick={addToDo} className='button'>Add</button>

            </div>

             <div id='todobody' style={{display:'flex' , flexDirection:'column'}} >
             {  todos.length > 0 ? (
              todos.map(todo => (
                    <div style={{display:'flex' , justifyContent:'space-between'}} key={todo.id}> {/* Assuming todos have unique ids */}
                        <FormControlLabel control={<Checkbox defaultChecked />} label={todo.Description} />
                        <IconButton onClick={() => deleteTodo(todo.ToDoID)} aria-label="delete">
                         <DeleteIcon />
                        </IconButton>
                    </div>
                    ))
                ) : (
                    <p style={{textAlign:'center' , padding:'20px'}} >Your to do list is empty</p>
                )}
             {/* <FormControlLabel control={<Checkbox defaultChecked />} label="sddd" /> */}
             </div>
        </div>

    )
}