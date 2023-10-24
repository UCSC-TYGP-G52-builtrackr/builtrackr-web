import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import TaskListCard from "../../components/SiteManager/TaskListComponenet";
import Navbar from "../../components/SiteManager/Navbar";
import Sidebar from "../../components/SiteManager/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
} from "@chakra-ui/react";
import { AiOutlineConsoleSql } from "react-icons/ai";
const Task = () => {
  const [taskList, setTaskList] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rejectTask, setRejectTask] = useState([]);

  useEffect(() => {
    const ViewTask = async (e = null) => {
      if (e) e.preventDefault();
      await axios.get("http://localhost:4000/api/task/viewtask").then((res) => {
        if (res.status === 200) {
          //request was succussful
          console.log(res.data);
          setTaskList(res.data);
        }
      });
    };
    ViewTask();
  }, []);

  

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
  const handleDelete = () => {
    axios
      .delete(`http://localhost:4000/api/task/deletetask`, {
        params: {
          id: rejectTask.task_id,
          
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
                      <Th><center>Action</center></Th>
                    </Tr>
                  </Thead>
                
                    <Tbody>
                    {rejectTask.map((task) => (
                      <Tr key={task.task_id}>
                        <Td>{task.sitename}</Td>
                        <Td>{task.taskname}</Td>
                        <Td>{task.specialInformation}</Td>
                        
                        <Td>{formatDate(task.duedate)}</Td>

                        <Td>
                          <Button
                            colorScheme="green"
                            // Disable the button if status is approved
                            w="120px"
                          >
                            Re Assign
                          </Button>
                          <Button 
                            colorScheme="red"
                            // Disable the button if status is approved
                            w="120px"
                            ml={4}  
                            onClick={handleDelete}    
                          >
                            Delete
                          </Button>

                        </Td>
                      </Tr>
                      ))}
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
