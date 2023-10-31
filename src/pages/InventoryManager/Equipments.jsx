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

const Equipments = () => {
  const [modalType, setModalType] = useState(null);
  const [deleteEModalOpen, setDeleteEModalOpen] = useState(false);
  const [addEModalOpen, setAddEModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [editEModalOpen, setEditEModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [equipmentData, setEquipmentData] = useState([]);
  const { themeSettings, setThemeSettings } = useStateContext();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [filteredEquipmentData, setFilteredEquipmentData] = useState([]);
  const perPage = 4; // Number of items per page

  const openDeleteEModal = () => {
    setDeleteEModalOpen(true);
  };

  const closeDeleteEModal = () => {
    setDeleteEModalOpen(false);
  };

  const openAddEModal = () => {
    setAddEModalOpen(true);
  };

  const closeAddEModal = () => {
    setAddEModalOpen(false);
  };

  const handleViewClick = (equipment) => {
    setSelectedEquipment(equipment);
    setModalType("detail");
  };

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
        setFilteredEquipmentData(data);
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  useEffect(() => {
    const filteredData = equipmentData.filter((equipment) => (
      (equipment.equipment_id.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
      (equipment.equipment_name.toLowerCase().includes(searchQuery.toLowerCase()))
    ));
    setFilteredEquipmentData(filteredData);
  }, [equipmentData, searchQuery]);

  const paginatedEquipmentData = filteredEquipmentData.slice(currentPage * perPage, (currentPage + 1) * perPage);

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
            <Header title="Equipment Items in the Inventory" category="gdfcgf" />
            <div className=" relative flex gap-20 justify-between ml-10 w-full">
  <input
    type="text"
    placeholder="Search..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-1/4 px-3 py-2 rounded-md border-2 border-gray-200 focus:outline-none mt-4"
  />
  <button
    onClick={openAddEModal}
    className="absolute top-0 right-0 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 mr-10 mt-4 rounded-lg"
  >
    Add New Material 
  </button>
</div>

            <br/><br/>
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
                  <tr key={equipment.equipment_id}>
                    <td className="px-6 py-4 whitespace-nowrap">{equipment.equipment_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {equipment.equipment_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{equipment.quantity}</td>
                    <td className="py-2">
                      <div className="flex">
                        <button
                          onClick={() => handleViewClick(equipment)}
                          className="p-0 border-none bg-transparent mx-2"
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button
                          onClick={() => handleOpenEditEModal(equipment)}
                          className="p-0 border-none bg-transparent mx-2"
                        >
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                        <button
                          onClick={() => handleOpenDeleteEModal(equipment)}
                          className="p-0 border-none bg-transparent mx-2"
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ReactPaginate
              previousLabel={
                <div className="flex items-center space-x-2">
                  <span className="text-red-600">
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </span>
                  <span className="hidden md:block text-gray-600">Previous</span>
                </div>
              }
              nextLabel={
                <div className="flex items-center space-x-2">
                  <span className="hidden md:block text-gray-600">Next</span>
                  <span className="text-green-600">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </div>
              }
              breakLabel={<span className="text-gray-600 px-2 py-1 rounded-md hover:bg-gray-100">...</span>}
              pageCount={Math.ceil(filteredEquipmentData.length / perPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={(data) => {
                setCurrentPage(data.selected);
              }}
              containerClassName={'flex justify-center mt-5 space-x-2'}
              pageClassName={'bg-white text-green-600 px-3 py-1 rounded-md hover:bg-gray-100'}
              activeClassName={'bg-gray-900 text-white px-3 py-1 rounded-md'}
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
            const updatedEquipmentData = equipmentData.filter(
              (equipment) => equipment.equipment_id !== selectedEquipment.equipment_id
            );
            setEquipmentData(updatedEquipmentData);

            // Close the modal
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

export default Equipments;