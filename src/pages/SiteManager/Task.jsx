import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import TaskListCard from "../../components/SiteManager/TaskListComponenet";
import Navbar from "../../components/SiteManager/Navbar";
import Sidebar from "../../components/SiteManager/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from "@chakra-ui/react";

const Task = () => {
  const [taskList, setTaskList] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <ChakraProvider>
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex w-full items-center justify-center h-full p-2 mt-[80px]">
          <div className="mt-2 ml-10 flex flex-col w-full h-full justify-start ">
            <TaskListCard taskList={taskList} />
          </div>

          {/* Add more TaskListCard components as needed */}
        </div>
      </div>
    </>
    </ChakraProvider>
  );
};

export default Task;
