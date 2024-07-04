import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'

function Dashboard() {
  const [employeeCount, setEmployeeCount] = useState(0);

  useEffect(() => {
    // Fetch the number of employees from the backend
    const fetchEmployeeCount = async () => {
      try {
        const response = await fetch('/api/employees/count', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setEmployeeCount(data.count);
      } catch (error) {
        console.error('Error fetching employee count:', error);
      }
    };

    fetchEmployeeCount();
  }, []);

  return (
    <div className="container my-5">
      <div className="row align-items-center">
        <div className="col-md-6">
        <h1>Dashboard</h1>
          <div className="row g-2">
            <div className="col-md-6">
              <div className="card" id='card'>
                <div className="card-body">
                  <h5 className="card-title">Number of Employees</h5>
                  <p className="card-text">{employeeCount}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card" id='card'>
                <div className="card-body">
                  <h5 className="card-title">Add Employee</h5>
                  <p className="card-text">Click to add a new employee.</p>
                  <Link to="/employees/new" className="btn btn-primary">
                    Add Employee
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="card" id='card'>
                <div className="card-body">
                  <h5 className="card-title">Employee List</h5>
                  <p className="card-text">View the list of employees.</p>
                  <Link to="/employees" className="btn btn-primary">
                    View Employees
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="img-fluid">
            <img src="/bg.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;