import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import NavBar from "../../../components/SiteSupervisor/NavBar";
import SideBar from "../../../components/SiteSupervisor/SideBar";
import ChatSpace from "../../../components/SiteSupervisor/ChatSpace";
import { BsChatDots } from "react-icons/bs";
import { useStateContext } from "../../../contexts/ContextProvider";
import { FormControl, Input } from '@mui/material';
import { Textarea,useToast } from '@chakra-ui/react';
import NativeSelect from '@mui/material/NativeSelect';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

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
  
  

export const  LeaveForm = () => {
    const [post, setPost] = useState({
        option:" ",
        name: "",
        start: null,
        end: null,
        note:"",
      });

      console.log(post);

const toast = useToast();

const handleSubmit = async (event) =>{ 

//  pass the post.name, post.note and post.number to the backend
  event.preventDefault();
  const {option, name,start,end,note } = post;
  const data = {option,name,start,end,note };
  console.log(data);
  try {
    const response = await axios.post(
      "http://localhost:4000/api/leave/sendleave",
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
  
  const handleDateRangeChange = (dateRange) => {
    // dateRange will be an array with [startDate, endDate]
    const [startDate, endDate] = dateRange;

    // Update the post object with selected dates
    setPost({ ...post, start: startDate, end: endDate });
  };

   const {
    activeMenu,
    themeSettings,
    setThemeSettings,
  } = useStateContext();


  const [labourArray, setLabourArray] = useState([]);
 
  useEffect(() => {
  const getLabourData = async () => {
    
    try {
      const response = await axios.get(
        "http://localhost:4000/api/labour/viewemployee"
      );
      console.log(response.data);
      if (response.status === 200) {
        setLabourArray(response.data);
      }
    } catch (error) {
      console.log(error);
    }
};
 getLabourData();
}, []);

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
   <Box sx={{ ...style, width: 500 , padding:5 , alignContent:"left"} } >
    {/* style the name to be bold h1 tag */}
    <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-black"> Labour Leave Form </h1><br/>
   <FormControl fullWidth>
  <label variant="standard" htmlFor="uncontrolled-native" style  ={{marginLeft:"-70%"}}>
   Select Labour name
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
    {labourArray.map((labour) => (
    <option value={labour.name}>{labour.name}</option>
    ))}
  </NativeSelect>
  </FormControl>
  <br/><br/>
    <FormControl fullWidth >
    <label style  ={{marginLeft:"-80%"}}>Special Note</label><br/>
    <Textarea placeholder='Enter the description' border={'black'}  w='400px' name  = "note"  onChange={(e) => handleChange(e)}/>
    </FormControl><br/><br/>
    <FormControl fullWidth>
    <label style  ={{marginLeft:"-70%"}}>Enter the category</label>
    <Input type  ="text" placeholder='Name' name = "name"   onChange={(e) => handleChange(e)} />
    </FormControl><br/><br/>
    <FormControl  fullWidth>
    <label style  ={{marginLeft:"-70%"}}>Enter Date range</label><br/>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* disable past days */}
        <DateRangePicker localeText={{ start: 'Start date', end: 'End date' }}
         value={[post.start, post.end]}
         onChange={handleDateRangeChange}
         disablePast

        />
    </LocalizationProvider>
    </FormControl><br/><br/>
   
      <button class = 'ml-64' style  = {{backgroundColor:"#FFCC00" , padding:"3%" ,width:"150px" , boxShadow:"none"}}>Send</button>
  
  </Box>
  </form>
</div>
</React.Fragment>
)
}

export default LeaveForm;