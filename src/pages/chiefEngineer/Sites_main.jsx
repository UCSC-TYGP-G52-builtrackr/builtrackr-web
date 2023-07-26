import React from 'react';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { SiteData } from '../../data/SiteData';
import Header from '../../components/Header';
import RegForm from '../../components/RegForm';
import { useNavigate } from "react-router-dom";

const Sites_main = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };
  const navigate = useNavigate();

  return (
    <div className="bg-yellow-400 md:pb-5 md:m-10 md:px-5 rounded-3xl">
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

        {/* new site creation tile */}
          <div className='bg-gray-300 h-[250px] w-[250px] flex justify-center items-center shadow-2xl'>
              <RegForm/>
          </div>
          
      </div> 
    </div>
  );
};

export default Sites_main;