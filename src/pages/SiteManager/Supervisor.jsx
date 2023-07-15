import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You'll need to install axios if you haven't already

const SMSupervisor = () => {
  const [supervisors, setSupervisors] = useState([]);

  useEffect(() => {
    // Fetch supervisor data from the database
    axios.get('/api/supervisors') // Replace '/api/supervisors' with your actual API endpoint
      .then(response => {
        setSupervisors(response.data);
      })
      .catch(error => {
        console.error('Error fetching supervisor data:', error);
      });
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Supervisor List</h1>
      <div className="grid grid-cols-3 gap-4">
        {supervisors.map(supervisor => (
          <div key={supervisor.id} className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-bold mb-2">{supervisor.name}</h2>
            <p>Email: {supervisor.email}</p>
            <p>Phone: {supervisor.phone}</p>
            {/* Add more fields as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SMSupervisor;
