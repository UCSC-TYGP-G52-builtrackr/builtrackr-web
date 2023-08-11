import React from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { SiteData } from '../../data/SiteData';
import Header from '../../components/Header';
import Dropdown from '../../components/Dropdown';
import RegForm from '../../components/RegForm';

// dashboard common components
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar';
import SidebarCE from '../../components/SidebarCE';
import ChatSpace from '../../components/ChatSpace';
import { BsChatDots } from 'react-icons/bs';

import { useNavigate } from "react-router-dom";
import { useStateContext } from '../../contexts/ContextProvider';
import '../../App.css';
=======
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { SiteData } from '../../data/SiteData';
import Header from '../../components/Header';
import RegForm from '../../components/RegForm';
import { useNavigate } from "react-router-dom";
>>>>>>> dev

const Sites = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };
  const navigate = useNavigate();
<<<<<<< HEAD
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
                <Header title="Sites" category="gdfcgf"/>
                <Dropdown/>
              </div>

            {/* sites grid */}
            <div className='grid grid-cols-3 gap-x-20 gap-y-14'>
            {SiteData.map((site) => {
              return (
                <div className='relative h-[250px] w-[250px]'>
                <div className='absolute inset-0 bg-center bg-cover shadow-2xl' style={{ backgroundImage: `url(${site.image})` }}></div>
                <div className='absolute inset-0 flex flex-col items-center justify-center bg-gray-300 bg-opacity-75'>
                <div className='mt-12 text-3xl text-center'>{site.name}</div>

                <nav>
                  <Link to={`/chiefEngineer/sites/${site.id}`}>
                    <div className='flex mx-16 mt-20 text-center border-black cursor-pointer border-1'>
                      <span className='ml-3'>More Info</span>
                      <span>
                      <KeyboardDoubleArrowRightIcon/>
                      </span>
                    </div>
                  </Link>
                </nav>
                
                </div>
              </div>
              );
            })}

              {/* new site creation tile */}
                <div className='bg-gray-300 h-[250px] w-[250px] flex justify-center items-center shadow-2xl'>
                    <RegForm/>
                </div>
                
            </div> 
            {/* end of sites grid */}

          </div>
        
          </div>
    </div>
    
=======

  return (
    <div className="md:pb-5 md:m-10 md:px-5 rounded-3xl">
      <Header title="Sites" />
      <div className='grid grid-cols-3 gap-x-20 gap-y-14'>
      {SiteData.map((site) => {
          return (
            <div className='relative h-[250px] w-[250px]'>
            <div className='absolute inset-0 bg-center bg-cover shadow-2xl' style={{ backgroundImage: `url(${site.image})` }}></div>
            <div className='absolute inset-0 flex flex-col items-center justify-center bg-gray-300 bg-opacity-75'>
              <div className='mt-12 text-3xl text-center'>{site.name}</div>
              <div className='flex mx-16 mt-20 text-center border-black border-1'>
            <span className='ml-3'>More Info</span>
            <span>
            <KeyboardDoubleArrowRightIcon/>
            </span>
          </div>
            </div>
          </div>
          );
        })}

          <div className='bg-gray-300 h-[250px] w-[250px] flex justify-center items-center shadow-2xl'>
              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32 text-center mt-14 ml-14">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg> */}
              <RegForm/>
          </div>
          {/* <div className='relative h-[250px] w-[250px]'>
            <div className='absolute inset-0 bg-center bg-cover shadow-2xl' style={{ backgroundImage: 'url(./kumbuka.jpg)' }}></div>
            <div className='absolute inset-0 flex flex-col items-center justify-center bg-gray-300 bg-opacity-75'>
              <div className='mt-12 text-3xl text-center'>Site Kumbuka</div>
              <div className='flex mx-16 mt-20 text-center border-black border-1'>
            <span onClick={() => { console.log("Clicked a site!"); }} className='ml-3 cursor-pointer'>More Info</span>
            <span>
            <KeyboardDoubleArrowRightIcon/>
            </span>
          </div>
            </div>
          </div>

          <div className='relative h-[250px] w-[250px]'>
            <div className='absolute inset-0 bg-center bg-cover shadow-2xl' style={{ backgroundImage: 'url(./kaduwela.jpg)' }}></div>
            <div className='absolute inset-0 flex flex-col items-center justify-center bg-gray-300 bg-opacity-75'>
              <div className='mt-12 text-3xl text-center'>Site Kaduwela</div>
              <div className='flex mx-16 mt-20 text-center border-black border-1'>
            <span className='ml-3'>More Info</span>
            <span>
            <KeyboardDoubleArrowRightIcon/>
            </span>
          </div>
            </div>
          </div>

          <div className='relative h-[250px] w-[250px]'>
            <div className='absolute inset-0 bg-center bg-cover shadow-2xl' style={{ backgroundImage: 'url(./havelock.jpg)' }}></div>
            <div className='absolute inset-0 flex flex-col items-center justify-center bg-gray-300 bg-opacity-75'>
              <div className='mt-12 text-3xl text-center'>Site Havelock</div>
              <div className='flex mx-16 mt-20 text-center border-black border-1'>
            <span className='ml-3'>More Info</span>
            <span>
            <KeyboardDoubleArrowRightIcon/>
            </span>
          </div>
            </div>
          </div>

          
          <div className='relative h-[250px] w-[250px]'>
            <div className='absolute inset-0 bg-center bg-cover shadow-2xl' style={{ backgroundImage: 'url(./constructionSite.jpg)' }}></div>
            <div className='absolute inset-0 flex flex-col items-center justify-center bg-gray-300 bg-opacity-75'>
              <div className='mt-12 text-3xl text-center'>Site Seethawaka</div>
              <div className='flex mx-16 mt-20 text-center border-black border-1'>
            <span className='ml-3'>More Info</span>
            <span>
            <KeyboardDoubleArrowRightIcon/>
            </span>
          </div>
            </div>
          </div>

          
          {/* new site creation */}
          {/* <div className='bg-gray-300 h-[250px] w-[250px] flex justify-center items-center shadow-2xl'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32 text-center mt-14 ml-14">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <Orders/>
          </div> */}
      </div> 
    </div>
>>>>>>> dev
  );
};

export default Sites;