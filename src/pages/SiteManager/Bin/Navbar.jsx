import React from "react";
import {AiFillBell} from 'react-icons/ai'

const Navbar = () => {
  return (
    <nav className="bg-white py-3 w-full shadow-md">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for mobile menu button (e.g., hamburger menu icon) */}
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">

          </div>
          <div className="hidden sm:block sm:ml-6">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              {/* Notification Bell */}
              <div className="bg-green-200 rounded-full p-2">
                <AiFillBell size={25} className='text-black'/>
              </div>
                
                    
              <div className="ml-3 font-bold relative">
                {/* User Name and Position */}
                <div className="text-black flex flex-col">
                  <span className="text-lg font-bold">Gineth Gavishka</span>
                  <span className="text-sm font-medium">Site Manager</span>
                  </div>
              </div>

              <div>
                <img
                  className="h-16 w-16 rounded-full"
                  src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                  alt="avatar"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
