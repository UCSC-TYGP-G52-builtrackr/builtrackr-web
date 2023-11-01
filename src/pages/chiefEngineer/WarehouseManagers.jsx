import React from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { SiteData } from '../../data/SiteData';
import { SiteManagers as SMs }  from '../../data/SiteManagers';
import Header from '../../components/ChiefEngineer/Header';
import Dropdown from '../../components/Dropdown';
import RegForm from '../../components/RegForm';

// dashboard common components
import Navbar from '../../components/ChiefEngineer/Navbar'
import Sidebar from '../../components/Sidebar';
import SidebarCE from '../../components/ChiefEngineer/SidebarCE';
import ChatSpace from '../../components/ChatSpace';
import { BsChatDots } from 'react-icons/bs';
import SMPopover from '../../components/ChiefEngineer/SMPopover';

import { useNavigate } from "react-router-dom";
import { useStateContext } from '../../contexts/ContextProvider';
import '../../App.css';
import { decryptData } from '../../encrypt';

const SiteManagers = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };
  const navigate = useNavigate();
  const { themeSettings, setThemeSettings } = useStateContext();
  const [inManagers, setInManagers] = useState([]);

  const storedCompId = localStorage.getItem("company_id");
  const decryptedValue = decryptData(JSON.parse(storedCompId));
  const companyID = parseInt(decryptedValue, 10);
  
  useEffect(() => {
    const viewAllManagersInventory = async () => {
      try {
        const formData = {
          companyID: companyID,
        };
        const data = await fetch(
          "http://localhost:4000/api/site/getAllInManagers",
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
          console.log(jsonData);
          setInManagers(jsonData);
        } else {
          console.log(data.status);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    viewAllManagersInventory();
  }, []);

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
            <div className="md:pb-5 md:m-10 md:px-5 rounded-3xl">
              <div className="flex mb-8">
                <Header title="Site Managers" category="gdfcgf"/>
              </div>

            {/* In. managers grid */}
            <div className='grid grid-cols-1 mt-6 gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
                {inManagers.map((inv) => (
                  <div key={inv.id} className="relative flex flex-col items-center justify-center group">
                    <div className="overflow-hidden bg-gray-200 rounded-full w-36 h-36 lg:aspect-none group-hover:opacity-75">
                      <img
                        // src={`http://localhost:4000/employees/${sm.photo_path}`}
                        src={inv.photo_path ? `http://localhost:4000/employees/${inv.photo_path}` : 'http://localhost:4000/employees/no-profile-picture0020.jpg'}
                        alt={inv.f_name}
                        className="object-cover object-center rounded-full w-36 h-36 lg:h-36 lg:w-full"
                      />
                    </div>
                    <div className="flex items-center justify-center mt-4">
                      <div className="text-center" onClick={(event) => {
                        console.log("Clicked on the div with image:", inv);
                        handleClick(event, inv);
                    }}>
                        {/* <p className="mt-1 text-sm text-gray-500">Status</p> */}
                        {parseInt(inv.in_manager_count) === 2 ? (
                            <p className="mt-1 text-sm text-red-500">Not Available</p>
                        ) : (
                            <p className="mt-1 text-sm text-green-500">Available</p>
                        )}
                        <h3 className="text-sm font-bold text-black-700">
                          <a href={'#'}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {inv.full_name}
                          </a>
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
 
            {/* end of In. managers grid */}

          </div>
        
          </div>
    </div>
    
  );
};

export default SiteManagers;