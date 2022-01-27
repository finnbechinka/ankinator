import React, { useState, useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

function Register() {
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    type: "user"
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().min(3).max(100).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    console.log("submit call");
    axios.post("http://localhost:3001/auth", data).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        alert("Registerierung erfolgreich")
      }
      console.log(res.data);
    });
  };

  useEffect(() => {
    if (authState.status == true) {
      navigate("/");
    }
  }, []);

  return (
    <div className="registerContainer">

      <div className="header">
        <label>Registrieren</label>
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <div className="formLabel">
            <label>E-Mail: </label>
          </div>
          <ErrorMessage name="email" component="span" />
          <Field
            autocomplete="off"
            className="field"
            name="email"
            placeholder="(MaxMustermann@mail.de)"
          />
          <div className="formLabel">
            <label>Passwort: </label>
          </div>
          <ErrorMessage name="password" component="span" />
          <Field
            autocomplete="off"
            type="password"
            className="field"
            name="password"
            placeholder="(Dein Passwort...)"
          />

          <button type="submit"> Account erstellen</button>
        </Form>

      </Formik>

    </div>
  );
}

export default Register;

