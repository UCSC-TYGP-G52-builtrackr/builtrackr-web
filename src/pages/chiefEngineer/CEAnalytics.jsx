import React from 'react';
import { Link } from 'react-router-dom';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { SiteData } from '../../data/SiteData';
import Header from '../../components/Header';
import Dropdown from '../../components/Dropdown';
import RegForm from '../../components/RegForm';
import { FaRegCalendarMinus, FaEllipsisV } from "react-icons/fa"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, } from 'recharts';
import { Progress } from 'antd';
import { decryptData } from '../../encrypt'

// kpi card icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EngineeringIcon from '@mui/icons-material/Engineering';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';

// tremor library 
import { Card, Text, Metric, Flex, ProgressBar } from "@tremor/react";

// dashboard common components
import Navbar from '../../components/ChiefEngineer/Navbar'
import Sidebar from '../../components/Sidebar';
import SidebarCE from '../../components/ChiefEngineer/SidebarCE';
import ChatSpace from '../../components/ChatSpace';
import { BsChatDots } from 'react-icons/bs';
import PieComponent from '../../components/PieComponent';

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useStateContext } from '../../contexts/ContextProvider';
import '../../App.css';

const datas = [
  {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
  },
  {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
  },
  {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
  },
  {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
  },
  {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
  },
  {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
  },
  {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
  },
];

