import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './SignUp.css';

function SignUp() {
  let navigate=useNavigate();
  function sendData() {
    let user = document.getElementById("user").value;
    let password = document.getElementById("pass").value;
    let email = document.getElementById("email").value;
    let role = document.getElementById("role").value;
    
    const requestOptions = {
      method: 'POST',
      
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user, email: email, password: password, role: role })
    };
    console.log("hiii");

    fetch('http://localhost:3001/signup', requestOptions)
      .then(response => {return response.json();})
      .then(data => {console.log(data);navigate('/',{state:{user:data.user}})});
    
  }

  return (
    <div className="container">
      <div className="form-container">
        <div className="header">
          <h1>Register</h1>
        </div>
        <div className="input-container">
          <div className="input-box">
            <input type="text" placeholder="Username" id="user" />
          </div>
          <div className="input-box">
            <input type="email" placeholder="Email" id="email" />
          </div>
          <div className="input-box">
            <input type="text" placeholder="manager/employee" id="role" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password (min 6 char)" id="pass" />
          </div>
          <div className="button-box">
            <button onClick={sendData}>Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;


