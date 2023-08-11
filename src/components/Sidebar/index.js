import React from 'react'
import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, SideBtnWrap, SidebarRoute } from './SidebarElements'
import { useNavigate } from 'react-router-dom'


const Sidebar = ({ isOpen, toggle }) => {
  const navigate=useNavigate();
  const redirect=(path)=>{
    navigate(path);
  }
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
        <Icon onClck={toggle}>
            <CloseIcon />
        </Icon>
        <SidebarWrapper>
            <SidebarMenu>
                <SidebarLink to="about" onClick={toggle} >About</SidebarLink>
                <SidebarLink to="services"onClick={toggle}>Services</SidebarLink>
                <SidebarLink to="contactus"onClick={toggle}>Contact Us</SidebarLink>
                <SidebarLink to="register" onClick={toggle}>Sign Up</SidebarLink>
            </SidebarMenu>
            <SideBtnWrap>
<SidebarRoute to='/signin'>Sign In</SidebarRoute>
            </SideBtnWrap>
        </SidebarWrapper>
    </SidebarContainer>
  )
}

export default Sidebar
