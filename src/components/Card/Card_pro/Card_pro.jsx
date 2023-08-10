import React, { useState } from 'react';
import "../card.css";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Grid from '@mui/material/Grid';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import PaidIcon from '@mui/icons-material/Paid';
import { FormControl, FormLabel, Input } from '@mui/material';
import { Textarea } from '@chakra-ui/react';
import ListItemButton from '@mui/material/ListItemButton';
import EastIcon from '@mui/icons-material/East';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: 'background.paper',
  boxShadow: 24,
  p: 14,
};



export const CardFirst = () => {
  const [modalContent, setModalContent] = useState(null);
  const [modal, setModal] = useState(null);
  const [open, setOpen] = useState(false);
  const [modalopen, setModalOpen] = useState(false);

  function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    
    return (
      <React.Fragment>
        <button onClick={handleOpen}>{modalContent?.request}</button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 500 , padding:10} } >
            <h2 class="text-xl font-extrabold dark:text-black">{modalContent?.request}</h2><br></br>
           <FormControl mt={4}>
            <FormLabel>Note</FormLabel>
            <Textarea placeholder='Enter the description'  w='250px'/>
            </FormControl><br />
            <FormControl  style  ={{width:"250px"}}>
            <FormLabel>Enter the category</FormLabel>
            <Input  placeholder='Name' />
            </FormControl><br/><br/>
            <FormControl  style  ={{width:"250px"}}>
            <FormLabel>Enter the number</FormLabel>
           <Input type = "number"  placeholder='Name'  min = '0' />
            </FormControl><br/><br/>
            <FormControl mt={4}>
              <button class = 'ml-40'>Send</button>
            </FormControl>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }

  const handleOpen = (content) => {
    setModalContent(content);
    setOpen(true);
  };

  const Open = (content) => {
    setModal(content);
    setModalOpen(true);
  };

  const Close = () => {
    setModalOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpen(!open);
  };

  
  function handleForm(){
return(
  <form>
  <label>form</label>
  <input type="text" />
  </form>
);

}

const equipmetArray=[ 'Drills', 'Concreate Mixture' , 'Spirit Level'];
const equipmentCounts = [10, 2, 8];
const labourArray=[ 'Mason', 'Carpenter' , 'Painter'];

  return (
    <>
     <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="parent-modal-title"
  aria-describedby="parent-modal-description"
>
  <Box sx={{ ...style, width: 500 }}>
    <h2 class = "text-2xl font-extrabold dark:text-black" style  ={{marginTop:"-18%"}}>{modalContent?.title}</h2>

    <p id="parent-modal-description">
      
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"

    >
      <ListItemButton onClick={handleClick}>
       <EastIcon />  <ListItemText primary={modalContent?.data[0]}/>
     </ListItemButton>
     <ListItemButton onClick={handleClick}>
     <EastIcon />  <ListItemText primary={modalContent?.data[1]}/>
     </ListItemButton>
     <ListItemButton onClick={handleClick}>
     <EastIcon /> <ListItemText primary= {modalContent?.data[2]}/>
     </ListItemButton>
     </List>
</p>
    <ChildModal />
  </Box>
</Modal>

<Modal
  open={modalopen}
  onClose={Close}
  aria-labelledby="parent-modal-title"
  aria-describedby="parent-modal-description"
>
  <Box sx={{ ...style,width: 800 }}>
    <br/>
    <h1  class="text-3xl font-extrabold dark:text-black" id="parent-modal-title"  style = {{marginTop:"-16%"}}>{modal?.title}</h1><br />
    <p id="parent-modal-description">
      <h3 class="text-xl font-bold dark:text-black" >Description</h3>
     <br />
      Two story house in address No 12, Asswadduma,Kurunegala in area of 2000 sqft.
      <br />
    </p><br />
    <Box sx={{ flexGrow: 1, width: 600 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={6}>
        <List sx={{ width: '100%', maxWidth: 380, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AccountCircleIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Project Owner" secondary="K.M.G. Sahasrika" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <DateRangeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Project Start Date" secondary="sep 01,2023" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <EventAvailableIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Project End Date" secondary="sep 01,2024" />
      </ListItem>
     
    </List>
        </Grid>
        <Grid item xs={6} md={6}>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem>
        <ListItemAvatar>
          <Avatar>
          <QueryBuilderIcon  />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Project Duration" secondary="1 year" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PaidIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Approximate Budget" secondary="Rs 200, 000,000" />
      </ListItem>
          </List>
        </Grid>
        </Grid>
        </Box>
  </Box>
</Modal>

 

      <div className="card_1" onClick={() =>Open({ title: "Project Information", description: "Content for Project Information" })}>
        <h4>Project Information</h4>
      </div>
      <div className="card_1" onClick={() => handleOpen({ title: "Allocated Equipments", description: "",  data:equipmetArray, count:equipmentCounts
    ,request:"Request Equipments"}, handleForm())}>
        <h4>Allocated Equipments</h4>
      </div>
      <div className="card_1" onClick={() => handleOpen({ title: "Workers of the day", description: "Content for Workers of the day",  data:labourArray, count:equipmentCounts
       ,request:"Request Labourers", 
    }, handleForm())}>
        <h4>Workers of the day</h4>
      </div>
    </>
  );
}
