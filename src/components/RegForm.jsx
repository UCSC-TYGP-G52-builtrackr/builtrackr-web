// site creation form component
// import * as React from 'react';
import React, {useState} from 'react';
import axios from 'axios';
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
import { Link } from "react-router-dom"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function RegForm() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [siteName, setSiteName] = useState('');
  // const [siteType, setSiteType] = useState('');
  // const [siteClient, setSiteClient] = useState('');
  const [siteDesc, setSiteDesc] = useState('');
 
  function handleSubmit(event) {
      event.preventDefault();

      // Create a JavaScript object with the form data
      const formData = {
        siteName: siteName,
        // siteType: siteType,
        // siteClient: siteClient,
        siteDesc: siteDesc,
      };
      
      axios.post('/', formData)
      .then((response) => {
        console.log('Form data sent successfully:', response.data);
        // Do something with the response if needed
      })
      .catch((error) => {
        console.error('Error sending form data:', error);
      });
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'siteName':
        setSiteName(value);
        break;
      // case 'siteType':
      //   setSiteType(value);
      //   break;
      // case 'siteClient':
      //   setSiteClient(value);
      //   break;
      case 'siteDesc':
        setSiteDesc(value);
        break;
      default:
        break;
    }
  };
  

  return (
    <div>
      <Button onClick={handleOpen}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-32 h-32">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg></Button>
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
          <Box sx={style}>
            {/* <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
            
            <h2>Create New Site</h2>
            
            <form onSubmit={handleSubmit} action={<Link to="/login" />} className='mt-5'>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="siteName"
                        onChange={e => setSiteName(e.target.value)}
                        value={siteName}
                        fullWidth
                        required
                    />
                    {/* <FormControl sx={{ m: 1, minWidth: 100 }}>
                      <InputLabel id="demo-simple-select-autowidth-label">Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={siteType}
                        onChange={handleChange}
                        autoWidth
                        required
                        label="siteType"
                      >
                        
                        <MenuItem value='Residential'>Residential</MenuItem>
                        <MenuItem value='Industrial'>Industrial</MenuItem>
                        <MenuItem value='Commercial'>Commercial</MenuItem>
                        <MenuItem value='Infrastructure'>Infrastructure</MenuItem>
                      </Select>
                  </FormControl> */}
                </Stack>
                
                  {/* <FormControl sx={{ width: '100%', mb: 4 }}>
                      <InputLabel id="demo-simple-select-autowidth-label">Site Client</InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={siteClient}
                        onChange={handleChange}
                        fullWidth
                        required
                        label="siteClient"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value='Andros'>Andros</MenuItem>
                        <MenuItem value='Pedro'>Pedro</MenuItem>
                        <MenuItem value='Murphy'>Murphy</MenuItem>
                      </Select>
                  </FormControl> */}
                
                <TextField
                    multiline
                    variant='outlined'
                    color='secondary'
                    label="siteDesc"
                    onChange={e => setSiteDesc(e.target.value)}
                    value={siteDesc}
                    fullWidth
                    rows={4}
                    sx={{mb: 4}}
                />
                <Button variant="outlined" color="secondary" type="submit">Create</Button>
            </form>
            {/* <small>Already have an account? <Link to="/login">Login Here</Link></small> */}
     
        
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}