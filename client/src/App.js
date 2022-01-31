import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState, useEffect, createContext } from 'react';
import axios from "axios";

import Register from "./pages/Register";
import Anmelden from "./pages/Anmelden";
import Dashboard from "./pages/Dashboard";
import NewCard from "./pages/NewCard";
import NeCard from "./pages/NoCard";
import NoCard from "./pages/NoCard";
import EditCard from "./pages/EditCard";

export const AuthContext = createContext();

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

function App() {
  const [authState, setAuthState] = useState({ email: "", id: 0, status: false });
  const [cid, setCid] = useState({cid: 0});
  const refreshNavbar = useForceUpdate();

  useEffect(() => {
    axios.get("http://localhost:3001/auth/auth", { headers: { accessToken: localStorage.getItem("accessToken"), }, }).then((response) => {
      if (response.data.error) {
        if (authState.status === true) {
          alert("response.data.error");
          setAuthState({ ...authState, status: false });
        }
      } else {
        setAuthState({ username: response.data.username, id: response.data.id, status: true });
      }
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    window.location.href = '/';
  }

  const linkStyle = {
    textDecoration: "none",
    color: 'white',
    fontFamily: "Arial, Helvetica, sans-serif",
    fontWeight: "500",
    fontSize: "18px",
    marginLeft: "15px"
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState, refreshNavbar, setCid }}>
        <Router>
          <div className="navbar">
            <div className="navBarLeft">
              {authState.status && (
                <>
                  {window.location.pathname == "/dashboard" && (
                    <>
                      <Link to={{pathname: `/card/edit/${cid}`}} params style={linkStyle}> Karte Bearbeiten</Link>
                      <Link to="/card/new" style={linkStyle}> Neue Karte</Link>
                    </>
                  )}
                  {window.location.pathname == "/dashboard/nocard" && (
                    <>
                      <Link to="/card/new" style={linkStyle}> Neue Karte</Link>
                    </>
                  )}
                  {window.location.pathname == "/card/new" && (
                    <>
                      <Link to="/dashboard" style={linkStyle}> Dashboard</Link>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="loginout">
              {!authState.status && (
                <>
                  <Link to="/" style={linkStyle}> Registrieren</Link>
                  <Link to="/login" style={linkStyle}> Anmelden</Link>
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
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Anmelden />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/nocard" element={<NoCard />} />
            <Route path="/card/new" element={<NewCard />} />
            <Route path="/card/edit/:cid" element={<EditCard />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;