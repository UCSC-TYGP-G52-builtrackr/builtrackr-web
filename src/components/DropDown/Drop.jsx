import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from 'axios';

export const Drop = ({ cardId, selectedLabors, onSelect }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchSelect = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/drop/dropdown');
        // Replace with your API endpoint to fetch employee data

        if (response.status === 200) {
          // Map the response data to the format expected by the Select component
          const formattedOptions = response.data.map((option) => ({
            value: option.id,
            label: option.name,
          }));
          setOptions(formattedOptions);
        }
      } catch (error) {
        console.error("Error fetching options data:", error);
      }
    };
    fetchSelect();
  }, []);

  // Function triggered on selection
  function handleSelect(selected) {
    onSelect(cardId, selected);
  }


  return (
    <div className="app">
      <h2>Choose your employee(s)</h2>
      <div className="dropdown-container">
        <Select
          options={options}
          placeholder="Select employee(s)"
          value={selectedLabors}
          onChange={handleSelect}
          isSearchable={true}
          isMulti
        />
      </div>
    </div>
  );
};
