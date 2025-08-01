import { Link } from 'react-router-dom';
import { Navbar as BSNavbar, Container, Nav } from 'react-bootstrap';

function Navbar() {
  return (
    <BSNavbar bg="light" expand="lg">
      <Container>
        <Nav className="me-auto">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/employees" className="nav-link">Employees</Link>
          <Link to="/employees/add" className="nav-link">Add Employee</Link>
        </Nav>
      </Container>
    </BSNavbar>
  );
}

export default Navbar;