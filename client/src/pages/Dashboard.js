import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from "formik";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const { authState, refreshNavbar, setCid } = useContext(AuthContext);
    const [card, setCard] = useState({});
    const [viewBack, setViewBack] = useState(false);
    const navigate = useNavigate();

    let initialValues = {
        front: card.front,
        back: card.back
    };

    useEffect(() => {
        if(authState.status){
            axios.get(`http://localhost:3001/card/${authState.id}/next`).then((res) => {
                if (res.data == "Alle Karten abgearbeitet!") {
                    navigate("/dashboard/nocard");
                }else if(res.data.error){
                    navigate("/dashboard/nocard");
                } else {
                    setCard(res.data);
                    setCid(res.data.id);
                }
            });
        }else{
            navigate("/");
        }
        refreshNavbar();
    }, [authState]);

    const toBack = () => {
        setViewBack(true);
    };

    const next = (difficulty) => {
        return function () {
            axios.patch(`http://localhost:3001/card/updateInterval/${card.id}`, { difficulty: difficulty }).then((res) => {
                navigate("/");
            });
        }
    }

    return (
        <div className="dashboardContainter">
            {card.front && (
                <>
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                    >
                        <Form className='newCardForm'>
                            {!viewBack && (
                                <>
                                    <Field
                                        as="textarea"
                                        autoComplete="off"
                                        className="newCardField"
                                        name="front"
                                        readOnly={true}
                                    />
                                </>
                            )}
                            {viewBack && (
                                <>
                                    <Field
                                        as="textarea"
                                        autoComplete="off"
                                        className="newCardField"
                                        name="back"
                                        readOnly={true}
                                    />
                                </>
                            )}
                        </Form>
                    </Formik>
                    <div className='dashButtonContainer'>
                        {!viewBack && (
                            <>
                                <button onClick={toBack}> Zur Rückseite</button>
                            </>
                        )}
                        {viewBack && (
                            <>
                                <button id='easyButton' onClick={next("easy")}> Einfach</button>
                                <button id='midButton' onClick={next("neutral")}> Mittel</button>
                                <button id='hardButton' onClick={next("hard")}> Schwer</button>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default Dashboard;