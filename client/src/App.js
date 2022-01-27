import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect, createContext } from 'react';
import axios from "axios";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Anmelden from "./pages/Anmelden";

export const AuthContext = createContext();

function App() {
  const [authState, setAuthState] = useState({ email: "", id: 0, status: false });
  let redirected = false;

  useEffect(() => {
    axios.get("http://localhost:3001/auth/auth", { headers: { accessToken: localStorage.getItem("accessToken"), }, }).then((response) => {
      if (response.data.error) {
        setAuthState({ ...authState, status: false });
      } else {
        setAuthState({ username: response.data.username, id: response.data.id, status: true });
      }
    })
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    window.location.href = '/register';
  }

  const linkStyle = {
    textDecoration: "none",
    color: 'white',
    fontFamily: "Arial, Helvetica, sans-serif",
    fontWeight: "500"
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <div className="loginout">
              {!authState.status && (
                <>
                  <Link to="/anmelden" style={linkStyle}> Anmelden</Link>
                </>
              )}
              {authState.status && (
                <>
                  <Link to="#" onClick={logout} style={linkStyle}> Abmelden</Link>
                </>
              )}
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/anmelden" element={<Anmelden />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;