import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify"; // Import react-toastify
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const RegistrationForm = () => {

    const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      // Send the registration data to the Firebase Realtime Database
      const response = await fetch(
        "https://teacher-student-info-default-rtdb.firebaseio.com/registrationform.json", // Update the endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        console.log("Registration data submitted successfully");
        // You can also redirect to another page or display a success message.
        toast.success("Student data submitted successfully");
        navigate("/login")
      } else {
        throw new Error("Failed to submit the form");
      }
    } catch (error) {
      console.error("Error: " + error.message);
      // You can display an error message to the user.
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div className="main-form">
      <div className="inner-form">
        <div className="head">
          <h2>Registration Form</h2>
        </div>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="input-field">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" placeholder="Name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div className="input-field">
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="input-field">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <div className="input-field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error"
              />
            </div>

            <button type="submit">Register</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default RegistrationForm;
