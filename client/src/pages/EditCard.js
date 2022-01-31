import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../App";

function EditCard() {
    let { cid } = useParams();
    const { authState, refreshNavbar } = useContext(AuthContext);
    const [card, setCard] = useState({});
    let navigate = useNavigate();

    const initialValues = {
        front: card.front,
        back: card.back
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/card/${cid}`).then((res) => {
            if (res.data.error) {
                alert(res.data.error);
            } else {
                setCard(res.data);
            }
        });
        refreshNavbar();
    }, []);

    const onSubmit = (data) => {
        axios.patch(`http://localhost:3001/card/update/${cid}`, data).then((res) => {
            alert(res.data);
            navigate("/dashboard");
        });
    };

    const cancel = () => {
        return function () {
            navigate("/dashboard");
        }
    }

    return (
        <div className='newCardContainer'>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                <Form className='newCardForm'>
                    <Field
                        as="textarea"
                        autoComplete="off"
                        className="newCardField"
                        name="front"
                        placeholder="Lernkarte Vorderseite"
                    />

                    <Field
                        as="textarea"
                        autoComplete="off"
                        className="newCardField"
                        name="back"
                        placeholder="Lernkarte Rückseite"
                    />
                    <div className='buttonContainer'>
                        <button type="submit"> Karte bearbeiten</button>
                    </div>
                </Form>
            </Formik>
        </div>

    )
}

export default EditCard;