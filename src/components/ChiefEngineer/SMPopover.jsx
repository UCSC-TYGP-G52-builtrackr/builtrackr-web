import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { decryptData } from '../../encrypt';
import { useState, useEffect } from "react";

export default function SMPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedManager, setSelectedManager] = React.useState(null);
  const [managerDetails, setManagerDetails] = React.useState(null);

  const handleClick = async (event, manager) => {
    setAnchorEl(event.currentTarget);
    setSelectedManager(manager);
    console.log("selected manager's no: ", manager.no);

    try {
        // Create an object with the employee ID
        const requestData = {
          employeeNo: manager.no, // Replace with the actual property name for the employee ID
        };
    
        const data = await fetch(
          "http://localhost:4000/api/site/getManagerDetails",
          {
            method: "POST", // Use POST to send data in the request body
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData), // Send the employee ID in the request body
          }
        );
    
        if (data.status === 200) {
          const jsonData = await data.json();
          console.log("Clicked manager's details ", jsonData);
          setManagerDetails(jsonData);
        } else {
          console.log(data.status);
        }
      } catch (err) {
        console.error(err.message);
      }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedManager(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [siteManagers, setSiteManagers] = useState([]);

  const storedCompId = localStorage.getItem("company_id");
  const decryptedValue = decryptData(JSON.parse(storedCompId));
  const companyID = parseInt(decryptedValue, 10);

  useEffect(() => {
    const viewAllManagers = async () => {
      try {
        const formData = {
          companyID: companyID,
        };
        const data = await fetch(
          "http://localhost:4000/api/site/getAllManagers",
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
          setSiteManagers(jsonData);
        } else {
          console.log(data.status);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    viewAllManagers();
  }, []);

  return (
    <div>
        <div className='grid grid-cols-1 mt-6 gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
                {siteManagers.map((sm) => (
                  <div key={sm.id} className="relative flex flex-col items-center justify-center group">
                    <div className="overflow-hidden bg-gray-200 rounded-full w-36 h-36 lg:aspect-none group-hover:opacity-75">
                      <img
                        // src={`http://localhost:4000/employees/${sm.photo_path}`}
                        src={sm.photo_path ? `http://localhost:4000/employees/${sm.photo_path}` : 'http://localhost:4000/employees/no-profile-picture0020.jpg'}
                        alt={sm.f_name}
                        className="object-cover object-center rounded-full w-36 h-36 lg:h-36 lg:w-full"
                      />
                    </div>
                    <div className="flex items-center justify-center mt-4">
                      <div className="text-center" onClick={(event) => {
                        console.log("Clicked on the div with image:", sm);
                        handleClick(event, sm);
                    }}>
                        {/* <p className="mt-1 text-sm text-gray-500">Status</p> */}
                        {parseInt(sm.site_manager_count) === 2 ? (
                            <p className="mt-1 text-sm text-red-500">Not Available</p>
                        ) : (
                            <p className="mt-1 text-sm text-green-500">Available</p>
                        )}
                        <h3 className="text-sm font-bold text-black-700">
                          <a href={'#'}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {sm.full_name}
                          </a>
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
      >
        {/* {selectedManager && (
            <div>
                <Typography sx={{ p: 2 }}>Hello</Typography>
            </div>
        )} */}

        {managerDetails && (
            <div>
                {managerDetails[0]?.assigned_sites_count === 0 ? (
                        <Typography sx={{ p:2 }}>Not assigned</Typography>
                    ) : (
                        <div>
                        <Typography sx={{ p: 2 }}>
                            <span style={{ fontWeight: 'bold' }}>Sites managing:</span> {managerDetails[0]?.assigned_sites_count}
                        </Typography>
                        <Typography sx={{ pb: 2, pl:2, pr:2 }}>
                            <span style={{ fontWeight: 'bold' }}>Assigned to:</span> {managerDetails[0]?.assigned_site_names}
                        </Typography>
                    </div>   
                )}
                {/* <Typography sx={{ p: 2 }}>
                    <span style={{ fontWeight: 'bold' }}>Sites managing:</span> {managerDetails[0]?.assigned_sites_count}
                </Typography>
                <Typography sx={{ pb: 2, pl:2, pr:2 }}>
                    <span style={{ fontWeight: 'bold' }}>Assigned to:</span> {managerDetails[0]?.assigned_site_names}
                </Typography> */}
                {/* Add more manager details here */}
            </div>
        )}
      </Popover>
    </div>
  );
}
