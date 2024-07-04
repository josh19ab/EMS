import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';

import './EmployeeList.css';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/employees', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setEmployees(response.data);
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
  }, []);

  const handleDelete = (employeeId) => {
    const token = localStorage.getItem('token');
    axios.delete(`/api/employees/${employeeId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setEmployees(employees.filter(employee => employee.id !== employeeId));
    })
    .catch(error => {
      console.error('There was an error deleting the employee!', error);
    });
  };

  return (
    <div className="container">
      <h2>Employee List</h2>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td data-label="Name">{employee.name}</td>
              <td data-label="Email">{employee.email}</td>
              <td data-label="Department">{employee.department}</td>
              <td data-label="Salary">{employee.salary}</td>
              <td data-label="Actions">
                <Link to={`/employees/${employee.id}`} className="btn btn-primary btn-sm me-2">View</Link>
                <Link to={`/employees/edit/${employee.id}`} className="btn btn-secondary btn-sm me-2">Edit</Link> 
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(employee.id)}>
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;