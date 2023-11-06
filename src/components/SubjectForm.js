import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify"; // Import react-toastify
import { Link } from "react-router-dom";
import Select from "react-select"; // Import the Select component

const subjectValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  class: Yup.string().required("Class is required"),
  language: Yup.array(), // Remove the required validation
});

const languageOptions = [
  { value: "english", label: "English" },
  { value: "hindi", label: "Hindi" },
  // Add more language options
];

const SubjectForm = () => {
  const [teacher, setTeacher] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState("Select..."); // State to store the selected teacher
  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Add the selected teacher's name to the values object
      values.teacher = selectedTeacher;

      // Send the form data to the Firebase Realtime Database
      const response = await fetch(
        "https://teacher-student-info-default-rtdb.firebaseio.com/subject.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        // Clear the form after successful submission
        resetForm();
        toast.success("Subject data submitted successfully");
      } else {
        throw new Error("Failed to submit the form");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch(
          "https://teacher-student-info-default-rtdb.firebaseio.com/teacher.json"
        );
        if (response.ok) {
          const data = await response.json();
          // Convert the data object into an array
          const teacherArray = Object.values(data);
          setTeacher(teacherArray);
          setFilteredTeachers(teacherArray); // Initialize filtered students with all data
        } else {
          setError("Failed to fetch student data");
        }
        setLoading(false);
      } catch (error) {
        setError("Error fetching student data: " + error.message);
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <>
      <div className="main-form">
        <div className="inner-form">
          <div className="head">
            <h2>Subject Register Form</h2>
            {/* <span
            className="link-reset"
            onClick={() => {
              resetForm(); // Reset the form using Formik's resetForm function
            }}
          >
            Reset Form
          </span> */}
          </div>
          <Formik
            initialValues={{
              name: "",
              class: "",
              language: [], // Initialize language as an empty array
              teacher: [],
            }}
            validationSchema={subjectValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="input-field">
                  <label htmlFor="name">Subject Name</label>
                  <Field type="text" id="name" name="name" placeholder="Name" />
                  <ErrorMessage className="error" name="name" component="div" />
                </div>

                <div className="input-field">
                  <label htmlFor="class">Class</label>
                  <Field
                    type="text"
                    id="class"
                    name="class"
                    placeholder="Class"
                  />
                  <ErrorMessage
                    className="error"
                    name="class"
                    component="div"
                  />
                </div>

                <div className="input-field">
                  <label htmlFor="language">Language(s)</label>
                  <Select
                    id="language"
                    name="language"
                    options={languageOptions}
                    isMulti
                    // Update form values when language options change
                    onChange={(selectedOptions) =>
                      setFieldValue(
                        "language",
                        selectedOptions.map((option) => option.value)
                      )
                    }
                    // Set the default selected options based on form values
                    value={languageOptions.filter((option) =>
                      values.language.includes(option.value)
                    )}
                  />
                </div>

                <div className="input-field">
                  <label htmlFor="teacher">Select Teacher</label>
                  {
                    <div className="filter">
                      {/* <select
                      value={selectedTeacher}
                      onChange={(e) => setSelectedTeacher(e.target.value)}
                    >
                      <option value="">Select...</option>
                      {teacher.map((teacher) => (
                        <option key={teacher.id} value={teacher.name}>
                          {teacher.name}
                        </option>
                      ))}
                    </select> */}

                      <Select
                        value={{
                          value: selectedTeacher,
                          label: selectedTeacher,
                        }}
                        onChange={(selectedOption) =>
                          setSelectedTeacher(selectedOption.value)
                        }
                        options={teacher.map((teacher) => ({
                          value: teacher.name,
                          label: teacher.name,
                        }))}
                        placeholder="Select..."
                      />
                    </div>
                  }
                </div>

                <div className="btm-sec">
                  <button type="submit">Submit</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default SubjectForm;
