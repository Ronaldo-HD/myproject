import React from "react";
import '../styles/login.css'


function Login(){

    const functionlogin = () => {
       
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
      
        console.log(username , password)
        
        const url = `http://localhost:3003/login?username=${username}&password=${password}`;
        console.log(url)

    fetch(url)
      .then(res=>res.json())
        .then(response => {
          console.log("Login" , response)
       
          if (response.message=='Success') {
            window.location.href='/main'
            sessionStorage.setItem('FNP_userId',response.user.UserID)
            sessionStorage.setItem('role',response.user.Role)
            sessionStorage.setItem('image',response.user.ProfilePicture)
            sessionStorage.setItem('name',response.user.Username)
          }else{
            alert('Login Failed')
          }
          // Redirect to main page if authentication is successful
          
        })
        .catch(error => {
          console.error('Login failed:', error.message);
          // Handle error (e.g., show error message to user)
        });
      };

    


    return(
    <div className="loginbody">   
        <div className="loginform">
            <h1>Login</h1>
            <p>Welcome to the Final Project Software</p>
            <br></br>
            <span className="spans">Email or Username</span>
            <input  id="username" placeholder="Enter your email or username " />
            <br></br>
            <span className="spans">Password</span>
            <input id="password"  placeholder="Password" />
            <br></br>
            <div>
                <p style={{color:'#7367f0',cursor:'pointer'}} >Forgot Password ?</p>
              
                <p>Dont have an account? <span style={{color:'#7367f0',cursor:'pointer',fontWeight:'400'}}>Create an account</span></p>
            </div>
            <br></br>
            <div>
            <input  type="checkbox"/> Remember Me
            </div>
         
            <br></br>
            <button id="loginButton" onClick={functionlogin} >Sign In</button>
        </div>
    </div>
    )

}

export default Login;