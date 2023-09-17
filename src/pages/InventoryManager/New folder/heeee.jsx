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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
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


//.....................................
const [selectedMaterial, setSelectedMaterial] = useState(null);
const handleViewClick = (material) => {
  setSelectedMaterial(material);
};




const [isAddModalOpen, setAddModalOpen] = useState(false);

//............................

  const selectionsettings = { persistSelection: true };

  const { themeSettings, setThemeSettings } = useStateContext();
  
  const [categories, setCategories] = useState([]);

  // Create a state variable to hold the current category input
  const [newCategory, setNewCategory] = useState('');

  // Create state variable for modal visibility and category data
  const [isModalOpen, setModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryQuantity, setCategoryQuantity] = useState('');
  const [open, setOpen] = React.useState(false);


  // Event handlers for adding a new category
  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  // Load data from local storage when the component mounts
  useEffect(() => {
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  // Save data to local storage whenever the categories change
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  // Event handlers for opening and closing the modal
  const handleOpenModal = () => {
    setAddModalOpen(true);
  };
  

  const handleCloseModal = () => {
    setModalOpen(false);
    // Reset category name and image after closing the modal
    setCategoryName('');
    setCategoryImage('');
  };

  // Event handler for submitting the modal and creating a new card
  const handleSubmitModal = () => {
    if (categoryName.trim() !== '' && categoryImage.trim() !== '') {
      setCategories([...categories, { name: categoryName, image: categoryImage }]);
      handleAddCategory();
      handleCloseModal();
    }
  };

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  // Function to open the Edit modal and set the data of the category being edited
  // const handleOpenEditModal = (category) => {
  //   setEditCategory(category);
  //   setEditModalOpen(true);
  // };

  //new code..............................................................................

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
  




  return (
    <>
    {/* delete modal */}
    <Modal open={open} onClose={() => setOpen(false) }>
            <ModalDialog
              variant="outlined"
              role="alertdialog"
              aria-labelledby="alert-dialog-modal-title"
              aria-describedby="alert-dialog-modal-description"
            >
              <Typography
                id="alert-dialog-modal-title"
                level="h2"
              >
                Confirmation
              </Typography>
              <Divider />
              <Typography id="alert-dialog-modal-description" textColor="text.tertiary">
                Are you sure you want to delete item?
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 1 }}>
                <button  onClick={() => setOpen(false)}>
                  Cancel
                </button>
                <div className="delete">
                <button variant="solid" color='danger' onClick={() => setOpen(false)} size='xs' padding = '5' >
                 Delete Item
                </button></div>
              </Box>
            </ModalDialog>
     </Modal>
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
        {/* <div className="md:pb-5 md:m-10 md:px-5 rounded-3xl"> */}
          {/* <div className="flex mb-8"> */}
          <br/><br/>
            <Header title="Material Items in the Inventory" category="gdfcgf" />
            <div className="relative flex gap-80 justify-end  mr-10 w-full">
            <button
  className="flex bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-full ml-30"
  onClick={handleOpenModal}
>
  Add a Material
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
                            className="mr-3"
                            onClick={() => handleViewClick(material)}
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </button>
          <button
            onClick={() => handleOpenEditModal(material)}
            className="text-indigo-600 hover:text-indigo-900"
          >
            <Edit2 />
          </button>
          <button
            onClick={() => setOpen(true)}
            className="text-red-600 hover:text-red-900 ml-2"
          >
            <Trash2 />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

{selectedMaterial && (
              <MaterialDetailModal
                material={selectedMaterial}
                onClose={handleCloseModal}
              />
            )}



      
{isAddModalOpen && (
  // <AddModal
  //   isOpen={isAddModalOpen}
  //   onClose={() => setAddModalOpen(false)}
  //   setMaterialData={setMaterialData} // You can pass any required props here
  // />


  <AddModal
  isOpen={isAddModalOpen}
  onClose={() => setAddModalOpen(false)}
  setMaterialData={(addedMaterial) => {
    // Update the material data with the added material
    setMaterialData([...materialData, addedMaterial]);
  }}
/>



)}


  {isModalOpen && (
          <div className="modal">
            <Modal
             open={handleOpenModal}
             onClose={handleCloseModal}
            >
               <Box sx={{ ...style, width: 500 }}>
            <div className="modal-content">
             <h2 class = "text-xl font-extrabold dark:text-black">Add A category</h2>
              <FormControl>
                <InputLabel>Category</InputLabel>
              <Input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
              /></FormControl><br/>
                <FormControl>
                  <InputLabel>Description</InputLabel>
                  <Input
                    type="text"
                    value={categoryDescription}
                    onChange={(e) => setCategoryDescription(e.target.value)}
                    placeholder="Enter Description"
                  />
                </FormControl>
                <br/><br/>
                <FormControl>
                  <InputLabel>Quantity</InputLabel>
                  <Input
                    type="Number"
                    value={categoryQuantity}
                    onChange={(e) => setCategoryQuantity(e.target.value)} 
                    placeholder="Enter Quantity"
                  />
                </FormControl>
                <br/><br/>

             <FormControl>
              <Input
                type="file"
                onChange={(e) => setCategoryImage(e.target.files[0].name)}
                accept=".jpg, .png, .jpeg"
              />
              </FormControl><br/>
              <FormControl>
              <button onClick={handleSubmitModal} style = {{backgroundColor:'#FFCC00' , marginTop:"%", padding:"4%" , width:"150px"}}>Create Card</button>
              </FormControl>
            </div>
            </Box>
            </Modal>
          </div>
        )}
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
          </div>  
        </div>
      {/* </div> */}
    {/* </div> */}
    </>
  );
};

export default Materials1;
