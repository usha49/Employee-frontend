// EditEmployee.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';

function EditEmployee({ employee, show, handleClose, refreshList }) {
   // Initialize with empty values if employee is null
  const [formData, setFormData] = useState(employee || {
    empId: '',
    empName: '',
    empAddress: '',
    empPhone: '',
    empPost: '',
    empAge: '',
    empSalary: ''
  });

  useEffect(() => {
    setFormData(employee || {
      empId: '',
      empName: '',
      empAddress: '',
      empPhone: '',
      empPost: '',
      empAge: '',
      empSalary: ''
    });
  }, [employee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/employees/${employee.empId}`, formData);
      refreshList();
      handleClose();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="empName"
              value={formData.empName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="empAddress"
              value={formData.empAddress}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="empPhone"
              value={formData.empPhone}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Position</Form.Label>
            <Form.Control
              type="text"
              name="empPost"
              value={formData.empPost}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="empAge"
              value={formData.empAge}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Salary</Form.Label>
            <Form.Control
              type="number"
              name="empSalary"
              value={formData.empSalary}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditEmployee;