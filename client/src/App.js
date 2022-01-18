import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import {useState, useEffect, createContext } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

function App() {
  
  return (
    <div className="App">
      ankinator
    </div>
  );
}

export default App;