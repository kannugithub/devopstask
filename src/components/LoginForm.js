import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch('https://teacher-student-info-default-rtdb.firebaseio.com/registrationform.json');

      if (response.ok) {
        const userData = await response.json();
        const { email, password } = values;

        // Find the user with the provided email
        const user = Object.values(userData).find((user) => user.email === email);

        if (user) {
          // Verify the password
          if (user.password === password) {
            // Successfully logged in
            resetForm();
            toast.success('Login successful');

            // Store login data in the loginform.json endpoint
            await fetch('https://teacher-student-info-default-rtdb.firebaseio.com/loginform.json', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, timestamp: new Date() }),
            });

            navigate('/');
          } else {
            toast.error('Invalid password');
          }
        } else {
          toast.error('User with this email does not exist');
        }
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      toast.error('Error: ' + error.message);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" placeholder="Email" />
            <ErrorMessage className="error" name="email" component="div" />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <Field type="password" id="password" name="password" placeholder="Password" />
            <ErrorMessage className="error" name="password" component="div" />
          </div>
          <div className="btm-sec">
            <button type="submit">Login</button>
            <Link to="/register">Register</Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginPage;
