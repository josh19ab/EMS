import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from './axiosInstance';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader'; 


const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required')
});

function Login() {
  const navigate = useNavigate();
  const apiUrl = '/api/auth/login';
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        {isLoading && <Loader />}
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Login</h2>
            <p className="card-text text-secondary">  test user<br/>
              Username:   ' testuser  ' <br/> Password:    '  testpassword  '
            </p>
            
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={(values, { setSubmitting, setErrors }) => {
                setIsLoading(true);
                axiosInstance.post(apiUrl, values)
                  .then(response => {
                    localStorage.setItem('token', response.data.access_token);
                    navigate('/dashboard');
                  })
                  .catch(error => {
                    console.error('Login error:', error);
                    if (error.response && error.response.data && error.response.data.message) {
                      setErrors({ server: error.response.data.message });
                    } else {
                      setErrors({ server: 'An error occurred during login. Please try again later.' });
                    }
                    setSubmitting(false);
                  });
              }}
            >
              {({ isSubmitting, errors }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <Field type="text" name="username" className="form-control" />
                    <ErrorMessage name="username" component="div" className="text-danger" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <Field type="password" name="password" className="form-control" />
                    <ErrorMessage name="password" component="div" className="text-danger" />
                  </div>
                  {errors.server && <div className="text-danger mb-3">{errors.server}</div>}
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;