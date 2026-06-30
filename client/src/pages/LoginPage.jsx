import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import passwordShow from "../assets/eye_show.png";
import passwordHide from "../assets/eye_hide.png";

function LoginPage({ onLogin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("please enter an email and password");
      return;
    }

    setLoading(true);

    try {
      await onLogin(email, password);
      navigate("/portal", { replace: true });
    } catch (err) {
      console.error(err);
      // Don't reveal if email or password was wrong
      setError("Invalid email or password");
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
        <form id="login-container" name="loginForm" onSubmit={handleSubmit}>
          <div id="gap1" className="gap" style={{ height: "5vh" }}></div>
          <div id="heading">
            <h1>Sign in</h1>
            <h2>Enter your credentials to access employee portal</h2>
          </div>
          <div id="gap2" className="gap" style={{ height: "5vh" }}></div>
          <div id="inputs">
            <label htmlFor="email">EMAIL</label>
            <input id="email" required className="text-input" placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="password">PASSWORD</label>
            <div id="password-container" className="password-input-container">
              <input id="password" required className="password-input-text" placeholder="Password" type={passwordHidden ? "password" : "text"} value={password}
                onChange={(e) => setPassword(e.target.value)} />
              <img id="show-password" className="show-password"
                onClick={() => setPasswordHidden(!passwordHidden)} src={passwordHidden ? passwordHide : passwordShow} alt="Hide Password" />
            </div>
          </div>
          {error && <p className="error-text">{error}</p>}
          <div id="buttons">
            <button
              type="submit"
              className="button"
              disabled={loading}
            >{loading ? "Logging in" : "Login"}
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

export default LoginPage
