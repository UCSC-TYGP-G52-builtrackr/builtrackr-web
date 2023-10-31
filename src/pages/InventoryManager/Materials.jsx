import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { URData } from "../../data/HrManager/URData";
import Header from "../../components/InventoryManager/HeaderIM";
import Navbar from "../../components/InventoryManager/NavbarIM";
import SidebarIM from "../../components/InventoryManager/SidebarIM";
import ChatSpace from "../../components/ChatSpace";
import { BsChatDots } from "react-icons/bs";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../App.css";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import { Edit2, Trash2 } from 'react-feather';
import { Modal, Input, InputLabel, FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import ModalDialog from '@mui/joy/ModalDialog';
import EditModal from './EditModal';
import AddModal from './AddModal';
import DeleteModal from './DeleteModal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {faArrowRight}from "@fortawesome/free-solid-svg-icons";

import MaterialDetailModal from "./MaterialDetailModal";
import ReactPaginate from 'react-paginate';



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

const Materials = () => {
  const [modalType, setModalType] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [materialData, setMaterialData] = useState([]);
  const { themeSettings, setThemeSettings } = useStateContext();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [filteredMaterialData, setFilteredMaterialData] = useState([]);
  const perPage = 4; // Number of items per page

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const handleViewClick = (material) => {
    setSelectedMaterial(material);
    setModalType("detail");
  };

  const selectionsettings = { persistSelection: true };

  const fetchMaterialData = () => {
    fetch('http://localhost:4000/api/material/getAllMaterials')
      .then((response) => {
        if (!response.ok) {
          throw Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setMaterialData(data);
        setFilteredMaterialData(data);
      })
      .catch((error) => {
        console.error('Error fetching material data:', error);
      });
  };

  useEffect(() => {
    fetchMaterialData();
  }, []);

  const handleOpenEditModal = (material) => {
    setEditCategory(material);
    setEditModalOpen(true);
  };

  const handleOpenDeleteModal = (material) => {
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  useEffect(() => {
    const filteredData = materialData.filter((material) => (
      (material.material_id.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
      (material.material_name.toLowerCase().includes(searchQuery.toLowerCase()))
    ));
    setFilteredMaterialData(filteredData);
  }, [materialData, searchQuery]);

  const paginatedMaterialData = filteredMaterialData.slice(currentPage * perPage, (currentPage + 1) * perPage);

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
            <Header title="Material Items in the Inventory" category="gdfcgf" />
            <div className=" relative flex gap-20 justify-between ml-10 w-full">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-1/4 px-3 py-2 rounded-md border-2 border-gray-200 focus:outline-none mt-4"

              />
              <button
                onClick={openAddModal}
                className="absolute top-0 right-0 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 mr-10 mt-4 rounded-lg"
              >
                Add New Material 
              </button>
            </div>
            <br /><br />
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Material ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Item Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Available Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Unit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedMaterialData.map((material) => (
                  <tr key={material.material_id}>
                    <td className="px-6 py-4 whitespace-nowrap">{material.material_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {material.material_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{material.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{material.type}</td>
                    <td className="py-2">
                      <div className="flex">
                        <button
                          onClick={() => handleViewClick(material)}
                          className="p-0 border-none bg-transparent mx-2"
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button
                          onClick={() => handleOpenEditModal(material)}
                          className="p-0 border-none bg-transparent mx-2"
                        >
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                        <button
                          onClick={() => handleOpenDeleteModal(material)}
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
              pageCount={Math.ceil(filteredMaterialData.length / perPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={(data) => {
                setCurrentPage(data.selected);
              }}
              containerClassName={'flex justify-center mt-5 space-x-2'}
              pageClassName={'bg-white text-gray-600 px-3 py-1 rounded-md hover:bg-gray-100'}
              activeClassName={'bg-gray-900 text-white px-3 py-1 rounded-md'}
              previousClassName={'bg-white text-gray-600 px-3 py-1 rounded-md hover:bg-gray-100'}
              nextClassName={'bg-white text-gray-600 px-3 py-1 rounded-md hover-bg-gray-100'}
            />
          </div>
        </div>
      </div>

      {addModalOpen && (
        <AddModal isOpen={addModalOpen} onClose={closeAddModal} setMaterialData={setMaterialData} />
      )}
      {modalType === "detail" && selectedMaterial && (
        <MaterialDetailModal material={selectedMaterial} onClose={handleCloseModal} />
      )}
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
      <EditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        materialData={editCategory}
        setMaterialData={(updatedData) => {
          const updatedMaterialData = materialData.map((material) => {
            if (material.material_id === updatedData.material_id) {
              return updatedData;
            }
            return material;
          });
          setMaterialData(updatedMaterialData);
        }}
      />
    </>
  );
};

export default Materials;