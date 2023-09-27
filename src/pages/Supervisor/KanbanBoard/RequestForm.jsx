import React, { useState } from 'react';
import Box from '@mui/material/Box';
import NavBar from "../../../components/SiteSupervisor/NavBar";
import SideBar from "../../../components/SiteSupervisor/SideBar";
import ChatSpace from "../../../components/SiteSupervisor/ChatSpace";
import { BsChatDots } from "react-icons/bs";
import { useStateContext } from "../../../contexts/ContextProvider";
import { FormControl, Input } from '@mui/material';
import { Textarea,useToast } from '@chakra-ui/react';
import NativeSelect from '@mui/material/NativeSelect';

import axios from 'axios';


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
  
  

export const  RequestForm = () => {
    const [post, setPost] = useState({
        name: "",
        number: "",
        note:"",
      });
       const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);


      const toast = useToast();

const handleSubmit = async (event) =>{ 

 //pass the post.name, post.note and post.number to the backend
  event.preventDefault();
  const { name, note, number } = post;
  const data = { name, note, number };
  console.log(data);
  try {
    const response = await axios.post(
      "http://localhost:4000/api/requests/sendrequest",
      data
    );
    console.log(response);
    if (response.data.success) {
      toast({
        position: "bottom-right",
        title: "Request sent successfully",
        description: "We've sent your request successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }
  catch (error) {
    console.log(error);
    toast({
      position: "bottom-right",
      title: "An error occurred.",
      description: "Unable to send your request.",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }
}

   const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  

   const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

return(

<React.Fragment>
<div className="relative flex dark:bg-main-dark-bg w:100">
  {/* chatbot popup */}
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

  {activeMenu ? (
    <div className="fixed bg-white w-72 sidebar dark:bg-secondary-dark-bg ">
      <SideBar />
    </div>
  ) : (
    <div className="w-0 dark:bg-secondary-dark-bg">
      <SideBar />
    </div>
  )}
</div>
<div className="fixed w:100% md:static bg-main-bg dark:bg-main-dark-bg navbar ">
  <NavBar />
</div>
{themeSettings && <ChatSpace />}

<div
  className={
    activeMenu
      ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
      : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
  }
>
<br/><br/><br/>



  <form onSubmit={handleSubmit} >
   <Box sx={{ ...style, width: 500 , padding:10 , alignContent:"left"} } >
   <FormControl fullWidth>
  <label variant="standard" htmlFor="uncontrolled-native" style  ={{marginLeft:"-55%"}}>
   Select request option
  </label>
  <NativeSelect
    defaultValue={null}
    inputProps={{
      name: 'option',
      id: 'uncontrolled-native',
    }}
    label="option"
    onClick={(e) => handleChange(e)} 
  >
    <option value="Labour">Labour</option>
    <option value="equipment">Equipment</option>
  </NativeSelect>
  </FormControl>
  <br/><br/>
    <FormControl fullWidth >
    <label style  ={{marginLeft:"-70%"}}>Special Note</label><br/>
    <Textarea placeholder='Enter the description'  w='300px' name  = "note"  onChange={(e) => handleChange(e)}/>
    </FormControl><br/><br/>
    <FormControl fullWidth>
    <label style  ={{marginLeft:"-60%"}}>Enter the category</label>
    <Input type  ="text" placeholder='Name' name = "name"   onChange={(e) => handleChange(e)} />
    </FormControl><br/><br/>
    <FormControl  fullWidth>
    <label style  ={{marginLeft:"-60%"}}>Enter the number</label>
    <Input type = "number"  placeholder='Number'  min = '0' name ="number"  onChange={(e) => handleChange(e)}  />
    </FormControl><br/><br/>
   
      <button class = 'ml-40' style  = {{backgroundColor:"#FFCC00" , padding:"5%" ,width:"150px" , boxShadow:"none"}}>Send</button>
  
  </Box>
  </form>
</div>
</React.Fragment>
)
}

export default RequestForm;