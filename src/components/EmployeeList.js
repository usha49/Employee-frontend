import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Alert, Card } from 'react-bootstrap';
import EditEmployee from './EditEmployee';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiUserPlus } from 'react-icons/fi';


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
    <div className="mt-4">
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Employee Directory</h4>
          <Link to="/employees/add">
            <Button variant="primary" size="sm">
              <FiUserPlus className="me-1" /> Add Employee
            </Button>
          </Link>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <Alert variant="danger" className="mb-0">
              Error: {error}
            </Alert>
          ) : (
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead className="table-light">
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
                        <td className="fw-semibold">{emp.empName}</td>
                        <td>{emp.empAddress}</td>
                        <td>{emp.empPhone}</td>
                        <td>{emp.empPost}</td>
                        <td>{emp.empAge}</td>
                        <td>₹{emp.empSalary}</td>
                        <td>
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            className="me-2"
                            onClick={() => handleEdit(emp)}
                          >
                            <FiEdit2 />
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleDelete(emp.empId)}
                          >
                            <FiTrash2 />
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
            </div>
          )}
        </Card.Body>
      </Card>

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