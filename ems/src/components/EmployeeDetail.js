import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Notification from './Notification';

function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/employees`;

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${apiUrl}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setEmployee(response.data);
    })
    .catch(error => {
      setNotification({ message: 'Error fetching employee data.', type: 'danger' });
    });
  }, [id, apiUrl]);

  const handleDelete = () => {
    const token = localStorage.getItem('token');
    axios.delete(`${apiUrl}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setNotification({ message: 'Employee deleted successfully.', type: 'success' });
      setTimeout(() => navigate('/employees'), 2000);
    })
    .catch(error => {
      setNotification({ message: 'Error deleting employee.', type: 'danger' });
    });
  };

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Employee Detail</h2>
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: '', type: '' })}
        />
        <p className="card-text"><strong>Name:</strong> {employee.name}</p>
        <p className="card-text"><strong>Email:</strong> {employee.email}</p>
        <p className="card-text"><strong>Department:</strong> {employee.department}</p>
        <p className="card-text"><strong>Salary:</strong> {employee.salary}</p>
        <button onClick={() => navigate(`/employees/edit/${employee.id}`)} className="btn btn-secondary me-2">Edit</button>
        <button onClick={handleDelete} className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
}

export default EmployeeDetail;