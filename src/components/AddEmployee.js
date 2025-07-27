import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

function AddEmployee() {
  const [employee, setEmployee] = useState({
    empName: '',
    empPost: '',
    empAge: '',
    empSalary: ''
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/employees', {
        empName: employee.empName,
        empPost: employee.empPost,
        empAge: parseInt(employee.empAge),
        empSalary: parseInt(employee.empSalary)
      });
      setSuccess(true);
      setEmployee({ empName: '', empPost: '', empAge: '', empSalary: '' });
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="mt-4">
      <h2>Add New Employee</h2>
      {success && <Alert variant="success">Employee added successfully!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            value={employee.empName}
            onChange={(e) => setEmployee({...employee, empName: e.target.value})}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Position</Form.Label>
          <Form.Control 
            type="text" 
            value={employee.empPost}
            onChange={(e) => setEmployee({...employee, empPost: e.target.value})}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control 
            type="number" 
            value={employee.empAge}
            onChange={(e) => setEmployee({...employee, empAge: e.target.value})}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Salary</Form.Label>
          <Form.Control 
            type="number" 
            value={employee.empSalary}
            onChange={(e) => setEmployee({...employee, empSalary: e.target.value})}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Employee
        </Button>
      </Form>
    </div>
  );
}

export default AddEmployee;