import React from 'react';
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

import { useNavigate } from "react-router-dom";
import { useStateContext } from '../../contexts/ContextProvider';
import '../../App.css';

const SiteManagers = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };
  const navigate = useNavigate();
  const { themeSettings, setThemeSettings } = useStateContext();

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

            {/* site managers grid */}
            <div className='grid grid-cols-1 mt-6 gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
                {SMs.map((sm) => (
                  <div key={sm.id} className="relative flex flex-col items-center justify-center group">
                    <div className="overflow-hidden bg-gray-200 rounded-full w-36 h-36 lg:aspect-none group-hover:opacity-75">
                      <img
                        src={sm.imageUrl}
                        alt={sm.name}
                        className="object-cover object-center rounded-full w-36 h-36 lg:h-36 lg:w-full"
                      />
                    </div>
                    <div className="flex items-center justify-center mt-4">
                      <div className="text-center">
                        <p className="mt-1 text-sm text-gray-500">Status</p>
                        <h3 className="text-sm text-gray-700">
                          <a href={'#'}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {sm.name}
                          </a>
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
 
            {/* end of sites grid */}

          </div>
        
          </div>
    </div>
    
  );
};

export default SiteManagers;