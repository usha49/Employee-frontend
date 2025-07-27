import './App.css';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4"> Employee Management System</h1>
      <AddEmployee />
      <EmployeeList />
    </Container>
  );
}

export default App;
