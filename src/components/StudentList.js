import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          "https://teacher-student-info-default-rtdb.firebaseio.com/teacherstudentinfo.json"
        );
        if (response.ok) {
          const data = await response.json();
          // Convert the data object into an array
          const studentArray = Object.values(data);
          setStudents(studentArray);
          setFilteredStudents(studentArray); // Initialize filtered students with all data
        } else {
          setError("Failed to fetch student data");
        }
        setLoading(false);
      } catch (error) {
        setError("Error fetching student data: " + error.message);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    // Filter students based on the search query
    const filteredData = students.filter((student) => {
      return student.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setFilteredStudents(filteredData);
  }, [searchQuery, students]);

  return (
    <div className="main-list">
      <div className="top-head">
        <div className="heading">
          <h2>Student List</h2>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      {loading ? (
        <p>Loading student data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Class</th>
              <th>Student Name</th>
              <th>Age</th>
              <th>Roll Number</th>
            </tr>
          </thead>
          <tbody>
            
              {filteredStudents.map((student, index) => (
                <tr key={index}>
                  <td>{student.class}</td>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.rollNumber}</td>
                  {/* Display other student information */}
                </tr>
              ))}
            
          </tbody>
        </table>
      )}
      {/* <Link to="/">Back to home</Link> */}
    </div>
  );
};

export default StudentList;