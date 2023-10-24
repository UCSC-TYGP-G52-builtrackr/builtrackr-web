import {
  Box,
  Button,
  Grid,
  Table,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  ModalFooter,
  Link,
  Input,
  ChakraProvider,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import React from "react";

const TaskListCard = ({ taskList }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null); // Add state for selected site
  const [searchInput, setSearchInput] = useState(""); // Add state for search input
  const [filteredTasks, setFilteredTasks] = useState([]); // Add state for filtered tasks
  
  const filterTasksByTaskName = () => {
    const filtered = taskList.filter((task) =>
      task.taskname.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    filterTasksByTaskName();
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDashboardClick = () => {
    window.location.href = "/sitemanager/dashboard";
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:4000/api/task/deletetask`, {
        params: {
          id: selectedTask.task_id,
        },
      })
      .then((response) => {
        console.log("Task deleted successfully!");
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message or handle the error in any way you want
        console.error("Error deleting task:", error);
      });
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0];
  };

  // Function to filter tasks by site
  const filterTasksBySite = (site) => {
    if (site === selectedSite) {
      // If the same site is clicked again, clear the filter
      setSelectedSite(null);
    } else {
      // Filter tasks based on the selected site
      setSelectedSite(site);
    }
  };
  const clearSiteFilter = () => {
    setSelectedSite(null);
  };
  // Filter the taskList based on the selectedSite
  const filteredTaskList = selectedSite
    ? taskList.filter((task) => task.site === selectedSite)
    : taskList;

  return (
    <ChakraProvider>
      <Box borderWidth="1px" borderRadius="md" p={4} mb={4}>
        <Text as="h2" fontSize="4xl" fontWeight="bold" mb={4}>
          Task List
        </Text>
{/*    
        <div style={{display:"flex",width: "80%", marginLeft: "20%"}}> 
        <Button onClick={clearSiteFilter} variant={selectedSite ? "outline" : "solid"} w="120px" style={{
    backgroundColor: "#ffcc00",
    border: "none",
    color: "black",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
    transition: "background-color 0.3s, box-shadow 0.3s",
    marginBottom: "20px",
  }}>
           Tasks
          </Button>
          <Button
            onClick={() => filterTasksBySite("Site 1")}
            variant={selectedSite === "Site 1" ? "solid" : "outline"}
            w="120px"
            style={{
              backgroundColor: "#ffcc00",
              border: "none",
              color: "black",
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
              transition: "background-color 0.3s, box-shadow 0.3s",
              marginBottom: "20px",
            }}
          >
            Site 1
          </Button>
          <Button
            onClick={() => filterTasksBySite("Site 2")}
            variant={selectedSite === "Site 2" ? "solid" : "outline"}
            w="120px"
            style={{
              backgroundColor: "#ffcc00",
              border: "none",
              color: "black",
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
              transition: "background-color 0.3s, box-shadow 0.3s",
              marginBottom: "20px",
            }}
          >
            Site 2
          </Button>
        </div> */}
        <Grid
          templateColumns="repeat(auto-fit, minmax(250px, 1fr))"
          gap={4}
          style={{ width: "80%", marginLeft: "18%", marginTop: "5%"}}
        >
          {filteredTaskList.map((task) => (
            <Box key={task.task_id} borderWidth="1px" borderRadius="md" p={4}>
              <Table variant="striped" mt={4}>
                <Thead>
                  <Tr>
                    <Th><b> Task ID : {task.task_id}</b></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{task.taskname}</Td>
                  </Tr>
                </Tbody>
              </Table>
              <Button
                mt={4}
                style={{
                  backgroundColor: "#ffcc00",
                  border: "none",
                  color: "black",
                  padding: "10px 20px",
                  fontSize: "16px",
                  borderRadius: "4px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  cursor: "pointer",
                  transition: "background-color 0.3s, box-shadow 0.3s",
                }}
                onClick={() => handleViewTask(task)}
              >
                View Task
              </Button>
            </Box>
          ))}
        </Grid>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Task Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedTask && (
                <Table variant="striped" mt={4}>
                  <Thead>
                    <Tr>
                      <Th>Task Name</Th>
                      <Th>Special Information</Th>
                      <Th>Due Date</Th>
                      <Th>Site Supervisor</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>{selectedTask.taskname}</Td>
                      <Td>{selectedTask.specialinformation}</Td>
                      <Td>{formatDate(selectedTask.duedate)}</Td>
                      {/* <Td>{selectedTask.sitesupervisor}</Td> */}
                    </Tr>
                  </Tbody>
                </Table>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={handleCloseModal}>
                Close
              </Button>
              <Button colorScheme="red" mr={3} onClick={handleDelete}>
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
};

export default TaskListCard;
