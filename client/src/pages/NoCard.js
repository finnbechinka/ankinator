import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from "formik";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

function NoCard() {
    const { authState, refreshNavbar } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(authState.status){
            
        }else{
            navigate("/");
        }
        refreshNavbar();
    }, [authState]);

    return (
        <div className="noCardContainer">
            <div className="header">
                        <label>Wir haben keine Karte mehr für dich.</label>
                        <br></br>
                        <br></br>
                        <label>Erstell doch eine Neue!</label>
                    </div>
        </div>
    )
}

export default NoCard;