import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

function AddEmployee() {
  // State to store form data
  const [employee, setEmployee] = useState({
    empId:'',
    empName: '',
    empAddress:'',
    empPhone:'',
    empPost: '',
    empAge: '',
    empSalary: ''

  });
  const [success, setSuccess] = useState(false);

  //handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      // Sending POST request to Spring Boot API
      await axios.post('http://localhost:8080/api/employees', {
        empId: employee.empId,
        empName: employee.empName,
        empAddress: employee.empAddress,
        empPhone: employee.empPhone,
        empPost: employee.empPost,
        empAge: parseInt(employee.empAge), // converting string to number
        empSalary: parseInt(employee.empSalary)
      });
      setSuccess(true);
      // Clearing form after successful submission
      setEmployee({ empId:'', empName: '',empAddress:'',empPhone:'', empPost: '', empAge: '', empSalary: '' });
      alert('Employee added successfully!');
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error adding employee:", error);
      alert('Failed to add employee!')
    }
  };

  // Form UI
  return (
    <div className="mt-4">
      <h2>Add New Employee</h2>
      {success && <Alert variant="success">Employee added successfully!</Alert>}
      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
          <Form.Label>Id</Form.Label>
          <Form.Control 
            type="number" 
            value={employee.empId}
            onChange={(e) => setEmployee({...employee, empId: e.target.value})}
            required
          />
        </Form.Group>

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
          <Form.Label>Address</Form.Label>
          <Form.Control 
            type="text" 
            value={employee.empAddress}
            onChange={(e) => setEmployee({...employee, empAddress: e.target.value})}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control 
            type="text" 
            value={employee.empPhone}
            onChange={(e) => setEmployee({...employee, empPhone: e.target.value})}
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