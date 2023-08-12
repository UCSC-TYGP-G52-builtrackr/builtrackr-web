import React from 'react';
import { Link } from 'react-router-dom';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { URData } from '../../data/HrManager/URData';
import Header from '../../components/HrManager/HeaderHr';
//import Dropdown from '../../components/Dropdown';
import RegFormHR from '../../components/HrManager/RegFormHR';

// dashboard common components
import Navbar from '../../components/HrManager/NavbarHr'
import Sidebar from '../../components/Sidebar';
import SidebarHR from '../../components/HrManager/SidebarHR';
import ChatSpace from '../../components/ChatSpace';
import { BsChatDots } from 'react-icons/bs';

import { useNavigate } from "react-router-dom";
import { useStateContext } from '../../contexts/ContextProvider';
import '../../App.css';

const Users = () => {
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
        <SidebarHR />
      </div>
      <div className='ml-72'>
            <div className="fixed w-full md:static bg-main-bg dark:bg-main-dark-bg navbar ">
              <Navbar />
            </div>
            {themeSettings && (<ChatSpace />)}
            <div className="md:pb-5 md:m-10 md:px-5 rounded-3xl">
              <div className="flex mb-8">
                <Header title="User Roles" category="gdfcgf"/>
                {/* <Dropdown/> */}
              </div>

            {/* users grid */}
            <div className='grid grid-cols-3 gap-x-20 gap-y-14'>
            {URData.map((user) => {
              return (
                <div className='relative h-[250px] w-[250px]'>
                <div className='absolute inset-0 bg-center bg-cover shadow-2xl' style={{ backgroundImage: `url(${user.image})` }}></div>
                <div className='absolute inset-0 flex flex-col items-center justify-center bg-gray-300 bg-opacity-75'>
                <div className='mt-12 text-3xl text-center'>{user.name}</div>

                <nav>
                  <Link to={`/HR/user roles/${user.id}`}>
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
                    <RegFormHR/>
                </div>
                
            </div> 
            {/* end of users grid */}

          </div>
        
          </div>
    </div>
    
  );
};

export default Users;