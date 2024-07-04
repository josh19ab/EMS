import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Notification from './Notification';

const EmployeeSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  department: Yup.string().required('Required'),
  salary: Yup.number().required('Required')
});

function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    department: '',
    salary: ''
  });
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    if (id) {
      const token = localStorage.getItem('token');
      axios.get(`/api/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setEmployee(response.data);
      })
      .catch(error => {
        setNotification({ message: 'Error fetching employee data.', type: 'danger' });
      });
    }
  }, [id]);

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">{id ? 'Edit' : 'Add'} Employee</h2>
            <Notification
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification({ message: '', type: '' })}
            />
            <Formik
              initialValues={employee}
              enableReinitialize
              validationSchema={EmployeeSchema}
              onSubmit={(values, { setSubmitting, setErrors }) => {
                const token = localStorage.getItem('token');
                const url = id ? `/api/employees/${id}` : '/api/employees';
                const method = id ? 'put' : 'post';

                axios[method](url, values, {
                  headers: { Authorization: `Bearer ${token}` }
                })
                .then(response => {
                  setNotification({ message: `Employee ${id ? 'updated' : 'added'} successfully.`, type: 'success' });
                  setTimeout(() => navigate('/employees'), 2000);
                })
                .catch(error => {
                  if (error.response && error.response.data && error.response.data.email) {
                    setErrors({ email: error.response.data.email[0] });
                    setNotification({ message: error.response.data.email[0], type: 'danger' });
                  } else {
                    setNotification({ message: 'Error saving employee data.', type: 'danger' });
                  }
                  setSubmitting(false);
                });
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <Field type="text" name="name" className="form-control" />
                    <ErrorMessage name="name" component="div" className="text-danger" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <Field type="email" name="email" className="form-control" />
                    <ErrorMessage name="email" component="div" className="text-danger" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="department" className="form-label">Department</label>
                    <Field type="text" name="department" className="form-control" />
                    <ErrorMessage name="department" component="div" className="text-danger" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="salary" className="form-label">Salary</label>
                    <Field type="number" name="salary" className="form-control" />
                    <ErrorMessage name="salary" component="div" className="text-danger" />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {id ? 'Update' : 'Add'} Employee
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeForm;
