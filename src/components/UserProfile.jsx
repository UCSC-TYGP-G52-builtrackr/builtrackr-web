import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import CloseIcon from '@mui/icons-material/Close';
// import { Button } from '.';
// import Button from './Button';
import { userProfileData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../data/avatar.jpg';

const UserProfile = () => {
  const { currentColor } = useStateContext();
  const { setIsClicked, initialState } = useStateContext();

  return (
    <div className="absolute pr-2 bg-white rounded-lg shadow-2xl nav-item right-1 top-16 w-60">
      <div className="flex items-center justify-end">
        <div className='text-2xl cursor-pointer'onClick={() => setIsClicked(initialState)}>
          <CloseIcon fontSize="inherit" />
        </div>
      </div>
      {/* <div className="flex items-center gap-5 pb-6 mt-6 border-color border-b-1">
        <img
          className="w-24 h-24 rounded-full"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="text-xl font-semibold dark:text-gray-200"> Michael Roberts </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">  Administrator   </p>
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400"> info@shop.com </p>
        </div>
      </div> */}
      <div>
        {userProfileData.map((item, index) => (
          <div key={index} className="flex gap-3 pb-3 ml-5 cursor-pointer hover:bg-slate-50 dark:hover:bg-[#42464D]">
            <span className='mt-1'>{item.icon}</span>
            <span>{item.title}
              {/* <p>{item.title}</p> */}
              {/* <p className="text-sm text-gray-500 dark:text-gray-400"> {item.desc} </p> */}
            </span>
          </div>
        ))}
      </div>
      {/* <div className="mt-5">
        <Button
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="full"
        />
      </div> */}
    </div>

  );
};

export default UserProfile;