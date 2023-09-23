import { Box, Button, Grid, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { BsChatDots } from 'react-icons/bs';
import { useStateContext } from '../../contexts/ContextProvider';
import { Edit2} from 'react-feather';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { FormControl, FormLabel, Input } from '@mui/material';
import { Textarea } from '@chakra-ui/react';
import { Select,MenuItem ,InputLabel} from '@mui/material';
import  React from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "400",
  bgcolor: 'background.paper',
  border: 'background.paper',
  boxShadow: 24,
  p: 20,
};





  const TaskListCard = () => {
const { setCurrentColor, setCurrentMode, currentMode, activeMenu, themeSettings, setThemeSettings } = useStateContext();
const [modalopen, setModalOpen] = useState(false);
const [modal, setModal] = useState(null);

const Open = (content) => {
  setModal(content);
  setModalOpen(true);
};

const Close = () => {
  setModalOpen(false);
};
const [option, setOption] = React.useState('');
const handleChange = (event) => {
  setOption(event.target.value);
};

    return (
        <>

     <Modal
  open={modalopen}
  onClose={Close}
  aria-labelledby="parent-modal-title"
  aria-describedby="parent-modal-description"
>
  <Box sx={{ ...style, width:'400px',paddingTop:"50px" ,padding:"100px", bgColor:'white' }}>
  <h1 class="text-2xl font-extrabold dark:text-black  align-middle" >Edit item</h1><br/>
  <FormControl  style  ={{width:"250px"}}>
            <FormLabel>Name</FormLabel>
          <Input  placeholder='Name' />
            </FormControl><br/><br/>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select an option</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={option}
          label="Select option"
          onChange={handleChange}
        >
          <MenuItem value={10}>Available</MenuItem>
          <MenuItem value={10}> Not Available</MenuItem>
          </Select><br />
           </FormControl>
           <FormControl mt={4}>
              <FormLabel>Note</FormLabel>
              <Textarea placeholder='Here is a sample placeholder'  w='250px'/>
            </FormControl><br />
            <FormControl mt={4}>
              <button class = 'ml-40' style  = {{backgroundColor: '#FFCC00' , padding: "5%" , width: "100px"  , marginTop:'5%'}}>Update</button>
            </FormControl>
        </Box>
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

        <div style={{ display: 'flex', justifyContent: 'flex-end' , margin:'10px' }}>
        <button
            className="flex bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-full ml-30 "
           
          >
            Add a Item
          </button>
      </div>
        <Grid templateColumns="repeat(auto-fit, minmax(1150px, 1fr))" gap={10} >

            <Box key={1} borderWidth="1px" borderRadius="md" p={10} >
              <Table variant="striped"  colorScheme='teal' ml='160' >
                <Thead>
                  <Tr>
                    <Th px={50}>Equipment Name</Th>
                    <Th px={50}> Status</Th>
                    <Th px={50}>Note</Th>
                    <Th px={50}>Action</Th>
                  </Tr>
                </Thead>
                <Tbody  spacing = "100px">
                  <Tr>
                    <Td px={50}>BT2132534</Td>
                    <Td px={50}>Available</Td>
                    <Td px={50}>Good Condition</Td>
                    <Td px={50}> <Button onClick={Open} mt={4} style={{ backgroundColor: '#ffcc00',border: 'none',color: 'black',padding: '5px 10px',
          fontSize: '16px',borderRadius: '4px',boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',cursor: 'pointer',
          transition: 'background-color 0.3s, box-shadow 0.3s',
        }}><Edit2 /></Button></Td>
                  </Tr>
                  <Tr>
                    <Td px={50}>BT2135634</Td>
                    <Td px={50}> Not Available</Td>
                    <Td px={50}>Good Condition</Td>
                    <Td px={50}> <Button  onClick={Open} mt={4} style={{ backgroundColor: '#ffcc00',border: 'none',color: 'black',padding: '5px 10px',
          fontSize: '16px',borderRadius: '4px',boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',cursor: 'pointer',
          transition: 'background-color 0.3s, box-shadow 0.3s',
           }}><Edit2 />
           </Button>
           </Td>
          </Tr>
          <Tr>
                    <Td px={50}>BT2135634</Td>
                    <Td px={50}> Not Available</Td>
                    <Td px={50}> Damaged</Td>
                    <Td px={50}> <Button  onClick={Open} mt={4} style={{ backgroundColor: '#ffcc00',border: 'none',color: 'black',padding: '5px 10px',
          fontSize: '16px',borderRadius: '4px',boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',cursor: 'pointer',
          transition: 'background-color 0.3s, box-shadow 0.3s',
           }}><Edit2 /></Button></Td>
           </Tr>

                </Tbody>
              </Table>
            </Box>

        </Grid>
    </div>
      </>
    );
  };

  export default TaskListCard;