import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import '../../CSS/dashboard.css';
import { linksCE } from '../../data/dummyCE';
import { useStateContext } from '../../contexts/ContextProvider';

const SidebarCE = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  }; 
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };


  const activeLink = 'flex items-center gap-5 pl-4 ml-8 pt-3 pb-2.5 text-black bg-yellow-400 rounded-l-lg text-md';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-l-lg text-md text-white dark:text-black dark:hover:text-black hover:bg-yellow-400';

  return (
    <div className="h-screen pb-10 overflow-auto bg-black md:overflow-hidden md:hover:overflow-auto">
      {activeMenu && (
        <>
          <div className="flex items-center justify-start ml-5">
            <Link to="/" onClick={handleCloseSideBar} className="flex items-center gap-3 mt-4 text-xl font-extrabold tracking-tight text-white dark:text-white">
              <img src='/BuilTracker.png' className='w-32'/>
            </Link>
              {/* <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: 'yellow-400' }}
                className="block p-3 mt-4 text-xl rounded-full hover:bg-light-gray md:hidden"
              >
                <MdOutlineCancel />
              </button> */}
          </div>
          <div className="flex flex-col justify-center flex-grow mt-10">
            {linksCE.map((item) => (
              <div key={item.title}>
                {/* <p className="m-3 mt-4 text-gray-400 uppercase dark:text-gray-400">
                  {item.title}
                </p> */}
                {item.links.map((link) => (
                  <div className='my-4'>
                  <NavLink
                    to={`/chiefEngineer/${link.name}`}
                    isActive={(match, location) => {
                      const { pathname } = location;
                      return pathname === '/chiefEngineer' || pathname.startsWith('/chiefEngineer/sites');
                    }}
                    // to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? 'yellow-400' : '',
                      color: isActive ? 'black' : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* logout */}
          <div className="absolute bottom-0 left-0 w-full p-4">
            <div className="flex items-center justify-center gap-5 pt-3 pb-2.5 rounded-l-lg text-md custom-mt-percentage text-white " onClick={logout}><FiLogOut/><span className="capitalize cursor-pointer" onClick={logout}>Logout</span></div>
          </div>
        </>
      )}
    </div>
  );
};

export default SidebarCE;