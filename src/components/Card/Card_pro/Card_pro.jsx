import React, { useState , useEffect} from 'react';
import "../card.css";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Link } from "react-router-dom";
import axios from 'axios';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button} from '@chakra-ui/react';
import { Rating} from "@mui/material"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
  const [open, setOpen] = useState(false);
 

  


  //get view request data from backend and set it to labourArray
  const [labourArray, setLabourArray] = useState([]);
  const [equipmentArray, setEquipmentArray] = useState([]);
  const [materialArray, setMaterialArray] = useState([]);
  const [value, setValue] = useState("");
  const siteid = localStorage.getItem("site_id");
// let id  = parseInt(siteid ,10)
console.log(siteid)
  const siteId=localStorage.getItem("site_id");
 
 
  useEffect(() => {
  const getLabourData = async () => {
    
    try {
      const response = await axios.get(`http://localhost:4000/api/labour/viewemployee?siteId=${siteid}`);
      console.log(response.data);
        setLabourArray(response.data);
    } catch (error) {
      console.log(error);
    }
};
 getLabourData();
}, [siteid]);


//equipments
useEffect(() => {
  const getEquipmentData = async () => {
    
    try {
      const response = await axios.get( `http://localhost:4000/api/equipment/viewequipments?siteId=${siteId}`);
      console.log(response.data);
     
        setEquipmentArray(response.data);
      
    } catch (error) {
      console.log(error);
    }
};
getEquipmentData ();
}, [siteId]);


//materials
useEffect(() => {
  const getMaterialData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/equipment/viewmaterials?siteId=${siteId}`
      );
      console.log(response.data);
        setMaterialArray(response.data);
    } catch (error) {
      console.log(error);
    }
};
getMaterialData ();
}, [siteId]);





//assign labour array to rows

const rows = labourArray.map((labour) => {

  console.log(labour.approval)
  if(labour.approval === "Approved"){
    labour.approval = "Not Available"
  }else if(labour.approval !== "Not Available"){
    labour.approval = "Available"
  }
  return {
    id: labour.labourid,
    fullName: labour.f_name,
    Category: labour.labourtype,
    available: labour.approval,
    Rating: `<Rating name="size-medium" defaultValue={0}
    precision={0.5} size="large" />`,
    Release: `<button onclick="releaseLabour(${labour.labourid})">Release</button>`,

  }});


  const Row  = materialArray.map((material) => {
    return {
      id: material.material_id,
      Category :material.materialname,
      Number: material.req_quantity,
      Unit: material.type,
      Release: <button onclick={releaseMaterial(`${material.material_id}`)}>Release</button>,

    }});


  //assign equipment array to row
  const row = equipmentArray.map((equipment) => {
    return {
      id: equipment.equipment_id,
      Name :equipment.equipmentname,
      Number: equipment.req_quantity,
      Release: <button onclick={releaseEquipment(`${equipment.equipment_id}`)}>Release</button>,

    }});

    console.log(equipmentArray)
    console.log(labourArray)
    
    function releaseLabour(labourId) {
      // Implement the logic to release the labor with the given `labourId`.
    }
    
    function releaseEquipment(equipmentId) {
      // Implement the logic to release the equipment with the given `equipmentId`.
    }
    function releaseMaterial(equipmentId) {
      // Implement the logic to release the equipment with the given `equipmentId`.
    }



  function ChildModal() {}

  const handleOpen = (content) => {
    setModalContent(content);
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };

  //rating
const [ratings, setRatings] = useState({});

const handleRating = (rowId, value) => {
  // Update the ratings state with the new value
  setRatings((prevRatings) => ({
    ...prevRatings,
    id: rowId,
    rating: value,
  }));
updateRate();
};

  const updateRate = () =>{
    const rate = ratings.rating;
    const id = ratings.id;
        const data = { rate, id };
        console.log("rating", data);
        axios
          .post(`http://localhost:4000/api/labour/updaterating`, data)
          .then((response) => {
            console.log(response.data);
            if(response.status===200){
              toast.success("Rating updated successfully");
            }
          })
          .catch((err) => {
            console.log(err);
          });

        
  }

  useEffect(() => {
    const getRatingData = async () => {
      
      try {
        const response = await axios.get(`http://localhost:4000/api/labour/viewrating?siteId=${siteid}`);
        console.log(response.data);
          setValue(response.data);
      } catch (error) {
        console.log(error);
      }
  };
   getRatingData();
  }, [siteid]);

  console.log("rating id,value",value)


function handleForm(){
 
return(
  <form>
  <label>form</label>
  <input type="text" />
  </form>
);
}


const columns: GridColDef[] = [

  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 150,
  },
  {
    field: 'available',
    headerName: 'Available',
    width: 150,
  },
  {
    field: 'Category',
    headerName: 'Category',
    width: 150,
  },
  {
  field: 'Rating',
  headerName: 'Rating',
  width: 150,
  renderCell: (params) => (
    <>
    {/* //map value according to row id */}
    {Array.isArray(value) && value.map((val) => {
      if (val.labourid === params.row.id) {

        return(

    <Rating
      name="size-medium"
      defaultValue={ratings.value}
      value={val.rating}
      precision={1}
      placeholder={val.rating}
      size="large"
      onChange={(event, newValue) => {
        // Update the rating when it changes
        handleRating(params.row.id, newValue);
      }}
      // onClick={() => handleRating(params.row.id ,ratings.value)}
      
    />
        )
      
  }return null;
})}
    </>

  ),
  },
  {
    field: 'Release',
    headerName: 'Release',
    width: 150,
    renderCell: (params) => (
      <Button 
      colorScheme="blue"
            style={{
              backgroundColor: "#ffcc00",
              border: "none",
              color: "black",
              padding: "5px 10px",
              fontSize: "16px",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
              transition: "background-color 0.3s, box-shadow 0.3s",
              marginLeft: "8%",
              marginTop: "5%",
            }}
      
      onClick={() => handleRelease(params.row.id)}>Release</Button>
    ),
  },
];

