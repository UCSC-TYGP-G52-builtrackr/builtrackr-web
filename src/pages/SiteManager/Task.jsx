import React from 'react';
import axios from "axios";
import { useState,useEffect } from 'react';
import TaskListCard from '../../components/SiteManager/TaskListComponenet';
// import Header from '../../components/tmpSiteManager/Header';
// import Navbar from '../../components/tmpSiteManager/Navbar';


const Task=()=>{

    const [taskList, setTaskList] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const ViewTask = async (e=null) => {
            if(e)
                e.preventDefault();
            await axios.get('http://localhost:4000/api/task/viewtask')
                .then(res => {
                    if(res.status === 200){ //request was succussful
                        console.log(res.data);
                        setTaskList(res.data);
                        
                    }
                })
        }
        ViewTask();
    }, [])

    const handleViewTask = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
      };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

      
        return (
          <div>
           
            <TaskListCard taskList={taskList} />
                      {/* Add more TaskListCard components as needed */}
          </div>
        );
 
      
      

}


export default Task;