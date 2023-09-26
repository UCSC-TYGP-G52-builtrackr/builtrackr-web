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

const Analytics1 = () => {
  const selectionsettings = { persistSelection: true };

  const { themeSettings, setThemeSettings } = useStateContext();

  const handleApprove = (requestId) => {
    // Logic to handle approval for the given requestId
    console.log("Approved request with ID: " + requestId);
  };

  const handleReject = (requestId) => {
    // Logic to handle rejection for the given requestId
    console.log("Rejected request with ID: " + requestId);
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
            <Header title="Material and Equipment Requests" category="gdfcgf" />
          </div>

          {/* Material Requests Table */}
          <div style={{ marginTop: "20px", width: "100%" }}>
            <h2 className="text-2xl font-semibold"></h2>
            <table className="w-full table-fixed border-collapse border border-green-800">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="w-1/6 py-2">Request ID</th>
                  <th className="w-1/6 py-2">Material ID</th>
                  <th className="w-1/6 py-2">Quantity</th>
                  <th className="w-1/6 py-2">Unit</th>
                  <th className="w-1/3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {URData.map((item) => (
                  <tr key={item.id} className="text-center border border-green-600">
                    <td className="py-2">{item.request_id}</td>
                    <td className="py-2">{item.material_id}</td>
                    <td className="py-2">{item.quantity}</td>
                    <td className="py-2">{item.unit}</td>
                    <td className="py-2">
                      <button
                        className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                        onClick={() => handleApprove(item.request_id)}
                      >
                        Approve
                      </button>
                      <button
                        className="px-2 py-1 ml-2 bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={() => handleReject(item.request_id)}
                      >
                        Reject
                      </button>
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

export default Analytics1;
