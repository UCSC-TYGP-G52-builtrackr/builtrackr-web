import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { decryptData } from "../../encrypt";

export const Drop = ({
  cardId,
  selectedLabors,
  onSelect,
  description,
  selectedEquipment,
  selectedMaterial,
}) => {
  const [options, setOptions] = useState([]);
  const [equipmentArray, setEquipmentArray] = useState([]);
  const [materialArray, setMaterialArray] = useState([]);

  const siteid = localStorage.getItem("site_id");
  const id = decryptData(JSON.parse(localStorage.getItem("user_type")));

  useEffect(() => {
    const fetchSelect = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/drop/dropdown?siteId=${siteid}`
        );
        // Replace with your API endpoint to fetch employee data

        if (response.status === 200) {
          // Map the response data to the format expected by the Select component
          const formattedOptions = response.data.map((option) => ({
            value: option.id,
            label: option.f_name,
          }));
          setOptions(formattedOptions);
        }
      } catch (error) {
        console.error("Error fetching options data:", error);
      }
    };
    fetchSelect();
  }, [siteid]);

  // Function triggered on selection
  function handleSelect(selected) {
    onSelect(cardId, selected);
  }

  useEffect(() => {
    const getEquipmentData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/equipment/viewequipments?siteId=${siteid}`
        );
        const formattedequipmentArray = response.data.map((equipmentArray) => ({
          value: equipmentArray.equipment_id,
          label: equipmentArray.equipmentname,
        }));
        setEquipmentArray(formattedequipmentArray);
      } catch (error) {
        console.log(error);
      }
    };
    getEquipmentData();
  }, [siteid]);

  useEffect(() => {
    const getMaterialData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/equipment/viewmaterials?siteId=${siteid}`
        );
        console.log(response.data);
        const formatMaterialArray = response.data.map((materialArray) => ({
          value: materialArray.material_id,
          label: materialArray.materialname,
        }));
        setMaterialArray(formatMaterialArray);
      } catch (error) {
        console.log(error);
      }
  };
  getMaterialData ();
  }, [siteid]);

  console.log("from drop down", equipmentArray);

  return (
    <div className="app">
      <div className="dropdown-container">
        {description === "labour" ? (
          <Select
            options={options}
            placeholder="Select option(s)"
            value={selectedLabors}
            onChange={handleSelect}
            isSearchable={true}
            isDisabled={id === "4" ? true : false}
            isMulti
          />
        ) : description === "equipment" ? (
          <Select
            options={equipmentArray}
            placeholder="Select option(s)"
            value={selectedEquipment}
            onChange={handleSelect}
            isSearchable={true}
            isDisabled={id === "4" ? true : false}
            isMulti
          />
        ) : description === "material" ? (
          <Select
            options={materialArray}
            placeholder="Select option(s)"
            value={selectedMaterial}
            onChange={handleSelect}
            isSearchable={true}
            isDisabled={id === "4" ? true : false}
            isMulti
          />
        ): null}
      </div>
    </div>
  );
};
