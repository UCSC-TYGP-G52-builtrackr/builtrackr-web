
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../../components/SiteManager/Navbar";
import Sidebar from "../../components/SiteManager/Sidebar";
import axios from "axios";
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
} from "@chakra-ui/react";

const SMDashboard = () => {
  const [task, setTask] = useState({
    taskName: "",
    specialInformation: "",
    dueDate: "",
  });

  const navigate = useNavigate();
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  const AddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/task/addtask", {
        taskName: task.taskName,
        specialInformation: task.specialInformation,
        dueDate: task.dueDate,
      });

      if (response.status === 201) {
        setIsSuccessAlertOpen(true);
        setTimeout(() => {
          navigate('/sitemanager');
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

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex w-full items-center justify-center h-full p-2 mt-[80px]">
          <div className="mt-2 flex flex-col w-full h-full justify-start items-center">
            <div className="text-2xl font-bold mb-2"> Add a Task </div>
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
                placeholder="Username"
                name="dueDate"
                value={task.dueDate}
                onChange={(e) => handleChange(e)}
              />
            </div>

              <div className="flex items-center justify-center">
                <button
                  className="text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  style={{ backgroundColor: "#FFCC00" }}
                  type="button"
                  onClick={(e) => AddTask(e)}
                >
                  Add Task
                </button>
              </div>
            </form>
            <Modal isOpen={isSuccessAlertOpen} onClose={() => setIsSuccessAlertOpen(false)}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Success</ModalHeader>
                <ModalBody>
                  <Alert status="success">
                    <AlertIcon />
                    Task Added Successfully
                  </Alert>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="yellow" mr={3} onClick={() => setIsSuccessAlertOpen(false)}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Modal isOpen={isErrorAlertOpen} onClose={() => setIsErrorAlertOpen(false)}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Error</ModalHeader>
                <ModalBody>
                  <Alert status="error">
                    <AlertIcon />
                    Task Added Failed
                  </Alert>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="yellow" mr={3} onClick={() => setIsErrorAlertOpen(false)}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default SMDashboard;
