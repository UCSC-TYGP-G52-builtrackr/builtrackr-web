import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from 'axios';

export const DropE = () => {
  // React state to manage selected options
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchSelect = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/drop/dropdownE');
        // Replace with your API endpoint to fetch card data

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

  useEffect(() => {
    // Load selected options from localStorage on component mount
    const storedSelectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));
    if (storedSelectedOptions) {
      setSelectedOptions(storedSelectedOptions);
    }
  }, []);

  // Function triggered on selection
  function handleSelect(selected) {
    setSelectedOptions(selected);
    // Save selected options to localStorage
    localStorage.setItem('selectedOptions', JSON.stringify(selected));
  }

  return (
    <div className="app">
      <h2>Choose your employee(s)</h2>
      <div className="dropdown-container">
        <Select
          options={options}
          placeholder="Select employee(s)"
          value={selectedOptions}
          onChange={handleSelect}
          isSearchable={true}
          isMulti
        />
      </div>
    </div>
  );
};
