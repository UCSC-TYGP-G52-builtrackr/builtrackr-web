import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/SiteManager/Navbar";
import Sidebar from "../../components/SiteManager/Sidebar";
import axios from "axios";
import { AiOutlinePlus } from 'react-icons/ai'

import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  AlertIcon,
  useToast,
  ModalCloseButton,
  ChakraProvider,
  Grid,
  Image,
  Text,
} from "@chakra-ui/react";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import { FaRegCalendarMinus } from "react-icons/fa";
import { ContextProvider } from "../../contexts/ContextProvider";

const SMDashboard = () => {
  const [task, setTask] = useState({
    taskName: "",
    specialInformation: "",
    dueDate: "",
  });
  const toast = useToast();
  const navigate = useNavigate();
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  const AddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/task/addtask",
        {
          taskName: task.taskName,
          specialInformation: task.specialInformation,
          dueDate: task.dueDate,
        }
      );

      if (response.status === 201) {
        setIsSuccessAlertOpen(true);
        toast({
          title: "Task Added.",
          description: "Added Task Succesfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setTask({
          taskName: '',
          specialInformation: '',
          dueDate: '',
        });

        onclose();
        setTimeout(() => {
          navigate("/sitemanager/dashboard");
        }, 2000);
      } else {
        setIsErrorAlertOpen(true);
      }
    } catch (error) {
      setIsErrorAlertOpen(true);
    }
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let day = now.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
  }

  return (
    <>
      <ChakraProvider>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="flex ml-[300px] w-full items-center justify-center h-full p-2 mt-[80px]">
            <div className="mt-2 flex flex-col w-full h-full justify-start items-center">
              <div className="flex w-full justify-around my-8">
                <div className="border-t-1 border-r-1 border-b-1 h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#B589DF] flex items-center justify-between px-[10px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
                  <div>
                    <h2 className="text-[#B589DF] text-sm font-bold">
                      Current Site Count
                      <br />
                    </h2>
                    <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                      4
                    </h1>
                  </div>
                  <FaRegCalendarMinus fontSize={28} color="" />
                </div>
                <div className="border-t-1 border-r-1 border-b-1 h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#1CC88A] flex items-center justify-between px-[10px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
                  <div>
                    <h2 className="text-[#1cc88a] text-sm font-bold">
                      Current Task Count <br />
                    </h2>
                    <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                      4.2
                    </h1>
                  </div>
                  <div className="text-4xl">
                    <AttachMoneyIcon fontSize="inherit" />
                  </div>
                </div>
                <div className="border-t-1 border-r-1 border-b-1 h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#36B9CC] flex items-center justify-between px-[10px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
                  <div>
                    <h2 className="text-[#36B9CC] text-sm font-bold">
                      Safety Incident <br />
                      Rate
                    </h2>
                    <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                      11%
                    </h1>
                  </div>
                  <div className="text-4xl">
                    <EngineeringIcon fontSize="inherit" />
                  </div>
                </div>
                <div className="border-t-1 border-r-1 border-b-1 h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#F6C23E] flex items-center justify-between px-[10px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
                  <div>
                    <h2 className="text-[#F6C23E] text-sm font-bold">
                      Defects Per <br />
                      Unit
                    </h2>
                    <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                      2
                    </h1>
                  </div>
                  <div className="text-4xl">
                    <BrokenImageIcon fontSize="inherit" />
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold mb-2 mt-10"> Add a Task </div>
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="username"
                  >
                    Task Name
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="taskName"
                    id="username"
                    type="text"
                    placeholder="Task Name"
                    value={task.taskName}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="username"
                  >
                    Special Information
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Info"
                    name="specialInformation"
                    value={task.specialInformation}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="username"
                  >
                    Due Date
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="date"
                    placeholder="Due Date"
                    name="dueDate"
                    value={task.dueDate}
                    min={getCurrentDate()}
                    onChange={(e) => handleChange(e)}
                  />

                  <div className="flex items-center justify-center">
                    <button
                      className="text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-10"
                      style={{ backgroundColor: "#FFCC00" , display:"flex"}}
                      type="button"
                      onClick={(e) => AddTask(e)}
                    >
                      Add Task
                      <AiOutlinePlus  style={{marginTop:"4px", marginLeft:"10px"}}/>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </ChakraProvider>
    </>
  );
};

export default SMDashboard;
