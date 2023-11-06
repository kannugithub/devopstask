import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify"; // Import react-toastify
import { Link } from "react-router-dom";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  age: Yup.number().required("Age is required"),
  rollNumber: Yup.string().required("Roll Number is required"),
});

const StudentForm = () => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Send the form data to the Firebase Realtime Database
      const response = await fetch("https://teacher-student-info-default-rtdb.firebaseio.com/teacherstudentinfo.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // Clear the form after successful submission
        resetForm();
        toast.success("Student data submitted successfully");
      } else {
        throw new Error("Failed to submit the form"); // Simulate a failed submission
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
          <h2>Student Register Form</h2>
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
            class: "",
            rollNumber: "",
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

            <div className="input-field">
              <label htmlFor="class">Class</label>
              <Field type="text" id="class" name="class" placeholder="Class" />
            </div>

            <div className="input-field">
              <label htmlFor="rollNumber">Roll Number</label>
              <Field
                type="text"
                id="rollNumber"
                name="rollNumber"
                placeholder="Roll Number"
              />
              <ErrorMessage className="error" name="rollNumber" component="div" />
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

export default StudentForm;
