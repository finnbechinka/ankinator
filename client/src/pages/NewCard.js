import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

function NewCard() {
    const { authState } = useContext(AuthContext);
    let navigate = useNavigate();

    const initialValues = {
        front: "",
        back: ""
    };

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/card/new", { front: data.front, back: data.back, UserId: authState.id}).then((res) => {
            if (res.data.error) {
                alert(res.data.error);
            } else {
                alert("Karte erfolgreich erstellt");
                navigate("/dashboard");
            }
        });
    };

    return (
        <div className='newCardContainer'>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                <Form className='newCardForm'>
                    <Field
                        as="textarea"
                        autocomplete="off"
                        className="newCardField"
                        name="front"
                        placeholder="Lernkarte Vorderseite"
                    />

                    <Field
                        as="textarea"
                        autocomplete="off"
                        className="newCardField"
                        name="back"
                        placeholder="Lernkarte Rückseite"
                    />
                    <div className='buttonContainer'>
                        <button type="submit"> Karte erstellen</button>
                    </div>
                </Form>
            </Formik>
        </div>

    )
}

export default NewCard;