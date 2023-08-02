import React from 'react';
import {RxDashboard} from 'react-icons/rx'
import {FaTasks} from 'react-icons/fa'

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full bg-black w-64 absolute left-0">
      <div className="py-4 px-6 bg-gray-700">
        <h2 className="text-xl text-white font-semibold">BuiltTrakr</h2>
      </div>
      <div className="p-4">
        <ul className="space-y-2 flex flex-col gap-4">
          <li>
            <a
              href="#"
              style={{backgroundColor:"#FFCC00"}}
              className=" font-medium block py-2 rounded-3xl flex items-center justify-center gap-3"
            >
              <RxDashboard size={20} />
              Documents
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-400 hover:text-white hover:scale-110 font-medium flex items-center justify-center gap-3"
            >
              <FaTasks size={20} />
              Tasks
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-400 hover:text-white hover:scale-110 font-medium block"
            >
              Users
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-400 hover:text-white hover:scale-110 font-medium block"
            >
              Settings
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
