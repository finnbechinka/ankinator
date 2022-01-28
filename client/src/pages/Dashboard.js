import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AuthContext } from "../App";

function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

function Dashboard() {
    const forceUpdate = useForceUpdate();
    const { authState } = useContext(AuthContext);
    const [card, setCard] = useState({});
    const [viewBack, setViewBack] = useState(false);
    useEffect(() => {
        async function fetchData(){
            await axios.get(`http://localhost:3001/card/${authState.id}/next`).then((res) => {
                setCard(res.data);
            });
        }
        fetchData();
    }, [authState]);

    const toBack = () => {
        console.log("to back");
        setViewBack(true);
    };

    return (
        <div className="dashboardContainter">
            <div className='card'>
                {!card && (
                    <>
                    keine karte
                    </>
                )}
                {card && (
                    <>
                    {!viewBack && (
                        <>
                            {card.front}
                        </>
                    )}
                    {viewBack && (
                        <>
                            {card.back}
                        </>
                    )}
                    <br></br>
                    <br></br>
                    <label>Zuletzt gesehen: {card.last_viewed}</label>
                    </>
                )}
            </div>
            <br></br>
            {!viewBack && (
                <>
                    <button onClick={toBack}> Zur Rückseite</button>
                </>
            )}
            {viewBack && (
                <>
                    <button > Einfach</button>
                    <button > Mittel</button>
                    <button > Schwer</button>
                </>
            )}
            
        </div>
    )
}

export default Dashboard;