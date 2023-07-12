import React from 'react'
import {FaBars} from 'react-icons/fa'
import {Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem,NavLinks,NavBtn, NavBtnLink } from './NavbarElements'
import {NavLink} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Navbar = ( {toggle} ) => {
    const navigate = useNavigate();
  return (
    
    <>
    <Nav>
        <NavbarContainer>
            <NavLogo to='/'>builTrackr</NavLogo>
            <MobileIcon onClick={toggle}>
                <FaBars/>
            </MobileIcon>
            <NavMenu>
                <NavItem>
                    <NavLinks to='about'>About</NavLinks>
                </NavItem>
                <NavItem>
                    <NavLinks to='services'>Services</NavLinks>
                </NavItem>
                <NavItem>
                    <NavLinks to='contactus'>Contact Us</NavLinks>
                </NavItem>
                <NavItem>
                    <NavLinks to="/Login" onClick={navigate("/Register")}>Sign Up</NavLinks>
                </NavItem>
            </NavMenu>
            <NavBtn>
                <NavBtnLink to="/Login">Sign In</NavBtnLink>
            </NavBtn>
        </NavbarContainer>
    </Nav>
    </>
  )
}

export default Navbar
