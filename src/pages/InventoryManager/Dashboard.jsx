import React from "react";
import { Link } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { URData } from "../../data/HrManager/URData";
import Header from "../../components/InventoryManager/HeaderIM";
//import Dropdown from '../../components/Dropdown';
import RegFormHR from "../../components/HrManager/RegFormHR";

// dashboard common components
import Navbar from "../../components/InventoryManager/NavbarIM";
import Sidebar from "../../components/Sidebar";
import SidebarIM from "../../components/InventoryManager/SidebarIM";
import ChatSpace from "../../components/ChatSpace";
import { BsChatDots } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { decryptData } from "../../encrypt";
import "../../App.css";


import { FaRegCalendarMinus, FaEllipsisV } from "react-icons/fa"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, } from 'recharts';
import { Progress } from 'antd';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EngineeringIcon from '@mui/icons-material/Engineering';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import PieComponent from '../../components/PieComponents';

const datas = [
  {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
  },
  {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
  },
  {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
  },
  {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
  },
  {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
  },
  {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
  },
  {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
  },
];

const Dashboard = () => {
  const selectionsettings = { persistSelection: true };

  const { themeSettings, setThemeSettings } = useStateContext();
  
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };
  const navigate = useNavigate();



  return (
    <div className="">
      <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
        <button
          type="button"
          onClick={() => setThemeSettings(true)}
          style={{ backgroundColor: "yellow-400", borderRadius: "50%" }}
          className="p-3 text-3xl text-white bg-yellow-400 hover:drop-shadow-xl"
        >
          <BsChatDots />
        </button>
      </div>
      <div className="fixed bg-white w-72 sidebar dark:bg-secondary-dark-bg ">
        <SidebarIM />
      </div>
      <div className="ml-72">
        <div className="fixed w-full md:static bg-main-bg dark:bg-main-dark-bg navbar ">
          <Navbar />
        </div>
        {themeSettings && <ChatSpace />}
        <div className="md:pb-5 md:m-10 md:px-5 rounded-3xl">
          {/* <div className="flex mb-8"> */}
            <Header title="Reports and Analytics of Inventory" category="gdfcgf" />
            




            <div className='grid grid-cols-4 gap-[20px] mt-[25px] pb-[15px]'>
                <div className='border-t-1 border-r-1 border-b-1 h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#B589DF] flex items-center justify-between px-[10px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                    <div>
                        <h2 className='text-[#B589DF] text-sm font-bold'>Current Stock <br/>Full Report</h2>
                        <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>1.2</h1>
                    </div>
                    <FaRegCalendarMinus fontSize={28} color="" />

                </div>
                <div className='border-t-1 border-r-1 border-b-1 h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#1CC88A] flex items-center justify-between px-[10px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                    <div>
                        <h2 className='text-[#1cc88a] text-sm font-bold'>
                            Num of Materials under <br/>Pre-Oreder Level</h2>
                        <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>4.2</h1>
                    </div>
                    <div className='text-4xl'>
                    <AttachMoneyIcon fontSize="inherit"/>
                    </div>
                </div>
                <div className='border-t-1 border-r-1 border-b-1 h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#36B9CC] flex items-center justify-between px-[10px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                    <div>
                        <h2 className='text-[#36B9CC] text-sm font-bold'>Safety Incident <br/>Rate</h2>
                        <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>11%</h1>
                    </div>
                    <div className='text-4xl'>
                    <EngineeringIcon fontSize="inherit"/>
                    </div>
                </div>
                <div className='border-t-1 border-r-1 border-b-1 h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#F6C23E] flex items-center justify-between px-[10px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                    <div>
                        <h2 className='text-[#F6C23E] text-sm font-bold'>Defects Per <br/>Unit</h2>
                        <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>2</h1>
                    </div>
                    <div className='text-4xl'>
                    <BrokenImageIcon fontSize="inherit"/>
                    </div>
                    
                </div>

            </div>

            {/* large chart */}
            
                {/* <div className='basis-[70%] border bg-white shadow-md cursor-pointer rounded-[4px]'>
                    <div className='bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]'>
                        <h2 className='text-[#4e73df] text-[16px] leading-[19px] font-bold'>Progress Overview</h2>
                        <FaEllipsisV color="gray" className='cursor-pointer' />
                    </div> */}

                    <div className="">
                        {/* <canvas id="myAreaChart"></canvas> */}
                        {/* <Line options={options} data={data} /> */}
                        {/* <LineChart
                            width={950}
                            height={500}
                            data={datas}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        </LineChart> */}
                    {/* </div> */}

                </div>
                {/* <div className='basis-[30%] border bg-white shadow-md cursor-pointer rounded-[4px]'>
                    <div className='bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]'>
                        <h2 className='text-[#4e73df] text-[16px] leading-[19px] font-bold'>Revenue Resources</h2>
                        <FaEllipsisV color="gray" className='cursor-pointer' />
                    </div>
                    <div className='pl-[35px]'>

                        <PieComponent />

                        {

                        }
                    </div>
                </div> */}

              {/* last row of charts */}
              {/* <div className='flex mt-[22px] w-full gap-[30px]'> */}
                {/* <div className='basis-[55%] border bg-white shadow-md cursor-pointer rounded-[4px]'>
                    <div className='bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]'>
                        <h2 className='text-[#4e73df] text-[16px] leading-[19px] font-bold'>Projects Overview</h2>
                        <FaEllipsisV color="gray" className='cursor-pointer' />
                    </div>
                    <div className='px-[25px] space-y-[15px] py-[15px]'>
                        <div>
                            <h2>Task 1</h2>
                            <Progress percent={30} strokeColor="#E74A3B" />
                        </div>
                        <div>
                            <h2>Task 2</h2>
                            <Progress percent={50} status="active" strokeColor="#F6C23E" />
                        </div>
                        <div>
                            <h2>Task 3</h2>
                            <Progress percent={70} status="active" strokeColor="#4E73DF" />
                        </div>
                        <div>
                            <h2>Task 4</h2>
                            <Progress percent={100} strokeColor="#36B9CC" />
                        </div>
                        <div>
                            <h2>Task 5</h2>
                            <Progress percent={50} status="exception" strokeColor="#1CC88A" />
                        </div>
                    </div>
                </div> */}

                {/* piechart */}
                {/* <div className='basis-[30%] border bg-white shadow-md cursor-pointer rounded-[4px]'>
                    <div className='bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]'>
                        <h2 className='text-[#4e73df] text-[16px] leading-[19px] font-bold'>Sites Resources</h2>
                        <FaEllipsisV color="gray" className='cursor-pointer' />
                    </div>
                    <div className='items-center justify-center'>
                        <PieComponent />
                    </div>
                </div> */}
            {/* </div> */}


































          </div>

         
        </div>
       </div>
    // </div>
  );
};

export default Dashboard;
