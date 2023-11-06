import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SubjectList = () => {
  const [students, setStudents] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(''); // State to store the selected teacher

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          "https://teacher-student-info-default-rtdb.firebaseio.com/subject.json"
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

    fetchStudents();
    fetchTeachers();
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
          <h2>Subject List</h2>
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
        <p>Loading Subject data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Class</th>
              <th>subject Name</th>
              <th>language</th>
              <th>teacher</th>
            </tr>
          </thead>
          <tbody>
            
              {filteredStudents.map((student, index) => (
                <tr key={index}>
                  <td>{student.class}</td>
                  <td>{student.name}</td>
                  <td>{student.language}</td>
                  <td>{student.teacher}</td>

                  {/* {
                    <div className="filter">
                    <select
                      value={selectedTeacher}
                      onChange={(e) => setSelectedTeacher(e.target.value)}
                    >
                      <option value="">All Teachers</option>
                      {teacher.map((teacher) => (
                        <option key={teacher.id} value={teacher.name}>
                          {teacher.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  } */}
                  
                  {/* Display other student information */}
                </tr>
              ))}
            
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SubjectList;