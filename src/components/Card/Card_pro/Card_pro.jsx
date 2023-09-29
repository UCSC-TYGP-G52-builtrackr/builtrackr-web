import React, { useState , useEffect} from 'react';
import "../card.css";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Link } from "react-router-dom";
import axios from 'axios';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button} from '@chakra-ui/react';
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

//equipments
useEffect(() => {
  const getEquipmentData = async () => {
    
    try {
      const response = await axios.get(
        "http://localhost:4000/api/equipment/viewequipments"
      );
      console.log(response.data);
      if (response.status === 200) {
        setEquipmentArray(response.data);
      }
    } catch (error) {
      console.log(error);
    }
};
getEquipmentData ();
}, []);


//assign labour array to rows
const rows = labourArray && labourArray.map((labour) => {
  return {
    id: labour.id,
    fullName: labour.name,
    Category: labour.Category,
    available: labour.available,
    Release: `<button onclick="releaseLabour(${labour.id})">Release</button>`,

  }});

  //assign equipment array to row
  const row = equipmentArray.map((equipment) => {
    return {
      id: equipment.id,
      Category: equipment.name,
      Number: equipment.id,
      Release: <button onclick={releaseEquipment(`${equipment.id}`)}>Release</button>,

    }});
    
    function releaseLabour(labourId) {
      // Implement the logic to release the labor with the given `labourId`.
    }
    
    function releaseEquipment(equipmentId) {
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
    field: 'Category',
    headerName: 'Category',
    width: 120,
  },
  {
    field: 'available',
    headerName: 'Available',
    type: 'number',
    width: 120,
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
};


const column: GridColDef[] = [

  {
    field: 'Category',
    headerName: 'Category',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
  },
  {
    field: 'Number',
    headerName: 'Available Number',
    type: 'number',
    width: 90,
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
};



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
   <br/>
  <div style  ={{display:"inline-block"}}>
  {modalContent?.title === "Workers of the day" && (
    <div className='flex'>
      <Link to="RequestForm">
        <button className='' style={{ backgroundColor: "#FFCC00", padding: "5%", width: "180px", boxShadow: "none",marginLeft: "-12%",marginTop:"0%" }}>Request Labourers</button>
      </Link>
      <Link to="Leaves">
        <button className='ml-10' style={{ backgroundColor: "#FFCC00", padding: "5%", width: "180px", boxShadow: "none"}}>Request Leaves</button>
      </Link>
     </div>
  )}
    </div>

    {modalContent?.title === "Allocated Equipments" && (
            <Link to="RequestForm">
              <button className='ml-40' style={{ backgroundColor: "#FFCC00", padding: "5%", width: "200px", boxShadow: "none" }}>Request Equipments</button>
            </Link>
    )}

    <ChildModal />
  </Box>
</Modal>


   <div className="card_1" onClick={() => handleOpen({ title: "Allocated Equipments", description: "", 
    request:"Request Equipments"}, handleForm())}>
        <h4>Allocated Equipments</h4>
      </div>
      <div className="card_1" onClick={() => handleOpen({ title: "Workers of the day", description: "Content for Workers of the day", 
       request:"Request Labourers", 
    }, handleForm())}>
        <h4>Workers of the day</h4>
      </div>
    </>
  );
}
