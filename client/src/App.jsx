import React from 'react';
import { useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  async function handleLogin() {
    setError("");

    if(!email || !password){
      setError("please enter an email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include", // sends/recieves sesison cookie cross origin
        body: JSON.stringify({email,password})
      });

      if (!response.ok){
        // Don't reveal if email or password was wrong
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log("Logged in as:", data);

      // TODO: redirect to portal home page, or lift this into some app-level "currentUser" state once you have routing set up

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again");
    } finally {
      setLoading(false);
    }
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
              <p>EMAIL</p>
              <input id="email" className="text-input" placeholder="Email" type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              <p>PASSWORD</p>
              <input id="password" className="text-input" placeholder="Password" type="text" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div id="buttons">
              <button
                type="button"
                className="button"
                onClick={handleLogin}
                disabled={loading}
              >{loading ? "Logging in":"Login"}
              </button>
              <button
                type="button"
                className="button"
                disabled={loading}
              >Forgot Password
              </button>
            </div>
        </div>
      </section>
    </div>
  )
}

export default App
