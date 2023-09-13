import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  ChakraProvider,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import Navbar from "../../components/SiteManager/Navbar";
import Sidebar from "../../components/SiteManager/Sidebar";

function LaborLeaveTable() {
  const [leaveData, setLeaveData] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [sortDirection, setSortDirection] = useState("asc");

  const onCloseAlert = () => setIsAlertOpen(false);

  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setIsAlertOpen(true);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
  };
  const getCurrentDate = () => {
    const currentDate = new Date();
    // Get the current date in YYYY-MM-DD format
    const formattedDate = currentDate.toISOString().split("T")[0];
    return formattedDate;
  };
  const handleSort = () => {
    const sortedData = [...leaveData].sort((a, b) => {
      const dateA = new Date(a.leave_start_date);
      const dateB = new Date(b.leave_start_date);

      if (sortDirection === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    setLeaveData(sortedData);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/labourleave/leavereq")
      .then((response) => {
        setLeaveData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleApprove = (laborId) => {
    const currentDate = getCurrentDate();
    const approvalData = {
      approval: "approved",
      laborId: laborId,
      approvalDate: currentDate, // Include the current date (YYYY-MM-DD)
    };
  
    axios
      .post(`http://localhost:4000/api/labourleave/approve`, approvalData)
      .then((response) => {
        showAlert("Leave request approved successfully.", "success");
        // Fetch the updated leave data and set it in the state
        axios
          .get("http://localhost:4000/api/labourleave/leavereq")
          .then((response) => {
            setLeaveData(response.data);
          })
          .catch((error) => {
            console.error("Error fetching updated data:", error);
          });
      })
      .catch((error) => {
        console.error("Error approving leave:", error);
        showAlert("Error approving leave request.", "error");
      });
  };
  
  const handleDecline = (laborId) => {
    const currentDate = getCurrentDate();
    const declineData = {
      approval: "declined",
      laborId: laborId,
      approvalDate: currentDate, // Include the current date (YYYY-MM-DD)
    };
  
    axios
      .post(`http://localhost:4000/api/labourleave/decline`, declineData)
      .then((response) => {
        showAlert("Leave request declined.", "success");
        // Fetch the updated leave data and set it in the state
        axios
          .get("http://localhost:4000/api/labourleave/leavereq")
          .then((response) => {
            setLeaveData(response.data);
          })
          .catch((error) => {
            console.error("Error fetching updated data:", error);
          });
      })
      .catch((error) => {
        console.error("Error declining leave:", error);
        showAlert("Error declining leave request.", "error");
      });
  };

 

  return (
    <ChakraProvider>
        <>
      <Navbar />
      <div className="flex">
      <Sidebar/>
      <div style={{ display: "flex", alignItems: "center"}}>
        
        <Table variant="unstyled">
          <Thead>
            <Tr>
              <Th>Labor Name</Th>
              <Th>Leave Start Date</Th>
              <Th>Leave End Date</Th>
              <Th>Description</Th>
              <Th>Action</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leaveData.map((row) => (
              <Tr key={row.labor_id}>
                <Td>{row.labor_name}</Td>
                <Td>{formatDate(row.leave_start_date)}</Td>
                <Td>{formatDate(row.leave_end_date)}</Td>
                <Td>{row.description}</Td>
                
                <Td>
        <Button
          colorScheme="green"
          onClick={() => handleApprove(row.labor_id)}
          isDisabled={row.approval === "approved"} // Disable the button if status is approved
        >
          Approve
        </Button>
        <Button
          colorScheme="red"
          onClick={() => handleDecline(row.labor_id)}
          isDisabled={row.approval === "approved"} // Disable the button if status is approved
        >
          Decline
        </Button>
      </Td>
                <Td>{row.approval}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
      {/* AlertDialog */}
      <AlertDialog
        isOpen={isAlertOpen}
        onClose={onCloseAlert}
        motionPreset="slideInBottom"
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {alertType === "success" ? "Success" : "Error"}
          </AlertDialogHeader>

          <AlertDialogBody>{alertMessage}</AlertDialogBody>

          <AlertDialogFooter>
            <Button colorScheme="red" onClick={onCloseAlert}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </div>
      </>
    </ChakraProvider>
  );
}

export default LaborLeaveTable;
