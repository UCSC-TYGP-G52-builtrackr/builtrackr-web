import React from 'react';
import { Link } from 'react-router-dom';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { SiteData } from '../../data/SiteData';
import Header from '../../components/ChiefEngineer/Header';
import Dropdown from '../../components/ChiefEngineer/Dropdown';
// import RegForm from '../../components/RegForm';

// dashboard common components
import Navbar from '../../components/ChiefEngineer/Navbar'
import Sidebar from '../../components/Sidebar';
import SidebarCE from '../../components/ChiefEngineer/SidebarCE';
import ChatSpace from '../../components/ChatSpace';
import { BsChatDots } from 'react-icons/bs';

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useStateContext } from '../../contexts/ContextProvider';
import '../../App.css';

// Registration Form imports
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import FormSignup from '../components/formSignup';
import { TextField, Container, Stack } from '@mui/material';
import { decryptData } from '../../encrypt'


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

const Sites = () => {

  const [siteData, setSiteData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };
  const navigate = useNavigate();
  const { themeSettings, setThemeSettings } = useStateContext();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const storedCompId = localStorage.getItem("company_id");
  const decryptedValue = decryptData(JSON.parse(storedCompId));
  const companyID = parseInt(decryptedValue, 10);
  console.log("company's ID: ", companyID);

  const [siteType, setSiteType] = useState('');
  const [siteClient, setSiteClient] = useState('');
  const [siteName, setSiteName] = useState('');
  const [siteDesc, setSiteDesc] = useState('');
  const [siteAddr, setSiteAddr] = useState('');

  const handleClose = () => {
    setOpen(false);
    // Reset the form values when the form is closed
    setSiteName('');
    setSiteDesc('');
    setSiteType('');
    setSiteClient('');
    setSiteAddr('');
  };
 
  async function handleSubmit(e) {
      e.preventDefault();

      // Create a JavaScript object with the form data
      const formData = {
        siteType: siteType,
        siteClient: siteClient,
        siteName: siteName,
        siteDesc: siteDesc,
        siteAddr: siteAddr,
        companyID: companyID,
      };

      const data = await fetch(
        "http://localhost:4000/api/site/addSite",
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
        setSiteName('');
        setSiteDesc('');
        setSiteType('');
        setSiteClient('');
        setSiteAddr('');
      }
    }

  useEffect(() => {
    const viewSitesAll = async () => {
      try {

        const formData = {
          companyID: companyID,
        };

        const data = await fetch(
          "http://localhost:4000/api/site/getSites",
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
          setSiteData(jsonData);
        } else {
          console.log(data.status);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    viewSitesAll();
  }, [open]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        console.log("This is sending comp id to customer")

        const formData = {
          companyID: companyID,
        };
        const data = await fetch(
          "http://localhost:4000/api/site/getCustomers",
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
          console.log("Customers Details here", jsonData);
          setCustomerData(jsonData);
        } else {
          console.log(data.status);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchCustomers();
  }, []);

  


  return (
    <div className="">
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
      <div className="fixed bg-white w-72 sidebar dark:bg-secondary-dark-bg ">
        <SidebarCE />
      </div>
      <div className='ml-72'>
            <div className="">
              <Navbar />
            </div>
            {themeSettings && (<ChatSpace />)}
            <div className="md:pb-5 md:m-10 md:px-5 rounded-3xl">
              <div className="flex mb-8">
                <Header title="Sites" category="gdfcgf"/>
                {/* <Dropdown/> */}
              </div>

            {/* sites grid */}
            <div className='grid grid-cols-3 gap-x-20 gap-y-14'>

            {siteData.map((site) => {
              return (
                <div className='relative h-[250px] w-[250px]'>
                <div className='absolute inset-0 bg-center bg-cover shadow-2xl' style={{ backgroundImage: `url(/havelock.jpg)` }}></div>
                <div className='absolute inset-0 flex flex-col items-center justify-center bg-gray-300 bg-opacity-75'>
                <div className='mt-12 text-3xl text-center'>{site.site_name}</div>

                <nav>
                  <Link to={`/chiefEngineer/sites/${site.site_id}`}>
                    <div className='flex mx-16 mt-20 text-center border-black cursor-pointer border-1'>
                      <span className='ml-3'>More Info</span>
                      <span>
                      <KeyboardDoubleArrowRightIcon/>
                      </span>
                    </div>
                  </Link>
                </nav>
                
                </div>
              </div>
              );
            })}


              {/* new site creation tile */}
                <div className='bg-gray-300 h-[250px] w-[250px] flex justify-center items-center shadow-2xl'>
                    {/* <RegForm onSiteAdded={updateSiteData}/> */}

                  <Button onClick={handleOpen}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-32 h-32">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg></Button>
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    // onClose={handleClose}
                    // closeAfterTransition
                    disableBackdropClick
                    // slots={{ backdrop: Backdrop }}
                    // slotProps={{
                    //   backdrop: {
                    //     timeout: 500,
                    //   },
                    // }}
                  >
                    <Fade in={open}>
                      <Box sx={style} style={{ width: "500px" }}>
                        {/* <Typography id="transition-modal-title" variant="h6" component="h2">
                          Text in a modal
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography> */}
                        
                        <h2 className='text-lg font-bold text-center'>Create New Site</h2>
                        
                        <form onSubmit={handleSubmit} className='mt-5'>
                            <Stack spacing={1} direction="row" sx={{marginBottom: 1}}>
                                <TextField
                                    type="text"
                                    variant='outlined'
                                    color='secondary'
                                    label="Site Name"
                                    onChange={(e) => setSiteName(e.target.value)}
                                    value={siteName}
                                    fullWidth
                                    required
                                />
                                <FormControl sx={{ m: 1, minWidth: 200 }}>
                                  <InputLabel id="demo-simple-select-autowidth-label">Type</InputLabel>
                                  <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    value={siteType}
                                    onChange={(e) => setSiteType(e.target.value)}
                                    fullWidth
                                    required
                                    label="siteType"
                                  >  
                                    <MenuItem value='Residential'>Residential</MenuItem>
                                    <MenuItem value='Industrial'>Industrial</MenuItem>
                                    <MenuItem value='Commercial'>Commercial</MenuItem>
                                    <MenuItem value='Infrastructure'>Infrastructure</MenuItem>
                                  </Select>
                              </FormControl>
                            </Stack>
                            
                              <FormControl sx={{ width: '100%', mb: 1 }}>
                                  <InputLabel id="demo-simple-select-autowidth-label">Site Customer</InputLabel>
                                  <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    value={siteClient}
                                    onChange={(e) => setSiteClient(e.target.value)}
                                    fullWidth
                                    required
                                    label="siteClient"
                                  >
                                    <MenuItem value="">
                                      <em>None</em>
                                    </MenuItem>
                                    {/* <MenuItem value='Andros'>Andros</MenuItem>
                                    <MenuItem value='Pedro'>Pedro</MenuItem>
                                    <MenuItem value='Murphy'>Murphy</MenuItem> */}
                                    {customerData.map((customer) => (
                                      <MenuItem key={customer.cust_id} value={customer.cust_id}>
                                        {customer.cust_name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                              </FormControl>
                              <TextField
                                multiline
                                variant='outlined'
                                color='secondary'
                                label="Address"
                                onChange={(e) => setSiteAddr(e.target.value)}
                                value={siteAddr}
                                fullWidth
                                sx={{mb: 1}}
                              />
                              {/* <TextField
                                multiline
                                variant='outlined'
                                color='secondary'
                                label="Address Line 2"
                                onChange={(e) => setSiteDesc(e.target.value)}
                                value={siteDesc}
                                fullWidth
                                sx={{mb: 1}}
                              /> */}
                            <TextField
                                multiline
                                variant='outlined'
                                color='secondary'
                                label="Site Description"
                                onChange={(e) => setSiteDesc(e.target.value)}
                                value={siteDesc}
                                fullWidth
                                rows={4}
                                sx={{mb: 4}}
                            />
                            <div className='flex justify-between'>
                            <Button size="small" onClick={handleClose} sx={{ color: 'red', backgroundColor: 'white', borderColor: 'red',':hover': {
                              backgroundColor: 'red',
                              color: 'white',
                              borderColor: 'red'
                              }}}>Cancel</Button>
                              
                              <Button size="small" type="submit" sx={{ color: 'green', backgroundColor: 'white', borderColor: 'green',':hover': {
                              backgroundColor: 'green',
                              color: 'white',
                              borderColor: 'green'
                              }}}>Create</Button>
                              </div>
                            {/* <Button variant="outlined" color="secondary" type="submit">Create</Button> */}
                        </form>
                        {/* <small>Already have an account? <Link to="/login">Login Here</Link></small> */}
                
                    
                      </Box>
                    </Fade>
                  </Modal>
                </div>
                
            </div> 
            {/* end of sites grid */}

          </div>
        
          </div>
    </div>
    
  );
};

export default Sites;