const CustomDataGrid = ({ rows }) => {};

  const handleRelease = (itemId) => {
    console.log(itemId);
    const data  = {itemId}
    axios
    .post(`http://localhost:4000/api/labour/updateemployee`,data)
    .then(() => {
      console.log("success");
    })
    .catch((err) => {
      console.log(err);
    });
    window.location.reload();
};


const column: GridColDef[] = [

  {
    field: 'Name',
    headerName: 'Name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 220,
  },
  {
    field: 'Number',
    headerName: 'Quantity',
    type: 'number',
    width: 150,
    alignItem:'center'
  },
  {
    field: 'Release',
    headerName: 'Release',
    width: 150,
    renderCell: (params) => (
      <Button 
      colorScheme="blue"
            style={{
              backgroundColor: "#ffcc00",
              border: "none",
              color: "black",
              padding: "5px 10px",
              fontSize: "16px",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
              transition: "background-color 0.3s, box-shadow 0.3s",
              marginLeft: "8%",
              marginTop: "5%",
            }}
      
      onClick={() => handleReleaseEquipment(params.row.id)}>Release</Button>
    ),
  },
];

const CustomGrid = ({ row }) => {};

const handleReleaseEquipment = (itemId) => {
  console.log(itemId);
  const data  = {itemId}
  axios
  .post(`http://localhost:4000/api/equipment//updateEquipmentAvailable`,data)
  .then(() => {
    console.log("success");
  })
  .catch((err) => {
    console.log(err);
  });
  window.location.reload();
};

const Columns: GridColDef[] = [

  {
    field: 'id',
    headerName: 'Material Id',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 150,
  },
  {
    field: 'Category',
    headerName: 'Category',
    width: 150,
  },
  {
    field: 'Number',
    headerName: 'Quantity',
    width: 150,
  },
  {
    field: 'Unit',
    headerName: 'Unit',
    width: 150,
  },
];

const CustomData = ({ Rows }) => {};



  return (
    <>
     <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="parent-modal-title"
  aria-describedby="parent-modal-description"
>
  <Box sx={{ ...style, width: 750 }}>
    <h2 class = "text-2xl font-extrabold dark:text-black" style  ={{marginTop:"-18%"}}>{modalContent?.title}</h2><br/>
   {modalContent?.title === "Workers of the day" && (
    <div style={{ height: 300, width: '100%' }}>
 
      <DataGrid
        rows={rows}
        columns={columns}
      />
    </div>
   )}
   <br/>
   {modalContent?.title === "Allocated Equipments" && (
    <div style={{ height: 300, width: '100%' }}>
 
      <DataGrid
        rows={row}
        columns={column}
      />
    </div>
   )}

{modalContent?.title === "Allocated Materials" && (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        rows={Row}
        columns={Columns}
      />

    </div>
   )}


   <br/>
  <div style  ={{display:"inline-block"}}>
  {modalContent?.title === "Workers of the day" && (
    <div className='flex'>
      <Link to="RequestForm">
        <button className='' style={{ backgroundColor: "#FFCC00", padding: "5%", width: "180px", boxShadow: "none",marginLeft: "5%",marginTop:"0%" }}>Request Labourers</button>
      </Link>
      <Link to="Leaves">
        <button className='ml-10' style={{ backgroundColor: "#FFCC00", padding: "5%", width: "180px", boxShadow: "none",marginLeft: "60%"}}>Request Leaves</button>
      </Link>
     </div>
  )}
    </div>

    {modalContent?.title === "Allocated Equipments" && (
            <Link to="RequestForm">
              <button className='ml-40' style={{ backgroundColor: "#FFCC00", padding: "2%", width: "250px", boxShadow: "none", marginLeft: "52%"}}>Request Equipments</button>
            </Link>
    )}

{modalContent?.title === "Allocated Materials" && (
            <Link to="RequestForm">
              <button className='ml-40' style={{ backgroundColor: "#FFCC00", padding: "2%", width: "250px", boxShadow: "none", marginLeft: "52%"}}>Request Materials</button>
            </Link>
    )}

    <ChildModal />
  </Box>
</Modal>


   
      <div className="card_1" onClick={() => handleOpen({ title: "Workers of the day", description: "Content for Workers of the day", 
       request:"Request Labourers", 
    }, handleForm())}>
        <h4>Workers of the day</h4>
      </div>
      <div className="card_1" onClick={() => handleOpen({ title: "Allocated Equipments", description: "", 
    request:"Request Equipments"}, handleForm())}>
        <h4>Allocated Equipments</h4>
      </div>
      <div className="card_1" onClick={() => handleOpen({ title: "Allocated Materials", description: "", 
    request:"Request Materials"}, handleForm())}>
        <h4>Allocated Materials</h4>
      </div>
      <ToastContainer />
    </>
  );
}

