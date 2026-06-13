import React from 'react';
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {

  }

  return (
    <div id="ui-container">
      <section id="display-information">
        <div id="profile-picture"></div>
        <h1>Employee Portal</h1>
        <h2>Imaginary Company platform</h2>
      </section>
      <section id="login-fields">
        <div id="login-container" >
          <div id="gap1" className="gap" style={{height:"5vh"}}></div>
            <div id="heading">
              <h1>Sign in</h1>
              <h2>Enter your credentials to access employee portal</h2>
            </div>
            <div id="gap2" className="gap"style={{height:"5vh"}}></div>
            <div id="inputs">
              <p>USERNAME</p>
              <input id="username" className="text-input" placeholder="Username" type="text"/>
              <p>PASSWORD</p>
              <input id="password" className="text-input" placeholder="Password" type="text"/>
            </div>
            <div id="buttons">
              <button
                type="button"
                className="button"
                onClick={() => handleLogin()}
              >Login
              </button>
              <button
                type="button"
                className="button"
                onClick={() => handleLogin()}
              >Forgot Password
              </button>
            </div>
        </div>
      </section>
    </div>
  )
}

export default App
