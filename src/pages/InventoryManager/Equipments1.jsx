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
import EditEModal from './EditEModal';
//import '../../CSS/kanbanBoard.css';

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
    setModalOpen(true);
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

  const [editModalOpen, setEditEModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  // Function to open the Edit modal and set the data of the category being edited
  // const handleOpenEditModal = (category) => {
  //   setEditCategory(category);
  //   setEditModalOpen(true);
  // };

  //new code..............................................................................

  const [equipmentData, setEquipmentData] = useState([]);

  // Function to fetch equipment data from the server
  const fetchEquipmentData = () => {
    fetch('http://localhost:4000/api/equipments/getAllEquipments') // Use a relative URL
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
        // Handle the error gracefully, e.g., show an error message to the user.
      });
  };

  useEffect(() => {
    fetchEquipmentData();
  }, []);

  const handleOpenEditEModal = (equipment) => {
    setEditCategory(equipment);
    console.log(equipment);
    setEditEModalOpen(true);
  };

  
  
  

// .............................................................................
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
            <Header title="Equipment Items in the Inventory" category="gdfcgf" />
            <div className="relative flex gap-80 justify-end  mr-10 w-full">
          <button
            className="flex bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-full ml-30 "
            onClick={handleOpenModal}
          >
            Add a category
          </button>
        </div>

        <div className="card_container" style={{ display: "flex", flexWrap: "wrap", gap: "28px", margin: "20px", width: "100%", height: "100%" }}>
        {equipmentData.map((equipment) => (
          <div className="card" style={{ marginLeft: '8%', width: '18%' }} key={equipment.equip_id}>
            <Card style={{ width: 100 }} />
            <h4>{equipment.equip_name}</h4>
            <CardContent style={{ backgroundColor: 'lightgrey' }}>
              <div className="image_drill" style={{ width: '100px', marginLeft: '20%' }}>
                <img src={equipment.equip_image_url} alt={equipment.equip_name} width="100px" height="100px" />
              </div>
            </CardContent>
            <Typography variant="h5" component="h2">
              <Link to={`/InventoryManger/Equipments/List/${equipment.equip_id}`}>{equipment.equip_name}</Link>
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Available Quantity: {equipment.equip_qty}
            </Typography>
            <CardActions className="gap-20">
              <div className="flex justify-between">
                <button onClick={() => handleOpenEditEModal(equipment)}>
                  <Edit2 />
                </button>
              </div>
              <div className="flex justify-between">
                <button onClick={() => setOpen(true)}>
                  <Trash2 />
                </button>
              </div>
            </CardActions>
          </div>
        ))}
      </div>
    

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
      <EditEModal
        isOpen={editModalOpen}
        onClose={() => setEditEModalOpen(false)}
        equipmentData={editCategory}
        setEquipmentData={(updatedData) => {
          // Update the equipment data with the updated data
          const updatedEquipmentData = equipmentData.map((equipment) => {
            if (equipment.equip_id === updatedData.equip_id) {
              return updatedData;
            }
            return equipment;
          });
          setEquipmentData(updatedEquipmentData);
        }}
      />
          </div>  
        </div>
      {/* </div> */}
    {/* </div> */}
    </>
  );
};

export default Equipments1;