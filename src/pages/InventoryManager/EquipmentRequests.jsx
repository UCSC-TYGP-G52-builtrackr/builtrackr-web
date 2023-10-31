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



import ReactPaginate from 'react-paginate';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {faArrowRight}from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const EquipmentRequests = () => {
  const selectionsettings = { persistSelection: true };

  const { themeSettings, setThemeSettings } = useStateContext();
  const [equipmentRequestData, setEquipmentRequestData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 5;
  
//..............................
const fetchEquipmentRequestData = () => {
  fetch('http://localhost:4000/api/erequest/getAllEquipmentRequests')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setEquipmentRequestData(data);
    })
    .catch((error) => {
      console.error('Error fetching equipment data:', error);
    });
};

useEffect(() => {
  fetchEquipmentRequestData();
}, []);

//.................


// const handlePageChange = ({ selected }) => {
//   setCurrentPage(selected);
// };

const handleApprove = async (requestId) => {
  try {
    // Check if the requested quantity is available
    const checkQuantityResponse = await fetch(
      `http://localhost:4000/api/erequest/checkEquipmentQuantity/${requestId}`,
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
        confirmButtonColor: '#209b1f',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, approve it',
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:4000/api/erequest/approveEquipmentRequest/${requestId}`, {
            method: 'PUT',
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              updateStatusLocally(requestId, 'Approved');
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
    console.error('Error checking equipment quantity:', error);
    Swal.fire({
      title: 'Error',
      text: 'An error occurred while checking equipment quantity.',
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
      fetch(`http://localhost:4000/api/erequest/rejectEquipmentRequest/${requestId}`, {
        method: 'PUT',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          updateStatusLocally(requestId, 'Rejected');
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
      fetch(`http://localhost:4000/api/erequest/deleteEquipmentRequest/${requestId}`, {
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
  setEquipmentRequestData((prevData) =>
    prevData.filter((request) => request.request_id !== requestId)
  );
};



const formatDate=(dateStr)=>{
  const date = new Date(dateStr);
  return date.toISOString().split("T")[0];
}


const updateStatusLocally = (requestId, status) => {
  setEquipmentRequestData((prevData) =>
    prevData.map((request) =>
      request.request_id === requestId ? { ...request, status } : request
    )
  );
};

// const startIndex = currentPage * perPage;
//   const endIndex = (currentPage + 1) * perPage;
//   const paginatedEquipmentRequestData = equipmentRequestData.slice(
//     startIndex,
//     endIndex
//   );

const paginatedEquipmentRequestData = equipmentRequestData.slice(currentPage * perPage, (currentPage + 1) * perPage);




//const paginatedEquipmentRequestData = equipmentRequestData.slice(currentPage * perPage, (currentPage + 1) * perPage);

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
            <Header title="Equipment Requests" category="gdfcgf" />
          </div>

          {/* Equipment Requests Table */}
          <div style={{ marginTop: "20px", width: "100%" }}>
            <h2 className="text-2xl font-semibold"></h2>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
  <thead className="bg-gray-100">
    <tr className="bg-gray-100 text-black">
      <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase">Request ID</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase">Date</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase">Employee ID</th>
      {/* <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase">Equipment ID</th> */}
      <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase">Equipment Name</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase">Quantity</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase">Status</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase">Actions</th>
    </tr>
  </thead>
  <tbody>
  {paginatedEquipmentRequestData.map((ereq) => (
                  <tr key={ereq.requested_id} className="text-center">
        <td className="py-2">{ereq.request_id}</td>
        <td className="py-2">{formatDate(ereq.req_date)}</td>
        <td className="py-2">{ereq.req_emp_id}</td>
        {/* <td className="py-2">{ereq.equipment_id}</td> */}
        <td className="py-2">{ereq.equipmentname}</td>
        <td className="py-2">{ereq.req_quantity}</td>
        <td className="py-2">{ereq.status}</td>
        <td className="py-2">
          <div className="flex space-x-2">
            <button
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => handleApprove(ereq.request_id)}
            >
              Approve
            </button>
            <button
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 mr-20"
              onClick={() => handleReject(ereq.request_id)}
            >
              Reject
            </button>&nbsp;
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-red-700 mr-10"
              onClick={() => handleClose(ereq.request_id)}
            >
              Close
            </button>&nbsp;
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>
<ReactPaginate
  previousLabel={
    <div className="flex items-center space-x-2">
      <span className="text-red-600">
        <FontAwesomeIcon icon={faArrowLeft} />
      </span>
      <span className="hidden md:block text-gray-600">Previous</span>
    </div>
  }
  nextLabel={
    <div className="flex items-center space-x-2">
      <span className="hidden md:block text-gray-600">Next</span>
      <span className="text-green-600">
        <FontAwesomeIcon icon={faArrowRight} />
      </span>
    </div>
  }
  breakLabel={<span className="text-gray-600 px-2 py-1 rounded-md hover:bg-gray-100">...</span>}
  pageCount={Math.ceil(equipmentRequestData.length / perPage)}
  marginPagesDisplayed={2}
  pageRangeDisplayed={5}
  onPageChange={(data) => {
    setCurrentPage(data.selected);
  }}
  containerClassName={'flex justify-center mt-5 space-x-2'}
  pageClassName={'bg-white text-gray-600 px-3 py-1 rounded-md hover:bg-gray-100'}
  activeClassName={'bg-gray-900 text-white px-3 py-1 rounded-md'}
  previousClassName={'bg-white text-gray-600 px-3 py-1 rounded-md hover:bg-gray-100'}
  nextClassName={'bg-white text-gray-600 px-3 py-1 rounded-md hover:bg-gray-100'}
/>


          </div>
          {/* End of Equipment Requests Table */}
          {/* <div className="mt-4">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={Math.ceil(
                equipmentRequestData.length / perPage
              )}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default EquipmentRequests;
