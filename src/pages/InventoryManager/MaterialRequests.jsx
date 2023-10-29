import React from "react";
import { Link } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { URData } from "../../data/HrManager/URData";
import Header from "../../components/InventoryManager/HeaderIM";
// import Dropdown from '../../components/Dropdown';
import RegFormHR from "../../components/HrManager/RegFormHR";

// dashboard common components
import Navbar from "../../components/InventoryManager/NavbarIM";
import Sidebar from "../../components/Sidebar";
import SidebarIM from "../../components/InventoryManager/SidebarIM";
import ChatSpace from "../../components/ChatSpace";
import { BsChatDots } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { decryptData } from "../../encrypt";
import "../../App.css";
import Swal from 'sweetalert2';

const MaterialRequests = () => {
  const selectionsettings = { persistSelection: true };

  const { themeSettings, setThemeSettings } = useStateContext();
  const [materialRequestData, setMaterialRequestData] = useState([]);

//..............................
const fetchMaterialRequestData = () => {
  fetch('http://localhost:4000/api/mrequest/getAllMaterialRequests')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setMaterialRequestData(data);
    })
    .catch((error) => {
      console.error('Error fetching material data:', error);
    });
};

useEffect(() => {
  fetchMaterialRequestData();
}, []);

//.................



const handleApprove = async (requestId) => {
  try {
    // Check if the requested quantity is available
    const checkQuantityResponse = await fetch(
      `http://localhost:4000/api/mrequest/checkMaterialQuantity/${requestId}`,
      {
        method: 'GET',
      }
    );

    const { available } = await checkQuantityResponse.json();


    if (available) {
      // Requested quantity is available, proceed with the approval
      Swal.fire({
        title: 'Approve Request',
        text: 'Are you sure you want to approve this request?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, approve it',
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:4000/api/mrequest/approveMaterialRequest/${requestId}`, {
            method: 'PUT',
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              updateStatusLocally(requestId, 'approved');
            })
            .catch((error) => {
              console.error('Error approving request:', error);
              Swal.fire({
                title: 'Error',
                text: 'An error occurred while approving the request.',
                icon: 'error',
              });
            });
        }
      });
    } else {
      // Requested quantity is not available
      Swal.fire({
        title: 'Insufficient Quantity',
        text: 'You cannot confirm because the quantity is not enough.',
        icon: 'error',
      });
    }
  } catch (error) {
    console.error('Error checking material quantity:', error);
    Swal.fire({
      title: 'Error',
      text: 'An error occurred while checking material quantity.',
      icon: 'error',
    });
  }
};


const handleReject = (requestId) => {
  Swal.fire({
    title: 'Reject Request',
    text: 'Are you sure you want to reject this request?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, reject it',
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:4000/api/mrequest/rejectMaterialRequest/${requestId}`, {
        method: 'PUT',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          updateStatusLocally(requestId, 'rejected');
        })
        .catch((error) => {
          console.error('Error rejecting request:', error);
        });
    }
  });
};

const handleClose = (requestId) => {
  Swal.fire({
    title: 'Close Request',
    text: 'Are you sure you want to close this request?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, close it',
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:4000/api/mrequest/deleteMaterialRequest/${requestId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          removeRequestLocally(requestId);
        })
        .catch((error) => {
          console.error('Error closing request:', error);
        });
    }
  });
};

const removeRequestLocally = (requestId) => {
  setMaterialRequestData((prevData) =>
    prevData.filter((request) => request.request_id !== requestId)
  );
};






const updateStatusLocally = (requestId, status) => {
  setMaterialRequestData((prevData) =>
    prevData.map((request) =>
      request.request_id === requestId ? { ...request, status } : request
    )
  );
};

  return (
    <div className="">
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
      <div className="fixed bg-white w-72 sidebar dark:bg-secondary-dark-bg">
        <SidebarIM />
      </div>
      <div className="ml-72">
        <div className="fixed w-full md:static bg-main-bg dark:bg-main-dark-bg navbar">
          <Navbar />
        </div>
        {themeSettings && <ChatSpace />}
        <div className="md:pb-5 md:m-10 md:px-5 rounded-3xl">
          <div className="flex mb-8">
            <Header title="Material Requests" category="gdfcgf" />
          </div>

          {/* Material Requests Table */}
          <div style={{ marginTop: "20px", width: "100%" }}>
            <h2 className="text-2xl font-semibold"></h2>
            <table className="w-full table-fixed border-collapse border border-green-800">
              <thead>
                <tr className="bg-yellow-400 text-white">
                  <th className="w-1/6 py-2">Request ID</th>
                  <th className="w-1/6 py-2">Date</th>
                  <th className="w-1/6 py-2">Employee ID</th>
                  <th className="w-1/6 py-2">Material ID</th>
                 
                 
                  <th className="w-1/6 py-2">Quantity</th>
                  <th className="w-1/6 py-2">Unit</th>
                  <th className="w-1/6 py-2">Status</th>
                  <th className="w-1/3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
        {materialRequestData.map((mreq) => (
          <tr key={mreq.id} className="text-center border border-green-600">
            <td className="py-2">{mreq.request_id}</td>
            <td className="py-2">{mreq.req_date}</td>
            <td className="py-2">{mreq.req_emp_id}</td>
            <td className="py-2">{mreq.material_id}</td>
            <td className="py-2">{mreq.req_quantity}</td>
            <td className="py-2">{mreq.type}</td>
            <td className="py-2">{mreq.status}</td>
            <td className="py-2">
  <div className="flex space-x-2">
    <button
      className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
      onClick={() => handleApprove(mreq.request_id)}
    >
      Approve
    </button>
    <button
      className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
      onClick={() => handleReject(mreq.request_id)}
    >
      Reject
    </button>
    <button
      className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-red-700"
      onClick={() => handleClose(mreq.request_id)}
    >
      Close
    </button>
  </div>
</td>



          </tr>
        ))}
      </tbody>
            </table>
          </div>
          {/* End of Material Requests Table */}
        </div>
      </div>
    </div>
  );
};

export default MaterialRequests;
