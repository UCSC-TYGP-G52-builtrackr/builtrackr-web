import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import { MdKeyboardArrowDown } from 'react-icons/md';
import avatar from '../../data/avatar.jpg';
import Notification from './Notification';
import UserProfile from './UserProfile';
import { useStateContext } from '../../contexts/ContextProvider';
//decrypt encrypted local storage items
import { decryptData } from '../../encrypt'
import CustomerRegisterButton from './CustomerRegisterButton';

const Navbar = () => {
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();
  const [navbarDetails, setNavbarDetails] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();

  const storedCompId = localStorage.getItem("company_id");
  const decryptedValueofID = decryptData(JSON.parse(storedCompId));
  const companyID = parseInt(decryptedValueofID, 10);
  // console.log("company's ID: ", companyID);

  //parsing a number from local storage
  const storedEmployeeNo = localStorage.getItem("no");
  const decryptedNo = decryptData(JSON.parse(storedEmployeeNo));
  const employeeNo = parseInt(decryptedNo, 10);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

    
    useEffect(() => {
      const getCompName = async () => {
        try {
  
          const formData = {
            companyID: companyID,
            employeeNo: employeeNo
          };
  
          console.log(formData);
          const data = await fetch(
            "http://localhost:4000/api/navbar/getCompanyName",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          );
          if (data.status === 200) {
            const jsonData = await data.json();
            console.log("this is photo path related",jsonData);
            setNavbarDetails(jsonData);
            console.log("details: ", navbarDetails);
          } else {
            console.log(data.status);
          }
        } catch (err) {
          console.error(err.message);
        }
      };
      getCompName();
    }, []);
    // getCompName();

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  const shouldShowCustomerRegisterButton = location.pathname.endsWith('/sites');
  const shouldShowBackButton = /\d+$/.test(location.pathname);

  let buttonText = "Go Back";

  // Extract the text preceding the last number in the URL
  const match = location.pathname.match(/(sites|warehouses)\/\d+$/);
  if (match) {
    const precedingText = match[1];
    if (precedingText === "sites") {
      buttonText = "Sites";
    } else if (precedingText === "warehouses") {
      buttonText = "Warehouses";
    }
  }


  console.log("back btn show? ", shouldShowBackButton);

  //parsing a string from local storage
  const storedEmployeeName = localStorage.getItem("name");
  const decryptedValue = decryptData(JSON.parse(storedEmployeeName));

  return (
    <div>
    {shouldShowCustomerRegisterButton ? (
      <div className="relative flex justify-between px-4 py-2">
      <CustomerRegisterButton/>
      {/* {shouldShowCustomerRegisterButton && <CustomerRegisterButton />} */}
      <div className="flex gap-2">
        <div
          className="text-4xl cursor-pointer"
          onClick={() => handleClick("notification")}
        >
          <NotificationsNoneIcon fontSize="inherit" />
        </div>
        {/* <NavButton title="Notification" dotColor="rgb(254, 201, 15)" customFunc={() => handleClick('notification')} icon={<RiNotification3Line style={{ color: 'black', fontSize: '28px' }}/>} /> */}
        <div
          className="flex items-center gap-2 p-1 rounded-lg cursor-pointer hover:bg-light-gray"
          onClick={() => handleClick("userProfile")}
        >
          <p>
            <div><span className="ml-1 text-[16px] font-bold text-black">
            {decryptedValue}
            </span></div>
            {/* <span className='float-right text-sm'>{navbarDetails[0].company_name}</span> */}
            <span className='float-right text-sm'>{navbarDetails.length > 0 ? navbarDetails[0].company_name : ''}</span>
          </p>
          <MdKeyboardArrowDown className="text-gray-400 text-14" />
          <img
            className="w-10 h-10 rounded-full"
            // src={avatar}
            src={`http://localhost:4000/employees/${navbarDetails.length > 0 ? navbarDetails[0].photo_path : ''}`}
            alt="user-profile"
          />
        </div>

        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
    ) : shouldShowBackButton ? (
      <div className="relative flex justify-between px-4 py-2">
        <div onClick={() => navigate(-1)} className='flex gap-2 cursor-pointer'>
          <span><KeyboardBackspaceIcon /></span>
          <span>{buttonText}</span>
        </div>
      {/* {shouldShowCustomerRegisterButton && <CustomerRegisterButton />} */}
      <div className="flex gap-2">
        <div
          className="text-4xl cursor-pointer"
          onClick={() => handleClick("notification")}
        >
          <NotificationsNoneIcon fontSize="inherit" />
        </div>
        {/* <NavButton title="Notification" dotColor="rgb(254, 201, 15)" customFunc={() => handleClick('notification')} icon={<RiNotification3Line style={{ color: 'black', fontSize: '28px' }}/>} /> */}
        <div
          className="flex items-center gap-2 p-1 rounded-lg cursor-pointer hover:bg-light-gray"
          onClick={() => handleClick("userProfile")}
        >
          <p>
            <div><span className="ml-1 text-[16px] font-bold text-black">
            {decryptedValue}
            </span></div>
            {/* <span className='float-right text-sm'>{navbarDetails[0].company_name}</span> */}
            <span className='float-right text-sm'>{navbarDetails.length > 0 ? navbarDetails[0].company_name : ''}</span>
          </p>
          <MdKeyboardArrowDown className="text-gray-400 text-14" />
          <img
            className="w-10 h-10 rounded-full"
            // src={avatar}
            src={`http://localhost:4000/employees/${navbarDetails.length > 0 ? navbarDetails[0].photo_path : ''}`}
            alt="user-profile"
          />
        </div>

        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
    ):
    (
      <div className="relative flex justify-end px-4 py-2">
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
            {decryptedValue}
            </span></div>
            <span className='float-right text-sm'>{navbarDetails.length > 0 ? navbarDetails[0].company_name : ''}</span>
          </p>
          <MdKeyboardArrowDown className="text-gray-400 text-14" />
          <img
            className="w-10 h-10 rounded-full"
            // src={avatar}
            // src={`http://localhost:4000/employees/${navbarDetails[0].photo_path}`}
            src={`http://localhost:4000/employees/${navbarDetails.length > 0 ? navbarDetails[0].photo_path : ''}`}
            alt="user-profile"
          />
        </div>

        {isClicked.notification && (<Notification />)}
        {isClicked.userProfile && (<UserProfile />)}
      </div>
    </div>
    )}
      
  </div>
    
  );
};

export default Navbar;
