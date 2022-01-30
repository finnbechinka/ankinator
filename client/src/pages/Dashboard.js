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
    let navigate = useNavigate();

    let initialValues = {
        front: card.front,
        back: card.back
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/card/${authState.id}/next`).then((res) => {
            setCard(res.data);
        });
        if(!authState.status){
            navigate("/");
        }
    }, [authState]);

    const toBack = () => {
        console.log("to back");
        setViewBack(true);
    };

    return (
        <div className="dashboardContainter">
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
            >
                <Form className='newCardForm'>
                    {!viewBack && (
                        <>
                            <Field
                                as="textarea"
                                autocomplete="off"
                                className="newCardField"
                                name="front"
                                readonly="true"
                            />
                        </>
                    )}
                    {viewBack && (
                        <>
                            <Field
                                as="textarea"
                                autocomplete="off"
                                className="newCardField"
                                name="back"
                                readonly="true"
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
                    <button id='easyButton'> Einfach</button>
                    <button id='midButton'> Mittel</button>
                    <button id='hardButton'> Schwer</button>
                </>
            )}
            </div>
        </div>
    )
}

export default Dashboard;