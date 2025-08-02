import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Alert } from 'react-bootstrap';
import EditEmployee from './EditEmployee';
import { Link } from 'react-router-dom';


function EmployeeList() {
  // State to store employee data
  const [employees, setEmployees] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEmployee, setCurrentEmployee ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // API call to get all employees
  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/employees');
      setEmployees(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error("Error fetching employees:", err);
    }
  };

  // Fetch employees when component loads
  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEdit = (emp) => {
    setCurrentEmployee(emp); // passing the entire employee object not just the ID
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/employees/${id}`);
      // Using the already defined fetchEmployees function
      await fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  if (loading) return <div>Loading employees...</div>;
  if (error) return <Alert variant="danger">Error: {error}</Alert>;


  // display logic
  return (
    <div className= "mt-4">
      <h2>Employee List</h2>
      <Link to="/employees/add" className="mb-3 d-block">
        <Button variant="primary">Add New Employee</Button>
      </Link>
      
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Position</th>
            <th>Age</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map(emp => (
              <tr key={emp.empId}>
                <td>{emp.empId}</td>
                <td>{emp.empName}</td>
                <td>{emp.empAddress}</td>
                <td>{emp.empPhone}</td>
                <td>{emp.empPost}</td>
                <td>{emp.empAge}</td>
                <td>{emp.empSalary}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEdit(emp)}>
                    Edit
                  </Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => handleDelete(emp.empId)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">No employees found</td>
            </tr> 
          )}
        </tbody>
      </Table>

      {currentEmployee && (
      <EditEmployee
      employee={currentEmployee}
      show= {showEditModal}
      handleClose={() => setShowEditModal(false)}
      refreshList={fetchEmployees}
      />
      )}
    </div>
  );
}

export default EmployeeList;