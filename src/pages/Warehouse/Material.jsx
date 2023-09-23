import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { BsChatDots } from 'react-icons/bs';
import { useStateContext } from '../../contexts/ContextProvider';
import '../../CSS/kanbanBoard.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import { Edit2, Trash2 } from 'react-feather';
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import '../../CSS/kanbanBoard.css';
import {Link} from "react-router-dom";
import Divider from '@mui/joy/Divider';
import ModalDialog from '@mui/joy/ModalDialog';
import EditModal from './EditModal';
import { Input,InputLabel, FormControl } from '@mui/material';

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


export const Material = () => {

  const {activeMenu, setThemeSettings } = useStateContext();

  // Create a state variable for the list of categories
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

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  // Function to open the Edit modal and set the data of the category being edited
  const handleOpenEditModal = (category) => {
    setEditCategory(category);
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
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
            <button  onClick={() => setOpen(false)}>
              Cancel
            </button>
            <div className="delete">
            <button variant="solid" color='danger' onClick={() => setOpen(false)} size='xs' padding = '' >
             Delete Item
            </button></div>
          </Box>
        </ModalDialog>
 </Modal>

      <div className="relative flex dark:bg-main-dark-bg w:80">
        {/* chatbot popup */}
        <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
          <button
            type="button"
            onClick={() => setThemeSettings(true)}
            style={{ backgroundColor: 'yellow-400', borderRadius: '50%' }}
            className="p-3 text-3xl text-white bg-yellow-400 hover:drop-shadow-xl"
          >
            <BsChatDots />
          </button>
        </div>

        {activeMenu ? (
          <div className="fixed bg-white w-72 sidebar dark:bg-secondary-dark-bg ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
      </div>
      <div className="fixed w:70% md:static bg-main-bg dark:bg-main-dark-bg navbar ">
        <Navbar />
      </div>

      <div
        className={
          activeMenu
            ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-fit  '
            : 'bg-main-bg dark:bg-main-dark-bg  w-fit  min-h-screen flex-2 '
        }
      >
        <div className="" style={{ backgroundColor: '#ffcc00', height: '50px', width: '0%' }}></div>

        <div className="relative flex gap-80 justify-end  mr-10 w-full">
          <button
            className="flex bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-full ml-30 "
            onClick={handleOpenModal}
          >
            Add a category
          </button>
        </div>
<div className="card_container" style  ={{display:"flex", flexWrap:"wrap" , gap:"28px" , margin:"20px",width:"100%", height:"100%"}}>
       {/* 1st card */}

        <div className="card" style={{ marginLeft: '8%', width: '18%'}}>
          <Card style={{ width: 100 }  }   />
          <CardContent style={{ backgroundColor: 'lightgrey' }}>
            <div className="image_drill" style={{ width: '100px', marginLeft: '20%' }}>
              <img src="/bricks.jpg" alt="bricks" width="100px" height="100px" />
            </div>
          </CardContent>
          <Typography variant="h5" component="h2">
          <Link to = "/InventoryManger/Materials/List"> Bricks</Link>
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Available Quantity: 100 cubes
          </Typography>
          <CardActions className="gap-20">
            <div className="flex justify-between">
              <button onClick={() => handleOpenEditModal()}>
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

{/* 2nd card */}
        <div className="card" style={{  width: '18%' }}>
          <Card style={{ width: 100 }} />
          <CardContent style={{ backgroundColor: 'lightgrey' }}>
            <div className="image_drill" style={{ width: '180px', marginLeft: '-5%' }}>
              <img src="/cement.jpg" alt="cement" width="100px" height="100px"/>
            </div>
          </CardContent>
          <Typography variant="h5" component="h2">
          <Link to = "/Materials/List"> Cement</Link>
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Available Quantity: 100 cubes
          </Typography>
          <CardActions className="gap-20">
            <div className="flex justify-between">
              <button>
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

        {/* 3rd card */}
        <div className="card" style={{  width: '18%' }}>
          <Card style={{ width: 100 }} />
          <CardContent style={{ backgroundColor: 'lightgrey' }}>
            <div className="image_drill" style={{ width: '110px', marginLeft: '20%' }}>
              <img src="/gray gravel.jpg" alt="gravel" width="100px" height="100px" />
            </div>
          </CardContent>
          <Typography variant="h5" component="h2">
          <Link to = "/Materials/List">Gray Gravel</Link>
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Available Quantity: 100 cubes
          </Typography>
          <CardActions className="gap-20">
            <div className="flex justify-between">
              <button>
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

        {/* 4th card */}
        <div className="card" style={{  width: '18%' }}>
          <Card style={{ width: 100 }} />
          <CardContent style={{ backgroundColor: 'lightgrey' }}>
            <div className="image_drill" style={{ width: '165px', marginLeft: '0%' }}>
              <img src="/sand.jpg" alt="sand" width="100px" height="100px"/>
            </div>
          </CardContent>
          <Typography variant="h5" component="h2">
          <Link to = "/Materials/List"> Sand</Link>
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Available Quantity: 300 cubes
          </Typography>
          <CardActions className="gap-20">
            <div className="flex justify-between">
              <button >
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
        
        {/* 5th card */}
        <div className="card" style={{ marginLeft:"8%", width: '18%' }}>
          <Card style={{ width: 100 }} />
          <CardContent style={{ backgroundColor: 'lightgrey' }}>
            <div className="image_drill" style={{ width: '140px', marginLeft: '10%' }}>
              <img src="/Blocks.jpg" alt="drill" width="100px" height="100px" />
            </div>
          </CardContent>
          <Typography variant="h5" component="h2">
          <Link to = "/Materials/List">Blocks</Link>
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Available Quantity: 200 cubes
          </Typography>
          <CardActions className="gap-20">
            <div className="flex justify-between">
              <button>
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

     
  </div>

        {/*  Create a modal for adding a category */}
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
               onChange={(e) => setCategoryName(e.target.value)}
               placeholder="Enter Description"
             /></FormControl><br/><br/>
          <FormControl>
           <InputLabel>Quantity</InputLabel>
             <Input
               type="Number"
               value={categoryQuantity}
               onChange={(e) => setCategoryName(e.target.value)}
               placeholder="Enter Quantity"
             />
            </FormControl><br/><br/>
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
      </div>
      <EditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        category={editCategory}
      />
    </>
  );
};
