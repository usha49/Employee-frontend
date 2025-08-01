import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/employees/${id}`);
        setEmployee(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  if (!employee) return <div>Employee not found</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Employee Details</h2>
      
      <Card style={{ width: '30rem' }}>
        <Card.Header as="h5">
          {employee.empName} (ID: {employee.empId})
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Address:</strong> {employee.empAddress}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Phone:</strong> {employee.empPhone}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Position:</strong> {employee.empPost}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Age:</strong> {employee.empAge}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Salary:</strong> ₹{employee.empSalary}
          </ListGroup.Item>
        </ListGroup>
      </Card>

      <div className="mt-3">
        <Link to="/employees">
          <Button variant="secondary">Back to Employee List</Button>
        </Link>
        
        <Link to={`/employees/edit/${employee.empId}`} className="ms-2">
          <Button variant="primary">Edit Employee</Button>
        </Link>
      </div>
    </div>
  );
}

export default EmployeeDetails;