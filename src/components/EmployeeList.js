import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';


function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/employees/${id}`);
      fetchEmployees(); // Refresh list
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className= "mt-4">
      <h2>Employee List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
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
              <td>{emp.empPost}</td>
              <td>{emp.empAge}</td>
              <td>{emp.empSalary}</td>
              <td>
                <Button variant="warning" size="sm">Edit</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(emp.empId)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default EmployeeList;