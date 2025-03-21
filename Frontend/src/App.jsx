import { useState } from 'react'
import './App.css'

function App() {
  const [employee, setEmployee] = useState([]);
  const [dataFetched, setDataFetched] = useState(false); // Track if data is fetched

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/generate-data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      console.log("Fetched Data:", data);

      if (data && Array.isArray(data.data)) {
        setEmployee(data.data);
      } else if (Array.isArray(data)) {
        setEmployee(data);
      } else {
        console.error("Invalid data format:", data);
        setEmployee([]);
      }

      setDataFetched(true); // Set flag to true after fetching data
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <button
          onClick={fetchData}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Generate Data
        </button>
      </div>
      
      {dataFetched && ( // Only show data when it's fetched
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employee.length > 0 ? (
            employee.map((emp, index) => (
              <div key={index} className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-2">{emp.name}</h2>
                <p className="text-gray-700">Position: {emp.position}</p>
                <p className="text-gray-700">Department: {emp.department}</p>
                <p className="text-gray-700">Salary: ${emp.salary}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No employees found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
