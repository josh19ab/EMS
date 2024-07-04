import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required')
});

function Login() {
  const navigate = useNavigate();

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Login</h2>
            <p className="card-text text-secondary">  Demo user<br/>
              Username:   ' testuser  ' <br/> Password:    '  testpassword  '
            </p>
            
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={(values, { setSubmitting, setErrors }) => {
                axios.post('/api/auth/login', values)
                  .then(response => {
                    localStorage.setItem('token', response.data.access_token);
                    navigate('/dashboard');
                  })
                  .catch(error => {
                    console.log(error);
                    setErrors({ server: 'Invalid credentials' });
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
