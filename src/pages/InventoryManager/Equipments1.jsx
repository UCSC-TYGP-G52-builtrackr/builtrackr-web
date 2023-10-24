import React, { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { URData } from "../../data/HrManager/URData";
import Header from "../../components/InventoryManager/HeaderIM";
import Navbar from "../../components/InventoryManager/NavbarIM";
import Sidebar from "../../components/Sidebar";
import SidebarIM from "../../components/InventoryManager/SidebarIM";
import ChatSpace from "../../components/ChatSpace";
import { BsChatDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { decryptData } from "../../encrypt";
import "../../App.css";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import { Edit2, Trash2 } from 'react-feather';
import { Modal, Input, InputLabel, FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/joy/Divider';
import ModalDialog from '@mui/joy/ModalDialog';
import EditEModal from './EditEModal';
import AddEModal from './AddEModal';
import DeleteEModal from './DeleteEModal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import EquipmentDetailModal from "./EquipmentDetailModal";

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

const Equipments1 = () => {
  const [modalType, setModalType] = useState(null);
  const [deleteEModalOpen, setDeleteEModalOpen] = useState(false);
  const [addEModalOpen, setAddEModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [editEModalOpen, setEditEModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [equipmentData, setEquipmentData] = useState([]);
  const { themeSettings, setThemeSettings } = useStateContext();
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 3; // Number of items per page

  const openDeleteEModal = () => {
    setDeleteEModalOpen(true);
  };

  const closeDeleteEModal = () => {
    setDeleteEModalOpen(false);
  };

  const openAddEModal = () => {
    console.log("Opening Add Modal");
    setAddEModalOpen(true);
  };

  const closeAddEModal = () => {
    setAddEModalOpen(false);
  };

  const handleViewClick = (equipment) => {
    setSelectedEquipment(equipment);
    setModalType("detail");
  };

  const selectionsettings = { persistSelection: true };

  const fetchEquipmentData = () => {
    fetch('http://localhost:4000/api/equipment/getAllEquipments')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setEquipmentData(data);
      })
      .catch((error) => {
        console.error('Error fetching equipment data:', error);
      });
  };

  useEffect(() => {
    fetchEquipmentData();
  }, []);

  const handleOpenEditEModal = (equipment) => {
    setEditCategory(equipment);
    setEditEModalOpen(true);
  };

  const handleOpenDeleteEModal = (equipment) => {
    setSelectedEquipment(equipment);
    setDeleteEModalOpen(true);
  };

  const handleCloseDeleteEModal = () => {
    setDeleteEModalOpen(false);
  };

  const handleOpenModal = (equipment, type) => {
    setSelectedEquipment(equipment);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setSelectedEquipment(null);
    setModalType(null);
  };

  const paginatedEquipmentData = equipmentData.slice(currentPage * perPage, (currentPage + 1) * perPage);

  return (
    <>
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
            <br /><br />
            <Header title="Equipment Items in the Inventory" category="gdfcgf" />
            <div className="relative flex gap-80 justify-end  mr-10 w-full">
              <button
                onClick={openAddEModal}
                className="flex bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-full ml-30"
              >
                Add New Equipment
              </button>
            </div>
            <br/>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Equipment ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Item Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Available Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedEquipmentData.map((equipment) => (
                  <tr
                    key={equipment.equipment_id}
                    style={{
                      backgroundColor: equipment.quantity <= 5 ? '#FF5555' : 'white',
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{equipment.equipment_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {equipment.item_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{equipment.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleViewClick(equipment)}
                        className="mr-3"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button
                        onClick={() => handleOpenEditEModal(equipment)}
                        className="mr-3"
                      >
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </button>
                      <button
                        onClick={() => handleOpenDeleteEModal(equipment)}
                        className=""
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ReactPaginate
  previousLabel={
    <div className="flex items-center space-x-2">
      <span className="text-gray-600">
        <FontAwesomeIcon icon={faArrowLeft} />
      </span>
      <span className="hidden md:block">Previous</span>
    </div>
  }
  nextLabel={
    <div className="flex items-center space-x-2">
      <span className="hidden md:block">Next</span>
      <span className="text-gray-600">
        <FontAwesomeIcon icon={faArrowRight} />
      </span>
    </div>
  }
  breakLabel={<span className="text-gray-600 px-2 py-1 rounded-md hover:bg-gray-100">...</span>}
  pageCount={Math.ceil(equipmentData.length / perPage)}
  marginPagesDisplayed={2}
  pageRangeDisplayed={5}
  onPageChange={(data) => {
    setCurrentPage(data.selected);
  }}
  containerClassName={'flex justify-center mt-5 space-x-2'}
  pageClassName={'bg-white text-gray-600 px-3 py-1 rounded-md hover:bg-gray-100'}
  activeClassName={'bg-blue-500 text-white px-3 py-1 rounded-md'}
  previousClassName={'bg-white text-gray-600 px-3 py-1 rounded-md hover:bg-gray-100'}
  nextClassName={'bg-white text-gray-600 px-3 py-1 rounded-md hover:bg-gray-100'}
/>


          </div>
        </div>
      </div>

      {addEModalOpen && (
        <AddEModal isOpen={addEModalOpen} onClose={closeAddEModal} setEquipmentData={setEquipmentData} />
      )}
      {modalType === "detail" && selectedEquipment && (
        <EquipmentDetailModal equipment={selectedEquipment} onClose={handleCloseModal} />
      )}
      {deleteEModalOpen && (
        <DeleteEModal
          isOpen={deleteEModalOpen}
          onClose={closeDeleteEModal}
          equipmentData={selectedEquipment}
          onDelete={() => {
            // Handle deletion logic here
            // Update equipmentData if needed
            // Then, close the modal
            closeDeleteEModal();
          }}
        />
      )}
      <EditEModal
        isOpen={editEModalOpen}
        onClose={() => setEditEModalOpen(false)}
        equipmentData={editCategory}
        setEquipmentData={(updatedData) => {
          const updatedEquipmentData = equipmentData.map((equipment) => {
            if (equipment.equipment_id === updatedData.equipment_id) {
              return updatedData;
            }
            return equipment;
          });
          setEquipmentData(updatedEquipmentData);
        }}
      />
    </>
  );
};

export default Equipments1;
