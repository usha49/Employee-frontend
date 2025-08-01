import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import EditEmployee from './EditEmployee';
import { Link } from 'react-router-dom';


function EmployeeList() {
  // State to store employee data
  const [employees, setEmployees] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEmployee, setCurrentEmployee ] = useState(null);

  // fetching employees when component loads
  useEffect(() => {
    fetch('/api/employees')
      .then(res => res.json())
      .then(data => setEmployees(data));
  }, []);

  // API call to get all employees
  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/employees');
      console.log("API Response :", response.data); // Debug log
      setEmployees(response.data); // storing data in state
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleEdit = (emp) => {
    setCurrentEmployee(emp); // passing the entore employee object not just the ID
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/employees/${id}`);
      fetchEmployees(); // Refresh list
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // display logic
  return (
    <div className= "mt-4">
      <h2>Employee List</h2>
      <Table striped bordered hover>
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
          {employees.map(emp => (
            <tr key={emp.empId}>
              <td>{emp.empId}</td>
              <td>{emp.empName}</td>
              <td>{emp.empAddress}</td>
              <td>{emp.empPhone}</td>
              <td>{emp.empPost}</td>
              <td>{emp.empAge}</td>
              <td>{emp.empSalary}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(emp)}>Edit</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(emp.empId)}>Delete</Button>
              </td>
            </tr>
          ))}
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