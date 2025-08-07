import { FaSearch as Search, FaPhone as Phone, FaEnvelope as Mail, FaEdit as Edit, FaTrash as Trash2, FaPlus as Plus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  // State for employees, loading, and error
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch employees from API
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

  // Load data when component mounts
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle employee deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/employees/${id}`);
      fetchEmployees(); // Refresh the list
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter(emp =>
    emp.empName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.empPost.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading and error states
  if (loading) return <div className="text-center py-8">Loading employees...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header + Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Employee List</h2>
        <Link 
          to="/employees/add" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={14} /> Add Employee
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
          {filteredEmployees.length} employee{filteredEmployees.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Employee Cards */}
      {filteredEmployees.length > 0 ? (
        filteredEmployees.map(employee => (
          <div key={employee.empId} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-blue-600 font-bold text-lg">
                    {employee.empName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{employee.empName}</h3>
                  <p className="text-blue-600 font-medium">{employee.empPost}</p>
                  <p className="text-gray-400 text-sm">{employee.empAddress}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="flex items-center gap-2 text-gray-500">
                    <Phone size={14} /> {employee.empPhone}
                  </p>
                  <p className="font-medium">₹{employee.empSalary.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Age: {employee.empAge}</p>
                </div>
                
                <div className="flex gap-2">
                  <Link 
                    to={`/employees/edit/${employee.empId}`} 
                    className="p-2 border rounded-md hover:bg-gray-100"
                  >
                    <Edit size={16} />
                  </Link>
                  <button 
                    className="p-2 border rounded-md hover:bg-red-100 hover:text-red-600"
                    onClick={() => handleDelete(employee.empId)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border">
          <p className="text-gray-500">
            {searchTerm ? "No matching employees found" : "No employees available"}
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;