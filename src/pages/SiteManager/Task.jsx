import React from 'react';
import axios from "axios";
import { useState,useEffect } from 'react';

const Task=()=>{

    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        const ViewTask = async (e=null) => {
            if(e)
                e.preventDefault();
            await axios.get('http://localhost:4000/api/task/viewtask')
                .then(res => {
                    if(res.status === 200){
                        console.log(res.data);
                        setTaskList(res.data);
                    }
                })
        }
        ViewTask();
    }, [])

    



    return(
        <div>
            <h2> Task List </h2>
            <button >View Task</button>
            {/* Task List */}
            <table>
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Special Information</th>
                        <th>Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {taskList.map((task) => (
                        <tr key={task.task_id}>
                            <td>{task.taskname}</td>
                            <td>{task.specialinformation}</td>
                            <td>{task.duedate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
    );
}


export default Task;