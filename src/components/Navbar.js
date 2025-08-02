import { Navbar as BSNavbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <BSNavbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <BSNavbar.Brand as={Link} to="/">
          Employee Manager
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/employees" className="nav-link">
              <i className="bi bi-people-fill me-1"></i>Employees
            </Nav.Link>
            <Nav.Link as={Link} to="/employees/add" className="nav-link">
              <i className="bi bi-person-plus-fill me-1"></i>Add Employee
            </Nav.Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}

export default Navbar;