import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
// import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { FiLogOut } from 'react-icons/fi';
import { links,SiteManagerLinks as Links } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';

export const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  
 
  const  logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  }

  const activeLink = 'flex items-center gap-5 pl-4 ml-8 pt-3 pb-2 mb-8 text-black bg-yellow-400 rounded-l-lg text-md';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb -6 mb-8 rounded-l-lg text-md text-white dark:text-white dark:hover:text-black hover:bg-yellow-400';

  return (
    <div className="h-screen pb-10 overflow-auto bg-black md:overflow-hidden md:hover:overflow-auto mr-2 max-w-[300px] min-w-[300px] fixed">
      {activeMenu && (
        <>
          <div className="flex items-center justify-between ml-8 ">
            <Link to="/" onClick={handleCloseSideBar} className="flex items-center gap-3 mt-4 ml-3 text-xl font-extrabold tracking-tight text-white dark:text-white">
            <img src='/bt_logo.png' className='w-36 h-24'/>
             
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
          <div className="mt-16 text-center ml-10 mb-5 h-[70%] ">
            {Links.map((item) => (
              <div key={item.title}  >
                {/* <p className="m-3 mt-4 text-gray-400 uppercase dark:text-gray-400">
                  {item.title}
                </p> */}
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.redirect}`}
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
            </div>

<div
  className="flex items-center gap-2 px-2 justify-center py-2 rounded-l-lg text-md text-white"
  onClick={logout}
  style={{
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    backgroundColor: 'transparent',
  }}
  onMouseEnter={(e) => (e.target.style = 'red')}
  onMouseLeave={(e) => (e.target.style = 'transparent')}
>
  <FiLogOut />
  <span className="capitalize px-3 py-2">Logout</span>
</div>
        </>
      )}
    </div>
  );
};

export default Sidebar;