// import React from 'react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { SiteData } from '../../data/SiteData';
import Header from './Header';
import Dropdown from './Dropdown';
// import RegForm from '../../components/RegForm';

// dashboard common components
import Navbar from './Navbar'
import Sidebar from '../Sidebar';
import SidebarCE from './SidebarCE';
import ChatSpace from '../ChatSpace';
import { BsChatDots } from 'react-icons/bs';

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useStateContext } from '../../contexts/ContextProvider';
// import '../../App.css';

// Registration Form imports
// import BasicButtons from '../../components/ChiefEngineer/BasicButtons'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import FormSignup from '../components/formSignup';
import { TextField, Container} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: "10px",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CustomerRegisterButton = () => {

  const [siteData, setSiteData] = useState([]);
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };
  const navigate = useNavigate();
  const { themeSettings, setThemeSettings } = useStateContext();

  // customer registration form 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const [fName, setfName] = useState('');
  const [lName, setlName] = useState('');
  const [email, setEmail] = useState('');
  const [contNo, setContNo] = useState('');
  const [pwd, setPwd] = useState('');
  const [confpwd, setConfpwd] = useState('');
 
  const handleClose = () => {
    setOpen(false);
    // Reset the form values when the form is closed
    setfName('');
    setlName('');
    setEmail('');
    setContNo('');
    setPwd('');
    setConfpwd('');
  };

  async function handleSubmit(e) {
      e.preventDefault();

      // Create a JavaScript object with the form data
      const formData = {
        fName: fName,
        lName: lName,
        email: email,
        contNo: contNo,
        confpwd: confpwd,
      };

      const data = await fetch(
        "http://localhost:4000/api/site/addCustomer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (data.status === 200) {
        const jsonData = await data.json();
        console.log(jsonData);
        handleClose();
        setfName('');
        setlName('');
        setEmail('');
        setContNo('');
        setPwd('');
        setConfpwd('');
      }
      
      
    }


  return (
    <div>
      {/* <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ backgroundColor: 'yellow-400', borderRadius: '50%' }}
                className="p-3 text-3xl text-white bg-yellow-400 hover:drop-shadow-xl"
              >
                <BsChatDots />
              </button>
          </div> */}
      {/* <div className="fixed bg-white w-72 sidebar dark:bg-secondary-dark-bg ">
        <SidebarCE />
      </div> */}
      {/* <div className='ml-72'> */}
            {/* <div className="fixed w-full md:static bg-main-bg dark:bg-main-dark-bg navbar ">
              <Navbar />
            </div> */}
            {/* {themeSettings && (<ChatSpace />)} */}
            {/* <div className="md:pb-5 md:m-10 md:px-5 rounded-3xl"> */}
              {/* <div className="flex mb-8"> */}
                {/* <Header title="Overview" category="gdfcgf"/> */}
                {/* <div className='relative w-48 ml-auto'>   */}
                  <Button onClick={handleOpen} variant="outlined" sx={{ color: 'black', backgroundColor: 'white', borderColor: '#ffcc00', marginTop: '10px',':hover': {
                    backgroundColor: '#ffcc00',
                    color: 'white',
                    borderColor: 'white'
                  }}} disableElevation>Add New Customer</Button>
                {/* </div> */}
              {/* </div> */}

            {/* sites grid */}
            {/* <div className='grid grid-cols-3 gap-x-20 gap-y-14'> */}

              {/* new site creation tile */}
                
                    {/* <RegForm onSiteAdded={updateSiteData}/> */}

                  
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                      backdrop: {
                        timeout: 500,
                      },
                    }}
                  >
                    <Fade in={open}>
                      <Box sx={style} style={{ width: "550px" }}>
                        {/* <Typography id="transition-modal-title" variant="h6" component="h2">
                          Text in a modal
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography> */}
                        
                        <h2 className='text-lg font-bold text-center'>Register Customer</h2>
                        
                        <form onSubmit={handleSubmit} className='mt-5'>
                            <div className='flex justify-between gap-4 mb-4'>
                              <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="First Name"
                                size="small"
                                onChange={(e) => setfName(e.target.value)}
                                value={fName}
                                fullWidth
                                required
                              />
                              <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="Last Name"
                                size="small"
                                onChange={(e) => setlName(e.target.value)}
                                value={lName}
                                fullWidth
                                required
                              />
                            </div>
                            
                            <div className='flex justify-between gap-4 mb-4'>
                              <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="Email"
                                size="small"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                fullWidth
                                required
                              />
                              <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="Contact No."
                                size="small"
                                onChange={(e) => setContNo(e.target.value)}
                                value={contNo}
                                fullWidth
                                required
                              />
                            </div>

                            <div className='flex justify-between gap-4 mb-4'>
                              <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="Password"
                                size="small"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                fullWidth
                                required
                              />
                              <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="Confirm Password"
                                size="small"
                                onChange={(e) => setConfpwd(e.target.value)}
                                value={confpwd}
                                fullWidth
                                required
                              />
                            </div>
                              
                            <div className='flex justify-between mt-4'>
                              <Button onClick={handleClose} variant="outlined" size="small" sx={{ color: 'red', backgroundColor: 'white', borderColor: 'red',':hover': {
                              backgroundColor: 'red',
                              color: 'white',
                              borderColor: 'red'
                              }}} disableElevation>Cancel</Button>

                              <Button type="submit" variant="outlined" size="small" sx={{ color: 'green', backgroundColor: 'white', borderColor: 'green',':hover': {
                              backgroundColor: 'green',
                              color: 'white',
                              borderColor: 'green'
                              }}} disableElevation>Submit</Button>
                            </div>
                        </form>
                        {/* <small>Already have an account? <Link to="/login">Login Here</Link></small> */}
                      </Box>
                    </Fade>
                  </Modal>
                
                
            {/* </div>  */}
            {/* end of sites grid */}

          {/* </div> */}
        
          {/* </div> */}
    </div>
    
  );
};

export default CustomerRegisterButton;