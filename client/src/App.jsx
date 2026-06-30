import React from 'react';
import { useState, useEffect} from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Holds logged-in user's information. If null, there is no currently logged-in user
  const [currentUser, setCurrentUser] = useState(null);
  
  // Checks to see if still waiting to hear back from /me on initial load
  const [checkingSession, setCheckingSession] = useState(true);

  // Empty dependency array causes it to run once page loads
  useEffect(() => {
    // HTTP Request
    // String url as first parameter, and parameters as second parameter
    fetch(`${API_URL}/me`, {
      credentials: "include",
    })
    // The fetch doesnt throw error on 401, instead res.ok = false
    // This needs to be manually set so the catch works
    .then((res) => {
      if (!res.ok) throw new Error("Not authenticated");
      return res.json();
    })
    .then((data) => {
      setCurrentUser(data)
    }) // If no error, store session in currentUser
    .catch((reason) => {
      setCurrentUser(null)}) // If there is an error, set currentUser to null
    .finally(() => {
      setCheckingSession(false)}); // Finish session checking
  }, []);

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

      setCurrentUser(data);

      // TODO: redirect to portal home page, or lift this into some app-level "currentUser" state once you have routing set up

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again");
    } finally {
      setLoading(false);
    }
  }
  
  async function handleLogout(){
    try {
      await fetch(`${API_URL}/logout`,{
        method: "POST",
        credentials:"include", 
      });
    } catch(err) {
      console.error("Logout error:",err);
    } finally {
      // Log out straight away manually whether success or catch so not slow
      setCurrentUser(null);
    }
  }

  // Only render Loading text while checking for session, instead of login screen flashing for user if signed in already
  if (checkingSession){
    return (
      <div id="loading-text-container">
        <p id="loading">Loading...</p>
      </div>
    );
  }

  // Logged in user sees portal and greeting message
  if (currentUser){
    return (
      <div>
        <h1>Welcome, <CurrentUser currentUser={currentUser}/></h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }


  // Users that have not logged in or don't have saved session see the login portal
  return (
    <div id="ui-container">
      <section id="display-information">
        <div id="profile-picture"></div>
        <h1>Employee Portal</h1>
        <h2>Imaginary Company platform</h2>
      </section>
      <section id="login-fields">
        <form id="login-container" name="loginForm">
          <div id="gap1" className="gap" style={{height:"5vh"}}></div>
            <div id="heading">
              <h1>Sign in</h1>
              <h2>Enter your credentials to access employee portal</h2>
            </div>
            <div id="gap2" className="gap"style={{height:"5vh"}}></div>
            <div id="inputs">
              <label htmlFor="email">EMAIL</label>
              <input id="email" required className="text-input" placeholder="Email" type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              <label htmlFor="password">PASSWORD</label>
              <input id="password" required className="text-input" placeholder="Password" type="text" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div id="buttons">
              <button
                type="submit"
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
        </form>
      </section>
    </div>
  )
}

function CurrentUser({currentUser}) {
  if (currentUser){
    return currentUser.firstName + " " + currentUser.lastName;
  }
  return "";
}

export default App
