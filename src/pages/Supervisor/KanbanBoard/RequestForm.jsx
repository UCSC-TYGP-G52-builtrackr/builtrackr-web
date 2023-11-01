import React, { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import NavBar from "../../../components/SiteSupervisor/NavBar";
import SideBar from "../../../components/SiteSupervisor/SideBar";
import ChatSpace from "../../../components/SiteSupervisor/ChatSpace";
import { BsChatDots } from "react-icons/bs";
import { useStateContext } from "../../../contexts/ContextProvider";
import { FormControl, Input } from '@mui/material';
import { Textarea,useToast } from '@chakra-ui/react';
import NativeSelect from '@mui/material/NativeSelect';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { decryptData } from "../../../encrypt";
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

const companyId = decryptData(JSON.parse(localStorage.getItem("company_id")));
const SupervisorId = decryptData(JSON.parse(localStorage.getItem("no")));
const [equipmentArray, setEquipmentArray] = useState([]);
const [materialArray, setMaterialArray] = useState([]);
const siteId  = localStorage.getItem("site_id");
const [selectedId, setSelectedId] = useState('');
const [selectedName, setSelectedName] = useState('');
const [option, setOption] = useState('');
const [type, setType] = useState('');

const handleOptionChange = (event) => {
  const selectedValue = event.target.value;
  console.log(selectedValue);
  const [id, name] = selectedValue.split('|');
  setSelectedId(id);
  setSelectedName(name);
};

const handleChangeOption = (e) => {
  setOption(e.target.value);
};

const handleOptiontypeChange = (e) => {
  setType(e.target.value);
};

const id  = selectedId;
const name = selectedName;

console.log(id);
console.log("material" ,name);


const handleSubmit = async (event) =>{ 

 //pass the post.name, post.note and post.number to the backend
  event.preventDefault();
  const { number } = post;
  const data = { SupervisorId, id,number,siteId,type, name};
  console.log(data);
  if(data !== null){
   toast.success("Pending Request") 
  }
  if(option === "equipment"){
  try {
    const response = await axios.post(
      "http://localhost:4000/api/requests/sendrequest",
      data
    );
    console.log(response);

    if (response.status === 200) {
      toast.success(" Request Successfully Send");
      window.location.reload();
    }
  }
  catch (error) {
    console.log(error);
    toast.error("Error Sending Request");
    window.location.reload();
  }
}else if(option === "Material"){
  try {
    const response = await axios.post(
      "http://localhost:4000/api/requests//sendmaterial",
      data
    );
    console.log(response);

    if (response.status === 200) {
      toast.success(" Request Successfully Send");
      window.location.reload();
    }
  }
  catch (error) {
    console.log(error);
    toast.error("Error Sending Request");
    // window.location.reload();
  }
}
}

   const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getMaterialData = async () => {
  
      try {
        const response = await axios.get(
          `http://localhost:4000/api/requests/viewmaterial?companyId=${companyId}`
        );
        console.log(response.data);
        setMaterialArray(response.data);
      } catch (error) {
        console.log(error);
      }
  };
  getMaterialData();

  }, [companyId]);

  console.log(materialArray);
  

   const {
    activeMenu,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const getEquipmentData = async () => {
  
      try {
        const response = await axios.get(
          `http://localhost:4000/api/requests/viewrequest?companyId=${companyId}`
        );
        console.log(response.data);
          setEquipmentArray(response.data);
      } catch (error) {
        console.log(error);
      }
  };
  getEquipmentData();

  }, [companyId]);

 

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
  <label variant="standard" htmlFor="uncontrolled-native">
   Select request option
  </label>
  <NativeSelect
    defaultValue={null}
    inputProps={{
      name: 'option',
      id: 'uncontrolled-native',
    }}
    label="option"
    onClick={(e) => handleChangeOption(e)}

  >
    <option value="Material">Material</option>
    <option value="equipment">Equipment</option>
  </NativeSelect>
  </FormControl>
  <br/><br/>
    <FormControl fullWidth>
    <label>Enter the category</label>
    <NativeSelect
    defaultValue={null}
    inputProps={{
      name: 'option',
      id: 'uncontrolled-native',
    }}
    label="option"
    onClick={(e) => handleOptionChange(e)} 
  >
    {Array.isArray(equipmentArray) && option === "equipment" ? (
  equipmentArray.map((equipment) => (
    <option key={equipment.equipment_id} value={`${equipment.equipment_id}|${equipment.equipment_name}`}>
      {equipment.equipment_name}
    </option>
  ))
) : option === "Material" ? (
  materialArray.map((material) => (
    <option key={material.material_id} value={`${material.material_id}|${material.material_name}`}>
      {material.material_name}
    </option>
  ))
) : (
  <option value="default">No valid data</option>
)}

  </NativeSelect>
    </FormControl><br/><br/>
    <FormControl  fullWidth>
    <label>Enter the number</label>
    <Input type = "number"  placeholder='Number'  min = '0' name ="number"  onChange={(e) => handleChange(e)}  />
    </FormControl><br/><br/>
    
    
  <> 
    <FormControl fullWidth >
    <label>Select the type</label><br/>
    <NativeSelect
    defaultValue={null}
    inputProps={{
      name: 'option',
      id: 'uncontrolled-native',
    }}
    label="option"
    onClick={(e) => handleOptiontypeChange(e)} 
  >
    { Array.isArray(materialArray) && option === "Material" ? (
  materialArray.map((material) => (
    <option key={material.material_id} value={material.type}>
      {material.type}
    </option>
  ))
) : (
  <option value="default">No valid data</option>
)}
</NativeSelect>
    </FormControl><br/><br/>
    </>

      <button class = 'ml-40' style  = {{backgroundColor:"#FFCC00" , padding:"5%" ,width:"150px" , boxShadow:"none"}}>Send</button>
  
  </Box>
  </form>
</div>
<ToastContainer />
</React.Fragment>
)
}

export default RequestForm;