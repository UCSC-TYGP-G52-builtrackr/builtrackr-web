import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
// import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { FiLogOut } from 'react-icons/fi';

import { links } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

export const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = 'flex items-center gap-5 pl-4 ml-8 pt-3 pb-2 mb-8 text-black bg-yellow-400 rounded-l-lg text-md';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb -6 mb-8 rounded-l-lg text-md text-white dark:text-black dark:hover:text-black hover:bg-yellow-400';

  return (
    <div className="h-screen pb-10 overflow-auto bg-black md:overflow-hidden md:hover:overflow-auto mr-2">
      {activeMenu && (
        <>
          <div className="flex items-center justify-between ml-8 ">
            <Link to="/" onClick={handleCloseSideBar} className="flex items-center gap-3 mt-4 ml-3 text-xl font-extrabold tracking-tight text-white dark:text-white">
            {/* <img src='./bt.png' className='w-10 h-10'/> */}
               <span>builTrackr</span>
            </Link>
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: 'yellow-400' }}
                className="block p-3 pb-1 mt-4 text-xl rounded-full hover:bg-light-gray md:hidden"
              >
                <MdOutlineCancel />
              </button>
          </div>
          <div className="mt-16 text-center ml-10 mb-10">
            {links.map((item) => (
              <div key={item.title}  >
                {/* <p className="m-3 mt-4 text-gray-400 uppercase dark:text-gray-400">
                  {item.title}
                </p> */}
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? 'yellow-400' : '',
                      color: isActive ? 'black' : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {link.icon}
                    <span className="capitalize mb-2">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}

            <div className="flex items-center gap-2 pl-2  pt -35  rounded-l-lg text-md mt-64  text-red-600 "><FiLogOut/><span className="capitalize cursor-pointer">Logout</span></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;