const CEAnalytics = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };
  const navigate = useNavigate();
  const { themeSettings, setThemeSettings } = useStateContext();
  const [siteData, setSiteData] = useState([]);
  const [openSiteIndex, setOpenSiteIndex] = useState(null);

  const handleDivClick = (index) => {
    if (openSiteIndex === index) {
      // If the clicked div is already open, close it
      setOpenSiteIndex(null);
    } else {
      // If a different div is clicked, open it
      setOpenSiteIndex(index);
    }
  };

  const storedCompId = localStorage.getItem("company_id");
  const decryptedValue = decryptData(JSON.parse(storedCompId));
  const companyID = parseInt(decryptedValue, 10);
  console.log("company's ID: ", companyID);


  useEffect(() => {
    const viewSitesAll = async () => {
      try {

        const formData = {
          companyID: companyID,
        };

        const data = await fetch(
          "http://localhost:4000/api/site/getSites",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (data.status === 200) {
          const jsonData = await data.json();
          console.log("Got data",jsonData);
          setSiteData(jsonData);
        } else {
          console.log(data.status);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    viewSitesAll();
  }, []);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {

        const formData = {
          companyID: companyID,
        };

        const data = await fetch(
          "http://localhost:4000/api/site/getSiteAnalytics",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (data.status === 200) {
          const jsonData = await data.json();
          console.log("Got data",jsonData);
          setSiteData(jsonData);
        } else {
          console.log(data.status);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchAnalytics();
  }, []);

  console.log("here's analytics site data", siteData);

  return (
    <div className="">
      <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
        <button
          type="button"
          onClick={() => setThemeSettings(true)}
          style={{ backgroundColor: 'yellow-400', borderRadius: '50%' }}
          className="p-3 text-3xl text-white bg-yellow-400 hover:drop-shadow-xl"
        >
          <BsChatDots />
        </button>
        </div>
      <div className="fixed bg-white w-72 sidebar dark:bg-secondary-dark-bg ">
        <SidebarCE />
      </div>

      {/* navbar and page content */}
      <div className='ml-72'>
            <div className="fixed w-full md:static bg-main-bg dark:bg-main-dark-bg navbar ">
              <Navbar />
            </div>
            {themeSettings && (<ChatSpace />)}
            <div className="md:pb-5 md:m-10 md:px-5 rounded-3xl">
              
            {/* sites grid */}
            
            {/* horizontal KPI cards list */}
            <div className='grid grid-cols-4 gap-[20px] mt-[25px] pb-[15px]'>
                <div className='border-t-1 border-r-1 border-b-1 h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#B589DF] flex items-center justify-between px-[10px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                    <div className='text-start'>
                        <h2 className='text-[#B589DF] text-sm font-bold'>Schedule Perform <br/>Index</h2>
                        <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>1.2</h1>
                    </div>
                    <div className='text-4xl'>
                    <FaRegCalendarMinus fontSize="inherit"/>
                    </div>

                </div>
                <div className='border-t-1 border-r-1 border-b-1 h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#1CC88A] flex items-center justify-between px-[10px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                    <div className='text-start'>
                        <h2 className='text-[#1cc88a] text-sm font-bold'>
                            Cost Performance <br/>Index</h2>
                        <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>4.2</h1>
                    </div>
                    <div className='text-4xl'>
                    <AttachMoneyIcon fontSize="inherit"/>
                    </div>
                    
                </div>
                <div className='border-t-1 border-r-1 border-b-1 h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#36B9CC] flex items-center justify-between px-[10px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                    <div className='text-start'>
                        <h2 className='text-[#36B9CC] text-sm font-bold'>Safety Incident <br/>Rate</h2>
                        <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>11%</h1>
                    </div>
                    <div className='text-4xl'>
                    <EngineeringIcon fontSize="inherit"/>
                    </div>
                    
                </div>
                <div className='border-t-1 border-r-1 border-b-1 h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#F6C23E] flex items-center justify-between px-[10px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                    <div className='text-start'>
                        <h2 className='text-[#F6C23E] text-sm font-bold'>Defects Per <br/>Unit</h2>
                        <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>2</h1>
                    </div>
                    <div className='text-4xl'>
                    <BrokenImageIcon fontSize="inherit"/>
                    </div>
                    
                </div>

            </div>

            {/* large chart */}
            
                <div className='basis-[70%] border bg-white shadow-md cursor-pointer rounded-[4px]'>
                    <div className='bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]'>
                        <h2 className='text-[#4e73df] text-[16px] leading-[19px] font-light'>Progress Overview</h2>
                        <FaEllipsisV color="gray" className='cursor-pointer' />
                    </div>

                    <div className="">
                        {/* <canvas id="myAreaChart"></canvas> */}
                        {/* <Line options={options} data={data} /> */}
                        <LineChart
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
                        </LineChart>
                    </div>

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
              <div className='flex mt-[22px] w-full gap-[30px]'>
                <div className='basis-[55%] border bg-white shadow-md rounded-[4px]'>
                    <div className='bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]'>
                        <h2 className='text-[#4e73df] text-[16px] leading-[19px] font-bold'>Projects Overview</h2>
                        <FaEllipsisV color="gray" className='cursor-pointer' />
                    </div>
                    <div className='px-[25px] space-y-[15px] py-[15px]'>
                    {siteData.map((site, index) => {
                        return(
                        <div key={index}>
                            <h2 className="text-start cursor-pointer" onClick={() => handleDivClick(index)}>{site.site_name}</h2>
                            <Progress percent={30} strokeColor="#E74A3B" />
                            {openSiteIndex === index && (
                                <div className={`max-h-0 overflow-hidden transition-max-h duration-300 ${
                                    openSiteIndex === index ? 'max-h-full' : ''
                                  }`}>
                                <Progress percent={10} strokeColor="#E74A3B" />
                                </div>
                            )}
                        </div>)    
                    })}
                    </div>
                </div>

                {/* piechart */}
                <div className='basis-[30%] border bg-white shadow-md cursor-pointer rounded-[4px]'>
                    <div className='bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]'>
                        <h2 className='text-[#4e73df] text-[16px] leading-[19px] font-bold'>Sites Resources</h2>
                        <FaEllipsisV color="gray" className='cursor-pointer' />
                    </div>
                    <div className='items-center justify-center'>
                        <PieComponent />
                    </div>
                </div>
            </div>

            {/* end of sites grid */}

          </div>
        
      </div>
    </div>
    
  );
};

export default CEAnalytics;