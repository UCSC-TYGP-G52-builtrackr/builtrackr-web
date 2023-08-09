import React from 'react';
import { useState } from 'react';
import Navbar from '../../components/SiteManager/Navbar';
import Sidebar from '../../components/SiteManager/Sidebar';
import axios from "axios";

const SMDashboard = () => {

  const [task, setTask] = useState({
    taskName: '',
    specialInformation: '',
    dueDate: '',
  });

  const AddTask = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:4000/api/task/addtask', {
      taskName: task.taskName,
      specialInformation: task.specialInformation,
      dueDate: task.dueDate,
    })
      .then(res => {
        console.log(res);
      })
  }
  const handleChange = (e) => {
    setTask({...task, [e.target.name]: e.target.value});
    
  }



  return (
    <>
      
      <Sidebar /> 
      <Navbar />

      
      
      <div style={{marginLeft:'16rem'}} className='mt-2 flex flex-col w-full h-full justify-start items-center'>
        <div className='text-2xl font-bold mb-2'> Add a Task </div>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96'>
          <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Task Name
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='taskName' id="username" type="text" placeholder="Name" value={task.taskName} onChange={(e)=>handleChange(e)}/>
          </div>
          <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Special Information
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Info" name='specialInformation' value={task.specialInformation} onChange={(e)=>handleChange(e)}/>
          </div>
          <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Due Date
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="date" placeholder="Username" name='dueDate' value={task.dueDate} onChange={(e)=>handleChange(e)}/>
          </div>
          
          <div class="flex items-center justify-center">
            <button class=" text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" style={{ backgroundColor: "#FFCC00" }} type="button" onClick={(e)=>AddTask(e)}>
              Add Task
            </button>
          </div>
        </form>
      </div>


    </>
  );
};


export default SMDashboard;