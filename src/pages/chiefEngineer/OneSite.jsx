import React from 'react';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useParams } from 'react-router-dom';
import { SiteData } from '../../data/SiteData';
import Header from '../../components/Header';
import RegForm from '../../components/RegForm';

// dashboard common components
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar';
import ChatSpace from '../../components/ChatSpace';
import { BsChatDots } from 'react-icons/bs';

import { useNavigate } from "react-router-dom";
import { useStateContext } from '../../contexts/ContextProvider';
import '../../App.css';

const Sites = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };
  const navigate = useNavigate();
  const { themeSettings, setThemeSettings } = useStateContext();
  const { id } = useParams(); // Retrieve the site ID from the URL
  const site = SiteData.find((site) => site.id === parseInt(id));

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
        <Sidebar />
      </div>
      <div className='ml-72'>
            <div className="fixed w-full md:static bg-main-bg dark:bg-main-dark-bg navbar ">
              <Navbar />
            </div>
            {themeSettings && (<ChatSpace />)}
            <div className="bg-yellow-400 md:pb-5 md:m-10 md:px-5 rounded-3xl">
            <Header title="Site Name" />
            <div>
                <h1>{site.name}</h1>
                
            {/* ... Other site details ... */}
            </div>
          </div>
        
          </div>
    </div>
    
  );
};

export default Sites;