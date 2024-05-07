import React, { useState,useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function FilesPage(){


    const [fileList, setFileList] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  

        function  getFiles(){
            fetch('http://localhost:3003/api/files') // Replace with your server endpoint to fetch files
              .then((res) => res.json())
              .then((data) => {
                setFileList(data.files); // Assuming the response contains a 'files' array
              })
              .catch((error) => console.error('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'));
          }
       
   useEffect(()=>{
    getFiles();
   },[])
    
  

    function uploadfile(event) {
        event.preventDefault(); 
    
        const fileInput = document.getElementById('inputfile');
        const selectedFile = fileInput.files[0];
        console.log('Selected File:', selectedFile); // Check selected file
    
        if (!selectedFile) {
            alert('Please select a file.');
            return;
        }
    
        const formData = new FormData();
        formData.append('file', selectedFile, selectedFile.name); // Include the file name explicitly
    
        console.log('FormData:', formData); // Check formData content
    
        // Add your fetch logic here to send formData to the backend
        fetch('http://localhost:3003/api/profile', {
            method: 'POST',
            body: formData,
        })
        .then(res => res.text())
        .then(response => {
            alert('File uploaded successfully');
            console.log(fileList)
            getFiles();
        })
        // .catch(error => {
        //     console.error('Error uploading file:', error);
        //     alert('Error uploading file. Please try again.');
        // });
        // getFiles();
    }
    
   
    return(
        <div>

            <div style={{display:'flex' , justifyContent:'space-between'}} >
                <h1>Files</h1>
                    <Button variant="primary" onClick={handleShow}>
                        Upload New File
                    </Button>      
            </div>
          

        <br></br>
    

        <div className="file-container" style={{display:'flex' , gap:'20px' ,flexWrap:'wrap' }}>

            {fileList.map((file) => {
                const fileExtension = file.name.split('.').pop().toLowerCase();
                var path;

                if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png') {
                    path = `http://localhost:3003/uploads/${file.name}`;
                }
                else {
                    path = require(`../images/${fileExtension}.png`);
                }

                return (
                    <div key={file.name}>
                        <img style={{width:'200px' , height:'200px' , borderRadius:'20px'}} 
                        src={path}  alt={file.name} />
                        <p>{file.name}</p>
                    </div>
                );
            })}

            </div>


            <Modal show={show} onHide={handleClose}  >
            <div style={{background:'var(--dark)'}} >
                
        <form action="http://localhost:3003/api/profile" method="post" encType="multipart/form-data" onSubmit={uploadfile} style={{padding:'40px'}}>
           <h1> Choose a file </h1>
           <br></br>
           <br></br>
            <input
                id="inputfile"
                type="file"
                name="file"
                className="form-control"
                style={{
                    display: 'inline-block',
                    width: 'auto',
                    padding: '6px 12px',
                    fontSize: '14px',
                    lineHeight: '1.42857143',
                    color: '#555',
                    backgroundColor: '#fff',
                    backgroundImage: 'none',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.075)',
                    transition: 'border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s',   }}/>
                    
            <Button type="submit" style={{marginLeft:'10px'}}>Upload</Button>
        </form>
            </div>
            </Modal>
        </div>
    )
}