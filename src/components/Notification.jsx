import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';

// import { Button } from '.';
import Button from './Button';
import { chatData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const Notification = () => {
  const { currentColor } = useStateContext();

  return (
    <div className="absolute p-5 bg-white rounded-lg nav-item right-5 md:right-40 top-16 w-80">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <p className="text-lg font-semibold dark:text-gray-200">Notifications</p>
          <button type="button" className="p-1 px-2 text-xs text-black rounded bg-orange-theme "> 5 New</button>
        </div>
        <Button icon={<MdOutlineCancel />} color="rgb(153, 171, 180)" bgHoverColor="light-gray" size="lg" borderRadius="50%" />
      </div>
      <div className="mt-3 ">
        {chatData?.map((item, index) => (
          <div key={index} className="flex items-center gap-5 p-3 leading-8 border-b-1 border-color">
            <img className="w-8 h-8 rounded-full" src={item.image} alt={item.message} />
            <div>
              <p className="text-sm font-semibold">{item.message}</p>
              <p className="text-sm text-gray-500"> {item.desc} </p>
            </div>
          </div>
        ))}
        <div className="mt-5 bg-gray-300 rounded-lg">
          <Button color="black" bgColor="yellow-400" text="View All" borderRadius="10px" width="full" />
        </div>
      </div>
    </div>
  );
};

export default Notification;