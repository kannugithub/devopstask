import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify"; // Import react-toastify
import { Link } from "react-router-dom";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  age: Yup.number().required("Age is required"),
  sex: Yup.string().required("Sex is required"),
});

const TeacherForm = () => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Send the form data to the Firebase Realtime Database
      const response = await fetch("https://teacher-student-info-default-rtdb.firebaseio.com/teacher.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      console.log(response);

      if (response.ok) {
        // Clear the form after successful submission
        resetForm();
        toast.success("Student data submitted successfully");
      } else {
        throw Error("Failed to submit the form"); // Simulate a failed submission
      }
    } catch (error) {
      // Display an error notification
      toast.error("Error: " + error.message);
    }
    
};

  return (
    <>
      <div className="main-form">
        <div className="inner-form">
        <div className="head">
          <h2>Teacher Register Form</h2>
          {/* <span
            className="link-reset"
            onClick={() => {
              // Create a function to reset the form
              document.getElementById("studentForm").reset();
            }}
          >
            Reset Form
          </span> */}
        </div>
        <Formik
          initialValues={{
            name: "",
            age: "",
            image: "",
            sex: "", // Initialize sex with an empty string
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form id="studentForm">
            <div className="input-field">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" placeholder="Name" />
              <ErrorMessage className="error" name="name" component="div" />
            </div>

            <div className="input-field">
              <label htmlFor="age">Age</label>
              <Field type="number" id="age" name="age" placeholder="Age" />
              <ErrorMessage className="error" name="age" component="div" />
            </div>

            <div className="input-field">
              <label htmlFor="image">Image</label>
              <Field type="file" id="image" name="image" className="file"/>
            </div>

            <div className="input-field2">
              <label>Sex</label>
              <div role="group" aria-labelledby="my-radio-group">
                <label>
                  <Field type="radio" name="sex" value="male" />
                  Male
                </label>
                <label>
                  <Field type="radio" name="sex" value="female" />
                  Female
                </label>
              </div>
              <ErrorMessage className="error" name="sex" component="div" />
            </div>
            <div className="btm-sec">
              <button type="submit">Submit</button>
              
            </div>
          </Form>
        </Formik>
            </div> 
      </div>
    </>
  );
};

export default TeacherForm;
