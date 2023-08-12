import React from 'react';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useParams } from 'react-router-dom';
import { URData } from '../../data/URData';
import { SiteManagers } from '../../data/SiteManagers';
import RegForm from '../../components/RegForm';
import ProgressBar from '../../components/ProgressBar';

// dashboard common components
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar';
import ChatSpace from '../../components/ChatSpace';
import Header from '../../components/Header';
import { BsChatDots } from 'react-icons/bs';

import { useNavigate } from "react-router-dom";
import { useStateContext } from '../../contexts/ContextProvider';
import '../../App.css';
import PopoverCE from '../../components/PopoverCE';
import SidebarHR from '../../components/SidebarHR';

const OneSite = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };
  const navigate = useNavigate();
  const { themeSettings, setThemeSettings } = useStateContext();
  const { id } = useParams(); // Retrieve the site ID from the URL
  const site = URData.find((site) => site.id === parseInt(id));

  const stats = [
    { id: 1, name: 'Laborers At Work', value: '11' },
    { id: 2, name: 'Tasks To Complete', value: '5' },
    { id: 3, name: 'Days Spent', value: '16' },
  ]

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
        <SidebarHR />
      </div>
      <div className='ml-72'>
            <div className="fixed w-full md:static bg-main-bg dark:bg-main-dark-bg navbar ">
              <Navbar />
            </div>
            {themeSettings && (<ChatSpace />)}

            {/* inside page content */}
            <div className="md:pb-5 md:m-10 md:px-5 rounded-3xl">
              
              {/* site name and type */}
              <div className='mb-5'>
              <Header title={`${site.name}`} />
              <p className="text-lg text-gray-600">{site.type}</p>
              </div>
              <ProgressBar/>

              {/* statistics */}
              <div className="px-6 mx-auto mt-6 max-w-7xl lg:px-8">
                <dl className="grid grid-cols-1 text-center gap-x-8 gap-y-16 lg:grid-cols-3">
                  {stats.map((stat) => (
                    <div key={stat.id} className="flex flex-col items-center justify-center w-48 h-48 max-w-xs mx-auto bg-slate-50 gap-y-4">
                      <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                      <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              
              <div className="flex min-w-0 mt-8 gap-x-4">
                <p className="mt-2 text-lg font-semibold leading-10 text-gray-900">Site Manager</p>
                <PopoverCE/>
              </div>

              <div className='mt-5'>
                <p className="mt-2 text-lg font-semibold leading-10 text-gray-900">Site Description</p>
                <p>{site.description}</p>
              </div>
            
              

          </div>
        
      </div>
    </div>
    
  );
};

export default OneSite;