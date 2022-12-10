import React from "react";
import { useState, useEffect } from "react";

function App() {
  let initialValues = { username: "", email: "", password: "" };
  let [formValues, setFormValues] = useState(initialValues);
  let [formErrors, setFormErrors] = useState({});
  let [isSubmit, setIsSubmit] = useState(false);

  let handleChange = (event) => {
    let { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  let handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors || {}).length === 0 && isSubmit) {
      console.log(formValues);
    }
    console.log(formErrors);
  }, [formErrors]);
  let validate = (values) => {
    const errors = {};
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid Email-ID";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    }

    return errors;
  };

  return (
    <div className="container">
      <form>
        <h1>Login Form</h1>
        {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}

        <div className="form_input">
          <label htmlFor="username">Username</label>
          <input placeholder="Username" type="text" name="username" value={formValues.username} onChange={handleChange}></input>
          <div className="error">{formErrors.username}</div>
        </div>

        <div className="form_input">
          <label htmlFor="email">Email-ID</label>
          <input placeholder="Email-ID" type="email" name="email" value={formValues.email} onChange={handleChange}></input>
          <div className="error">{formErrors.email}</div>
        </div>

        <div className="form_input">
          <label htmlFor="password">Password</label>
          <input placeholder="Username" type="password" name="password" value={formValues.password} onChange={handleChange}></input>
          <div className="error">{formErrors.password}</div>
        </div>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
