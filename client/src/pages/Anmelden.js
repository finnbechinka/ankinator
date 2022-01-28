import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

function Anmelden() {
  const { authState, setAuthState } = useContext(AuthContext);
  let navigate = useNavigate();

  const initialValues = {
    email: "",
    password: ""
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().min(3).max(100).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({ username: response.data.username, id: response.data.id, status: true });
        navigate("/dashboard");
      }
    });
  };

  useEffect(() => {
    if (authState.status) {
      navigate("/dashboard");
    }
  }, [authState.status, navigate]);

  return (
    <div className="loginContainer">

      <div className="header">
        <label>Anmelden</label>
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
            autoComplete="off"
            className="field"
            name="email"
            placeholder="(MaxMustermann@mail.de)"
          />
          <div className="formLabel">
            <label>Passwort: </label>
          </div>
          <ErrorMessage name="password" component="span" />
          <Field
            autoComplete="off"
            className="field"
            type="password"
            name="password"
            placeholder="(Dein Passwort...)"
          />
          <button type="submit"> Anmelden</button>
        </Form>

      </Formik>

    </div>
  )
}

export default Anmelden;

