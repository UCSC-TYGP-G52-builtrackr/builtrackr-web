import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';

// import { Button } from '.';
import Button from './Button';
import { userProfileData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../data/avatar.jpg';

const UserProfile = () => {
  const { currentColor } = useStateContext();

  return (
    <div className="absolute p-3 bg-white rounded-lg nav-item right-1 top-16 w-60">
      <div className="flex items-center justify-end">
        {/* <p className="text-lg font-semibold dark:text-gray-200">User Profile</p> */}
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="lg"
          borderRadius="50%"
        />
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
          <div key={index} className="flex gap-3 border-b-1 border-color p-3 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
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