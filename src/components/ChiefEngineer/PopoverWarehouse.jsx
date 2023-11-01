import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { SiteManagers } from '../../data/SiteManagers';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { decryptData } from '../../encrypt';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

export default function PopoverWarehouse({ warehouseId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIcon, setSelectedIcon] = React.useState(null);
  const [tooltipTitle, setTooltipTitle] = React.useState('Name'); // State to store the tooltip title
  const [selectedPerson, setSelectedPerson] = React.useState(null); 
  const [assignedManagerW, setAssignedManagerW] = useState([]);
  const [inventoryManagers, setInventoryManagers] = useState([]);
  
  console.log("warehouse id: ", warehouseId);

  const handleClick = (event) => {
    // setAnchorEl(event.currentTarget);
    if (!selectedIcon) {
      // If the selected icon is "AddCircleOutline", open the popover
      setAnchorEl(event.currentTarget);
    } else {
      // If the selected icon is not null, display the confirmation modal
      // You can set a state variable to control the confirmation modal's visibility
      setUnassignConfirmationModalOpen(true);
    }
  };

  const storedCompId = localStorage.getItem("company_id");
  const decryptedValue = decryptData(JSON.parse(storedCompId));
  const companyID = parseInt(decryptedValue, 10);
  console.log("Company ID", companyID);

  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [unassignConfirmationModalOpen, setUnassignConfirmationModalOpen] = useState(false);

  const handleListItemClick = (inPerson) => () => {

    // localStorage.setItem('selectedImage', '/havelock.jpg');
    // localStorage.setItem('selectedPerson', person.full_name);
    // setSelectedImageUrl('/havelock.jpg');

    // setSelectedPerson(person);
    setSelectedPerson({
      name: inPerson.f_name,
      full_name : inPerson.full_name,
      no: inPerson.no,
      photo_path: inPerson.photo_path // Assuming the full name is stored in the `full_name` property
      // Other properties of the selected person...
    });
    setConfirmationModalOpen(true);
    // setTooltipTitle(person.full_name);
    // setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const closeConfirmationModal = () => {
    setConfirmationModalOpen(false);
    setAnchorEl(null);
  };

  const closeUnassignConfirmationModal = () => {
    setUnassignConfirmationModalOpen(false);
    setAnchorEl(null);
  };

  const storedSelectedImage = localStorage.getItem('selectedImage');

  const updateIconAndTooltip = (inPerson) => {
    // Update the icon and tooltip based on the selected person
    // For example, set the new icon and tooltip title
    setSelectedIcon(<img className="flex-none w-12 h-12 rounded-full bg-gray-50" src={selectedPerson.photo_path ? `http://localhost:4000/employees/${selectedPerson.photo_path}` : 'http://localhost:4000/employees/no-profile-picture0020.jpg'} />);
    setTooltipTitle(selectedPerson.full_name);
  };

  useEffect(() => {
    console.log("Is assigned?:", assignedManagerW);
  }, [assignedManagerW]);
  

  useEffect(() => {
    const checkAssignedOrNotWarehouse = async () => {
      try {
        const formData = {
          warehouseId: warehouseId,
        };
        const data = await fetch(
          "http://localhost:4000/api/warehouseCE/checkWhetherAssignedWarehouse",
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
          console.log("results of the warehouse checkassigned function: ",jsonData[0].full_name);
          setAssignedManagerW(jsonData);
          if (jsonData.length > 0) {
            // If someone is assigned, update the tooltip and selected icon
            setTooltipTitle(jsonData[0].full_name); 
            setSelectedIcon(<img className="flex-none w-12 h-12 rounded-full bg-gray-50" src={jsonData[0].photo_path ? `http://localhost:4000/employees/${jsonData[0].photo_path}` : 'http://localhost:4000/employees/no-profile-picture0020.jpg'} />);
          }
        } else {
          console.log(data.status);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    checkAssignedOrNotWarehouse();
  }, []);

  useEffect(() => {

    // Check if there is a previously selected image URL in local storage
    // const storedSelectedImage = localStorage.getItem('selectedImage');
    // if (storedSelectedImage) {
    //   setSelectedImageUrl(storedSelectedImage);
    // }

    console.log("Selected Person:", selectedPerson);
    // console.log("Is assigned?:", assignedManager);

    const viewAvailManagers = async () => {
      try {
        const formData = {
          companyID: companyID,
        };
        const data = await fetch(
          "http://localhost:4000/api/warehouseCE/getWarehouseManagers",
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
          console.log("Inventory managers: ",jsonData);
          setInventoryManagers(jsonData);
        } else {
          console.log(data.status);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    viewAvailManagers();
  }, [open]);

  const handleSubmitConfirmation = async () => {
    if (selectedPerson) {
      try {
        // Create a request object with the necessary data
        console.log("handlesubmit");
        const requestData = {
          warehouseId: warehouseId,
          // companyID: companyID, // Assuming compID is defined in your component
          selectedPersonNo: selectedPerson.no, // Replace 'no' with the actual property name of the selected person's identifier
          // Add other data as needed
        };
  
        console.log(requestData);
        // Send a POST request to the backend API
        const response = await fetch("http://localhost:4000/api/warehouseCE/assignInvManager", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
  
        if (response.status === 200) {
          // The request was successful, you can update the icon and tooltip here
          updateIconAndTooltip(selectedPerson.full_name);
        } else {
          // Handle the case where the request was not successful
          console.log("Request failed with status:", response.status);
        }
      } catch (error) {
        // Handle any network or other errors
        console.error("Error:", error);
      } finally {
        // Close the confirmation modal regardless of the outcome
        closeConfirmationModal();
      }
    }
  };

  const handleSubmitUnassign = async () => {
      try {
        const requestData = {
          warehouseId: warehouseId
        };
        const response = await fetch("http://localhost:4000/api/warehouseCE/unassignInvManager", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
  
        if (response.status === 200) {
          // setSelectedIcon(<img className="flex-none w-12 h-12 rounded-full bg-gray-50" src={`/addCircle.png`}/>);
          setSelectedIcon(null);
          setTooltipTitle('Not Assigned');
          // setSelectedIcon(<AddCircleOutlineIcon fontSize="inherit" />);
        } else {
          // Handle the case where the request was not successful
          console.log("Request failed with status:", response.status);
        }
      } catch (error) {
        // Handle any network or other errors
        console.error("Error:", error);
      } finally {
        // Close the confirmation modal regardless of the outcome
        closeUnassignConfirmationModal();
      }
  };

  return (
    <div>
        {/* Conditional rendering based on whether selectedImageUrl is null */}
        {selectedIcon ? (
          <Tooltip title={tooltipTitle} placement="right-end">
          {/* <img
            className="inline-block w-10 h-10 mt-2 rounded-full cursor-pointer ring-2 ring-white"
            src={selectedImageUrl}
            alt=""
            onClick={handleClick}
          /> */}
          <div className="inline-block text-4xl cursor-pointer" onClick={handleClick}>
            {/* <AccountCircleIcon fontSize="inherit" /> */}
            <img className="flex-none w-12 h-12 rounded-full bg-gray-50" src={selectedPerson?.photo_path ? `http://localhost:4000/employees/${selectedPerson.photo_path}` : 'http://localhost:4000/employees/no-profile-picture0020.jpg'} />
          </div>
          </Tooltip>
        ) : (
          <div className="inline-block text-4xl cursor-pointer" onClick={handleClick}>
            <AddCircleOutlineIcon fontSize="inherit" />
          </div>
        )}

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >

        {/* popover content */}
        <div className="overflow-y-auto max-h-72">
        <Typography sx={{ p: 2 }}>
            <ul role="list" className="divide-y divide-gray-100">
                {/* from the imported sitemanagers dataset */}
                {inventoryManagers.map((inPerson) => (
                    <li key={inPerson.email} className="flex justify-between py-5 cursor-pointer gap-x-6" onClick={handleListItemClick(inPerson)}>
                    <div className="flex min-w-0 gap-x-4">
                        <img className="flex-none w-12 h-12 rounded-full bg-gray-50" src={inPerson.photo_path ? `http://localhost:4000/employees/${inPerson.photo_path}` : 'http://localhost:4000/employees/no-profile-picture0020.jpg'} />
                        <div className="flex-auto min-w-0">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{inPerson.full_name}</p>
                        <p className="mt-1 text-xs leading-5 text-gray-500 truncate">{inPerson.email}</p>
                        </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">Inventory Manager</p>
                        {/* {person.lastSeen ? (
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                            Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                        </p>
                        ) : (
                        <div className="mt-1 flex items-center gap-x-1.5">
                            <div className="flex-none p-1 rounded-full bg-emerald-500/20">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            </div>
                            <p className="text-xs leading-5 text-gray-500">Online</p>
                        </div>
                        )} */}
                    </div>
                    </li>
                ))}
            </ul>
        </Typography>
        </div>
      </Popover>

      {/* Confirmation Modal */}
      <ConfirmationModal
        confirmModal={confirmationModalOpen}
        text={`Are you sure you want to assign ${selectedPerson ? selectedPerson.name : 'this person'} as the manager?`}
        closeConfirmationModal={closeConfirmationModal}
        submit={handleSubmitConfirmation}
      />

      <ConfirmationModalUnassign
        confirmModal={unassignConfirmationModalOpen}
        text={`Are you sure you want to unassign ${selectedPerson ? selectedPerson.name || 'this person' : 'this person'} as the manager?`}
        closeConfirmationModal={closeUnassignConfirmationModal}
        submit={handleSubmitUnassign}
      />
    </div>
  );

  function ConfirmationModal({
    confirmModal,
    text,
    closeConfirmationModal,
    submit,
  }) {
    const style = {
      position: "absolute",
      marginLeft: "150px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 500,
      bgcolor: "background.paper",
      boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
      borderRadius: "10px",
      p: 4,
    };
    return (
      <>
        <div className='w-{400px} relative left-1/2 translate-x-[-50%]'>
          <Modal
            open={confirmModal}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={style}>
              <h1
                style={{
                  textAlign: "center",
                  fontSizeAdjust: "16px",
                  fontWeight: "600",
                }}
                id="child-modal-description"
              >
                {text}{" "}
              </h1>
              <div className="two-btns">
                <Button size="small" onClick={closeConfirmationModal} sx={{ color: 'red', backgroundColor: 'white', borderColor: 'red',':hover': {
                backgroundColor: 'red',
                color: 'white',
                borderColor: 'red'
                }}}>No</Button>

                <Button size="small" onClick={handleSubmitConfirmation} sx={{ color: 'green', backgroundColor: 'white', borderColor: 'green',':hover': {
                backgroundColor: 'green',
                color: 'white',
                borderColor: 'green'
                }}}>Yes</Button>
              </div>
              {/* <Button onClick={handleClose}>Close Child Modal</Button> */}
            </Box>
          </Modal>
        </div>
      </>
    );
  }

  function ConfirmationModalUnassign({
    confirmModal,
    text,
    closeConfirmationModal,
    submit,
  }) {
    const style = {
      position: "absolute",
      marginLeft: "150px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 500,
      bgcolor: "background.paper",
      boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
      borderRadius: "10px",
      p: 4,
    };
    return (
      <>
        <div className='w-{400px} relative left-1/2 translate-x-[-50%]'>
          <Modal
            open={confirmModal}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={style}>
              <h1
                style={{
                  textAlign: "center",
                  fontSizeAdjust: "16px",
                  fontWeight: "600",
                }}
                id="child-modal-description"
              >
                {text}{" "}
              </h1>
              <div className="two-btns">
                <Button size="small" onClick={closeConfirmationModal} sx={{ color: 'red', backgroundColor: 'white', borderColor: 'red',':hover': {
                backgroundColor: 'red',
                color: 'white',
                borderColor: 'red'
                }}}>No</Button>

                <Button size="small" onClick={handleSubmitUnassign} sx={{ color: 'green', backgroundColor: 'white', borderColor: 'green',':hover': {
                backgroundColor: 'green',
                color: 'white',
                borderColor: 'green'
                }}}>Yes</Button>
              </div>
              {/* <Button onClick={handleClose}>Close Child Modal</Button> */}
            </Box>
          </Modal>
        </div>
      </>
    );
  }
  
}