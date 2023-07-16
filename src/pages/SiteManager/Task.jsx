import React from 'react';
import axios from "axios";
import { useState,useEffect } from 'react';
import TaskListCard from '../../components/SiteManager/TaskListComponenet';


const Task=()=>{

    const [taskList, setTaskList] = useState([]);

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


      
        return (
          <div>
            <TaskListCard taskList={taskList} />
            
            {/* Add more TaskListCard components as needed */}
          </div>
        );
 
      
      

}


export default Task;