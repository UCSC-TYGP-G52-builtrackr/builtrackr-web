import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import TaskListCard from "../../components/SiteManager/TaskListComponenet";
import Navbar from "../../components/SiteManager/Navbar";
import Sidebar from "../../components/SiteManager/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { decryptData } from "../../encrypt";
import {
  CircularProgress,
  CircularProgressLabel,
  Box,
  useToast,
  ChakraProvider,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Grid,
  Image,
  Text,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { AiOutlineConsoleSql } from "react-icons/ai";
const Task = () => {
  const [taskList, setTaskList] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rejectTask, setRejectTask] = useState([]);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [selectedSiteIds, setSelectedSiteIds] = useState([]);


  useEffect(() => {
    const ViewTask = async (siteId) => {
       
      await axios.get(`http://localhost:4000/api/task/viewtask/${siteId}`).then((res) => {
        if (res.status === 200) {
          //request was succussful
          console.log(res.data);
          setTaskList((prevTaskList) => {
            //add res.data without duplicates to the previous task list
            const newTaskList = prevTaskList.concat(
              res.data.filter(
                (task) =>
                  !prevTaskList.some((prevTask) => prevTask.task_id === task.task_id)
              )
            );
            return newTaskList;
          });
        }
      });
    };
    const employee_id = decryptData(JSON.parse(localStorage.getItem("no")));
    axios
      .get("http://localhost:4000/api/sitemanager/getsiteids/" + employee_id)
      .then(async (response) => {
        const siteIds = await response.data.map((site) => site.site_id);
        setSelectedSiteIds(siteIds);
        for (let i = 0; i < siteIds.length; i++) {
          ViewTask(siteIds[i]);
        }
      })
      .catch((error) => {
        console.error("Error fetching site ids:", error);
      });
  }, []);
 
  

  function DeleteTaskModal(props) {
    return (
      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.onClose}
        contentLabel="Delete Task"
        style={{
          overlay: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          content: {
            width: "50%",
            maxWidth: "400px",
            maxHeight: "20vh",
            margin: "auto",
            border: "none", // Set border to none to make it invisible
            borderRadius: "8px", // Add border radius for a rounded look
          },
        }}
      >
        <h1 style={{ fontWeight: "bold", marginBottom: "20px" }}>
          Delete Confirmation
        </h1>
        <h2 style={{ marginBottom: "20px" }}>
          Are you sure you want to delete this task?
        </h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={props.onConfirm} colorScheme="red">
            Delete
          </Button>
          <Button onClick={props.onClose} style={{ marginLeft: "10px" }}>
            Cancel
          </Button>
        </div>
      </Modal>
    );
  }

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const taskReject = {
    task_id: 53,
    taskname: "raji",
    specialinformation: "ginethh",
    duedate: "2023-09-30T18:30:00.000Z",
  };

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/api/task/rejecttask")
  //     .then((res) => {
  //       //request was succussful
  //       console.log("task data", res.data);

  //       setRejectTask(res.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching reject tasks:", error);
  //     });
  // }, []);
  // console.log("reject task", rejectTask);
  // console.log("task id", rejectTask.task_id);
  // const formatDate = (dateStr) => {
  //   const date = new Date(dateStr);
  //   return date.toISOString().split("T")[0];
  // };
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0];
  };
  useEffect(() => {
    const getRejected = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/task/rejecttask"
        );
        console.log(response.data);
        if (response.status === 200) {
          setRejectTask(response.data);
        }
      } catch (error) {
        console.log(error);
        console.error("Error fetching reject data:", error);
      }
    };
    getRejected();
  }, []);
  console.log("reject task", rejectTask);
  const handleDelete = (taskId) => {
    // Store the task ID to delete
    setDeleteTaskId(taskId);
    // Open the modal
    setIsModalOpen(true);
  };

  const handleDeleteConfirmation = () => {
    // Perform the deletion
    axios
      .delete(`http://localhost:4000/api/task/deletetask`, {
        params: {
          id: deleteTaskId,
        },
      })
      .then((response) => {
        console.log("Task deleted successfully!");
        // Update the rejectTask state after successful deletion, removing the deleted task
        setRejectTask((prevRejectTask) =>
          prevRejectTask.filter((task) => task.task_id !== deleteTaskId)
        );
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message or handle the error in any way you want
        console.error("Error deleting task:", error);
      });
    // Close the modal after deletion
    setIsModalOpen(false);
  };
  const handleReAssign = (taskID) => {
    // Create an object to send to the backend
    const requestData = {
      taskID: taskID,
    };

    // Send a POST request to your backend API
    axios
      .post("http://localhost:4000/api/task/reassigntask", requestData) // Replace with your actual API endpoint
      .then((response) => {
        // Handle the response from the backend as needed
        console.log("Task reassignment successful:", response.data);
        // You can also update the task's status or perform other actions after reassignment
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error("Error reassigning task:", error);
      });
  };

  return (
    <ChakraProvider>
      <>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="flex w-full items-center justify-center h-full p-2 mt-[80px]">
            <div className="mt-2 ml-10 flex flex-col w-full h-full justify-start ">
              <TaskListCard taskList={taskList} />

              <Grid
                templateColumns="repeat(auto-fit, minmax(250px, 1fr))"
                gap={4}
                style={{ width: "70%", marginLeft: "20%", marginTop: "5%" }}
              >
                <Table variant="simple" size="lg">
                  <TableCaption placement="top">
                    <Text as="h2" fontSize="4xl" fontWeight="bold" mb={4}>
                      Rejected Task Details
                    </Text>
                  </TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Site Name</Th>
                      <Th>Task Name</Th>
                      <Th>Special Information</Th>

                      <Th>Due Date</Th>
                      <Th>
                        <center>Action</center>
                      </Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {rejectTask.map((task) => (
                      <Tr key={task.task_id}>
                        <Td>{task.sitename}</Td>
                        <Td>{task.taskname}</Td>
                        <Td>{task.specialinformation}</Td>

                        <Td>{formatDate(task.duedate)}</Td>

                        <Td textAlign="center ">
                          <div className="flex justify-center">
                          <Button
                            colorScheme="green"
                            // Disable the button if status is approved
                            w="120px"
                            onClick={() => handleReAssign(task.task_id)}
                            boxShadow="none"
                          >
                            Re Assign
                          </Button>
                          <Button
                            colorScheme="red"
                            // Disable the button if status is approved
                            w="120px"
                            ml={4}
                            onClick={() => handleDelete(task.task_id)}
                            boxShadow="none"
                          >
                            Delete
                          </Button>
                          </div>
                        </Td>
                      </Tr>
                    ))}
                    
                    <DeleteTaskModal
                      isOpen={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                      onConfirm={handleDeleteConfirmation}
                    />
                  </Tbody>
                </Table>
              </Grid>
            </div>
            {/* Add more TaskListCard components as needed */}
          </div>
        </div>
      </>
    </ChakraProvider>
  );
};

export default Task;
