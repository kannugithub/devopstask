import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import NotFound from "./components/NotFound";
import TeacherForm from "./components/TeacherForm";
import SubjectForm from "./components/SubjectForm";
import StudentSubjects from "./components/SubjectList";
import Navbar from "./components/Navbar";
import RegistrationForm from "./components/RegistrationForm";

function App() {
  function PublicRoute() {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  }

  function PrivateRoute() {

    <>
      <Navbar />
      <Outlet />
    </>
  }

  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <Routes>
          <Route element={<PublicRoute />}>
            <Route exact path="/" element={<StudentForm />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/teacher" element={<TeacherForm />} />
            <Route path="/subject" element={<SubjectForm />} />
            <Route path="/subject-list" element={<StudentSubjects />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>

        {/* <Route element={<PublicRoute />}>
            <Route exact path="/register" element={<RegistrationForm />} />
          </Route> */}
      </Router>

      <ToastContainer />
    </div>
  );
}

export default App;



// import "./App.css";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useState } from "react"; // Import useState from React

// import StudentForm from "./components/StudentForm";
// import StudentList from "./components/StudentList";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Outlet,
//   Navigate, // Import Navigate
// } from "react-router-dom";
// import NotFound from "./components/NotFound";
// import TeacherForm from "./components/TeacherForm";
// import SubjectForm from "./components/SubjectForm";
// import StudentSubjects from "./components/SubjectList";
// import Navbar from "./components/Navbar";
// import RegistrationForm from "./components/RegistrationForm";
// import LoginPage from "./components/LoginForm";

// function App() {
//   // Define a state variable to manage user authentication status
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   function PublicRoute() {
//     return (
//       <>
      
//         <Navbar />
//         <Outlet />
//       </>
//     );
//   }

//   function PrivateRoute() {
//     return (
//       <>
//         <Navbar />
//         <Outlet />
//       </>
//     );
//   }

//   // Function to handle user login
//   const handleLogin = () => {
//     // Update the isAuthenticated state to true
//     setIsAuthenticated(true);
//   };

//   // Function to handle user logout
//   const handleLogout = () => {
//     // Update the isAuthenticated state to false
//     setIsAuthenticated(false);
//   };

//   return (
//     <div className="App">
//       <Router>
//         <ToastContainer />
//         <Routes>
//           <Route
//             path="/"
//             element={
//               isAuthenticated ? <Navigate to="/students" /> : <PublicRoute />
//             }
//           />
//           <Route path="/register" element={<RegistrationForm />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route element={<PrivateRoute />}>
//             <Route index element={<StudentForm />} />
//             <Route path="/students" element={<StudentList />} />
//             <Route path="/teacher" element={<TeacherForm />} />
//             <Route path="/subject" element={<SubjectForm />} />
//             <Route path="/subject-list" element={<StudentSubjects />} />
//             <Route path="*" element={<NotFound />} />
//           </Route>
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;
