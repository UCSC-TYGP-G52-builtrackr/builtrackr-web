import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
<<<<<<< HEAD
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
=======
>>>>>>> dev
import { MdKeyboardArrowDown } from 'react-icons/md';
import avatar from '../data/avatar.jpg';
import Notification from './Notification';
import UserProfile from './UserProfile';
import { useStateContext } from '../contexts/ContextProvider';

<<<<<<< HEAD
// const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
//     <button
//       type="button"
//       onClick={() => customFunc()}
//       className="relative"
//     >
//       <span
//         style={{ background: dotColor }}
//         className="absolute inline-flex w-2 h-2 rounded-full right-2 top-2"
//       />
//       {icon}
//     </button>
// );
=======
 const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative p-3 text-xl rounded-full hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex w-2 h-2 rounded-full right-2 top-2"
      />
      {icon}
    </button>
);
>>>>>>> dev

const Navbar = () => {
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
<<<<<<< HEAD
    <div className="relative flex justify-end p-2 pr-8 bg-white">

      <div className="flex gap-2">
        <div className='text-4xl cursor-pointer'onClick={() => handleClick('notification')}>
          <NotificationsNoneIcon fontSize="inherit" />
        </div>
        {/* <NavButton title="Notification" dotColor="rgb(254, 201, 15)" customFunc={() => handleClick('notification')} icon={<RiNotification3Line style={{ color: 'black', fontSize: '28px' }}/>} /> */}
        <div
          className="flex items-center gap-2 p-1 rounded-lg cursor-pointer hover:bg-light-gray"
          onClick={() => handleClick('userProfile')}
        >
          <p>
            <div><span className="ml-1 text-[16px] font-bold text-black">
              Michael Scott
            </span></div>
            <span className='float-right text-sm'>Chief Engineer</span>
          </p>
          <MdKeyboardArrowDown className="text-gray-400 text-14" />
          <img
            className="w-10 h-10 rounded-full"
            src={avatar}
            alt="user-profile"
          />
        </div>
=======
    <div className="relative flex gap-10 justify-end p-1.5 md:ml-10 md:mr-1">

      {/* <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} /> */}
      <div className="flex">
        <NavButton title="Notification" dotColor="rgb(254, 201, 15)" customFunc={() => handleClick('notification')} color={currentColor} icon={<RiNotification3Line style={{ color: 'black', fontSize: '28px' }}/>} />
          <div
            className="flex items-center gap-2 p-1 rounded-lg cursor-pointer hover:bg-light-gray"
            onClick={() => handleClick('userProfile')}
          >
            <p>
              <div><span className="ml-1 text-[16px] font-bold text-black">
                Govindani Sahasrika
              </span></div>
              <span className='float-right text-sm'>Site Supervisor</span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
            <img
              className="w-10 h-10 rounded-full"
              src={avatar}
              alt="user-profile"
            />
          </div>
>>>>>>> dev

        {isClicked.notification && (<Notification />)}
        {isClicked.userProfile && (<UserProfile />)}
      </div>
    </div>
  );
};

export default Navbar;