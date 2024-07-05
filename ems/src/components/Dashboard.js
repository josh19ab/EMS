import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import axiosInstance from "./axiosInstance";

function Dashboard() {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeCount = async () => {
      try {
        const response = await axiosInstance.get("/api/employees/count");
        setEmployeeCount(response.data.count);
      } catch (err) {
        console.error("Error fetching employee count:", err);
        setError(
          "An error occurred while fetching the employee count. Please try again later."
        );
      } finally {
        setIsLoading(false);
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
              <div className="card" id="card">
                <div className="card-body">
                  <h5 className="card-title">Number of Employees</h5>
                  {isLoading ? (
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : error ? (
                    <p className="text-danger">{error}</p>
                  ) : (
                    <p className="card-text">{employeeCount}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card" id="card">
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
              <div className="card" id="card">
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
