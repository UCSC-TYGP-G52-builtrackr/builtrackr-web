// import "../CSS/dashboard.css"
import React, { useState } from 'react';
import { Menu, MenuItem } from 'react-pro-sidebar';
// import 'react-pro-sidebar/dist/css/styles.css'
import { Link } from 'react-router-dom';
import { Box, IconButton, Typography, useTheme, Avatar } from "@mui/material"
// import { Link } from 'react-router-dom';
import FoundationSharpIcon from '@mui/icons-material/FoundationSharp';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PlaylistAddCheckSharpIcon from '@mui/icons-material/PlaylistAddCheckSharp';
import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';
import EqualizerSharpIcon from '@mui/icons-material/EqualizerSharp';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Analytics from "../pages/dashboard/Analytics";
import { useRef } from 'react';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);

    const menuContent = ["Profile", "Settings", "Logout"];
    const menuRef = useRef();
    const imgRef = useRef();
    
    window.addEventListener("click", (e) => {
        if(e.target !== menuRef.current && e.target !== imgRef.current){
            setIsOpen(false);
        }
    });

    const menuItem = [
        {
            path: "/dashboard/Analytics",
            name: "Analytics",
            icon: <EqualizerSharpIcon/>
        },
        {
            path: "/dashboard/Employees",
            name: "Employees",
            icon: <PeopleAltSharpIcon/>
        },
        {
            path: "/dashboard/Sites",
            name: "Sites",
            icon: <FoundationSharpIcon/>
        }    
    ]


    return (
    <div className="flex">
           <div style={{width:"250px"}} className="sidebar">
               <div className="top_section">
                   {/* <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1> */}
                   {/* <img className="bt_logo" src="../../public/bt_logo.png"  alt  = "logo"/> */}
               </div>
               {
                   menuItem.map((item, index)=>(
                       <Link to={item.path} key={index} className="mt-4 ml-4 link font-robotoMid" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: "block"}} className="link_text">{item.name}</div>
                       </Link>
                   ))
               }

            <div class="flex mt-80 justify-center cursor-pointer font-robotoMid">
            <LogoutSharpIcon/>
            <div>Logout</div>
            </div>
           </div>
           
           {/* navbar */}
           <div class="flex bg-white justify-end pr-10 h-16 pt-2 w-auto grow mt-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 pt-3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                </svg>
                <div class="inline-block mx-4 font-robotoMid"><h4>Anne Perkins</h4>
                <div class="font-robotoThin text-gray-500"><small>Chief Engineer</small></div></div>

                {/* profile avatar and dropdown menu */}
                <div className='inline-block'>
                    <img ref={imgRef} onClick={()=>setIsOpen(!isOpen)} class="rounded-full w-12 h-12 border-2 border-yellow-400 shadow-sm" src="https://randomuser.me/api/portraits/women/81.jpg" alt="user image" />

                    {
                        isOpen && (
                        <div ref={menuRef} className='absolute right-0 z-10 mt-2 mr-4 text-sm text-left text-gray-600 origin-top-right bg-white rounded-md shadow-lg font-robotoMid w-36 ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <ul>
                        {

                                menuContent.map((menu)=>(
                                    <li onClick={()=>setIsOpen(false)} key={menu} className='py-3 pl-2 hover:bg-gray-100'>{menu}</li>
                                ))

                        }
                        </ul> 
                    </div>
                        )
                    }
                    
                </div>
                
           </div>
           {/* <main>{children}</main> */}
    </div>
    );
    
};


export default Sidebar;