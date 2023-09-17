import React from "react";
import { Link } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { URData } from "../../data/HrManager/URData";
import Header from "../../components/InventoryManager/HeaderIM";
//import Dropdown from '../../components/Dropdown';
import RegFormHR from "../../components/HrManager/RegFormHR";

// dashboard common components
import Navbar from "../../components/InventoryManager/NavbarIM";
import Sidebar from "../../components/Sidebar";
import SidebarIM from "../../components/InventoryManager/SidebarIM";
import ChatSpace from "../../components/ChatSpace";
import { BsChatDots } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { decryptData } from "../../encrypt";
import "../../App.css";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import { Edit2, Trash2 } from 'react-feather';
import { Modal, Input,InputLabel, FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/joy/Divider';
import ModalDialog from '@mui/joy/ModalDialog';
import EditModal from './EditModal';
import AddModal from './AddModal';
import DeleteModal from './DeleteModal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import MaterialDetailModal from "./MaterialDetailModal";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'background.paper',
  boxShadow: 24,
  p: 10,
};






const Materials1 = () => {


  const [modalType, setModalType] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };


  const [addModalOpen, setAddModalOpen] = useState(false);


  const openAddModal = () => {
    console.log("Opening Add Modal"); // Add this line for debugging
    setAddModalOpen(true);
  };
  
  const closeAddModal = () => {
    setAddModalOpen(false);
  };
  



const [selectedMaterial, setSelectedMaterial] = useState(null);
const handleViewClick = (material) => {
  setSelectedMaterial(material);
};

const selectionsettings = { persistSelection: true };
const { themeSettings, setThemeSettings } = useStateContext();
const [open, setOpen] = React.useState(false);
const [editModalOpen, setEditModalOpen] = useState(false);
const [editCategory, setEditCategory] = useState(null);
const [materialData, setMaterialData] = useState([]);

  // Function to fetch material data from the server
  const fetchMaterialData = () => {
    fetch('http://localhost:4000/api/material/getAllMaterials') // Use a relative URL
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setMaterialData(data);
      })
      .catch((error) => {
        console.error('Error fetching material data:', error);
        // Handle the error gracefully, e.g., show an error message to the user.
      });
  };

  useEffect(() => {
    fetchMaterialData();
  }, []);

  const handleOpenEditModal = (material) => {
    setEditCategory(material);
    console.log(material);
    setEditModalOpen(true);
  };
  const handleOpenDeleteModal = (material) => {
    setSelectedMaterial(null); 
    setSelectedMaterial(material);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };
  const handleOpenModal = (material, type) => {
    setSelectedMaterial(material);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setSelectedMaterial(null);
    setModalType(null);
  };
  
  return (
    <>
    {/* delete modal */}
   
    <div className="">
      <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
        <button
          type="button"
          onClick={() => setThemeSettings(true)}
          style={{ backgroundColor: "yellow-400", borderRadius: "50%" }}
          className="p-3 text-3xl text-white bg-yellow-400 hover:drop-shadow-xl"
        >
          <BsChatDots />
        </button>
      </div>
      <div className="fixed bg-white w-72 sidebar dark:bg-secondary-dark-bg ">
        <SidebarIM />
      </div>
      <div className="ml-72">
        <div className="fixed w-full md:static bg-main-bg dark:bg-main-dark-bg navbar ">
          <Navbar />
        </div>
        
        {themeSettings && <ChatSpace />}
        <div className="md:pb-5 md:m-10 md:px-5 rounded-3xl">
          {/* <div className="flex mb-8"> */}
          <br/><br/>
            <Header title="Material Items in the Inventory" category="gdfcgf" />
            <div className="relative flex gap-80 justify-end  mr-10 w-full">
            <button
  onClick={openAddModal}
  className="flex bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-full ml-30"
>
  Add New Material
</button>


        </div>

 <table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Item Name
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Image
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Available Quantity
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Actions
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {materialData.map((material) => (
      <tr key={material.material_id}>
        <td className="px-6 py-4 whitespace-nowrap">
          <Link
            to={`/InventoryManger/Equipments/List/${material.material_id}`}
            className="text-indigo-600 hover:text-indigo-900"
          >
            {material.item_name}
          </Link>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12">
              <img
                className="h-12 w-12 rounded-full"
                src={material.photo_path}
                alt={material.item_name}
              />
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{material.quantity}</td>
        <td className="px-6 py-4 whitespace-nowrap">
        <button
                  onClick={() => handleOpenModal(material, "detail")}
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
          <button
            onClick={() => handleOpenEditModal(material)}
            className="text-indigo-600 hover:text-indigo-900"
          >
            <Edit2 />
          </button>
          <button onClick={openDeleteModal}>
  <FontAwesomeIcon icon={faTrashAlt} />
</button>
          {/* <button onClick={() => handleOpenModal(material, "delete")}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button> */}
        </td>
      </tr>
    ))}
  </tbody>
</table>
{addModalOpen && (
  <AddModal isOpen={addModalOpen} onClose={closeAddModal} setMaterialData={setMaterialData} />
)}

{modalType === "detail" && selectedMaterial && (
        <MaterialDetailModal material={selectedMaterial} onClose={handleCloseModal} />
      )}

      {/* Include DeleteModal with necessary props */}
      {/* {modalType === "delete" && selectedMaterial && (
        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={handleCloseModal}
          materialData={selectedMaterial} // Pass the selectedMaterial as materialData
          onDelete={() => {
            // Handle deletion logic here
            // Update materialData if needed
            // Then, close the modal
            handleCloseModal();
          }}
        />
      )} */}



{deleteModalOpen && (
  <DeleteModal
    isOpen={deleteModalOpen}
    onClose={closeDeleteModal}
    materialData={selectedMaterial}
    onDelete={() => {
      // Handle deletion logic here
      // Update materialData if needed
      // Then, close the modal
      closeDeleteModal();
    }}
  />
)}
{/* {selectedMaterial && (
              <MaterialDetailModal
                material={selectedMaterial}
            
              />
            )} */}
      <EditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        materialData={editCategory}
        setMaterialData={(updatedData) => {
          // Update the material data with the updated data
          const updatedMaterialData = materialData.map((material) => {
            if (material.material_id === updatedData.material_id) {
              return updatedData;
            }
            return material;
          });
          setMaterialData(updatedMaterialData);
        }}
      />

{/* {deleteModalOpen && (
        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={handleCloseDeleteModal}
          materialData={selectedMaterial}
          onDelete={() => {
            // Handle deletion logic here
            // Update materialData if needed
            // Then, close the modal
            handleCloseDeleteModal();
          }}
        />
      )} */}


          </div>  
        </div>
      {/* </div> */}
    </div>
    </>
  );
};

export default Materials1;