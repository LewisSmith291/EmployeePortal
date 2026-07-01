import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import PortalHomePage from './pages/PortalHomePage'
import EmployeesPage from './pages/EmployeesPage'
import ProfilePage from './pages/ProfilePage'
import TimeOffPage from './pages/TimeOffPage'
import PayslipsPage from './pages/PayslipsPage'
import { API_BASE_URL } from './apiBase'

function RequireAuth({ currentUser, children }) {
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
}

function RequireAdmin({currentUser, children}){
  if (currentUser?.role !== "admin") return <Navigate to="/portal/home" replace />;
  return children;
}

function RedirectIfAuthed({ currentUser, children }) {
  if (currentUser) return <Navigate to="/portal/home" replace />;
  return children;
}

function App() {
  // Holds logged-in user's information. If null, there is no currently logged-in user
  const [currentUser, setCurrentUser] = useState(null);

  // Checks to see if still waiting to hear back from /me on initial load
  const [checkingSession, setCheckingSession] = useState(true);

  // Empty dependency array causes it to run once page loads
  useEffect(() => {
    fetch(`${API_BASE_URL}/auth/me`, {
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
    .catch(() => {
      setCurrentUser(null)
    }) // If there is an error, set currentUser to null
    .finally(() => {
      setCheckingSession(false)
    }); // Finish session checking
  }, []);

  async function handleLogin(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // sends/recieves sesison cookie cross origin
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error("Invalid email or password");
    }

    const data = await response.json();
    setCurrentUser(data);
    return data;
  }

  async function handleLogout() {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // Log out straight away manually whether success or catch so not slow
      setCurrentUser(null);
    }
  }

  // Only render Loading text while checking for session, instead of login screen flashing for user if signed in already
  if (checkingSession) {
    return (
      <div id="loading-text-container">
        <p id="loading">Loading...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/portal/home" replace />} />
      <Route
        path="/login"
        element={
          <RedirectIfAuthed currentUser={currentUser}>
            <LoginPage onLogin={handleLogin} />
          </RedirectIfAuthed>
        }
      />
      <Route
        path="/portal/home"
        element={
          <RequireAuth currentUser={currentUser}>
            <PortalHomePage currentUser={currentUser} onLogout={handleLogout} />
          </RequireAuth>
        }
      />
      <Route
        path="/portal/admin/employees"
        element={
          <RequireAuth currentUser={currentUser}>
            <RequireAdmin currentUser={currentUser}>
              <EmployeesPage onLogout={handleLogout} />
            </RequireAdmin>
          </RequireAuth>
        }
      />
      <Route 
        path="/portal/profile"
        element={
          <RequireAuth currentUser={currentUser}>
            <ProfilePage currentUser={currentUser} onLogout={handleLogout} />
          </RequireAuth>
        }
      />
      <Route 
        path="/portal/time-off"
        element={
          <RequireAuth currentUser={currentUser}>
            <TimeOffPage currentUser={currentUser} onLogout={handleLogout} />
          </RequireAuth>
        }
      />
      <Route 
        path="/portal/payslips"
        element={
          <RequireAuth currentUser={currentUser}>
            <PayslipsPage currentUser={currentUser} onLogout={handleLogout} />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App
