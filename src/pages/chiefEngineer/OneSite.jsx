import React from 'react';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useParams } from 'react-router-dom';
import { SiteData } from '../../data/SiteData';
import { SiteManagers } from '../../data/SiteManagers';
import RegForm from '../../components/RegForm';
import ProgressBar from '../../components/ProgressBar';

// dashboard common components
import Navbar from '../../components/ChiefEngineer/Navbar'
import Sidebar from '../../components/Sidebar';
import ChatSpace from '../../components/ChatSpace';
import Header from '../../components/ChiefEngineer/Header';
import { BsChatDots } from 'react-icons/bs';

import { useNavigate } from "react-router-dom";
import { useStateContext } from '../../contexts/ContextProvider';
import { useState, useEffect } from "react";
// import '../../App.css';
import PopoverCE from '../../components/PopoverCE';
import SidebarCE from '../../components/ChiefEngineer/SidebarCE';

const OneSite = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };
  const navigate = useNavigate();
  const { themeSettings, setThemeSettings } = useStateContext();
  const { id } = useParams(); // Retrieve the site ID from the URL
  const [site, setSite] = useState([]);
  // const site = SiteData.find((site) => site.id === parseInt(id));

  // const stats = [
  //   { id: 1, name: 'Laborers At Work', value: '11' },
  //   { id: 2, name: 'Tasks To Complete', value: '5' },
  //   { id: 3, name: 'Days Spent', value: '16' },
  // ]

  

  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/site/getSingleSite",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }), // Sending ID in the request body
          }
        );
        if (response.status === 200) {
          const jsonData = await response.json();
          console.log("Data received:", jsonData);
          // console.log(jsonData);
          setSite(jsonData);
        } else {
          // console.log(response.status);
          console.log("Error fetching data. Status:", response.status);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchSiteData();
  }, [id]);


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
      <div className='ml-72'>
            <div className="fixed w-full md:static bg-main-bg dark:bg-main-dark-bg navbar ">
              <Navbar />
            </div>
            {themeSettings && (<ChatSpace />)}

            {/* inside page content */}
            <div className="md:pb-5 md:m-10 md:px-5 rounded-3xl">
              
              {/* site name and type */}
              <div className='mb-5 text-start'>
              <Header title={`${site[0]?.site_name}`} />
              <p className="text-lg text-gray-600">{site[0]?.site_type}</p>
              </div>
              <ProgressBar/>

              {/* statistics */}
              <div className="px-6 mx-auto mt-6 max-w-7xl lg:px-8">
                <dl className="grid grid-cols-1 text-center gap-x-8 gap-y-16 lg:grid-cols-3">
                  {/* {stats.map((stat) => (
                    <div key={stat.id} className="flex flex-col items-center justify-center w-48 h-48 max-w-xs mx-auto bg-slate-50 gap-y-4">
                      <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                      <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                        {stat.value}
                      </dd>
                    </div>
                  ))} */}
                  <div className="flex flex-col items-center justify-center w-48 h-48 max-w-xs mx-auto bg-slate-50 gap-y-4">
                      <dt className="text-base leading-7 text-gray-600">Laborers At Work</dt>
                      <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                        11
                      </dd>
                    </div>
                    <div className="flex flex-col items-center justify-center w-48 h-48 max-w-xs mx-auto bg-slate-50 gap-y-4">
                      <dt className="text-base leading-7 text-gray-600">Tasks To Complete</dt>
                      <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                        5
                      </dd>
                    </div>
                    <div className="flex flex-col items-center justify-center w-48 h-48 max-w-xs mx-auto bg-slate-50 gap-y-4">
                      <dt className="text-base leading-7 text-gray-600">Days Spent</dt>
                      <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                        16
                      </dd>
                    </div>
                </dl>
              </div>
              
              <div className="flex min-w-0 mt-8 gap-x-4">
                <p className="mt-2 text-lg font-semibold leading-10 text-gray-900">Site Manager</p>
                <PopoverCE/>
              </div>

              <div className='mt-5 text-start'>
                <p className="mt-2 text-lg font-semibold leading-10 text-gray-900">Site Description</p>
                <p>{site[0]?.site_desc}</p>
              </div>
            
              

          </div>
        
      </div>
    </div>
    
  );
};

export default OneSite;