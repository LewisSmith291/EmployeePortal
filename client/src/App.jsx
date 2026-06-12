import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {

  }

  return (
    <>
      <section id="center">
        <div className="login-container" >
          <input id="username" placeholder="Username / Email" type="text"/>
          <input id="password" placeholder="Username / Email" type="text"/>
          <button
            type="button"
            className="counter"
            onClick={() => console.log("Hello")}
          >Login
          </button>
          <button
            type="button"
            className="counter"
            onClick={() => console.log("Hello")}
          >Forgot Password
          </button>
        </div>
      </section>
      <section>
        
      </section>

    </>
  )
}

export default App
