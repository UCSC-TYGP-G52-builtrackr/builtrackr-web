// site creation form component
<<<<<<< HEAD
// import * as React from 'react';
import React, {useState} from 'react';
import axios from 'axios';
=======

// import * as React from 'react';
import React, {useState} from 'react';
>>>>>>> dev
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

<<<<<<< HEAD
  const [siteType, setSiteType] = useState('');
  const [siteClient, setSiteClient] = useState('');
  const [siteName, setSiteName] = useState('');
  const [siteDesc, setSiteDesc] = useState('');
 
  async function handleSubmit(e) {
      e.preventDefault();

      // Create a JavaScript object with the form data
      const formData = {
        siteType: siteType,
        siteClient: siteClient,
        siteName: siteName,
        siteDesc: siteDesc,
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
        // toast.success("HR Manager registed successfuly");
      }
      
      // axios.post('/', formData)
      // .then((response) => {
      //   console.log('Form data sent successfully:', response.data);
      //   // Do something with the response if needed
      // })
      // .catch((error) => {
      //   console.error('Error sending form data:', error);
      // });
    }

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   switch (name) {
  //     case 'siteName':
  //       setSiteName(value);
  //       break;
  //     case 'siteType':
  //       setSiteType(value);
  //       break;
  //     case 'siteClient':
  //       setSiteClient(value);
  //       break;
  //     case 'siteDesc':
  //       setSiteDesc(value);
  //       break;
  //     default:
  //       break;
  //   }
  // };
  
=======
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [password, setPassword] = useState('')
 
  function handleSubmit(event) {
      event.preventDefault();
      console.log(firstName, lastName, email, dateOfBirth, password) 
  }

  const [age, setAge] = React.useState('');

  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value);
  // };
>>>>>>> dev

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
            
<<<<<<< HEAD
            <form onSubmit={handleSubmit} className='mt-5'>
=======
            <form onSubmit={handleSubmit} action={<Link to="/login" />} className='mt-5'>
>>>>>>> dev
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Site Name"
<<<<<<< HEAD
                        onChange={(e) => setSiteName(e.target.value)}
                        value={siteName}
=======
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
>>>>>>> dev
                        fullWidth
                        required
                    />
                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                      <InputLabel id="demo-simple-select-autowidth-label">Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
<<<<<<< HEAD
                        value={siteType}
                        onChange={(e) => setSiteType(e.target.value)}
                        autoWidth
                        required
                        label="siteType"
                      >
                        
                        <MenuItem value='Residential'>Residential</MenuItem>
                        <MenuItem value='Industrial'>Industrial</MenuItem>
                        <MenuItem value='Commercial'>Commercial</MenuItem>
                        <MenuItem value='Infrastructure'>Infrastructure</MenuItem>
=======
                        value={age}
                        // onChange={handleChange}
                        autoWidth
                        required
                        label="Type"
                      >
                        {/* <MenuItem value="">
                          <em>None</em>
                        </MenuItem> */}
                        <MenuItem value={10}>Residential</MenuItem>
                        <MenuItem value={21}>Industrial</MenuItem>
                        <MenuItem value={22}>Commercial</MenuItem>
                        <MenuItem value={22}>Infrastructure</MenuItem>
>>>>>>> dev
                      </Select>
                  </FormControl>
                </Stack>
                
                  <FormControl sx={{ width: '100%', mb: 4 }}>
                      <InputLabel id="demo-simple-select-autowidth-label">Site Client</InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
<<<<<<< HEAD
                        value={siteClient}
                        onChange={(e) => setSiteClient(e.target.value)}
                        fullWidth
                        required
                        label="siteClient"
=======
                        value={age}
                        // onChange={handleChange}
                        fullWidth
                        required
                        label="Site Client"
>>>>>>> dev
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
<<<<<<< HEAD
                        <MenuItem value='Andros'>Andros</MenuItem>
                        <MenuItem value='Pedro'>Pedro</MenuItem>
                        <MenuItem value='Murphy'>Murphy</MenuItem>
=======
                        <MenuItem value={10}>Twenty</MenuItem>
                        <MenuItem value={21}>Twenty one</MenuItem>
                        <MenuItem value={22}>Twenty one and a half</MenuItem>
>>>>>>> dev
                      </Select>
                  </FormControl>
                
                <TextField
                    multiline
                    variant='outlined'
                    color='secondary'
                    label="Site Description"
<<<<<<< HEAD
                    onChange={(e) => setSiteDesc(e.target.value)}
                    value={siteDesc}
=======
                    onChange={e => setEmail(e.target.value)}
                    value={email}
>>>>>>> dev
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