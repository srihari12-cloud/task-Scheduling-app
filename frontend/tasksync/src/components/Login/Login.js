import React from 'react';
import './Login.css';
import {useNavigate} from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  function sendData() {
    
    let password = document.getElementById("pass").value;
    let email = document.getElementById("email").value;
    
    const requestOptions = {
      method: 'POST',
  
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password })
    };
    fetch('http://localhost:3001/login', requestOptions)
      .then(response => {return response.json();})
      .then(data => {console.log(data);navigate('/',{state:{user:data.user}})});
  }
  return (
    <div className="container">
      
      <div className="form-container">
        <div className="header">
          <h1>Log in</h1>
        </div>
        <div className="input-container">
          <div className="input-box">
            <input type="email" placeholder="Email" id="email"/>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password (min 6 char)" id="pass" />
          </div>
          <div className="button-box">
            <button onClick={sendData}>Log in</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
